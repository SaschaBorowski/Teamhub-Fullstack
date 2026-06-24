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

// =====================================
// GraphQL Mutation
// Erstellt einen neuen Task
// =====================================
const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      title
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

  // Formularfeld: Tasks
  const [taskTitle, setTaskTitle] = useState('');

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
  const handleCreateTask = async (projectId: string) => {
    if (!taskTitle.trim()) {
      return;
    }

    await createTask({
      variables: {
        input: {
          title: taskTitle,
          projectId,
        },
      },
    });

    setTaskTitle('');
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
                taskTitle={taskTitle}
                setTaskTitle={setTaskTitle}
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
  taskTitle,
  setTaskTitle,
}: {
  project: Project;
  handleCreateTask: (projectId: string) => Promise<void>;
  taskTitle: string;
  setTaskTitle: React.Dispatch<React.SetStateAction<string>>;
}) {
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
            <span>{task.title}</span>

            {/* Status */}
            <small data-status={task.status}>
              {statusLabel[task.status]}
            </small>

          </li>

        ))}

      </ul>

      {/* 🟥 Task erstellen */}
      <div style={{ marginTop: '12px' }}>
        <input
          type="text"
          placeholder="Neuer Task"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />

        <button
          onClick={() => handleCreateTask(project.id)}
        >
          Task hinzufügen
        </button>
      </div>

    </article>
  );
}