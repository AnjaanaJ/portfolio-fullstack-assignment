import fallbackProjects from "../data/fallbackProjects";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/projects";
const STORAGE_KEY = "portfolio-projects";

const readStoredProjects = () => {
  try {
    const storedProjects = localStorage.getItem(STORAGE_KEY);
    return storedProjects ? JSON.parse(storedProjects) : null;
  } catch {
    return null;
  }
};

const storeProjects = (projects) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  return projects;
};

const getOfflineProjects = () => readStoredProjects() || fallbackProjects;

const createOfflineId = () =>
  globalThis.crypto?.randomUUID?.() ||
  `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const canUseOfflineFallback = (error) =>
  error instanceof TypeError || error.status >= 500;

const handleResponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    const error = new Error(data?.message || "Project request failed");
    error.status = response.status;
    throw error;
  }

  if (data === null) {
    throw new Error("The projects API returned an invalid response");
  }

  return data;
};

export const getProjects = async () => {
  try {
    const response = await fetch(API_URL);
    return await handleResponse(response);
  } catch (error) {
    if (!canUseOfflineFallback(error)) throw error;
    console.warn("Projects API unavailable; using built-in projects.", error);
    return getOfflineProjects();
  }
};

export const createProject = async (project) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });

    return await handleResponse(response);
  } catch (error) {
    if (!canUseOfflineFallback(error)) throw error;
    console.warn("Projects API unavailable; saving project locally.", error);
    const savedProject = { ...project, _id: createOfflineId() };
    storeProjects([savedProject, ...getOfflineProjects()]);
    return savedProject;
  }
};

export const updateProject = async (id, project) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });

    return await handleResponse(response);
  } catch (error) {
    if (!canUseOfflineFallback(error)) throw error;
    console.warn("Projects API unavailable; updating project locally.", error);
    const updatedProject = { ...project, _id: id };
    const projects = getOfflineProjects().map((currentProject) =>
      currentProject._id === id ? updatedProject : currentProject,
    );
    storeProjects(projects);
    return updatedProject;
  }
};

export const deleteProject = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    return await handleResponse(response);
  } catch (error) {
    if (!canUseOfflineFallback(error)) throw error;
    console.warn("Projects API unavailable; deleting project locally.", error);
    storeProjects(
      getOfflineProjects().filter((project) => project._id !== id),
    );
    return { message: "Project deleted successfully" };
  }
};
