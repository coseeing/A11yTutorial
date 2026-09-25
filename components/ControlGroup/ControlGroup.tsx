import { useId } from "react"
import { cn } from "@/lib/cn"

// ControlGroup — 一組相關的核取方塊或開關的外框。
//
// 用 fieldset + legend 而不是 div + 標題文字：fieldset 的隱含角色就是 group，
// legend 直接成為它的無障礙名稱。螢幕閱讀器進到群組時會先唸出「通知方式，群組」，
// 使用者才知道接下來這幾個選項是一組的 —— 光靠視覺上的靠近傳達不了這件事。

type ControlGroupProps = {
  /** 群組名稱。會成為 legend，可見且同時是無障礙名稱。 */
  label: React.ReactNode
  /** 補充說明。以 aria-describedby 關聯到群組本身，而非個別控制項。 */
  description?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function ControlGroup({ label, description, children, className }: ControlGroupProps) {
  const descriptionId = useId()

  return (
    <fieldset
      aria-describedby={description ? descriptionId : undefined}
      className={cn(
        "m-0 rounded-16 border border-bg-warm-gray bg-neutral-white px-20 py-16",
        className,
      )}
    >
      <legend className="typography-strong1 px-4 text-teal-700">{label}</legend>
      {description ? (
        <p id={descriptionId} className="typography-body2 mt-4 mb-12 text-teal-300">
          {description}
        </p>
      ) : null}
      <div className="flex flex-col gap-12">{children}</div>
    </fieldset>
  )
}
