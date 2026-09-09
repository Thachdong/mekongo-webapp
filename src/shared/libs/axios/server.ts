import axios from "axios";

/**
 * Shared axios instance for server components. No interceptors, no
 * default Authorization header — each call passes its token via
 * config (see withServerToken HOC), since this instance holds no
 * per-request state.
 */
export const axiosServer = axios.create({
  baseURL: process.env.BACKEND_API_URL,
});
