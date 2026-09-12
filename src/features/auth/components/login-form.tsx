"use client";

import type { SubmitEvent } from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { Controller, useForm, useWatch } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { Button } from "@/shared-components/atoms/button";
import { Input } from "@/shared-components/atoms/input";
import { Label } from "@/shared-components/atoms/label";
import { Toggle, ToggleItem } from "@/shared-components/atoms/toggle";
import { PasswordInput } from "@/shared-components/molecules/password-input";
import { useLogin } from "@/features/auth/hooks/use-login";
import type { LoginFormValues } from "@/features/auth/types/login.type";
import { loginValidationSchema } from "@/features/auth/validations/login.validation";
import { PAGES } from "@/shared/constants/page.constant";

const DEFAULT_VALUES: LoginFormValues = {
  loginType: "EMAIL",
  identifier: "",
  password: "",
};

export function LoginForm() {
  const { login, isSubmitting, error, needsActivation } = useLogin();
  const activateLinkRef = useRef<HTMLAnchorElement>(null);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: joiResolver(loginValidationSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const loginType = useWatch({ control, name: "loginType" });

  useEffect(() => {
    if (needsActivation) activateLinkRef.current?.focus();
  }, [needsActivation]);

  const submitValidForm = handleSubmit((values) => {
    void login(values);
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
          <h1 className="text-xl font-semibold text-foreground">Login</h1>
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
        <Label htmlFor="password">Password</Label>
        <PasswordInput
          id="password"
          placeholder="Your password"
          aria-invalid={!!errors.password}
          {...register("password")}
        />
        {errors.password ? (
          <p className="text-xs text-destructive">
            {errors.password.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>

      <div className="flex justify-center gap-4 text-sm text-muted-foreground">
        <Link href={PAGES.REGISTER.pathname} className="hover:text-foreground">
          Register
        </Link>
        <Link
          href={PAGES.RESET_PASSWORD.pathname}
          className="hover:text-foreground"
        >
          Reset password
        </Link>
        <Link
          ref={activateLinkRef}
          href={PAGES.ACTIVATE.pathname}
          className="hover:text-foreground focus:underline"
        >
          Activate Account
        </Link>
      </div>
    </form>
  );
}
