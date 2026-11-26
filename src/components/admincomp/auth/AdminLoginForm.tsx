"use client";

import { motion } from "framer-motion";
import { AlertCircle, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { extractApiErrorMessage } from "@/clientapi/admin/auth.api";
import { useAdminLogin } from "@/hooks/admin/useAdminAuth";

export function AdminLoginForm() {
  const loginMutation = useAdminLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const apiError = loginMutation.error
    ? extractApiErrorMessage(
        loginMutation.error,
        "Invalid email or password. Please try again.",
      )
    : null;
  const errorMessage = validationError ?? apiError;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidationError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setValidationError("Please enter your password.");
      return;
    }

    loginMutation.mutate({
      email: trimmedEmail,
      password,
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-full max-w-[400px]"
    >
      <div className="mb-8">
        <span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-[12px] font-semibold tracking-wide text-primary">
          Admin Portal
        </span>
        <h1 className="mt-4 text-[24px] font-semibold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-1.5 text-[13px] text-muted">
          Enter your administrator credentials to access the dashboard.
        </p>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-2.5 rounded-lg border border-primary/25 bg-primary/5 px-3.5 py-3 text-[13px] text-primary"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label
            htmlFor="admin-email"
            className="mb-1.5 block text-[13px] font-medium text-foreground"
          >
            Email address
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={loginMutation.isPending}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder="admin@hogan.com"
              className="h-11 w-full rounded-lg border border-border bg-surface pl-10 pr-3.5 text-[14px] text-foreground placeholder:text-muted/70 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="admin-password"
            className="mb-1.5 block text-[13px] font-medium text-foreground"
          >
            Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="admin-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              disabled={loginMutation.isPending}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder="Enter your password"
              className="h-11 w-full rounded-lg border border-border bg-surface pl-10 pr-11 text-[14px] text-foreground placeholder:text-muted/70 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={loginMutation.isPending}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-muted transition-colors hover:bg-background hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-50"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-[14px] font-medium text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loginMutation.isPending && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
          <span>{loginMutation.isPending ? "Signing in..." : "Sign in"}</span>
        </button>
      </form>

      <p className="mt-8 border-t border-border pt-5 text-center text-[13px] text-muted">
        Authorized personnel only.
      </p>
    </motion.div>
  );
}
