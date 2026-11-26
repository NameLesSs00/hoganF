import Image from "next/image";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admincomp/auth/AdminLoginForm";
import { getAdminToken } from "@/lib/auth-cookie";

export default async function AdminLoginPage() {
  // Server-side backup guard alongside src/proxy.ts
  const token = await getAdminToken();
  if (token) {
    redirect("/admin");
  }

  return (
    <main className="grid min-h-screen grid-cols-1 bg-surface lg:grid-cols-12">
      {/* Left Side — Dealership Visual Panel */}
      <section className="relative hidden overflow-hidden bg-foreground lg:col-span-6 lg:flex lg:flex-col lg:justify-between xl:col-span-7">
        <Image
          src="/images/admin-login-hero.jpg"
          alt="Hogan Motorcycles & Spare Parts"
          fill
          priority
          sizes="(min-width: 1280px) 58vw, (min-width: 1024px) 50vw, 100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/65" />

        {/* Brand Header */}
        <div className="relative z-10 flex items-center gap-3 p-10">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-[16px] font-bold tracking-tight text-white shadow-sm">
            H
          </span>
          <div>
            <p className="text-[16px] font-semibold tracking-tight text-white">
              Hogan
            </p>
            <p className="text-[12px] text-white/75">
              Motorcycles &amp; Spare Parts
            </p>
          </div>
        </div>

        {/* Bottom Copy */}
        <div className="relative z-10 max-w-lg p-10">
          <div className="mb-4 h-1 w-10 rounded-full bg-primary" />
          <h2 className="text-[28px] font-semibold leading-tight tracking-tight text-white">
            Built for Performance. Managed with Precision.
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-white/80">
            Centralized catalog management for Hogan motorcycles, genuine spare
            parts, reviews, and editorial content.
          </p>
        </div>
      </section>

      {/* Right Side — Clean Login Form Panel */}
      <section className="flex min-h-screen flex-col justify-between bg-surface px-6 py-6 sm:px-12 lg:col-span-6 lg:px-14 xl:col-span-5">
        <div className="flex items-center lg:invisible">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-[14px] font-bold text-white">
              H
            </span>
            <span className="text-[15px] font-semibold text-foreground">
              Hogan
            </span>
          </div>
        </div>

        <div className="my-auto flex flex-1 items-center justify-center py-10">
          <AdminLoginForm />
        </div>

        <div className="text-center text-[12px] text-muted">
          © {new Date().getFullYear()} Hogan — Motorcycles &amp; Spare Parts
        </div>
      </section>
    </main>
  );
}
