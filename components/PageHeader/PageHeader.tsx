import { cn } from "@/lib/cn"
import { appPath } from "@/lib/app-path"

// PageHeader — from Figma "Coseeing" → 列表頁 Header. Teal band with the wave
// pattern (public/brand/pattern-wave.svg, staggered 4× like the Figma layout),
// page title, and an optional description.
type PageHeaderProps = {
  title: string
  className?: string
}

// Figma places four copies of the wave, each shifted right/down along a
// diagonal. Offsets in rem (1rem = 10px at the 62.5% root).
const WAVES = [
  { left: "-4rem", top: "3.6rem" },
  { left: "55.3rem", top: "14.9rem" },
  { left: "114.6rem", top: "26.2rem" },
  { left: "173.9rem", top: "37.4rem" },
]

export function PageHeader({ title, className }: PageHeaderProps) {
  return (
    <header
      className={cn(
        "relative overflow-hidden bg-teal-PRIMARY px-20 py-40 tablet:px-40 desktop:px-[9rem] desktop:py-[11.7rem]",
        className,
      )}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {WAVES.map((w, i) => (
          <img
            key={i}
            src={appPath("/brand/pattern-wave.svg")}
            alt=""
            className="absolute h-[35.1rem] w-[83.4rem] max-w-none"
            style={{ left: w.left, top: w.top }}
          />
        ))}
      </div>
      <div className="relative flex max-w-[72rem] flex-col">
        <h1 className="typography-headline1 m-0 text-bg-light-off-white">{title}</h1>
      </div>
    </header>
  )
}
