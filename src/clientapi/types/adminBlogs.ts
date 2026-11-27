import type { LocalizedString, PagedResult } from "./common";

export interface BlogSectionDto {
  id: string;
  title: LocalizedString;
  contentHtml: LocalizedString;
  orderNumber: number;
}

export interface BlogReviewCountsDto {
  pending: number;
  approved: number;
  rejected: number;
}

export interface AdminBlogListItemDto {
  id: string;
  title: LocalizedString;
  heroImageUrl: string | null;
  summary: LocalizedString;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string | null;
  sectionCount: number;
  pendingReviewCount: number;
}

export type AdminBlogPagedResult = PagedResult<AdminBlogListItemDto>;

export interface AdminBlogDetailDto {
  id: string;
  title: LocalizedString;
  heroImageUrl: string | null;
  summary: LocalizedString;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string | null;
  sections: BlogSectionDto[] | null;
  reviewCounts: BlogReviewCountsDto | null;
}

export interface AdminBlogsQueryParams {
  Search?: string;
  IsPublished?: boolean;
  SortBy?: string;
  Page?: number;
  PageSize?: number;
  Skip?: number;
}

export interface BlogMetadataPayload {
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  heroImage?: File | null;
  isPublished?: boolean;
}

export interface BlogSectionInput {
  localId: string;
  title: LocalizedString;
  contentHtml: LocalizedString;
  orderNumber: number;
}

export interface SaveBlogSectionsRequest {
  sections: Array<{
    title: LocalizedString;
    contentHtml: LocalizedString;
    orderNumber: number;
  }>;
}
