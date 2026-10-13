"use client"

import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"
import { SearchIcon } from "@/components/Icons/Icons"

// LandmarkDemo — 這個元件的範例就是你正在讀的這一頁。
//
// 地標是整份文件層級的東西：一個頁面只能有一個最高層級的 banner、一個 main、
// 一個 contentinfo。在 demo 區塊裡再擺一組假的 header 與 main，會真的在這一頁
// 產生第二個 banner 與第二個 main —— 示範一條規則的同時違反它。
//
// 所以這一頁的觀察對象是真的：下面幾個面板盯的是這個站的 <header>、<nav>、
// <main> 與 <footer>。只有可以合法重複的那幾種（search、form、region）才放在
// demo 區塊裡新建。

const FIELD_CLASS =
  "typography-body1 w-full rounded-8 border border-bg-warm-gray bg-neutral-white px-16 py-12 text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"

export function LandmarkDemo() {
  return (
    <div className="flex flex-col gap-24">
      <DemoStage id="landmark-demo" className="flex-col items-stretch gap-24">
        {/*
          <search> 是 HTML 的搜尋地標。提供搜尋功能的一組控制元件該用它，
          而不是 form —— form 地標的意思是「這裡有一份表單要填」。

          跑測試時 jsdom 會警告「The tag <search> is unrecognized」。那是 jsdom
          的元素清單還沒跟上，不是錯誤：<search> 自 2023 年起已是 Baseline，
          Chrome、Safari、Firefox 都支援，角色也照 HTML-AAM 映射成 search。
          不要為了消掉那行警告改寫成 <div role="search">。
        */}
        <search className="flex flex-col gap-4">
          <label htmlFor="landmark-demo-q" className="typography-strong2 text-teal-700">
            搜尋元件
          </label>
          <div className="flex items-center gap-8">
            <input id="landmark-demo-q" type="search" className={FIELD_CLASS} />
            <span className="flex shrink-0 items-center text-teal-300">
              <SearchIcon aria-hidden="true" className="size-24" />
            </span>
          </div>
        </search>

        {/*
          <form> 只有具備無障礙名稱時才是 form 地標。名稱要說出這份表單的用途，
          而且代表的是整份表單，不是個別欄位。
        */}
        <form
          aria-labelledby="landmark-demo-form-heading"
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-8"
        >
          <h3
            id="landmark-demo-form-heading"
            className="typography-strong1 m-0 text-teal-700"
          >
            訂閱更新通知
          </h3>
          <label htmlFor="landmark-demo-email" className="typography-strong2 text-teal-700">
            電子郵件
          </label>
          <input id="landmark-demo-email" type="email" className={FIELD_CLASS} />
        </form>

        {/* 具名的 <section> 是 region 地標，用來標示其他地標沒涵蓋、但重要到值得跳過去的內容。 */}
        <section
          aria-labelledby="landmark-demo-region-heading"
          className="rounded-16 border border-teal-100 bg-neutral-white p-20"
        >
          <h3
            id="landmark-demo-region-heading"
            className="typography-strong1 m-0 text-teal-700"
          >
            本週更新
          </h3>
          <p className="typography-body2 m-0 mt-8 text-teal-700">
            新增 Grid 與 Feed 兩個元件頁。
          </p>
        </section>

        {/* 對照組：同樣是 <section>，但沒有名稱，所以不是地標。 */}
        <section
          data-demo="unnamed"
          className="rounded-16 border border-dashed border-bg-warm-gray p-20"
        >
          <p className="typography-body2 m-0 text-teal-700">
            這個 section 沒有無障礙名稱，所以它不是地標。
          </p>
        </section>
      </DemoStage>

      {/* 前四個面板由外而內看這一頁真正的地標：banner → navigation → main。 */}
      <A11yTree selector="body > header" hint="觀察對象：這一頁的 header。" />

      <A11yTree selector="body > header nav" hint="觀察對象：header 裡的導覽。" />

      <A11yTree selector="main" hint="觀察對象：這一頁的 main。" />

      {/* 同樣是 <header>，但它在 main 裡面 —— 算出來的角色不是 banner。 */}
      <A11yTree selector="main header" hint="觀察對象：頁面標題區的 header。" />

      {/* 接下來三個是 demo 區塊裡新建的、可以合法重複的地標。 */}
      <A11yTree selector="#landmark-demo search" hint="觀察對象：搜尋區塊。" />

      <A11yTree selector="#landmark-demo form" hint="觀察對象：訂閱表單。" />

      <A11yTree
        selector="#landmark-demo section[aria-labelledby]"
        hint="觀察對象：具名的 section。"
      />

      <A11yTree
        selector="#landmark-demo section[data-demo='unnamed']"
        hint="觀察對象：沒有名稱的 section。"
      />

      <A11yTree selector="body > footer" hint="觀察對象：這一頁的 footer。" />
    </div>
  )
}
