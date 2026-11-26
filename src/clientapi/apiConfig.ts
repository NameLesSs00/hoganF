import axios from "axios";

/**
 * Single source of truth for the backend API base URL.
 * Override via NEXT_PUBLIC_API_BASE_URL in .env.local when switching environments.
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") ||
  "https://hogan.runasp.net";

export const API_TIMEOUT_MS = 15000;

/**
 * Admin API client.
 * Routes through the Next.js BFF (/api/admin/*) so the JWT stays in an HttpOnly cookie
 * and is never exposed to client-side JavaScript or localStorage.
 */
export const adminApi = axios.create({
  baseURL: "/api/admin",
  timeout: API_TIMEOUT_MS,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Public catalog API client.
 * Communicates directly with the backend's /api/public/* endpoints.
 */
export const publicApi = axios.create({
  baseURL: `${API_BASE_URL}/api/public`,
  timeout: API_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
  },
});
