import type { Metadata } from "next";
import { ActivateForm } from "@/features/auth/components/activate-form";

export const metadata: Metadata = { title: "Activate" };

export default function ActivatePage() {
  return <ActivateForm />;
}
