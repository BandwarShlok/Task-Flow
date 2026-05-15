import API from "./api";

export const getTasks = async () => {
  const res = await API.get("/tasks");
  return res.data;
};

export const addTask = async (data) => {
  const res = await API.post("/tasks", data);
  return res.data;
};

export const deleteTask = async (id) => {
  await API.delete(`/tasks/${id}`);
};

export const updateTask = async (id, data) => {
  await API.put(`/tasks/${id}`, data);
};

export const toggleTask = async (id) => {
  await API.patch(`/tasks/${id}/toggle`);
};