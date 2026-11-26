export interface LoginRequest {
  email: string;
  password: string;
}

export interface AdminProfileDto {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  roles: string[] | null;
}

export interface BffLoginResponse {
  expiresAtUtc: string | null;
  user: AdminProfileDto | null;
}

export interface ProblemDetails {
  type?: string | null;
  title?: string | null;
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: unknown;
}
