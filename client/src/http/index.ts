import axios from "axios";

const baseURL = process.env.NODE_ENV !== "development" ? "/" : "http://localhost:8080/";
export const api = axios.create({ baseURL, headers: { "content-type": "application/json" } });