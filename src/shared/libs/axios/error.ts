import axios from "axios";

type ApiErrorBody = {
  message?: string | string[];
};

/**
 * Extracts a display-ready message from a failed API call. Backend error
 * bodies vary by status (400 -> string[], 500 -> string), see openapi.yml.
 */
export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const body = error.response?.data as ApiErrorBody | undefined;

    if (Array.isArray(body?.message)) return body.message.join(", ");
    if (typeof body?.message === "string") return body.message;
  }

  return fallback;
}
