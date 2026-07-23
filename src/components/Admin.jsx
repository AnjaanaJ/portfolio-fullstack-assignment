import { useEffect, useState } from "react";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../services/projectService";

const EMPTY_FORM = {
  title: "",
  description: "",
  technologies: "",
  projectLink: "",
  status: "In Progress",
};

export default function Admin() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId("");
    setMessage("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    const projectData = {
      ...form,
      technologies: form.technologies
        .split(",")
        .map((technology) => technology.trim())
        .filter(Boolean),
    };

    try {
      if (editingId) {
        await updateProject(editingId, projectData);
        setMessage("Project updated successfully.");
      } else {
        await createProject(projectData);
        setMessage("Project added successfully.");
      }

      setForm(EMPTY_FORM);
      setEditingId("");
      await loadProjects();
      window.dispatchEvent(new Event("projectsChanged"));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setForm({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(", "),
      projectLink: project.projectLink || "",
      status: project.status,
    });
    setMessage("");
    setError("");
    document.querySelector("#admin")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = async (project) => {
    const confirmed = window.confirm(
      `Delete "${project.title}" permanently?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProject(project._id);
      setMessage("Project deleted successfully.");
      setError("");

      if (editingId === project._id) {
        setForm(EMPTY_FORM);
        setEditingId("");
      }

      await loadProjects();
      window.dispatchEvent(new Event("projectsChanged"));
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <section id="admin" className="admin section">
      <div className="section-title">
        <span>ADMIN</span>
        <h2>Manage Projects</h2>
      </div>

      <div className="admin-layout">
        <form className="admin-form reveal" onSubmit={handleSubmit}>
          <div className="admin-form-heading">
            <h3>{editingId ? "Update Project" : "Add Project"}</h3>
            <p>
              Add new work or update an existing portfolio project.
            </p>
          </div>

          <label htmlFor="project-title">Project title</label>
          <input
            id="project-title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            maxLength="100"
            required
          />

          <label htmlFor="project-description">Description</label>
          <textarea
            id="project-description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="5"
            maxLength="1000"
            required
          />

          <label htmlFor="project-technologies">
            Technologies (comma separated)
          </label>
          <input
            id="project-technologies"
            name="technologies"
            type="text"
            value={form.technologies}
            onChange={handleChange}
            placeholder="React, Node.js, Express, MongoDB"
            required
          />

          <label htmlFor="project-link">Project link</label>
          <input
            id="project-link"
            name="projectLink"
            type="url"
            value={form.projectLink}
            onChange={handleChange}
            placeholder="https://github.com/username/project"
          />

          <label htmlFor="project-status">Status</label>
          <select
            id="project-status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          {message && <p className="admin-message success">{message}</p>}
          {error && <p className="admin-message error">{error}</p>}

          <div className="admin-actions">
            <button className="admin-save" type="submit" disabled={saving}>
              {saving
                ? "Saving..."
                : editingId
                  ? "Update Project"
                  : "Save Project"}
            </button>

            <button
              className="admin-reset"
              type="button"
              onClick={resetForm}
            >
              Reset
            </button>
          </div>
        </form>

        <div className="admin-projects reveal">
          <h3>Saved Projects</h3>

          {projects.length === 0 ? (
            <p className="admin-empty">No projects have been added yet.</p>
          ) : (
            <div className="admin-project-list">
              {projects.map((project) => (
                <article className="admin-project-item" key={project._id}>
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.description}</p>
                    <span className="admin-technologies">
  {project.technologies.join(" • ")}
</span>

<div className="admin-project-meta">
  <span
    className={`admin-status ${
      project.status === "Completed" ? "completed" : "in-progress"
    }`}
  >
    {project.status}
  </span>

  {project.projectLink && (
    <a
      className="admin-project-link"
      href={project.projectLink}
      target="_blank"
      rel="noreferrer"
    >
      View project
    </a>
  )}
</div>
                           </div>

                  <div className="admin-item-actions">
                    <button
                      className="admin-edit"
                      type="button"
                      onClick={() => handleEdit(project)}
                    >
                      Edit
                    </button>
                    <button
                      className="admin-delete"
                      type="button"
                      onClick={() => handleDelete(project)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}