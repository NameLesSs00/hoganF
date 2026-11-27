"use client";

import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useState, type FormEvent } from "react";
import type {
  AdminUserDto,
  CreateAdminUserRequest,
  UpdateAdminUserRequest,
} from "@/clientapi/types/adminUsers";
import { Button } from "@/components/admincomp/ui/Button";
import { SideDrawer } from "@/components/admincomp/ui/SideDrawer";

interface AdminUserFormModalProps {
  open: boolean;
  editingUser: AdminUserDto | null;
  isSubmitting: boolean;
  serverError: string | null;
  onClose: () => void;
  onCreate: (payload: CreateAdminUserRequest) => void;
  onUpdate: (id: string, payload: UpdateAdminUserRequest) => void;
}

export function AdminUserFormModal({
  open,
  editingUser,
  isSubmitting,
  serverError,
  onClose,
  onCreate,
  onUpdate,
}: AdminUserFormModalProps) {
  const isEdit = Boolean(editingUser);

  const [firstName, setFirstName] = useState(editingUser?.firstName ?? "");
  const [lastName, setLastName] = useState(editingUser?.lastName ?? "");
  const [email, setEmail] = useState(editingUser?.email ?? "");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(editingUser?.isActive ?? true);
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const errorMessage = validationError ?? serverError;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidationError(null);

    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedFirst || !trimmedLast) {
      setValidationError("First name and last name are required.");
      return;
    }

    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    if (!isEdit && password.length < 6) {
      setValidationError("Password must be at least 6 characters.");
      return;
    }

    if (isEdit && password && password.length < 6) {
      setValidationError("New password must be at least 6 characters.");
      return;
    }

    if (isEdit && editingUser) {
      onUpdate(editingUser.id, {
        firstName: trimmedFirst,
        lastName: trimmedLast,
        email: trimmedEmail,
        isActive,
        ...(password ? { newPassword: password } : {}),
      });
    } else {
      onCreate({
        firstName: trimmedFirst,
        lastName: trimmedLast,
        email: trimmedEmail,
        password,
        isActive,
      });
    }
  }

  return (
    <SideDrawer
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Administrator" : "Add Administrator"}
      description={
        isEdit
          ? "Update administrator profile details, status, or reset password."
          : "Create a new administrator account to manage Hogan content."
      }
    >
      {errorMessage && (
        <div
          role="alert"
          className="mb-4 flex items-start gap-2 rounded-lg border border-primary/25 bg-primary/5 px-3.5 py-2.5 text-[13px] text-primary"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="admin-first-name"
              className="mb-1.5 block text-[13px] font-medium text-foreground"
            >
              First name
            </label>
            <input
              id="admin-first-name"
              type="text"
              required
              disabled={isSubmitting}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Ahmed"
              className="h-10 w-full rounded-lg border border-border bg-surface px-3 text-[14px] text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="admin-last-name"
              className="mb-1.5 block text-[13px] font-medium text-foreground"
            >
              Last name
            </label>
            <input
              id="admin-last-name"
              type="text"
              required
              disabled={isSubmitting}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Hassan"
              className="h-10 w-full rounded-lg border border-border bg-surface px-3 text-[14px] text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:opacity-60"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="admin-user-email"
            className="mb-1.5 block text-[13px] font-medium text-foreground"
          >
            Email address
          </label>
          <input
            id="admin-user-email"
            type="email"
            required
            disabled={isSubmitting}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@hogan.com"
            className="h-10 w-full rounded-lg border border-border bg-surface px-3 text-[14px] text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:opacity-60"
          />
        </div>

        <div>
          <label
            htmlFor="admin-user-password"
            className="mb-1.5 block text-[13px] font-medium text-foreground"
          >
            {isEdit ? "New password (optional)" : "Password"}
          </label>
          <div className="relative">
            <input
              id="admin-user-password"
              type={showPassword ? "text" : "password"}
              required={!isEdit}
              disabled={isSubmitting}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={
                isEdit ? "Leave blank to keep current password" : "Min. 6 characters"
              }
              className="h-10 w-full rounded-lg border border-border bg-surface pl-3 pr-10 text-[14px] text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-muted hover:bg-background hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-2.5 pt-1">
          <input
            type="checkbox"
            checked={isActive}
            disabled={isSubmitting}
            onChange={(e) => setIsActive(e.target.checked)}
            className="h-4 w-4 rounded border-border accent-primary"
          />
          <span className="text-[14px] text-foreground">
            Account is active and allowed to sign in
          </span>
        </label>

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
            {isEdit ? "Save changes" : "Create administrator"}
          </Button>
        </div>
      </form>
    </SideDrawer>
  );
}
