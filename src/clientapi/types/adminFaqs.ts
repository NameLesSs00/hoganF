import type { LocalizedString } from "./common";

export interface AdminFaqDto {
  id: string;
  question: LocalizedString;
  answer: LocalizedString;
  orderNumber: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface AdminFaqsQueryParams {
  Search?: string;
  IsActive?: boolean;
}

export interface CreateAdminFaqRequest {
  question: LocalizedString;
  answer: LocalizedString;
  orderNumber: number;
  isActive: boolean;
}

export type UpdateAdminFaqRequest = CreateAdminFaqRequest;

export interface SetFaqActiveRequest {
  isActive: boolean;
}

export interface ReorderFaqItem {
  id: string;
  orderNumber: number;
}

export interface ReorderFaqsRequest {
  items: ReorderFaqItem[];
}
