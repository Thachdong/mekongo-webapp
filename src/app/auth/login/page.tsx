import type { Metadata } from "next";

import { LoginForm } from "@/features/auth/components/login-form";
import { PAGES } from "@/shared/constants/page.constant";

export const metadata: Metadata = {
  title: PAGES.LOGIN.title,
};

export default function LoginPage() {
  return <LoginForm />;
}
