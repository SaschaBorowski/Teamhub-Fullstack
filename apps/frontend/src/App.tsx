import { gql, useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';

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

const CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      name
      description
    }
  }
`;

type Task = {
  id: string;
  title: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
};

type Project = {
  id: string;
  name: string;
  description?: string | null;
  tasks: Task[];
};

const statusLabel: Record<Task['status'], string> = {
  TODO: 'Todo',
  IN_PROGRESS: 'In progress',
  DONE: 'Done',
};

export default function App() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { data, loading, error } =
    useQuery<{ projects: Project[] }>(PROJECTS_QUERY);

  const [createProject] = useMutation(CREATE_PROJECT, {
    refetchQueries: [{ query: PROJECTS_QUERY }],
  });

  const handleCreateProject = async () => {
    if (!name.trim()) {
      return;
    }

    await createProject({
      variables: {
        input: {
          name,
          description,
        },
      },
    });

    setName('');
    setDescription('');
  };

  return (
    <main className="shell">
      <section className="hero">
        <div>
          <p className="eyebrow">TeamHub</p>
          <h1>Project work, visible and aligned.</h1>
          <p className="lede">
            Track projects, tasks, ownership, and progress from one shared workspace.
          </p>
        </div>
        <div className="summary">
          <span>Projects</span>
          <strong>{data?.projects.length ?? 0}</strong>
        </div>
      </section>

      <section className="dashboard" aria-label="Projects">
        {loading && <p className="state">Loading projects...</p>}
        {error && <p className="state error">Could not load projects. Is the API running?</p>}
        {!loading &&
          !error &&
          (data?.projects.length ? (
            data.projects.map((project) => <ProjectCard key={project.id} project={project} />)
          ) : (
            <p className="state">No projects yet. Create one through the GraphQL API.</p>
          ))}
      </section>

      <section className="create-project">
        <h2>Neues Projekt</h2>

        <input
          type="text"
          placeholder="Projektname"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Beschreibung"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={handleCreateProject}>
          Projekt erstellen
        </button>
      </section>
    </main>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-header">
        <div>
          <h2>{project.name}</h2>
          {project.description && <p>{project.description}</p>}
        </div>
        <span>{project.tasks.length} tasks</span>
      </div>

      <ul className="task-list">
        {project.tasks.map((task) => (
          <li key={task.id}>
            <span>{task.title}</span>
            <small data-status={task.status}>{statusLabel[task.status]}</small>
          </li>
        ))}
      </ul>
    </article>
  );
}
