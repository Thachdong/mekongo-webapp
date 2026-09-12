import type { Metadata } from "next";

import { ChangePasswordForm } from "@/features/auth/components/change-password-form";
import { PAGES } from "@/shared/constants/page.constant";

export const metadata: Metadata = {
  title: PAGES.CHANGE_PASSWORD.title,
};

export default function ChangePasswordPage() {
  return <ChangePasswordForm />;
}
