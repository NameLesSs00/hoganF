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
  createAdminFaq,
  deleteAdminFaq,
  getAdminFaqs,
  reorderAdminFaqs,
  setAdminFaqActive,
  updateAdminFaq,
} from "@/clientapi/admin/faqs.api";
import type {
  AdminFaqsQueryParams,
  CreateAdminFaqRequest,
  ReorderFaqsRequest,
  UpdateAdminFaqRequest,
} from "@/clientapi/types/adminFaqs";

export const ADMIN_FAQS_QUERY_KEY = ["admin", "faqs"] as const;

export function useAdminFaqs(params: AdminFaqsQueryParams) {
  return useQuery({
    queryKey: [...ADMIN_FAQS_QUERY_KEY, params],
    queryFn: () => getAdminFaqs(params),
    placeholderData: keepPreviousData,
  });
}

export function useCreateAdminFaq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAdminFaqRequest) => createAdminFaq(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_FAQS_QUERY_KEY });
      toast.success("FAQ created successfully.");
    },
    onError: (error) => {
      toast.error(extractApiErrorMessage(error, "Failed to create FAQ."));
    },
  });
}

export function useUpdateAdminFaq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateAdminFaqRequest;
    }) => updateAdminFaq(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_FAQS_QUERY_KEY });
      toast.success("FAQ updated successfully.");
    },
    onError: (error) => {
      toast.error(extractApiErrorMessage(error, "Failed to update FAQ."));
    },
  });
}

export function useToggleAdminFaqActive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      setAdminFaqActive(id, { isActive }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ADMIN_FAQS_QUERY_KEY });
      toast.success(
        variables.isActive ? "FAQ activated." : "FAQ deactivated.",
      );
    },
    onError: (error) => {
      toast.error(
        extractApiErrorMessage(error, "Failed to update FAQ status."),
      );
    },
  });
}

export function useReorderAdminFaqs() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ReorderFaqsRequest) => reorderAdminFaqs(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_FAQS_QUERY_KEY });
      toast.success("FAQ order updated.");
    },
    onError: (error) => {
      toast.error(extractApiErrorMessage(error, "Failed to reorder FAQs."));
    },
  });
}

export function useDeleteAdminFaq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAdminFaq(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_FAQS_QUERY_KEY });
      toast.success("FAQ deleted successfully.");
    },
    onError: (error) => {
      toast.error(extractApiErrorMessage(error, "Failed to delete FAQ."));
    },
  });
}
