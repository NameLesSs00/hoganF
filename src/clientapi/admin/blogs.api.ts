import { adminApi } from "@/clientapi/apiConfig";
import type {
  AdminBlogDetailDto,
  AdminBlogPagedResult,
  AdminBlogsQueryParams,
  BlogMetadataPayload,
  BlogSectionDto,
  SaveBlogSectionsRequest,
} from "@/clientapi/types/adminBlogs";

function buildBlogFormData(
  payload: BlogMetadataPayload,
  includeIsPublished: boolean,
): FormData {
  const formData = new FormData();
  formData.append("TitleEn", payload.titleEn);
  formData.append("TitleAr", payload.titleAr);
  formData.append("SummaryEn", payload.summaryEn);
  formData.append("SummaryAr", payload.summaryAr);
  if (payload.heroImage) {
    formData.append("HeroImage", payload.heroImage);
  }
  if (includeIsPublished && typeof payload.isPublished === "boolean") {
    formData.append("IsPublished", String(payload.isPublished));
  }
  return formData;
}

export async function getAdminBlogs(
  params?: AdminBlogsQueryParams,
): Promise<AdminBlogPagedResult> {
  const { data } = await adminApi.get<AdminBlogPagedResult>("/blogs", {
    params,
  });
  return data;
}

export async function getAdminBlogById(
  id: string,
): Promise<AdminBlogDetailDto> {
  const { data } = await adminApi.get<AdminBlogDetailDto>(`/blogs/${id}`);
  return data;
}

export async function createAdminBlog(
  payload: BlogMetadataPayload,
): Promise<AdminBlogDetailDto> {
  const { data } = await adminApi.post<AdminBlogDetailDto>(
    "/blogs",
    buildBlogFormData(payload, true),
    { headers: { "Content-Type": undefined } },
  );
  return data;
}

export async function updateAdminBlog(
  id: string,
  payload: BlogMetadataPayload,
): Promise<AdminBlogDetailDto> {
  const { data } = await adminApi.put<AdminBlogDetailDto>(
    `/blogs/${id}`,
    buildBlogFormData(payload, false),
    { headers: { "Content-Type": undefined } },
  );
  return data;
}

export async function deleteAdminBlog(id: string): Promise<void> {
  await adminApi.delete(`/blogs/${id}`);
}

export async function setAdminBlogPublish(
  id: string,
  isPublished: boolean,
): Promise<AdminBlogDetailDto> {
  const { data } = await adminApi.patch<AdminBlogDetailDto>(
    `/blogs/${id}/publish`,
    { isPublished },
  );
  return data;
}

export async function saveAdminBlogSections(
  id: string,
  payload: SaveBlogSectionsRequest,
): Promise<BlogSectionDto[]> {
  const { data } = await adminApi.put<BlogSectionDto[]>(
    `/blogs/${id}/sections`,
    payload,
  );
  return data;
}
