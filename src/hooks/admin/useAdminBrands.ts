"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { extractApiErrorMessage } from "@/clientapi/admin/auth.api";
import {
  createAdminBrand,
  deleteAdminBrand,
  getAdminBrands,
  updateAdminBrand,
} from "@/clientapi/admin/brands.api";
import type {
  AdminBrandsQueryParams,
  BrandFormPayload,
} from "@/clientapi/types/adminBrands";

export const ADMIN_BRANDS_QUERY_KEY = ["admin", "brands"] as const;

export function useAdminBrands(params: AdminBrandsQueryParams) {
  return useQuery({
    queryKey: [...ADMIN_BRANDS_QUERY_KEY, params],
    queryFn: () => getAdminBrands(params),
    placeholderData: keepPreviousData,
  });
}

export function useCreateAdminBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: BrandFormPayload) => createAdminBrand(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_BRANDS_QUERY_KEY });
      toast.success("Brand created successfully.");
    },
    onError: (error) => {
      toast.error(extractApiErrorMessage(error, "Failed to create brand."));
    },
  });
}

export function useUpdateAdminBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: BrandFormPayload }) =>
      updateAdminBrand(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_BRANDS_QUERY_KEY });
      toast.success("Brand updated successfully.");
    },
    onError: (error) => {
      toast.error(extractApiErrorMessage(error, "Failed to update brand."));
    },
  });
}

export function useDeleteAdminBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAdminBrand(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_BRANDS_QUERY_KEY });
      toast.success("Brand deleted successfully.");
    },
    onError: (error) => {
      toast.error(extractApiErrorMessage(error, "Failed to delete brand."));
    },
  });
}
