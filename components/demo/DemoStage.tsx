import { cn } from "@/lib/cn"

// DemoStage — 互動範例的底盤。米白底把「可操作的東西」和周圍的說明文字區隔開，
// 不用陰影，維持整站的扁平表面。
export function DemoStage({
  id,
  children,
  className,
}: {
  /** 供 A11yTree 的 selector 錨定觀察對象。 */
  id?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      {...(id ? { id } : {})}
      className={cn(
        "flex flex-wrap items-center gap-16 rounded-24 border border-bg-warm-gray bg-bg-light-off-white p-24 tablet:p-32",
        className,
      )}
    >
      {children}
    </div>
  )
}
