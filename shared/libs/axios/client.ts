import axios from "axios";

/**
 * Singleton axios instance for client components.
 * Calls go through the BFF proxy (/api/proxy) — cookies carry auth,
 * no Bearer token attached here.
 */
export const axiosClient = axios.create({
  baseURL: "/api/proxy",
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      // Interceptor runs outside the React tree (no router/hook context)
      // and a hard reload is desired anyway to clear client state.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  },
);
