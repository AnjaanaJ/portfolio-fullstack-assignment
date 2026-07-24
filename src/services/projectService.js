const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/projects";

const request = async (url = API_URL, options) => {
  let response;

  try {
    response = await fetch(url, options);
  } catch {
    throw new Error(
      "Unable to connect to the projects API. Make sure the backend server is running.",
    );
  }

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    throw new Error(data?.message || "Project request failed.");
  }

  if (data === null) {
    throw new Error("The projects API returned an invalid response.");
  }

  return data;
};

export const getProjects = () => request();

export const createProject = (project) =>
  request(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });

export const updateProject = (id, project) =>
  request(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });

export const deleteProject = (id) =>
  request(`${API_URL}/${id}`, {
    method: "DELETE",
  });
