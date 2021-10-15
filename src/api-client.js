import axios from "axios";
console.log("JJJJJ",process.env.REACT_APP_API_BASE_URL)
 const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  if (localStorage.getItem("Gain-Token")) {
    let token = localStorage.getItem("Gain-Token");
    config.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default apiClient
