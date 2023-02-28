import axios, { AxiosRequestConfig } from "axios";

export const API_URL = "https://music-web-node-app.onrender.com/api";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config: any) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default $api;
