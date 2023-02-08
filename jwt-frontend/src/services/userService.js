import axios from "../setup/instance"
const registerNewUser = (email, phoneNumber, username, password) => {
  return axios.post("/api/v1/register", {
    email,
    phoneNumber,
    password,
    username,
  });
};
const loginUser = (valueLogin, password) => {
  return axios.post("/api/v1/login", {
    valueLogin,
    password,
  });
};
const fetchAllUsers = (page, limit) => {
  return axios.get(
    `/api/v1/user/read?page=${page}&limit=${limit}`
  );
};
const deleteUser = (user) => {
  return axios.delete(`/api/v1/user/delete`, {
    data: { id: user.id },
  });
};
const fetchGroups = () => {
  return axios.get(`/api/v1/group/read`);
};
const createUser = (userData) => {
  return axios.post(`/api/v1/user/create`, {
    ...userData,
  });
};
const updateCurrentUser = (userData) => {
  return axios.put(`/api/v1/user/update`, {
    ...userData,
  });
};
export {
  registerNewUser,
  loginUser,
  fetchAllUsers,
  deleteUser,
  fetchGroups,
  createUser,
  updateCurrentUser,
};
