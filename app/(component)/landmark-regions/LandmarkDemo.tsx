"use client"

import { useEffect, useState } from "react"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"
import { DemoViewport } from "@/components/demo/DemoViewport"
import { Button } from "@/components/Button/Button"

const AREAS = [
  { id: "example-header", label: "頁首", detail: "網站名稱與品牌資訊所在的位置，角色是 banner。" },
  { id: "example-nav", label: "導覽列", detail: "提供前往網站各處的連結，角色是 navigation。" },
  { id: "example-main", label: "主要內容", detail: "這一頁最主要的文章與資訊，角色是 main。" },
  { id: "example-footer", label: "頁尾", detail: "網站版權與聯絡資訊所在的位置，角色是 contentinfo。" },
  { id: "example-search", label: "搜尋區", detail: "搜尋功能所在的區域，角色是 search。" },
  { id: "example-form", label: "訂閱表單", detail: "以可見標題命名的表單，角色是 form。" },
  { id: "example-region", label: "本週更新", detail: "有名稱的 section，角色是 region。" },
  { id: "example-unnamed", label: "未命名區塊", detail: "未命名 section 是 generic，不是地標。" },
  { id: "example-inner-header", label: "文章標題區", detail: "main 裡的 header 是 generic，不是整個網站的 banner。" },
]
const BOX = "rounded-8 border border-bg-warm-gray bg-neutral-white p-8"
const INPUT = "typography-body2 w-full rounded-8 border border-bg-warm-gray bg-neutral-white px-8 py-4 text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"
const OBSERVE = "typography-body2 shrink-0 cursor-pointer rounded-8 border border-teal-100 bg-neutral-white px-8 py-4 text-teal-PRIMARY hover:bg-bg-light-beige focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"

export function LandmarkDemo() {
  const [selected, setSelected] = useState("example-main")
  const area = AREAS.find((item) => item.id === selected)!
  const inspect = (id: string) => (event: React.MouseEvent<HTMLElement>) => { event.stopPropagation(); setSelected(id) }
  const observe = (id: string) => <button type="button" aria-pressed={selected === id} aria-label={`觀察${AREAS.find((item) => item.id === id)!.label}`} onClick={inspect(id)} className={OBSERVE}>{AREAS.find((item) => item.id === id)!.label}</button>
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const doc = document.querySelector<HTMLIFrameElement>("#landmark-viewport")?.contentDocument
      const target = doc?.getElementById(selected)
      const root = doc?.scrollingElement
      if (!target || !root || !doc?.defaultView) return
      const rect = target.getBoundingClientRect()
      if (rect.top < 8 || rect.bottom > doc.defaultView.innerHeight - 8) root.scrollTop += rect.top - 16
    })
    return () => cancelAnimationFrame(frame)
  }, [selected])
  return <div className="flex flex-col gap-24">
    <DemoStage id="landmark-demo" className="flex-col items-stretch p-0 tablet:p-0">
      <p className="typography-body2 m-0 px-16 pt-16 text-teal-700">點選小網站中的區域，看看它在右側叫什麼。</p>
      <DemoViewport id="landmark-viewport" title="Landmark Regions 獨立示範頁" className="h-[30rem] border-0" contentClassName="typography-body2 flex min-h-screen w-full flex-col items-stretch justify-start gap-8 p-12 pr-48 text-teal-700">
        <header id="example-header" onClick={inspect("example-header")} className={`${BOX} flex cursor-pointer items-center justify-between gap-8 bg-bg-light-beige`}><strong className="typography-strong1">山海小誌</strong>{observe("example-header")}</header>
        <nav id="example-nav" aria-label="主要導覽" onClick={inspect("example-nav")} className={`${BOX} flex cursor-pointer flex-wrap items-center justify-between gap-8`}>
          <span className="flex gap-12">{["文章", "關於我們"].map((label) => <a key={label} href="#example-main" onClick={(event) => { event.preventDefault(); setSelected("example-nav") }} className="text-teal-PRIMARY underline underline-offset-4">{label}</a>)}</span>{observe("example-nav")}
        </nav>
        <main id="example-main" onClick={inspect("example-main")} className={`${BOX} flex cursor-pointer flex-col gap-8`}>
          <header id="example-inner-header" className="flex items-center justify-between gap-8"><h1 className="typography-strong1 m-0">本週精選</h1>{observe("example-main")}</header>
          <p className="m-0">一起認識無障礙設計，讓更多人順利使用網站。</p>
          {selected === "example-search" && <search id="example-search" onClick={inspect("example-search")} aria-label="網站搜尋" className={BOX}><label htmlFor="landmark-demo-q">搜尋文章</label><input id="landmark-demo-q" type="search" className={INPUT} /></search>}
          {selected === "example-form" && <form id="example-form" onClick={inspect("example-form")} aria-labelledby="landmark-demo-form-heading" onSubmit={(event) => event.preventDefault()} className={BOX}><h2 id="landmark-demo-form-heading" className="typography-strong3 m-0">訂閱更新通知</h2><label htmlFor="landmark-demo-email">電子郵件</label><input id="landmark-demo-email" type="email" className={INPUT} /></form>}
          {selected === "example-region" && <section id="example-region" onClick={inspect("example-region")} aria-labelledby="landmark-demo-region-heading" className={BOX}><h2 id="landmark-demo-region-heading" className="typography-strong3 m-0">本週更新</h2><p className="m-0">新增兩篇設計文章。</p></section>}
          {selected === "example-unnamed" && <section id="example-unnamed" onClick={inspect("example-unnamed")} className={`${BOX} border-dashed`}><p className="m-0">沒有另外命名的一般內容區塊。</p></section>}
        </main>
        <footer id="example-footer" onClick={inspect("example-footer")} className={`${BOX} flex cursor-pointer items-center justify-between gap-8 bg-bg-light-beige`}><span>© 山海小誌</span>{observe("example-footer")}</footer>
      </DemoViewport>
    </DemoStage>
    <div className="rounded-16 border border-bg-warm-gray bg-neutral-white p-16">
      <p className="typography-strong2 m-0 text-teal-700">正在觀察：{area.label}</p>
      <p className="typography-body2 m-0 mt-8 text-teal-300">{area.detail} 左側 A 框選的是這個區域，右側 Role 是它的語意名稱。</p>
    </div>
    <A11yTree marker="A" markerPosition="rail-right" selector={`#landmark-viewport >>> #${selected}`} hint={`觀察對象：小網站的${area.label}。資料來自框內的真實元素。`} />
    <details className="rounded-16 border border-bg-warm-gray bg-neutral-white p-16">
      <summary className="typography-strong2 cursor-pointer text-teal-700">其他地標與對照範例</summary>
      <p className="typography-body2 text-teal-300">先看懂四個主要區域後，再試試以下例子。選取後會在小網站中展開；generic 表示一般區塊，不是地標。</p>
      <div className="flex flex-wrap gap-12">{AREAS.slice(4).map((item) => <Button key={item.id} variant="small" theme="greenStroke" pressed={selected === item.id} onClick={() => setSelected(item.id)}>{item.label}</Button>)}</div>
    </details>
    <p role="note" className="typography-body3 m-0 text-teal-300">這是一份獨立的示範文件。區域按鈕只用來切換觀察對象；示範導覽連結不會離開本頁，表單不會送出資料。也可使用 Tab 找到區域按鈕，再按 Enter 或 Space 選擇。</p>
  </div>
}
