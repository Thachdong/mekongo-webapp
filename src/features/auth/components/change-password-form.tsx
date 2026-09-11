"use client";

import type { SubmitEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Controller, useForm, useWatch } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { Button } from "@/shared-components/atoms/button";
import { Input } from "@/shared-components/atoms/input";
import { Label } from "@/shared-components/atoms/label";
import { Toggle, ToggleItem } from "@/shared-components/atoms/toggle";
import { CodeInput } from "@/shared-components/molecules/code-input";
import { PasswordInput } from "@/shared-components/molecules/password-input";
import { sessionStorageClient } from "@/shared-libs/storage/session-storage";
import { useChangePassword } from "@/features/auth/hooks/use-change-password";
import type { ChangePasswordFormValues } from "@/features/auth/types/change-password.type";
import {
  RESET_PASSWORD_STORAGE_KEY,
  type ResetPasswordHandoff,
} from "@/features/auth/types/reset-password.type";
import { changePasswordValidationSchema } from "@/features/auth/validations/change-password.validation";
import { PAGES } from "@/shared/constants/page.constant";

const DEFAULT_VALUES: ChangePasswordFormValues = {
  loginType: "EMAIL",
  identifier: "",
  code: "",
  newPassword: "",
  repeatNewPassword: "",
};

export function ChangePasswordForm() {
  const { changePassword, isSubmitting, error } = useChangePassword();

  // true once we know the identifier/loginType came from reset-password
  // (readonly display); false means it was never handed off, so the user
  // fills it in themselves.
  const [hasHandoff, setHasHandoff] = useState(false);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: joiResolver(changePasswordValidationSchema),
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    const stored = sessionStorageClient.get<ResetPasswordHandoff>(
      RESET_PASSWORD_STORAGE_KEY,
    );
    if (!stored) return;
    reset({
      ...DEFAULT_VALUES,
      identifier: stored.identifier,
      loginType: stored.loginType,
    });
    // sessionStorage is only readable client-side; this must stay deferred to
    // an effect so the first client render still matches the SSR markup.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasHandoff(true);
  }, [reset]);

  const loginType = useWatch({ control, name: "loginType" });

  const submitValidForm = handleSubmit((values) => {
    void changePassword(values);
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
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-xl font-semibold text-foreground">Change Password</h1>
          {error ? (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          ) : null}
        </div>

        <Controller
          control={control}
          name="loginType"
          render={({ field }) => (
            <Toggle
              value={[field.value]}
              disabled={hasHandoff}
              onValueChange={(values) => {
                if (values[0]) field.onChange(values[0]);
              }}
            >
              <ToggleItem value="EMAIL">Email</ToggleItem>
              <ToggleItem value="PHONE">Phone</ToggleItem>
            </Toggle>
          )}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="identifier">
          {loginType === "EMAIL" ? "Email" : "Phone number"}
        </Label>
        <Input
          id="identifier"
          readOnly={hasHandoff}
          placeholder={
            loginType === "EMAIL" ? "you@example.com" : "0912345678"
          }
          aria-invalid={!!errors.identifier}
          {...register("identifier")}
        />
        {errors.identifier ? (
          <p className="text-xs text-destructive">
            {errors.identifier.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="newPassword">New Password</Label>
        <PasswordInput
          id="newPassword"
          placeholder="At least 8 characters"
          aria-invalid={!!errors.newPassword}
          {...register("newPassword")}
        />
        {errors.newPassword ? (
          <p className="text-xs text-destructive">
            {errors.newPassword.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="repeatNewPassword">Repeat New Password</Label>
        <PasswordInput
          id="repeatNewPassword"
          placeholder="Re-enter your new password"
          aria-invalid={!!errors.repeatNewPassword}
          {...register("repeatNewPassword")}
        />
        {errors.repeatNewPassword ? (
          <p className="text-xs text-destructive">
            {errors.repeatNewPassword.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="code">Code</Label>
        <Controller
          control={control}
          name="code"
          render={({ field }) => (
            <CodeInput
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              autoFocus
              onComplete={() => submitButtonRef.current?.focus()}
              aria-invalid={!!errors.code}
              className="self-center"
            />
          )}
        />
        {errors.code ? (
          <p className="text-xs text-destructive">{errors.code.message}</p>
        ) : null}
      </div>

      <Button
        ref={submitButtonRef}
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Changing..." : "Change Password"}
      </Button>

      <div className="flex justify-center gap-4 text-sm text-muted-foreground">
        <Link href={PAGES.LOGIN.pathname} className="hover:text-foreground">
          Login
        </Link>
        <Link href={PAGES.REGISTER.pathname} className="hover:text-foreground">
          Register
        </Link>
      </div>
    </form>
  );
}
