import axios from "axios";
import { adminApi } from "@/clientapi/apiConfig";
import type {
  AdminProfileDto,
  BffLoginResponse,
  LoginRequest,
  ProblemDetails,
} from "@/clientapi/types/auth";

export async function loginAdmin(payload: LoginRequest): Promise<BffLoginResponse> {
  const { data } = await adminApi.post<BffLoginResponse>("/auth/login", payload);
  return data;
}

export async function logoutAdmin(): Promise<void> {
  await adminApi.post("/auth/logout");
}

export async function getCurrentAdmin(): Promise<AdminProfileDto> {
  const { data } = await adminApi.get<AdminProfileDto>("/auth/me");
  return data;
}

export function extractApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError<ProblemDetails & { message?: string }>(error)) {
    const data = error.response?.data;
    if (data?.detail && typeof data.detail === "string") return data.detail;
    if (data?.title && typeof data.title === "string") return data.title;
    if (data?.message && typeof data.message === "string") return data.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}
