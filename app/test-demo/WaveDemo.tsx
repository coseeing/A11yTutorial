"use client"

import { useState } from "react"
import { Button } from "@/components/Button/Button"
import { Card } from "@/components/Card/Card"
import { Container } from "@/components/Container/Container"
import { Field } from "@/components/Field/Field"
import { SearchIcon } from "@/components/Icons/Icons"
import { Input } from "@/components/Input/Input"
import { Link } from "@/components/Link/Link"
import { PageHeader } from "@/components/PageHeader/PageHeader"
import { Table } from "@/components/Table/Table"
import { Tag } from "@/components/Tag/Tag"
import { appPath } from "@/lib/app-path"

const scheduleColumns = [
  { key: "time", label: "時間" },
  { key: "activity", label: "活動" },
  { key: "place", label: "地點" },
]

const scheduleRows = [
  { time: "09:00–09:30", activity: "報到與相互認識", place: "一樓大廳" },
  { time: "09:30–11:30", activity: "社區環境整理", place: "社區花園" },
  { time: "11:30–12:00", activity: "交流與分享", place: "二樓活動室" },
]

/**
 * 學員掃描用的活動頁。故意的缺陷只存在於本頁，不在畫面上揭露解答。
 * 九個 WAVE 項目的對照與選擇原因見 README 的 WAVE 檢測練習章節。
 */
export function WaveDemo() {
  const [searchResult, setSearchResult] = useState("輸入關鍵字，尋找你想參加的活動。")
  const [availability, setAvailability] = useState("點選查詢按鈕，查看目前剩餘名額。")
  const [registration, setRegistration] = useState("填寫完成後，可以試著送出報名。")

  return (
    <>
      {/* WAVE: h1 — 使用原本 PageHeader 的唯一主標題。 */}
      <PageHeader title="志工服務日" className="desktop:py-60" />

      <Container className="flex flex-col gap-24 py-32 tablet:py-48">
        <div className="flex flex-col gap-16 tablet:flex-row tablet:items-start tablet:justify-between">
          <div className="max-w-[68rem]">
            <div className="mb-12 flex flex-wrap items-center gap-12">
              <Tag>無障礙檢測練習</Tag>
              <span className="typography-strong2 text-teal-300">活動介紹與報名</span>
            </div>
            <p className="typography-body1 m-0 text-teal-700">
              {"這是一個供學員練習無障礙檢測的頁面。請檢查整個頁面，並記錄你認為需要進一步確認的地方。"}
            </p>
            <p className="typography-body2 mb-0 mt-8 text-teal-300">
              {"以下活動與報名皆為教學情境，不會儲存或送出個人資料。"}
            </p>
          </div>
          <Link
            href={appPath("/")}
            className="typography-strong2 shrink-0 self-start rounded-8 py-8 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"
          >
            回教學首頁
          </Link>
        </div>

        <Card title="尋找活動" padded>
          <form
            className="flex flex-col gap-16"
            onSubmit={(event) => {
              event.preventDefault()
              const data = new FormData(event.currentTarget)
              const query = String(data.get("query") ?? "").trim()
              setSearchResult(
                !query || "志工服務日 社區環境整理".includes(query)
                  ? "找到 1 場活動：志工服務日。可繼續閱讀下方活動資訊。"
                  : "沒有符合的活動，請試試「志工」或「服務」。",
              )
            }}
          >
            <div className="flex items-end gap-12">
              <Field label="活動關鍵字" htmlFor="wave-query" className="min-w-0 flex-1">
                <Input id="wave-query" name="query" type="search" />
              </Field>
              {/* WAVE: aria_label — 與下方沒有名稱的圖示按鈕對照。 */}
              <Button
                id="wave-search-button"
                type="submit"
                variant="small"
                theme="light"
                aria-label="搜尋活動"
                className="mb-8 min-h-40 shrink-0"
              >
                <SearchIcon className="size-20" />
              </Button>
            </div>
            <p role="status" className="typography-body2 m-0 text-teal-300">{searchResult}</p>
          </form>
        </Card>

        <div className="grid items-start gap-24 tablet:grid-cols-2">
          <Card title="活動海報" padded>
            {/* WAVE: alt_missing — 普通、未連結的資訊圖片，刻意不提供 alt。 */}
            <img
              id="wave-poster"
              src={appPath("/wave-demo/volunteer-day.svg")}
              width="800"
              height="640"
              className="block h-auto w-full rounded-16"
            />
          </Card>

          <Card title="參加資訊" padded>
            <div className="flex flex-col gap-24">
              <p className="typography-body1 m-0 text-teal-700">
                {"把一個上午留給社區，一起整理花園、認識鄰居。第一次參加志工服務也歡迎，我們會由工作人員帶領大家分組進行。"}
              </p>
              <dl className="typography-body1 m-0 grid grid-cols-[auto_1fr] gap-x-20 gap-y-12">
                <dt className="font-bold">活動時間</dt>
                <dd className="m-0">11 月 21 日，09:00–12:00</dd>
                <dt className="font-bold">集合地點</dt>
                <dd className="m-0">社區服務中心一樓</dd>
                <dt className="font-bold">參加費用</dt>
                <dd className="m-0">免費，請自備水壺</dd>
              </dl>
              <div>
                {/* WAVE: heading_skipped — 前一個標題是 Card 的 h2，刻意跳至 h4。 */}
                <h4 id="wave-eligibility" className="typography-headline4 m-0 mb-12 text-teal-700">報名資格</h4>
                <p className="typography-body1 m-0 text-teal-700">
                  {"歡迎年滿 18 歲、願意參與社區服務的朋友。無需經驗，請穿著方便活動的衣物與包鞋。"}
                </p>
              </div>
              {/* WAVE: alt_null — 不傳達活動資訊的裝飾圖片，明確保留空 alt。 */}
              <img
                id="wave-decoration"
                src={appPath("/wave-demo/celebration.svg")}
                alt=""
                width="180"
                height="48"
                className="h-48 w-auto self-start"
              />
              {/* WAVE: contrast — 固定單色白底與不透明淺灰字，避免依賴透明度或漸層。 */}
              <p id="wave-note" className="typography-body2 m-0 bg-neutral-white text-neutral-medium-gray">
                {"如遇雨天，活動改至室內進行，請留意行前通知。"}
              </p>
            </div>
          </Card>
        </div>

        <Card title="當日流程" padded>
          {/* WAVE: table_layout — 重用共用 Table，僅此處刻意以 td 呈現標題列。 */}
          <div id="wave-schedule">
            <Table columns={scheduleColumns} rows={scheduleRows} headerCellAs="td" />
          </div>
        </Card>

        <Card title="報名參加" padded>
          <form
            className="flex flex-col gap-24"
            onSubmit={(event) => {
              event.preventDefault()
              setRegistration("已完成模擬報名，資料沒有送出或儲存。")
            }}
            onReset={() => {
              setAvailability("點選查詢按鈕，查看目前剩餘名額。")
              setRegistration("填寫完成後，可以試著送出報名。")
            }}
          >
            <div className="grid gap-24 tablet:grid-cols-2">
              <div className="grid content-start gap-8">
                {/* WAVE: label_missing — 可見文字刻意不用 label，也不以 ARIA 或 title 補名稱。 */}
                <p className="typography-strong2 m-0 text-teal-700">姓名</p>
                <Input id="wave-name" name="name" autoComplete="off" />
              </div>
              <Field label="電子信箱" htmlFor="wave-email">
                <Input id="wave-email" name="email" type="email" autoComplete="off" />
              </Field>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-16 rounded-16 bg-bg-light-off-white p-20">
              <div>
                <p className="typography-strong1 m-0 mb-8 text-teal-700">查詢名額</p>
                <p role="status" className="typography-body2 m-0 text-teal-300">{availability}</p>
              </div>
              {/* WAVE: button_empty — 圖示 aria-hidden，刻意不給按鈕 aria-label 或 title。 */}
              <Button
                id="wave-availability"
                variant="small"
                theme="greenStroke"
                className="min-h-40 shrink-0"
                onClick={() => setAvailability("目前尚有 12 個名額。")}
              >
                <SearchIcon className="size-20" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-12">
              <Button type="submit" variant="small" theme="light">送出報名</Button>
              <Button type="reset" variant="small" theme="greenStroke">重新填寫</Button>
            </div>
            <p role="status" className="typography-body2 m-0 text-teal-300">{registration}</p>
          </form>
        </Card>
      </Container>
    </>
  )
}
