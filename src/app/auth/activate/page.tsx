import type { Metadata } from "next";
import { ActivateForm } from "@/features/auth/components/activate-form";
import { PAGES } from "@/shared/constants/page.constant";

export const metadata: Metadata = { title: PAGES.ACTIVATE.title };

export default function ActivatePage() {
  return <ActivateForm />;
}
