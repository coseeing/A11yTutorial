export type WcagCriterion = {
  /** 條款編號，例如 "2.4.3" */
  id: string
  /** 條款名稱（中文） */
  name: string
  level: "A" | "AA" | "AAA"
  /** 這個元件為什麼與該條款有關 */
  note: string
  /** W3C Understanding 文件連結 */
  href: string
}

const LEVEL_STYLE: Record<WcagCriterion["level"], string> = {
  A: "bg-green-PRIMARY text-neutral-black",
  AA: "bg-blue-PRIMARY text-neutral-white",
  AAA: "bg-teal-PRIMARY text-neutral-white",
}

export function WcagList({ criteria }: { criteria: WcagCriterion[] }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-16 p-0">
      {criteria.map((c) => (
        <li
          key={c.id}
          className="rounded-16 border border-bg-warm-gray bg-neutral-white p-20 tablet:p-24"
        >
          <div className="flex flex-wrap items-center gap-12">
            <span
              className={`typography-strong3 inline-flex items-center rounded-8 px-8 py-4 ${LEVEL_STYLE[c.level]}`}
            >
              等級 {c.level}
            </span>
            <a
              href={c.href}
              className="typography-strong1 rounded-8 text-teal-PRIMARY underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"
            >
              {c.id} {c.name}
            </a>
          </div>
          <p className="typography-body2 m-0 mt-8 text-teal-700">{c.note}</p>
        </li>
      ))}
    </ul>
  )
}
