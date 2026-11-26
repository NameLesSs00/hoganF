import { useTranslations } from "next-intl";

export default function PublicHomePage() {
  const t = useTranslations("Public");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <h1 className="text-[24px] font-semibold text-foreground">{t("title")}</h1>
      <p className="mt-2 text-[14px] text-muted">{t("description")}</p>
    </main>
  );
}
