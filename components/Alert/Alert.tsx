import { cn } from "@/lib/cn"

// Alert — 依 W3C ARIA APG 的 Alert Pattern 實作。
//
// 這個元件的難點不在樣式，在於「什麼時候會被唸出來」。role="alert" 是一個
// live region：螢幕閱讀器播報的是它「內容的變化」，不是它的存在。頁面載入時
// 就已經帶著文字的 alert 不會被播報。
//
// 所以容器一律渲染（即使沒有訊息），訊息出現時是在同一個節點內更新文字。整個
// 容器被換掉時，部分螢幕閱讀器會把它當成新節點而不播報。
//
// role="alert" 隱含 aria-live="assertive"，會打斷使用者當下的播報 —— 留給真正
// 需要立刻知道的事。一般的成功或狀態訊息請用 Toast 的 role="status"。

type AlertProps = {
  /** null 或空字串代表目前沒有訊息，容器仍會保留在 DOM 中。 */
  message?: React.ReactNode
  className?: string
}

export function Alert({ message, className }: AlertProps) {
  return (
    <div role="alert" className={cn(className)}>
      {message ? (
        <p className="typography-body1 m-0 flex items-start gap-12 rounded-16 border border-red-200 bg-red-100/40 px-20 py-16 text-red-700">
          <span
            aria-hidden="true"
            className="mt-4 size-12 shrink-0 rounded-full bg-red-PRIMARY"
          />
          {message}
        </p>
      ) : null}
    </div>
  )
}
