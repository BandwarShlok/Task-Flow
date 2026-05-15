import API from "./api";

export const getCurrentUser = async () => {
  const res = await API.get("/users/me");

  return res.data;
};