import { type ApgRule, rulesFor } from "@/lib/apg-rules"

// ApgRuleList — 某個元件在 APG 規則表裡的條目。
//
// 只列難度 1 與 2，難度 3 不列：3 是給檢測人員的細節，放進教學頁只會把真正
// 要記住的那幾條稀釋掉。難度 2 排在前面，因為那是必須實作到 demo 上的那些 ——
// 讀者從這一區往上看，就能一條條對照前面的面板與屬性表。
//
// 難度與規則編號都不顯示在卡片上 —— 這一區是讀來理解規則在講什麼的，不是
// 用來核對編號的。難度 2 仍排在前面，但那只影響順序，畫面上不再標出來。
// 要查編號與涵蓋範圍，看 lib/components-registry.ts 的 coveredRules。
//
// 資料來自 lib/apg-rules.ts，那是由 data/apg-pattern-rules.csv 產生的，不手寫。

const LISTED: ApgRule["difficulty"][] = [2, 1]

export function ApgRuleList({ slug }: { slug: string }) {
  const all = rulesFor(slug)

  // Toast 這類非 APG pattern 沒有規則編號可列。與其整個區塊消失、讓讀者
  // 以為漏了，不如明講為什麼是空的。
  if (all.length === 0) {
    return (
      <p className="typography-body2 m-0 text-teal-300">
        APG 沒有這個 pattern，所以沒有對應的規則編號。這一頁的依據是 WCAG 成功準則與
        live region 的既有實務，見上方的 WCAG 對應。
      </p>
    )
  }

  const rules = LISTED.flatMap((difficulty) =>
    all.filter((rule) => rule.difficulty === difficulty),
  )

  return (
    <ul className="m-0 flex list-none flex-col gap-16 p-0">
      {rules.map((rule) => (
        <RuleCard key={rule.id} rule={rule} />
      ))}
    </ul>
  )
}

function RuleCard({ rule }: { rule: ApgRule }) {
  return (
    <li className="rounded-16 border border-bg-warm-gray bg-neutral-white p-20 tablet:p-24">
      <div className="flex flex-wrap items-center gap-8">
        <span className="typography-body3 text-teal-300">{rule.topic}</span>
        {/* 必做的不標，否則整頁都是同一個標籤；選做的才標出來。 */}
        {rule.required ? null : (
          <span className="typography-body3 rounded-8 border border-bg-warm-gray px-8 py-4 text-teal-300">
            選做
          </span>
        )}
      </div>

      <p className="typography-strong2 m-0 mt-8 text-teal-700">{rule.name}</p>
      <p className="typography-body2 m-0 mt-8 text-teal-700">{rule.expectation}</p>
    </li>
  )
}
