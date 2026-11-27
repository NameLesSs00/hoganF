import { Suspense } from "react";
import { BlogEditorWorkspace } from "@/components/admincomp/blogs/BlogEditorWorkspace";

export default function NewBlogPage() {
  return (
    <Suspense fallback={null}>
      <BlogEditorWorkspace mode="create" />
    </Suspense>
  );
}
