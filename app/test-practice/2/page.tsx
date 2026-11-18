import type { Metadata } from "next"
import { Card } from "@/components/Card/Card"
import { Button } from "@/components/Button/Button"
import { Table } from "@/components/Table/Table"
import { Tabs } from "@/components/Tabs/Tabs"
import { appPath } from "@/lib/app-path"

export const metadata: Metadata = { title: "課程內容｜週末修繕工作坊" }

const columns = [
  { key: "className", label: "課程" },
  { key: "time", label: "時間" },
  { key: "seats", label: "剩餘名額" },
]

export default function HeadingsPracticePage() {
  return (
    <>
      <h1 className="typography-headline1 m-0 text-teal-700">週末修繕工作坊</h1>
      <Card title="課程內容" padded>
        <p className="typography-body1 mt-0">帶一件想修理的小物，一起練習延長它的使用壽命。</p>
        {/* Intentionally skips a heading level for the workshop exercise. */}
        <h4 className="typography-headline4 mb-8">當天會做什麼</h4>
        <ul className="typography-body1 mb-0 list-disc pl-24">
          <li>辨識損壞的原因</li>
          <li>認識基本工具</li>
          <li>分組修理日常小物</li>
        </ul>
      </Card>
      <Card title="可報名場次" padded>
        <Tabs
          label="修繕場次"
          items={[
            {
              label: "上午場",
              content: <Table columns={columns} rows={[{ className: "木製品修繕", time: "09:30–11:00", seats: "已額滿" }]} />,
            },
            {
              label: "下午場",
              // The afternoon table intentionally uses regular cells for its column headers.
              content: <Table columns={columns} headerCellAs="td" rows={[{ className: "衣物修補", time: "14:00–15:30", seats: "3 位" }]} />,
            },
          ]}
        />
      </Card>
      <Card title="主辦單位" padded>
        {/* WAVE alt_suspicious: the CMS placeholder text was left as the image alternative. */}
        <img
          src={appPath("/brand/coseeing-logo.svg")}
          alt="image"
          width="232"
          height="32"
          className="h-auto w-[23.2rem] max-w-full"
        />
      </Card>
      <div><Button href={appPath("/test-practice/3/")} variant="small" theme="light">查看行前提醒</Button></div>
    </>
  )
}
