import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";

const TECHNOLOGY_ICONS = {
  Java: "devicon-java-plain",
  OOP: "fa-solid fa-cubes",
  "File Handling": "fa-solid fa-folder-open",
  MongoDB: "devicon-mongodb-plain",
  Express: "devicon-express-original",
  React: "devicon-react-original",
  "Node.js": "devicon-nodejs-plain",
  JavaScript: "devicon-javascript-plain",
  HTML: "devicon-html5-plain",
  CSS: "devicon-css3-plain",
};

const getProjectIcon = (title) => {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle.includes("sales")) {
    return "fa-solid fa-cart-shopping";
  }

  if (normalizedTitle.includes("student")) {
    return "fa-solid fa-user-graduate";
  }

  if (normalizedTitle.includes("drive")) {
    return "fa-solid fa-car-side";
  }

  return "fa-solid fa-code";
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
    window.addEventListener("projectsChanged", loadProjects);

    return () => {
      window.removeEventListener("projectsChanged", loadProjects);
    };
  }, []);

  return (
    <section id="projects" className="projects section">
      <div className="section-title">
        <span>PROJECTS</span>
        <h2>Featured Work</h2>
      </div>

      {loading && <p className="project-message">Loading projects...</p>}

      {!loading && error && (
        <p className="project-message project-error">{error}</p>
      )}

      {!loading && !error && projects.length === 0 && (
        <p className="project-message">No projects have been added yet.</p>
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="project-grid">
          {projects.map((project) => (
            <article
              className="project"
              key={project._id || project.projectLink || project.title}
            >
              <div className="project-content">
                <span
                  className={`project-status ${
                    project.status === "Completed"
                      ? "finished"
                      : "project-active"
                  }`}
                >
                  <span className="status-dot" aria-hidden="true"></span>
                  {project.status}
                </span>

                <div className="project-title">
                  <div className="project-tech-icon">
                    <i className={getProjectIcon(project.title)}></i>
                  </div>
                  <h3>{project.title}</h3>
                </div>

                <p>{project.description}</p>

                <div className="stack">
                  {project.technologies.map((technology) => (
                    <span key={technology}>
                      <i
                        className={
                          TECHNOLOGY_ICONS[technology] || "fa-solid fa-code"
                        }
                      ></i>
                      {technology}
                    </span>
                  ))}
                </div>

                {project.projectLink && (
                  <div className="project-links">
                    <a
                      href={project.projectLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa-brands fa-github" aria-hidden="true"></i>
                      <span>View Project</span>
                      <i
                        className="fa-solid fa-arrow-up-right-from-square project-link-arrow"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
