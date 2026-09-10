import axios from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    /** Opt a call out of the 401 auto-redirect below — for public/unauthenticated endpoints (e.g. login) where a 401 means "wrong credentials", not "session expired". */
    skipAuthRedirect?: boolean;
  }
}

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
    if (
      error.response?.status === 401 &&
      !error.config?.skipAuthRedirect &&
      typeof window !== "undefined"
    ) {
      // Interceptor runs outside the React tree (no router/hook context)
      // and a hard reload is desired anyway to clear client state.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  },
);
