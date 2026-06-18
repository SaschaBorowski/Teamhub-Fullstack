import { gql, useQuery } from '@apollo/client';

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
  const { data, loading, error } = useQuery<{ projects: Project[] }>(PROJECTS_QUERY);

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
