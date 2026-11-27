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
  createAdminUser,
  deleteAdminUser,
  getAdminUsers,
  setAdminUserActive,
  updateAdminUser,
} from "@/clientapi/admin/users.api";
import type {
  AdminUsersQueryParams,
  CreateAdminUserRequest,
  UpdateAdminUserRequest,
} from "@/clientapi/types/adminUsers";

export const ADMIN_USERS_QUERY_KEY = ["admin", "users"] as const;

export function useAdminUsers(params: AdminUsersQueryParams, enabled = true) {
  return useQuery({
    queryKey: [...ADMIN_USERS_QUERY_KEY, params],
    queryFn: () => getAdminUsers(params),
    enabled,
    placeholderData: keepPreviousData,
  });
}

export function useCreateAdminUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAdminUserRequest) => createAdminUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_USERS_QUERY_KEY });
      toast.success("Administrator created successfully.");
    },
    onError: (error) => {
      toast.error(
        extractApiErrorMessage(error, "Failed to create administrator."),
      );
    },
  });
}

export function useUpdateAdminUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateAdminUserRequest;
    }) => updateAdminUser(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_USERS_QUERY_KEY });
      toast.success("Administrator updated successfully.");
    },
    onError: (error) => {
      toast.error(
        extractApiErrorMessage(error, "Failed to update administrator."),
      );
    },
  });
}

export function useToggleAdminUserActive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      setAdminUserActive(id, { isActive }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ADMIN_USERS_QUERY_KEY });
      toast.success(
        variables.isActive
          ? "Administrator activated."
          : "Administrator deactivated.",
      );
    },
    onError: (error) => {
      toast.error(
        extractApiErrorMessage(error, "Failed to update administrator status."),
      );
    },
  });
}

export function useDeleteAdminUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAdminUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_USERS_QUERY_KEY });
      toast.success("Administrator deleted successfully.");
    },
    onError: (error) => {
      toast.error(
        extractApiErrorMessage(error, "Failed to delete administrator."),
      );
    },
  });
}
