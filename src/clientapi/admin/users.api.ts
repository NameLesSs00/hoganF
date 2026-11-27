import { adminApi } from "@/clientapi/apiConfig";
import type {
  AdminUserDto,
  AdminUserPagedResult,
  AdminUsersQueryParams,
  CreateAdminUserRequest,
  SetAdminActiveRequest,
  UpdateAdminUserRequest,
} from "@/clientapi/types/adminUsers";

export async function getAdminUsers(
  params?: AdminUsersQueryParams,
): Promise<AdminUserPagedResult> {
  const { data } = await adminApi.get<AdminUserPagedResult>("/users", {
    params,
  });
  return data;
}

export async function getAdminUserById(id: string): Promise<AdminUserDto> {
  const { data } = await adminApi.get<AdminUserDto>(`/users/${id}`);
  return data;
}

export async function createAdminUser(
  payload: CreateAdminUserRequest,
): Promise<AdminUserDto> {
  const { data } = await adminApi.post<AdminUserDto>("/users", payload);
  return data;
}

export async function updateAdminUser(
  id: string,
  payload: UpdateAdminUserRequest,
): Promise<AdminUserDto> {
  const { data } = await adminApi.put<AdminUserDto>(`/users/${id}`, payload);
  return data;
}

export async function deleteAdminUser(id: string): Promise<void> {
  await adminApi.delete(`/users/${id}`);
}

export async function setAdminUserActive(
  id: string,
  payload: SetAdminActiveRequest,
): Promise<AdminUserDto> {
  const { data } = await adminApi.patch<AdminUserDto>(
    `/users/${id}/active`,
    payload,
  );
  return data;
}
