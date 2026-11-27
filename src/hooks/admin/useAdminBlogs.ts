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
  createAdminBlog,
  deleteAdminBlog,
  getAdminBlogById,
  getAdminBlogs,
  saveAdminBlogSections,
  setAdminBlogPublish,
  updateAdminBlog,
} from "@/clientapi/admin/blogs.api";
import type {
  AdminBlogsQueryParams,
  BlogMetadataPayload,
  SaveBlogSectionsRequest,
} from "@/clientapi/types/adminBlogs";

export const ADMIN_BLOGS_QUERY_KEY = ["admin", "blogs"] as const;

export function useAdminBlogs(params: AdminBlogsQueryParams) {
  return useQuery({
    queryKey: [...ADMIN_BLOGS_QUERY_KEY, params],
    queryFn: () => getAdminBlogs(params),
    placeholderData: keepPreviousData,
  });
}

export function useAdminBlogDetail(id: string | undefined) {
  return useQuery({
    queryKey: [...ADMIN_BLOGS_QUERY_KEY, "detail", id],
    queryFn: () => getAdminBlogById(id as string),
    enabled: Boolean(id),
  });
}

export function useCreateAdminBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: BlogMetadataPayload) => createAdminBlog(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_BLOGS_QUERY_KEY });
    },
    onError: (error) => {
      toast.error(extractApiErrorMessage(error, "Failed to create blog."));
    },
  });
}

export function useUpdateAdminBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: BlogMetadataPayload }) =>
      updateAdminBlog(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_BLOGS_QUERY_KEY });
    },
    onError: (error) => {
      toast.error(extractApiErrorMessage(error, "Failed to update blog."));
    },
  });
}

export function useSaveBlogSections() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: SaveBlogSectionsRequest;
    }) => saveAdminBlogSections(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_BLOGS_QUERY_KEY });
    },
    onError: (error) => {
      toast.error(
        extractApiErrorMessage(error, "Failed to save blog sections."),
      );
    },
  });
}

export function useToggleBlogPublish() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isPublished }: { id: string; isPublished: boolean }) =>
      setAdminBlogPublish(id, isPublished),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ADMIN_BLOGS_QUERY_KEY });
      toast.success(
        variables.isPublished ? "Blog published." : "Blog moved to drafts.",
      );
    },
    onError: (error) => {
      toast.error(
        extractApiErrorMessage(error, "Failed to update publish status."),
      );
    },
  });
}

export function useDeleteAdminBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAdminBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_BLOGS_QUERY_KEY });
      toast.success("Blog deleted successfully.");
    },
    onError: (error) => {
      toast.error(extractApiErrorMessage(error, "Failed to delete blog."));
    },
  });
}
