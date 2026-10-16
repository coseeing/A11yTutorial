import { cn } from "@/lib/cn"
import { type ApgRule, rulesFor } from "@/lib/apg-rules"

// ApgRuleList — 某個元件在 APG 規則表裡的條目。
//
// 只列難度 1 與 2，難度 3 不列：3 是給檢測人員的細節，放進教學頁只會把真正
// 要記住的那幾條稀釋掉。難度 2 排在前面，因為那是必須實作到 demo 上的那些 ——
// 讀者從這一區往上看，就能一條條對照前面的面板與屬性表。
//
// 排序本身不說話，所以難度標在每一條上。原本是兩個分組標題在說這件事，
// 但那等於在每一頁重複同一句話；標籤放在卡片裡，資訊還在，話少了一句。
//
// 資料來自 lib/apg-rules.ts，那是由 data/apg-pattern-rules.csv 產生的，不手寫。

const LISTED: ApgRule["difficulty"][] = [2, 1]

const DIFFICULTY_STYLE: Record<number, string> = {
  // 難度 2 用主色橘：整個站的「這件事要做」訊號都是這個顏色。
  2: "bg-orange-PRIMARY text-neutral-black",
  1: "bg-teal-100/40 text-teal-700",
}

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
        <span
          className={cn(
            "typography-strong3 inline-flex items-center rounded-8 px-8 py-4",
            DIFFICULTY_STYLE[rule.difficulty],
          )}
        >
          難度 {rule.difficulty}
        </span>
        <code className="typography-strong3 rounded-8 bg-bg-light-off-white px-8 py-4 font-mono text-teal-PRIMARY">
          {rule.id}
        </code>
        <span className="typography-body3 text-teal-300">{rule.topic}</span>
        {/* 必做的不標，否則整頁都是同一個標籤；選做的才標出來。 */}
        {rule.required ? null : (
          <span className="typography-body3 rounded-8 border border-bg-warm-gray px-8 py-4 text-teal-300">
            選做
          </span>
        )}
      </div>

      <p className="typography-strong2 m-0 mt-12 text-teal-700">{rule.name}</p>
      <p className="typography-body2 m-0 mt-8 text-teal-700">{rule.expectation}</p>
    </li>
  )
}
