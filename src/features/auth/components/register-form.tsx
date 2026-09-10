"use client";

import type { SubmitEvent } from "react";
import Link from "next/link";
import { Controller, useForm, useWatch } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { Button } from "@/shared-components/atoms/button";
import { Input } from "@/shared-components/atoms/input";
import { Label } from "@/shared-components/atoms/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared-components/atoms/select";
import { Textarea } from "@/shared-components/atoms/textarea";
import { Toggle, ToggleItem } from "@/shared-components/atoms/toggle";
import { AvatarFileInput } from "@/shared-components/molecules/avatar-file-input";
import { PasswordInput } from "@/shared-components/molecules/password-input";
import { useRegister } from "@/features/auth/hooks/use-register";
import {
  PROFILE_TYPES,
  type ProfileType,
  type RegisterFormValues,
} from "@/features/auth/types/register.type";
import { registerValidationSchema } from "@/features/auth/validations/register.validation";
import { PAGES } from "@/shared/constants/page.constant";

const PROFILE_TYPE_LABELS: Record<ProfileType, string> = {
  INDIVIDUAL: "Individual",
  DISTRIBUTOR: "Distributor",
  FACTORY: "Factory",
};

const DEFAULT_VALUES: RegisterFormValues = {
  loginType: "EMAIL",
  identifier: "",
  password: "",
  profileType: "INDIVIDUAL",
  displayName: "",
  avatar: null,
  province: "",
  ward: "",
  details: "",
};

export function RegisterForm() {
  const { register: submitRegister, isSubmitting, error } = useRegister();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: joiResolver(registerValidationSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const loginType = useWatch({ control, name: "loginType" });

  const submitValidForm = handleSubmit((values) => {
    void submitRegister({
      loginType: values.loginType,
      identifier: values.identifier,
      password: values.password,
      profileType: values.profileType,
      label: values.displayName,
      province: values.province,
      // TODO: province/ward are temporary text fields (no real select yet),
      // so there's no source for provinceCode — placeholder until it lands.
      provinceCode: 0,
      ward: values.ward,
      details: values.details,
    });
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
      <div className="sticky -top-3 z-10 -mx-3 -mt-3 flex flex-col items-center gap-4 bg-background px-3 pt-3 pb-4 shadow-[0_4px_6px_-2px_rgb(0_0_0/0.08)]">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-xl font-semibold text-foreground">Register</h1>
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
          placeholder="At least 8 characters"
          aria-invalid={!!errors.password}
          {...register("password")}
        />
        {errors.password ? (
          <p className="text-xs text-destructive">
            {errors.password.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="profileType">Profile type</Label>
        <Controller
          control={control}
          name="profileType"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => field.onChange(value as ProfileType)}
            >
              <SelectTrigger id="profileType" className="w-full">
                <SelectValue placeholder="Select profile type" />
              </SelectTrigger>
              <SelectContent>
                {PROFILE_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {PROFILE_TYPE_LABELS[type]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="displayName">Display name</Label>
        <Input
          id="displayName"
          placeholder="Your name"
          aria-invalid={!!errors.displayName}
          {...register("displayName")}
        />
        {errors.displayName ? (
          <p className="text-xs text-destructive">
            {errors.displayName.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Avatar (optional)</Label>
        <Controller
          control={control}
          name="avatar"
          render={({ field }) => (
            <AvatarFileInput value={field.value} onChange={field.onChange} />
          )}
        />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-foreground">Address</h2>

        <div className="flex flex-col gap-1.5">
          {/* TODO: real province select — temporary text field per spec */}
          <Label htmlFor="province">Province</Label>
          <Input
            id="province"
            placeholder="Province"
            aria-invalid={!!errors.province}
            {...register("province")}
          />
          {errors.province ? (
            <p className="text-xs text-destructive">
              {errors.province.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          {/* TODO: real ward select — temporary text field per spec */}
          <Label htmlFor="ward">Ward</Label>
          <Input
            id="ward"
            placeholder="Ward"
            aria-invalid={!!errors.ward}
            {...register("ward")}
          />
          {errors.ward ? (
            <p className="text-xs text-destructive">{errors.ward.message}</p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="details">Details</Label>
        <Textarea
          id="details"
          placeholder="Additional details"
          aria-invalid={!!errors.details}
          {...register("details")}
        />
        {errors.details ? (
          <p className="text-xs text-destructive">{errors.details.message}</p>
        ) : null}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Registering..." : "Register"}
      </Button>

      <div className="flex justify-center gap-4 text-sm text-muted-foreground">
        <Link href={PAGES.LOGIN.pathname} className="hover:text-foreground">
          Login
        </Link>
        <Link
          href={PAGES.RESET_PASSWORD.pathname}
          className="hover:text-foreground"
        >
          Reset password
        </Link>
      </div>
    </form>
  );
}
