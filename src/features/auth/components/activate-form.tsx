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
import { sessionStorageClient } from "@/shared-libs/storage/session-storage";
import { RESEND_COUNTDOWN_SECONDS, useActivate } from "@/features/auth/hooks/use-activate";
import {
  ACTIVATION_STORAGE_KEY,
  type ActivateFormValues,
  type ActivationHandoff,
} from "@/features/auth/types/activate.type";
import { activateValidationSchema } from "@/features/auth/validations/activate.validation";

const DEFAULT_VALUES: ActivateFormValues = {
  identifier: "",
  loginType: "EMAIL",
  code: "",
};

function formatCountdown(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function ActivateForm() {
  const {
    activate,
    isSubmitting,
    error,
    resend,
    isResending,
    secondsLeft,
    canResend,
    startCountdown,
  } = useActivate();

  // true once we know the identifier/loginType came from register (readonly
  // display); false means it was never handed off, so the user fills it in.
  const [hasHandoff, setHasHandoff] = useState(false);
  const identifierRef = useRef<HTMLInputElement | null>(null);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);

  const {
    control,
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ActivateFormValues>({
    resolver: joiResolver(activateValidationSchema),
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    const stored = sessionStorageClient.get<ActivationHandoff>(
      ACTIVATION_STORAGE_KEY,
    );
    if (!stored) {
      identifierRef.current?.focus();
      return;
    }
    sessionStorageClient.remove(ACTIVATION_STORAGE_KEY);
    reset({ identifier: stored.identifier, loginType: stored.loginType, code: "" });
    // sessionStorage is only readable client-side; this must stay deferred to
    // an effect so the first client render still matches the SSR markup.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasHandoff(true);
    // handoff means register already triggered the first code send — the
    // countdown continues from registeredAt, not a fresh full window.
    const elapsedSeconds = Math.floor(
      (Date.now() - new Date(stored.registeredAt).getTime()) / 1000,
    );
    startCountdown(Math.max(0, RESEND_COUNTDOWN_SECONDS - elapsedSeconds));
  }, [reset, startCountdown]);

  const loginType = useWatch({ control, name: "loginType" });
  const identifier = useWatch({ control, name: "identifier" });
  const identifierField = register("identifier");

  const submitValidForm = handleSubmit((values) => {
    startCountdown();
    void activate({ identifier: values.identifier, code: values.code });
  });

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submitValidForm(event);
  };

  const onResendClick = () => {
    if (!identifier.trim()) {
      setError("identifier", {
        type: "manual",
        message:
          loginType === "EMAIL" ? "Vui lòng nhập email" : "Vui lòng nhập số điện thoại",
      });
      identifierRef.current?.focus();
      return;
    }
    void resend(identifier);
  };

  return (
    <form
      method="post"
      onSubmit={onSubmit}
      className="mx-auto flex w-full max-w-[420px] flex-col gap-6 rounded-lg border border-border p-3"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-xl font-semibold text-foreground">Activate</h1>
          {error ? (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          ) : null}
        </div>

        {!hasHandoff ? (
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
        ) : null}
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
          name={identifierField.name}
          onChange={identifierField.onChange}
          onBlur={identifierField.onBlur}
          ref={(el) => {
            identifierField.ref(el);
            identifierRef.current = el;
          }}
        />
        {errors.identifier ? (
          <p className="text-xs text-destructive">
            {errors.identifier.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="code">Activation code</Label>
        <Controller
          control={control}
          name="code"
          render={({ field }) => (
            <CodeInput
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              autoFocus={hasHandoff}
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
        {isSubmitting ? "Activating..." : "Activate"}
      </Button>

      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        {canResend ? (
          <Button
            type="button"
            variant="link"
            disabled={isResending}
            onClick={onResendClick}
          >
            {isResending ? "Resending..." : "Resend code"}
          </Button>
        ) : (
          <span>Resend code in {formatCountdown(secondsLeft)}</span>
        )}
      </div>

      <div className="flex justify-center text-sm text-muted-foreground">
        <Link href="/auth/login" className="hover:text-foreground">
          Back to login
        </Link>
      </div>
    </form>
  );
}
