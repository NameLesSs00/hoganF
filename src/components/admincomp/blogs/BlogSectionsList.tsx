"use client";

import { Plus } from "lucide-react";
import type { BlogSectionInput } from "@/clientapi/types/adminBlogs";
import { Button } from "@/components/admincomp/ui/Button";
import { BlogSectionCard } from "./BlogSectionCard";

interface BlogSectionsListProps {
  sections: BlogSectionInput[];
  disabled: boolean;
  onAdd: () => void;
  onChange: (index: number, updated: BlogSectionInput) => void;
  onMove: (index: number, direction: "up" | "down") => void;
  onDelete: (index: number) => void;
}

export function BlogSectionsList({
  sections,
  disabled,
  onAdd,
  onChange,
  onMove,
  onDelete,
}: BlogSectionsListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[16px] font-semibold text-foreground">
            Article Sections ({sections.length})
          </h2>
          <p className="text-[13px] text-muted">
            Write rich HTML, links, and tables for each section.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled}
          onClick={onAdd}
        >
          <Plus className="h-4 w-4" />
          <span>Add Section</span>
        </Button>
      </div>

      {sections.map((section, idx) => (
        <BlogSectionCard
          key={section.localId}
          section={section}
          index={idx}
          total={sections.length}
          disabled={disabled}
          onChange={(updated) => onChange(idx, updated)}
          onMove={(dir) => onMove(idx, dir)}
          onDelete={() => onDelete(idx)}
        />
      ))}
    </div>
  );
}
