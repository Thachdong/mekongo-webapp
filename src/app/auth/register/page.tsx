import type { Metadata } from "next";

import { RegisterForm } from "@/features/auth/components/register-form";
import { PAGES } from "@/shared/constants/page.constant";

export const metadata: Metadata = {
  title: PAGES.REGISTER.title,
};

export default function RegisterPage() {
  return <RegisterForm />;
}
