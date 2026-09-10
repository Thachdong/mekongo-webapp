"use client";

import type { SubmitEvent } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { Button } from "@/shared-components/atoms/button";
import { Input } from "@/shared-components/atoms/input";
import { Label } from "@/shared-components/atoms/label";
import { useResetPassword } from "@/features/auth/hooks/use-reset-password";
import type { ResetPasswordFormValues } from "@/features/auth/types/reset-password.type";
import { resetPasswordValidationSchema } from "@/features/auth/validations/reset-password.validation";
import { PAGES } from "@/shared/constants/page.constant";

const DEFAULT_VALUES: ResetPasswordFormValues = {
  identifier: "",
};

export function ResetPasswordForm() {
  const { resetPassword, isSubmitting, error } = useResetPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: joiResolver(resetPasswordValidationSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const submitValidForm = handleSubmit((values) => {
    void resetPassword(values);
  });

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submitValidForm(event);
  };

  return (
    <form
      method="post"
      onSubmit={onSubmit}
      className="mx-auto flex w-full max-w-[576px] flex-col gap-6 rounded-lg border border-border p-3"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-xl font-semibold text-foreground">Reset Password</h1>
        {error ? (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="identifier">Identifier</Label>
        <Input
          id="identifier"
          placeholder="you@example.com or 0912345678"
          aria-invalid={!!errors.identifier}
          {...register("identifier")}
        />
        {errors.identifier ? (
          <p className="text-xs text-destructive">{errors.identifier.message}</p>
        ) : null}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Submitting..." : "Reset Password"}
      </Button>

      <div className="flex justify-center gap-4 text-sm text-muted-foreground">
        <Link href={PAGES.LOGIN.pathname} className="hover:text-foreground">
          Login
        </Link>
        <Link href={PAGES.REGISTER.pathname} className="hover:text-foreground">
          Register
        </Link>
        <Link href={PAGES.ACTIVATE.pathname} className="hover:text-foreground">
          Activate
        </Link>
      </div>
    </form>
  );
}
