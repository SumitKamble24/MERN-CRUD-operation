import axios from "axios";
import { jwtDecode } from "jwt-decode";

const register = async (username, password, email) => {
  await axios.post(`http://localhost:8080/auth/register`, {
    username,
    password,
    email,
  });
};

const login = async (email, password) => {
  const response = await axios.post(`http://localhost:8080/auth/login`, {
    password,
    email,
  });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const isAuthenticated = () => {
  const user = getCurrentUser();
  if (!user) return false;

  try {
    const decodedToken = jwtDecode(user.token);
    console.log("decodedToken.exp", decodedToken.exp);
    console.log("Date.now() / 1000", Date.now() / 1000);
    return decodedToken.exp > Date.now() / 1000;
  } catch (error) {
    return false;
  }
};

export { register, login, logout, getCurrentUser, isAuthenticated };
