import type { Metadata } from "next"
import { Card } from "@/components/Card/Card"
import { ArrowRightIcon } from "@/components/Icons/Icons"
import { Link } from "@/components/Link/Link"
import { Disclosure } from "@/components/Disclosure/Disclosure"
import { appPath } from "@/lib/app-path"

export const metadata: Metadata = { title: "活動導覽｜週末修繕工作坊" }

const quickLinkClass = "inline-flex min-h-40 min-w-40 items-center justify-center rounded-8 bg-teal-700 text-neutral-white"

export default function NavigationPracticePage() {
  return (
    <>
      <h1 className="typography-headline1 m-0 text-teal-700">週末修繕工作坊</h1>
      <Card title="活動導覽" padded>
        <div className="flex flex-wrap gap-24">
          <div>
            <p className="typography-strong2 mb-8 mt-0">前往課程內容</p>
            {/* Intentionally unnamed link for the workshop exercise. */}
            <Link href={appPath("/test-practice/2/")} className={quickLinkClass}>
              <ArrowRightIcon className="size-20" />
            </Link>
          </div>
          <div>
            <p className="typography-strong2 mb-8 mt-0">前往交通資訊</p>
            <Link href="#workshop-travel" aria-label="前往交通資訊" className={quickLinkClass}>
              <ArrowRightIcon className="size-20" />
            </Link>
          </div>
        </div>
      </Card>
      <Card title="課程快訊" padded>
        <p className="typography-body1 mb-12 mt-0">各場次的時間與名額已更新，報名前請先確認。</p>
        {/* WAVE link_redundant: adjacent links intentionally have the same destination. */}
        <div className="typography-body1 flex flex-wrap gap-16">
          <Link href={appPath("/test-practice/2/")} className="underline">瀏覽課程場次</Link>
          <Link href={appPath("/test-practice/2/")} className="underline">查看剩餘名額</Link>
        </div>
      </Card>
      <Card id="workshop-program" title="課程內容" padded>
        <p className="typography-body1 m-0">帶一件想修理的小物，一起練習延長它的使用壽命。</p>
        <Disclosure label="查看適合帶來的物品">
          建議攜帶衣物、背包或小型木製品。現場不受理電器。
        </Disclosure>
      </Card>
      <Card id="workshop-travel" title="交通資訊" padded>
        <p className="typography-body1 m-0">集合地點為社區活動中心一樓，請從正門進入。</p>
      </Card>
    </>
  )
}
