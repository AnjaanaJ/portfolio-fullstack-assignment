const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/projects";

  const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Project request failed");
  }

  return data;
};

export const getProjects = async () => {
  const response = await fetch(API_URL);return handleResponse(response);
};

export const createProject = async (project) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });

  return handleResponse(response);
};

export const updateProject = async (id, project) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });

  return handleResponse(response);
};

export const deleteProject = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return handleResponse(response);
};

