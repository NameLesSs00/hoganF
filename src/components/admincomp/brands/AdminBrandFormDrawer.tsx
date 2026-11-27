"use client";

import { AlertCircle, Upload, X } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { resolveMediaUrl } from "@/clientapi/apiConfig";
import type {
  AdminBrandDto,
  BrandFormPayload,
} from "@/clientapi/types/adminBrands";
import { Button } from "@/components/admincomp/ui/Button";
import { SideDrawer } from "@/components/admincomp/ui/SideDrawer";

const MAX_LOGO_BYTES = 5 * 1024 * 1024; // 5MB

interface AdminBrandFormDrawerProps {
  open: boolean;
  editingBrand: AdminBrandDto | null;
  isSubmitting: boolean;
  serverError: string | null;
  onClose: () => void;
  onCreate: (payload: BrandFormPayload) => void;
  onUpdate: (id: string, payload: BrandFormPayload) => void;
}

export function AdminBrandFormDrawer({
  open,
  editingBrand,
  isSubmitting,
  serverError,
  onClose,
  onCreate,
  onUpdate,
}: AdminBrandFormDrawerProps) {
  const isEdit = Boolean(editingBrand);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [nameEn, setNameEn] = useState(editingBrand?.name?.en ?? "");
  const [nameAr, setNameAr] = useState(editingBrand?.name?.ar ?? "");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (localPreview) URL.revokeObjectURL(localPreview);
    };
  }, [localPreview]);

  const existingLogoUrl = resolveMediaUrl(editingBrand?.logoUrl);
  const previewSrc = localPreview ?? existingLogoUrl;
  const errorMessage = validationError ?? serverError;

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setValidationError("Please select a valid image file (PNG, JPG, WebP, SVG).");
      return;
    }

    if (file.size > MAX_LOGO_BYTES) {
      setValidationError("Logo file size must be 5MB or smaller.");
      return;
    }

    setValidationError(null);
    if (localPreview) URL.revokeObjectURL(localPreview);
    setLogoFile(file);
    setLocalPreview(URL.createObjectURL(file));
  }

  function clearSelectedFile() {
    if (localPreview) URL.revokeObjectURL(localPreview);
    setLogoFile(null);
    setLocalPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidationError(null);

    const trimmedEn = nameEn.trim();
    const trimmedAr = nameAr.trim();

    if (!trimmedEn || !trimmedAr) {
      setValidationError("Both English and Arabic brand names are required.");
      return;
    }

    const payload: BrandFormPayload = {
      nameEn: trimmedEn,
      nameAr: trimmedAr,
      ...(logoFile ? { logo: logoFile } : {}),
    };

    if (isEdit && editingBrand) {
      onUpdate(editingBrand.id, payload);
    } else {
      onCreate(payload);
    }
  }

  return (
    <SideDrawer
      open={open}
      onClose={onClose}
      widthClass="max-w-lg"
      title={isEdit ? "Edit Brand" : "Add Brand"}
      description={
        isEdit
          ? "Update the bilingual brand name or upload a replacement logo."
          : "Create a new motorcycle or spare-part brand."
      }
    >
      {errorMessage && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-2 rounded-lg border border-primary/25 bg-primary/5 px-3.5 py-2.5 text-[13px] text-primary"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label
            htmlFor="brand-name-en"
            className="mb-1.5 block text-[13px] font-medium text-foreground"
          >
            Brand name (EN)
          </label>
          <input
            id="brand-name-en"
            type="text"
            required
            disabled={isSubmitting}
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            placeholder="e.g. Hogan"
            className="h-10 w-full rounded-lg border border-border bg-surface px-3 text-[14px] text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:opacity-60"
          />
        </div>

        <div>
          <label
            htmlFor="brand-name-ar"
            className="mb-1.5 block text-[13px] font-medium text-foreground"
          >
            Brand name (AR)
          </label>
          <input
            id="brand-name-ar"
            type="text"
            dir="rtl"
            required
            disabled={isSubmitting}
            value={nameAr}
            onChange={(e) => setNameAr(e.target.value)}
            placeholder="مثال: هوجن"
            className="h-10 w-full rounded-lg border border-border bg-surface px-3 text-right text-[14px] text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:opacity-60"
          />
        </div>

        {/* Logo Upload */}
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-foreground">
            Brand logo {isEdit ? "(optional to replace)" : "(optional)"}
          </label>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            disabled={isSubmitting}
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="rounded-xl border border-dashed border-border bg-background/50 p-4">
            {previewSrc ? (
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewSrc}
                    alt="Brand logo preview"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-foreground">
                    {logoFile ? logoFile.name : "Current brand logo"}
                  </p>
                  <p className="mt-0.5 text-[12px] text-muted">
                    PNG, JPG, WebP, or SVG up to 5MB
                  </p>
                  <div className="mt-2.5 flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={isSubmitting}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-3.5 w-3.5" />
                      <span>Replace</span>
                    </Button>
                    {logoFile && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        disabled={isSubmitting}
                        onClick={clearSelectedFile}
                      >
                        <X className="h-3.5 w-3.5" />
                        <span>Remove new</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full flex-col items-center justify-center py-6 text-center transition-colors hover:text-primary disabled:opacity-60"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-muted shadow-xs">
                  <Upload className="h-4 w-4" />
                </span>
                <p className="mt-2.5 text-[13px] font-medium text-foreground">
                  Click to upload brand logo
                </p>
                <p className="mt-0.5 text-[12px] text-muted">
                  PNG, JPG, WebP, or SVG (max 5MB)
                </p>
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 border-t border-border pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            {isEdit ? "Save changes" : "Create brand"}
          </Button>
        </div>
      </form>
    </SideDrawer>
  );
}
