import { Suspense } from "react";
import { BlogEditorWorkspace } from "@/components/admincomp/blogs/BlogEditorWorkspace";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={null}>
      <BlogEditorWorkspace mode="edit" blogId={id} />
    </Suspense>
  );
}
