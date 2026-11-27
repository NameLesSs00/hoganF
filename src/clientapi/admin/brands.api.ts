import { adminApi } from "@/clientapi/apiConfig";
import type {
  AdminBrandDto,
  AdminBrandsQueryParams,
  BrandFormPayload,
} from "@/clientapi/types/adminBrands";

function buildBrandFormData(payload: BrandFormPayload): FormData {
  const formData = new FormData();
  formData.append("NameEn", payload.nameEn);
  formData.append("NameAr", payload.nameAr);
  if (payload.logo) {
    formData.append("Logo", payload.logo);
  }
  return formData;
}

export async function getAdminBrands(
  params?: AdminBrandsQueryParams,
): Promise<AdminBrandDto[]> {
  const { data } = await adminApi.get<AdminBrandDto[]>("/brands", { params });
  return data;
}

export async function getAdminBrandById(id: string): Promise<AdminBrandDto> {
  const { data } = await adminApi.get<AdminBrandDto>(`/brands/${id}`);
  return data;
}

export async function createAdminBrand(
  payload: BrandFormPayload,
): Promise<AdminBrandDto> {
  const { data } = await adminApi.post<AdminBrandDto>(
    "/brands",
    buildBrandFormData(payload),
    { headers: { "Content-Type": undefined } },
  );
  return data;
}

export async function updateAdminBrand(
  id: string,
  payload: BrandFormPayload,
): Promise<AdminBrandDto> {
  const { data } = await adminApi.put<AdminBrandDto>(
    `/brands/${id}`,
    buildBrandFormData(payload),
    { headers: { "Content-Type": undefined } },
  );
  return data;
}

export async function deleteAdminBrand(id: string): Promise<void> {
  await adminApi.delete(`/brands/${id}`);
}
