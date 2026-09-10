"use client"

import * as React from "react"

import { Input } from "@/shared-components/atoms/input"
import { cn } from "cn"

const CODE_LENGTH = 6

type CodeInputProps = {
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  /** Focus the first box (e.g. once the surrounding page knows this box should own focus). */
  autoFocus?: boolean
  /** Fires once all boxes hold a digit — e.g. move focus to the submit button. */
  onComplete?: () => void
  disabled?: boolean
  "aria-invalid"?: boolean
  className?: string
  name?: string
}

function CodeInput({
  value = "",
  onChange,
  onBlur,
  autoFocus,
  onComplete,
  disabled,
  "aria-invalid": ariaInvalid,
  className,
  name,
}: CodeInputProps) {
  const inputsRef = React.useRef<(HTMLInputElement | null)[]>([])

  React.useEffect(() => {
    if (autoFocus) inputsRef.current[0]?.focus()
  }, [autoFocus])

  // `value` is kept at a fixed length of CODE_LENGTH internally, padded with
  // " " for empty slots, so a digit typed into an out-of-order box (e.g. box
  // 3 first) stays at its own position instead of collapsing to the front.
  const digits = React.useMemo(() => {
    const chars = value.split("").slice(0, CODE_LENGTH)
    return Array.from({ length: CODE_LENGTH }, (_, i) =>
      /[0-9]/.test(chars[i] ?? "") ? chars[i] : ""
    )
  }, [value])

  const toValue = (next: string[]) => next.map((d) => d || " ").join("")

  const focusBox = (index: number) => {
    inputsRef.current[Math.max(0, Math.min(index, CODE_LENGTH - 1))]?.focus()
  }

  const handleChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const char = event.target.value.replace(/\D/g, "").slice(-1)
      const next = [...digits]
      next[index] = char
      onChange?.(toValue(next))
      if (!char) return
      if (next.every((d) => d !== "")) {
        onComplete?.()
      } else {
        focusBox(index + 1)
      }
    }

  const handleKeyDown =
    (index: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Backspace" && !digits[index] && index > 0) {
        focusBox(index - 1)
      } else if (event.key === "ArrowLeft" && index > 0) {
        focusBox(index - 1)
      } else if (event.key === "ArrowRight" && index < CODE_LENGTH - 1) {
        focusBox(index + 1)
      }
    }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, CODE_LENGTH)
    if (!pasted) return
    event.preventDefault()
    onChange?.(toValue(pasted.padEnd(CODE_LENGTH, " ").split("")))
    if (pasted.length === CODE_LENGTH) {
      onComplete?.()
    } else {
      focusBox(pasted.length)
    }
  }

  return (
    <div className={cn("flex gap-2", className)}>
      {digits.map((digit, index) => (
        <Input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          autoComplete={index === 0 ? "one-time-code" : "off"}
          disabled={disabled}
          aria-invalid={ariaInvalid}
          value={digit}
          name={name ? `${name}-${index}` : undefined}
          onChange={handleChange(index)}
          onKeyDown={handleKeyDown(index)}
          onPaste={handlePaste}
          onBlur={onBlur}
          className="h-12 w-10 text-center text-lg"
        />
      ))}
    </div>
  )
}

export { CodeInput }
