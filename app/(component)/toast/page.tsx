import type { Metadata } from "next"
import { AriaTable } from "@/components/demo/AriaTable"
import { DemoPage } from "@/components/demo/DemoPage"
import { KeyboardTable } from "@/components/demo/KeyboardTable"
import { WcagList } from "@/components/demo/WcagList"
import { ToastDemo } from "./ToastDemo"

export const metadata: Metadata = {
  title: "Toast — A11y Tutorial",
  description:
    "不中斷目前操作的輕量通知，含 accessibility tree、常見硬傷與 WCAG 對應。",
}


export default function ToastPage() {
  return (
    <DemoPage
      title="Toast"
      sections={[
        { id: "demo", title: "Demo 與 Accessibility Tree", content: <ToastDemo /> },
        {
          id: "keyboard",
          title: "鍵盤操作",
          content: (
            <KeyboardTable
              rows={[
                {
                  keys: "（無）",
                  action:
                    "Toast 出現時不移動焦點、不中斷使用者當下的動作。這是它與 Dialog 的根本分界。",
                },
                {
                  keys: "Tab",
                  action:
                    "可以走到關閉鈕，但那是一段很長的路 —— 焦點還在你剛才操作的地方。正因如此，Toast 裡不該放重要的動作。",
                },
              ]}
            />
          ),
        },
        {
          id: "aria",
          title: "ARIA 屬性",
          content: (
            <AriaTable
              rows={[
                {
                  attr: "role",
                  value: "status",
                  purpose:
                    "承載訊息的容器。隱含 aria-live=polite 與 aria-atomic=true，會等使用者當下的播報結束才開口 —— 這正是「不強制中斷」的技術實現。",
                },
                {
                  attr: "（時機）",
                  value: "動態更新",
                  purpose:
                    "role=status 播報的是內容的變化。容器要先在 DOM 裡，訊息在同一個節點內更新；整個容器被換掉時，部分螢幕閱讀器會當成新節點而不播報。",
                },
                {
                  attr: "（名稱）",
                  value: "無",
                  purpose:
                    "status 的 nameFrom 只有 author，名稱不從內容取得，所以 Accessibility Tree 上的 Name 永遠是空的。這不是缺漏。",
                },
                {
                  attr: "aria-label",
                  value: "關閉通知",
                  purpose: "關閉鈕只有圖示，需要文字名稱才有可用的按鈕標籤。",
                },
                {
                  attr: "（對照）",
                  value: "role=alert",
                  purpose:
                    "需要立刻知道的事用 alert（隱含 assertive），它會插話但仍不搶焦點；非處理不可的事用 role=dialog，它把焦點拉過去鎖住。Toast 的定位是三者中最輕的一層：不插話、不搶焦點。",
                },
                {
                  attr: "（位置）",
                  value: "避開邊角",
                  purpose:
                    "低視能或使用螢幕放大鏡的人視野受限在畫面中央，躲在右上角或右下角的通知他們根本看不到 —— 不是沒注意到，是不在視野裡。",
                },
                {
                  attr: "aria-hidden",
                  value: "true",
                  purpose: "關閉鈕的圖示是純視覺，名稱已由 aria-label 提供。",
                },
              ]}
            />
          ),
        },
        {
          id: "wcag",
          title: "WCAG 對應",
          content: (
            <WcagList
              criteria={[
                {
                  id: "4.1.3",
                  name: "狀態訊息",
                  level: "AA",
                  note: "讓使用者知道內容中的重要變化，而不必中斷手上的工作。訊息出現時網頁不跳轉、不刷新，鍵盤焦點留在原地 —— 這三件事同時成立才算數。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages",
                },
                {
                  id: "2.2.1",
                  name: "時間可調整",
                  level: "A",
                  note: "自動消失是時間限制。使用者必須能關閉、調整或延長它，才有足夠時間讀完。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable",
                },
                {
                  id: "2.2.4",
                  name: "中斷",
                  level: "AAA",
                  note: "通知不能過於頻繁 —— 連續跳出的 Toast 對視覺或認知障礙使用者是實質的妨礙。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/interruptions",
                },
                {
                  id: "3.2.1",
                  name: "取得焦點",
                  level: "A",
                  note: "Toast 出現時不得移動焦點，使用者手上的操作不能被搶走。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/on-focus",
                },
                {
                  id: "2.4.7",
                  name: "焦點可見",
                  level: "AA",
                  note: "關閉鈕有橘色 focus ring。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible",
                },
              ]}
            />
          ),
        },
      ]}
    />
  )
}
