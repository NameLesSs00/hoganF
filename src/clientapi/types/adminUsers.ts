import type { PagedResult } from "./common";

export interface AdminUserDto {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  isActive: boolean;
  createdAt: string;
  roles: string[] | null;
}

export type AdminUserPagedResult = PagedResult<AdminUserDto>;

export interface AdminUsersQueryParams {
  Search?: string;
  IsActive?: boolean;
  Page?: number;
  PageSize?: number;
  Skip?: number;
}

export interface CreateAdminUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
}

export interface UpdateAdminUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  newPassword?: string | null;
}

export interface SetAdminActiveRequest {
  isActive: boolean;
}
