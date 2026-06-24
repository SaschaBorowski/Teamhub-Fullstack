import { gql, useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';

// =====================================
// GraphQL Query
// Lädt alle Projekte inklusive Tasks
// =====================================
const PROJECTS_QUERY = gql`
  query Projects {
    projects {
      id
      name
      description
      tasks {
        id
        title
        description
        status
      }
    }
  }
`;

// =====================================
// GraphQL Mutation
// Erstellt ein neues Projekt
// =====================================
const CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      name
      description
    }
  }
`;

const UPDATE_TASK_STATUS = gql`
  mutation UpdateTaskStatus($id: ID!, $status: TaskStatus!) {
    updateTaskStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

const UPDATE_TASK_TITLE = gql`
  mutation UpdateTaskTitle(
    $id: ID!
    $title: String!
    $description: String!
  ) {
    updateTaskTitle(
      id: $id
      title: $title
      description: $description
    ) {
      id
      title
      description
    }
  }
`;

// =====================================
// GraphQL Mutation
// Erstellt einen neuen Task
// =====================================
const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
        id
        title
        description
        status
        projectId
}
  }
`;

// =====================================
// TypeScript Typ für einen Task
// =====================================
type Task = {
  id: string;
  title: string;
  description?: string | null;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
};

// =====================================
// TypeScript Typ für ein Projekt
// =====================================
type Project = {
  id: string;
  name: string;
  description?: string | null;
  tasks: Task[];
};

// =====================================
// Datenbankstatus -> Lesbarer Text
// =====================================
const statusLabel: Record<Task['status'], string> = {
  TODO: 'Todo',
  IN_PROGRESS: 'In progress',
  DONE: 'Done',
};

// =====================================
// Hauptkomponente der Anwendung
// =====================================
export default function App() {

  // Formularfeld: Projektname
  const [name, setName] = useState('');

  // Formularfeld: Beschreibung
  const [description, setDescription] = useState('');

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const [editedTitle, setEditedTitle] = useState('');

  const [editedDescription, setEditedDescription] = useState('');

  // Lädt alle Projekte vom Backend
  const { data, loading, error } =
    useQuery<{ projects: Project[] }>(PROJECTS_QUERY);

  // Mutation zum Erstellen eines Projekts
  const [createProject] = useMutation(CREATE_PROJECT, {
    refetchQueries: [{ query: PROJECTS_QUERY }],
  });

  // Mutation zum Erstellen eines Tasks
  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: PROJECTS_QUERY }],
  });

  // Mutation zum updaten des Taskstatus
  const [updateTaskStatus] = useMutation(UPDATE_TASK_STATUS, {
    refetchQueries: [{ query: PROJECTS_QUERY }],
  });

  const [updateTaskTitle] = useMutation(
    UPDATE_TASK_TITLE,
    {
      refetchQueries: [{ query: PROJECTS_QUERY }],
    }
  );

  // Mutation zum löschen der Tasks
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: PROJECTS_QUERY }],
  });

  // =====================================
  // Projekt speichern
  // Wird durch den Button ausgelöst
  // =====================================
  const handleCreateProject = async () => {

    // Leere Projektnamen verhindern
    if (!name.trim()) {
      return;
    }

    // GraphQL Mutation ausführen
    await createProject({
      variables: {
        input: {
          name,
          description,
        },
      },
    });

    // Formular zurücksetzen
    setName('');
    setDescription('');
  };

  // Task erstellen
  const handleCreateTask = async (
    projectId: string,
    title: string,
    description: string
  ) => {
    if (!title.trim()) {
      return;
    }

    await createTask({
      variables: {
        input: {
          title,
          description,
          projectId,
        },
      },
    });
  };

  const handleUpdateTaskStatus = async (
    taskId: string,
    status: Task['status']
  ) => {
    await updateTaskStatus({
      variables: {
        id: taskId,
        status,
      },
    });
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask({
      variables: {
        id: taskId,
      },
    });
  };

  const handleUpdateTaskTitle = async (
    taskId: string,
    title: string,
    description: string
  ) => {
    await updateTaskTitle({
      variables: {
        id: taskId,
        title,
        description,
      },
    });
  };

  // =====================================
  // UI anzeigen
  // =====================================
  return (
    <main className="shell">

      {/* Kopfbereich */}
      <section className="hero">
        <div>
          <p className="eyebrow">TeamHub</p>

          <h1>Project work, visible and aligned.</h1>

          <p className="lede">
            Track projects, tasks, ownership, and progress from one shared workspace.
          </p>
        </div>

        {/* Projektanzahl */}
        <div className="summary">
          <span>Projects</span>
          <strong>{data?.projects.length ?? 0}</strong>
        </div>
      </section>

      {/* Projektübersicht */}
      <section className="dashboard" aria-label="Projects">

        {/* Wird während des Ladens angezeigt */}
        {loading && <p className="state">Loading projects...</p>}

        {/* Wird bei Fehlern angezeigt */}
        {error && <p className="state error">Could not load projects. Is the API running?</p>}

        {/* Projekte anzeigen */}
        {!loading &&
          !error &&
          (data?.projects.length ? (
            data.projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                handleCreateTask={handleCreateTask}
                handleUpdateTaskStatus={handleUpdateTaskStatus}
                handleDeleteTask={handleDeleteTask}
                editingTaskId={editingTaskId}
                setEditingTaskId={setEditingTaskId}
                editedTitle={editedTitle}
                setEditedTitle={setEditedTitle}
                handleUpdateTaskTitle={handleUpdateTaskTitle}
                editedDescription={editedDescription}
                setEditedDescription={setEditedDescription}
              />
            ))
          ) : (
            <p className="state">
              No projects yet. Create one through the GraphQL API.
            </p>
          ))}
      </section>

      {/* Formular zum Erstellen eines Projekts */}
      <section className="create-project">

        <h2>Neues Projekt</h2>

        {/* Projektname */}
        <input
          type="text"
          placeholder="Projektname"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Beschreibung */}
        <input
          type="text"
          placeholder="Beschreibung"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Speichern */}
        <button onClick={handleCreateProject}>
          Projekt erstellen
        </button>

      </section>

    </main>
  );
}

// =====================================
// Einzelne Projektkarte
// =====================================
function ProjectCard({
  project,
  handleCreateTask,
  handleUpdateTaskStatus,
  handleDeleteTask,
  editingTaskId,
  setEditingTaskId,
  editedTitle,
  setEditedTitle,
  handleUpdateTaskTitle,
  editedDescription,
  setEditedDescription,
}: {
  project: Project;
  handleCreateTask: (
    projectId: string,
    title: string,
    description: string
  ) => Promise<void>;
  handleUpdateTaskStatus: (
    taskId: string,
    status: Task['status']
  ) => Promise<void>;
  handleDeleteTask: (taskId: string) => Promise<void>;
  editingTaskId: string | null;
  setEditingTaskId: React.Dispatch<
    React.SetStateAction<string | null>
  >;

  editedTitle: string;
  setEditedTitle: React.Dispatch<
    React.SetStateAction<string>
  >;

  handleUpdateTaskTitle: (
    taskId: string,
    title: string,
    description: string
  ) => Promise<void>;

  editedDescription: string;

  setEditedDescription: React.Dispatch<
    React.SetStateAction<string>
  >;
}) {

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  return (
    <article className="project-card">

      {/* Projektkopf */}
      <div className="project-header">
        <div>

          {/* Projektname */}
          <h2>{project.name}</h2>

          {/* Beschreibung */}
          {project.description && <p>{project.description}</p>}

        </div>

        {/* Anzahl der Tasks */}
        <span>{project.tasks.length} tasks</span>
      </div>

      {/* Liste aller Tasks */}
      <ul className="task-list">

        {project.tasks.map((task) => (

          <li key={task.id}>

            {/* Titel */}
            {editingTaskId === task.id ? (
              <div className="task-edit">
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onKeyDown={async (e) => {
                    if (e.key === 'Enter') {
                      await handleUpdateTaskTitle(
                        task.id,
                        editedTitle,
                        editedDescription
                      );

                      setEditingTaskId(null);
                      setEditedTitle('');
                    }
                  }}
                />

                <textarea
                  value={editedDescription}
                  onChange={(e) =>
                    setEditedDescription(e.target.value)
                  }
                  placeholder="Beschreibung"
                />

                <div className="task-edit-actions">
                  <button
                    onClick={async () => {
                      await handleUpdateTaskTitle(
                        task.id,
                        editedTitle,
                        editedDescription
                      );

                      setEditingTaskId(null);
                    }}
                  >
                    💾
                  </button>

                  <button
                    onClick={() => {
                      setEditingTaskId(null);
                      setEditedTitle('');
                    }}
                  >
                    ❌
                  </button>
                </div>
              </div>
            ) : (
              <div className="task-content">
                <span className="task-title">
                  {task.title}
                </span>

                {task.description && (
                  <p className="task-description">
                    {task.description}
                  </p>
                )}
              </div>
            )}

            {/* Status */}
            <div className="task-actions">

              {/* Status */}
              <select
                value={task.status}
                onChange={(e) =>
                  handleUpdateTaskStatus(
                    task.id,
                    e.target.value as Task['status']
                  )
                }
              >
                <option value="TODO">Todo</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>

              {editingTaskId !== task.id && (
                <button
                  onClick={() => {
                    setEditingTaskId(task.id);
                    setEditedTitle(task.title);
                    setEditedDescription(task.description ?? '');
                  }}
                >
                  ✏️
                </button>
              )}

              <button
                onClick={() => handleDeleteTask(task.id)}
              >
                🗑
              </button>

            </div>

          </li>

        ))}

      </ul>

      <div className="task-create">
        <input
          type="text"
          placeholder="Neuer Task"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === 'Enter') {
              await handleCreateTask(
                project.id,
                taskTitle,
                taskDescription
              );

              setTaskTitle('');
              setTaskDescription('');
            }
          }}
        />

        <textarea
          placeholder="Beschreibung"
          value={taskDescription}
          onChange={(e) =>
            setTaskDescription(e.target.value)
          }
        />

        <button
          onClick={async () => {
            await handleCreateTask(
              project.id,
              taskTitle,
              taskDescription
            );

            setTaskTitle('');
            setTaskDescription('');
          }}
        >
          Task hinzufügen
        </button>
      </div>

    </article>
  );
}