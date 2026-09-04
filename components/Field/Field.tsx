import { cn } from "@/lib/cn"

// Field primitives — NOT in Figma; SSO gap-fill built on brand tokens. Mirrors
// the `.ory-elements label` and `--interface-*-validation-*` treatment.

export function Label({
  className,
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "typography-strong2 block text-teal-700",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  )
}

type ValidationMessageProps = {
  variant?: "danger" | "success"
  /**
   * Set false when rendering inside an always-mounted live region (as Field
   * does) — a dynamically inserted role="alert" alone is unreliable.
   */
  announce?: boolean
  className?: string
  children: React.ReactNode
}

export function ValidationMessage({
  variant = "danger",
  announce = true,
  className,
  children,
}: ValidationMessageProps) {
  return (
    <p
      role={announce && variant === "danger" ? "alert" : undefined}
      className={cn(
        "typography-body2",
        // red-600 (6:1) and green-700 (4.5:1) both meet WCAG AA on white.
        variant === "danger" ? "text-red-600" : "text-green-700",
        className,
      )}
    >
      {children}
    </p>
  )
}

type FieldProps = {
  label?: React.ReactNode
  htmlFor?: string
  error?: React.ReactNode
  hint?: React.ReactNode
  className?: string
  children: React.ReactNode
}

/** Label + control + validation message, stacked. */
export function Field({
  label,
  htmlFor,
  error,
  hint,
  className,
  children,
}: FieldProps) {
  return (
    <div className={cn("grid gap-8", className)}>
      {label ? <Label htmlFor={htmlFor}>{label}</Label> : null}
      {children}
      {hint && !error ? (
        <p className="typography-body2 text-neutral-dark-gray">{hint}</p>
      ) : null}
      {/* Always-mounted live region so screen readers reliably announce
          errors that appear later; the message itself skips role="alert". */}
      <div aria-live="polite">
        {error ? <ValidationMessage announce={false}>{error}</ValidationMessage> : null}
      </div>
    </div>
  )
}
