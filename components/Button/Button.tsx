import { cn } from "@/lib/cn"
import { Link } from "../Link/Link"

const baseStyles =
  "typography-strong1 inline-flex items-center justify-center transition-colors duration-200 focus:outline-none focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"

// Sourced from Figma "Brand" → Elements. States Default/Hover/Focused map to
// default / hover: / focus-visible:. Buttons are flat (no shadow) per the design.
const variantStyles = {
  primary: {
    base: "rounded-[62px] px-36 py-12",
    // Primary Button - Light: orange fill, dark teal label.
    light:
      "bg-orange-PRIMARY text-teal-700 hover:bg-orange-500 focus-visible:bg-orange-500 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-PRIMARY",
    // Primary Button - Dark: teal fill, white label.
    dark: "bg-teal-PRIMARY text-neutral-white hover:bg-teal-500 focus-visible:bg-teal-500 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-PRIMARY",
  },
  small: {
    base: "rounded-8 px-16 py-8",
    // Small Button - Light: teal fill, off-white label, warm-gray hairline border.
    light:
      "bg-teal-PRIMARY text-bg-light-off-white ring-1 ring-inset ring-bg-warm-gray hover:bg-teal-500 focus-visible:bg-teal-500 focus-visible:ring-2 focus-visible:ring-orange-PRIMARY",
    // Small Button - Dark: teal fill, off-white label, no border.
    dark: "bg-teal-PRIMARY text-bg-light-off-white hover:bg-teal-500 focus-visible:bg-teal-500 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-PRIMARY",
    // Small Button - GreenStroke: transparent, teal label + teal stroke, neutral hover fill.
    greenStroke:
      "bg-transparent text-teal-PRIMARY ring-1 ring-inset ring-teal-PRIMARY hover:bg-neutral-beige-gray focus-visible:bg-neutral-beige-gray focus-visible:ring-2 focus-visible:ring-orange-PRIMARY",
    // danger: not in Figma — extension for SSO destructive actions (logout/delete).
    // Uses red-600 (not red-PRIMARY) so white text meets WCAG AA (>=4.5:1).
    danger:
      "bg-red-600 text-neutral-white hover:bg-red-700 focus-visible:bg-red-700 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-PRIMARY",
  },
} as const

type ButtonVariant = keyof typeof variantStyles
type ButtonTheme<V extends ButtonVariant> = keyof (typeof variantStyles)[V]

type ButtonProps<V extends ButtonVariant = "primary"> = {
  id?: string
  href?: string
  type?: "button" | "submit" | "reset"
  className?: string
  variant?: V
  theme?: ButtonTheme<V>
  disabled?: boolean
  /**
   * 以 aria-disabled 取代原生 disabled。按鈕仍留在 Tab 順序中、仍可聚焦，
   * 但不會觸發動作。
   *
   * 原生 disabled 會把按鈕從 Tab 順序中整個拿掉 —— 鍵盤與螢幕閱讀器使用者
   * 不但不能按，連「這裡有一顆按鈕、目前不能用」都不會知道。停用的原因若在
   * 畫面別處說明（例如「請先勾選同意條款」），就該讓使用者找得到這顆按鈕。
   */
  keepFocusable?: boolean
  /** Shows a spinner and disables the button while an async action runs. */
  isLoading?: boolean
  /**
   * Submitted with the form when this button activates it — how a single form
   * distinguishes multiple submit buttons (e.g. consent accept vs. deny).
   * Ignored on the link branch, which submits nothing.
   */
  name?: string
  value?: string
  /**
   * 按鈕的無障礙名稱。只有圖示、沒有文字內容時必須提供。
   */
  "aria-label"?: string
  /**
   * 指向補充說明元素的 id。名稱說「這是什麼」，說明補充「按下去會怎樣」。
   */
  "aria-describedby"?: string
  /**
   * Toggle 按鈕的開關狀態，給了就會輸出 aria-pressed。
   *
   * 名稱不得隨狀態改變 —— 一顆標籤會在「播放」與「暫停」之間切換的按鈕，
   * 狀態已經寫在名稱裡，再加 aria-pressed 會變成兩套互相打架的說法。那種
   * 情況不要用這個 prop。
   */
  pressed?: boolean
  /**
   * 指向底層的 <button>。用於需要程式化聚焦的場合 —— 例如 AlertDialog 開啟時
   * 要把焦點放在影響最小的控制元件上。連結分支不接受它。
   */
  ref?: React.Ref<HTMLButtonElement>
  /** Widened to HTMLElement because this fires on the <a> branch too. */
  onClick?: React.MouseEventHandler<HTMLElement>
  children: React.ReactNode
}

export function Button<V extends ButtonVariant = "primary">({
  id,
  href,
  type = "button",
  className,
  variant = "primary" as V,
  theme = "light" as ButtonTheme<V>,
  disabled = false,
  keepFocusable = false,
  isLoading = false,
  name,
  value,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
  pressed,
  ref,
  onClick,
  children,
}: ButtonProps<V>) {
  const styles = variantStyles[variant]
  const themeClass = styles[theme] as string
  const classes = cn(baseStyles, styles.base, themeClass, className)
  const isInert = disabled || isLoading
  // keepFocusable 時不輸出原生 disabled，改由 aria-disabled 表達，並自行擋掉
  // 點擊 —— aria-disabled 只是說給輔助科技聽，瀏覽器仍會照常派送事件。
  const isNativelyDisabled = isInert && !keepFocusable

  // Render as a link unless inert — a disabled <a> can't be inert, so fall
  // back to a real disabled <button>.
  if (href && !isInert) {
    return (
      // onClick reaches the anchor as well: callers pass a handler alongside
      // href (a card's onCtaClick, the logout confirm) and it was being
      // dropped here, so those clicks silently did nothing.
      <Link
        id={id}
        href={href}
        className={classes}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        onClick={onClick}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      ref={ref}
      {...(id ? { id } : {})}
      {...(name ? { name } : {})}
      {...(value ? { value } : {})}
      className={classes}
      disabled={isNativelyDisabled}
      aria-disabled={isInert || undefined}
      aria-busy={isLoading || undefined}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      aria-pressed={pressed}
      onClick={isInert ? undefined : onClick}
      type={type}
    >
      {isLoading ? (
        <span
          aria-hidden="true"
          className="mr-8 size-[1.4rem] shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : null}
      {children}
    </button>
  )
}
