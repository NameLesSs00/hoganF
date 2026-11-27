import type { LocalizedString } from "./common";

export interface AdminBrandDto {
  id: string;
  name: LocalizedString;
  logoUrl: string | null;
  createdAt: string;
  motorcycleCount: number;
  sparePartCount: number;
}

export interface AdminBrandsQueryParams {
  Search?: string;
  Usage?: string;
}

export interface BrandFormPayload {
  nameEn: string;
  nameAr: string;
  logo?: File | null;
}
