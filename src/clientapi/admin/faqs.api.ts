import { adminApi } from "@/clientapi/apiConfig";
import type {
  AdminFaqDto,
  AdminFaqsQueryParams,
  CreateAdminFaqRequest,
  ReorderFaqsRequest,
  SetFaqActiveRequest,
  UpdateAdminFaqRequest,
} from "@/clientapi/types/adminFaqs";

export async function getAdminFaqs(
  params?: AdminFaqsQueryParams,
): Promise<AdminFaqDto[]> {
  const { data } = await adminApi.get<AdminFaqDto[]>("/faqs", { params });
  return data;
}

export async function getAdminFaqById(id: string): Promise<AdminFaqDto> {
  const { data } = await adminApi.get<AdminFaqDto>(`/faqs/${id}`);
  return data;
}

export async function createAdminFaq(
  payload: CreateAdminFaqRequest,
): Promise<AdminFaqDto> {
  const { data } = await adminApi.post<AdminFaqDto>("/faqs", payload);
  return data;
}

export async function updateAdminFaq(
  id: string,
  payload: UpdateAdminFaqRequest,
): Promise<AdminFaqDto> {
  const { data } = await adminApi.put<AdminFaqDto>(`/faqs/${id}`, payload);
  return data;
}

export async function deleteAdminFaq(id: string): Promise<void> {
  await adminApi.delete(`/faqs/${id}`);
}

export async function setAdminFaqActive(
  id: string,
  payload: SetFaqActiveRequest,
): Promise<AdminFaqDto> {
  const { data } = await adminApi.patch<AdminFaqDto>(
    `/faqs/${id}/active`,
    payload,
  );
  return data;
}

export async function reorderAdminFaqs(
  payload: ReorderFaqsRequest,
): Promise<AdminFaqDto[]> {
  const { data } = await adminApi.put<AdminFaqDto[]>("/faqs/reorder", payload);
  return data;
}
