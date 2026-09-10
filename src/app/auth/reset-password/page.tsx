import type { Metadata } from "next";

import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
import { PAGES } from "@/shared/constants/page.constant";

export const metadata: Metadata = {
  title: PAGES.RESET_PASSWORD.title,
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
