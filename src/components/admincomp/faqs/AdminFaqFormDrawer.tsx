"use client";

import { AlertCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import type {
  AdminFaqDto,
  CreateAdminFaqRequest,
  UpdateAdminFaqRequest,
} from "@/clientapi/types/adminFaqs";
import { Button } from "@/components/admincomp/ui/Button";
import { SideDrawer } from "@/components/admincomp/ui/SideDrawer";

interface AdminFaqFormDrawerProps {
  open: boolean;
  editingFaq: AdminFaqDto | null;
  defaultOrderNumber: number;
  isSubmitting: boolean;
  serverError: string | null;
  onClose: () => void;
  onCreate: (payload: CreateAdminFaqRequest) => void;
  onUpdate: (id: string, payload: UpdateAdminFaqRequest) => void;
}

export function AdminFaqFormDrawer({
  open,
  editingFaq,
  defaultOrderNumber,
  isSubmitting,
  serverError,
  onClose,
  onCreate,
  onUpdate,
}: AdminFaqFormDrawerProps) {
  const isEdit = Boolean(editingFaq);

  const [questionEn, setQuestionEn] = useState(editingFaq?.question?.en ?? "");
  const [questionAr, setQuestionAr] = useState(editingFaq?.question?.ar ?? "");
  const [answerEn, setAnswerEn] = useState(editingFaq?.answer?.en ?? "");
  const [answerAr, setAnswerAr] = useState(editingFaq?.answer?.ar ?? "");
  const [orderNumber, setOrderNumber] = useState(
    String(editingFaq?.orderNumber ?? defaultOrderNumber),
  );
  const [isActive, setIsActive] = useState(editingFaq?.isActive ?? true);
  const [validationError, setValidationError] = useState<string | null>(null);

  const errorMessage = validationError ?? serverError;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidationError(null);

    const qEn = questionEn.trim();
    const qAr = questionAr.trim();
    const aEn = answerEn.trim();
    const aAr = answerAr.trim();
    const parsedOrder = Number(orderNumber);

    if (!qEn || !qAr) {
      setValidationError("Both English and Arabic questions are required.");
      return;
    }

    if (!aEn || !aAr) {
      setValidationError("Both English and Arabic answers are required.");
      return;
    }

    if (!Number.isInteger(parsedOrder) || parsedOrder < 0) {
      setValidationError("Order number must be a non-negative integer.");
      return;
    }

    const payload: CreateAdminFaqRequest = {
      question: { en: qEn, ar: qAr },
      answer: { en: aEn, ar: aAr },
      orderNumber: parsedOrder,
      isActive,
    };

    if (isEdit && editingFaq) {
      onUpdate(editingFaq.id, payload);
    } else {
      onCreate(payload);
    }
  }

  return (
    <SideDrawer
      open={open}
      onClose={onClose}
      widthClass="max-w-xl"
      title={isEdit ? "Edit FAQ" : "Add FAQ"}
      description={
        isEdit
          ? "Update the bilingual question, answer, display order, or visibility."
          : "Create a bilingual FAQ entry for the public website."
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
        {/* English Content */}
        <div className="space-y-3 rounded-lg border border-border bg-background/40 p-4">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-muted">
            English Content
          </p>

          <div>
            <label
              htmlFor="faq-question-en"
              className="mb-1.5 block text-[13px] font-medium text-foreground"
            >
              Question (EN)
            </label>
            <input
              id="faq-question-en"
              type="text"
              required
              disabled={isSubmitting}
              value={questionEn}
              onChange={(e) => setQuestionEn(e.target.value)}
              placeholder="e.g. Do you provide genuine Hogan spare parts?"
              className="h-10 w-full rounded-lg border border-border bg-surface px-3 text-[14px] text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="faq-answer-en"
              className="mb-1.5 block text-[13px] font-medium text-foreground"
            >
              Answer (EN)
            </label>
            <textarea
              id="faq-answer-en"
              rows={4}
              required
              disabled={isSubmitting}
              value={answerEn}
              onChange={(e) => setAnswerEn(e.target.value)}
              placeholder="Write the English answer..."
              className="w-full rounded-lg border border-border bg-surface p-3 text-[14px] text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:opacity-60"
            />
          </div>
        </div>

        {/* Arabic Content */}
        <div className="space-y-3 rounded-lg border border-border bg-background/40 p-4">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-muted">
            Arabic Content
          </p>

          <div>
            <label
              htmlFor="faq-question-ar"
              className="mb-1.5 block text-[13px] font-medium text-foreground"
            >
              Question (AR)
            </label>
            <input
              id="faq-question-ar"
              type="text"
              dir="rtl"
              required
              disabled={isSubmitting}
              value={questionAr}
              onChange={(e) => setQuestionAr(e.target.value)}
              placeholder="مثال: هل توفرون قطع غيار هوجن الأصلية؟"
              className="h-10 w-full rounded-lg border border-border bg-surface px-3 text-right text-[14px] text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="faq-answer-ar"
              className="mb-1.5 block text-[13px] font-medium text-foreground"
            >
              Answer (AR)
            </label>
            <textarea
              id="faq-answer-ar"
              rows={4}
              dir="rtl"
              required
              disabled={isSubmitting}
              value={answerAr}
              onChange={(e) => setAnswerAr(e.target.value)}
              placeholder="اكتب الإجابة باللغة العربية..."
              className="w-full rounded-lg border border-border bg-surface p-3 text-right text-[14px] text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:opacity-60"
            />
          </div>
        </div>

        {/* Display Order & Active */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="faq-order"
              className="mb-1.5 block text-[13px] font-medium text-foreground"
            >
              Display order
            </label>
            <input
              id="faq-order"
              type="number"
              min={0}
              step={1}
              required
              disabled={isSubmitting}
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="h-10 w-full rounded-lg border border-border bg-surface px-3 text-[14px] text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:opacity-60"
            />
          </div>

          <div className="flex items-end pb-2">
            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={isActive}
                disabled={isSubmitting}
                onChange={(e) => setIsActive(e.target.checked)}
                className="h-4 w-4 rounded border-border accent-primary"
              />
              <span className="text-[14px] text-foreground">
                Active on public website
              </span>
            </label>
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
            {isEdit ? "Save changes" : "Create FAQ"}
          </Button>
        </div>
      </form>
    </SideDrawer>
  );
}
