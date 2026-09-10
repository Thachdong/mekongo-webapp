"use client"

import * as React from "react"
import { UserRound, X } from "lucide-react"

import { Button } from "@/shared-components/atoms/button"
import { cn } from "cn"

type AvatarFileInputProps = {
  value?: File | null
  onChange?: (file: File | null) => void
  disabled?: boolean
  className?: string
}

function AvatarFileInput({
  value,
  onChange,
  disabled,
  className,
}: AvatarFileInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const previewUrl = React.useMemo(
    () => (value ? URL.createObjectURL(value) : null),
    [value]
  )

  React.useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={disabled}
        className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-input bg-muted text-muted-foreground outline-none transition-colors hover:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
      >
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- blob: preview URL, next/image can't optimize it
          <img
            src={previewUrl}
            alt="Avatar preview"
            className="size-full object-cover"
          />
        ) : (
          <UserRound className="size-6" />
        )}
      </button>

      <div className="flex flex-col items-start gap-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
        >
          Choose avatar
        </Button>
        {value ? (
          <button
            type="button"
            disabled={disabled}
            onClick={() => onChange?.(null)}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive disabled:pointer-events-none disabled:opacity-50"
          >
            <X className="size-3" />
            Remove
          </button>
        ) : null}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        disabled={disabled}
        className="hidden"
        onChange={(event) => onChange?.(event.target.files?.[0] ?? null)}
      />
    </div>
  )
}

export { AvatarFileInput }
