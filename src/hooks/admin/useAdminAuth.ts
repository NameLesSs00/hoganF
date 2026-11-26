"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  extractApiErrorMessage,
  getCurrentAdmin,
  loginAdmin,
  logoutAdmin,
} from "@/clientapi/admin/auth.api";
import type { LoginRequest } from "@/clientapi/types/auth";

export const ADMIN_ME_QUERY_KEY = ["admin", "me"] as const;

export function useCurrentAdmin(enabled = true) {
  return useQuery({
    queryKey: ADMIN_ME_QUERY_KEY,
    queryFn: getCurrentAdmin,
    enabled,
    retry: false,
  });
}

export function useAdminLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginRequest) => loginAdmin(payload),
    onSuccess: (data) => {
      if (data.user) {
        queryClient.setQueryData(ADMIN_ME_QUERY_KEY, data.user);
      } else {
        queryClient.invalidateQueries({ queryKey: ADMIN_ME_QUERY_KEY });
      }
      toast.success("Signed in successfully.");
      router.replace("/admin");
      router.refresh();
    },
    onError: (error) => {
      const message = extractApiErrorMessage(
        error,
        "Invalid email or password. Please try again.",
      );
      toast.error(message);
    },
  });
}

export function useAdminLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutAdmin,
    onSuccess: () => {
      queryClient.clear();
      router.replace("/admin/login");
      router.refresh();
    },
  });
}
