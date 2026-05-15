import API from "./api";

export const loginUser = async (data) => {
  try {
    const res = await API.post("/auth/login", data);

    // store token
    localStorage.setItem("token", res.data.token);

    return res.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
};