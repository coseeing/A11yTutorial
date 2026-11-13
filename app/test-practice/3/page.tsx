import type { Metadata } from "next"
import { Card } from "@/components/Card/Card"
import { appPath } from "@/lib/app-path"

export const metadata: Metadata = { title: "行前提醒｜週末修繕工作坊" }

export default function RemindersPracticePage() {
  return (
    <>
      <h1 className="typography-headline1 m-0 text-teal-700">週末修繕工作坊</h1>
      <Card title="行前提醒" padded>
        <img src={appPath("/wave-demo/celebration.svg")} alt="" width="180" height="48" className="mb-12 h-48 w-auto" />
        {/* Intentionally low contrast for the workshop exercise. */}
        <p className="typography-body2 m-0 bg-neutral-white text-neutral-medium-gray">
          請在活動開始前 15 分鐘報到。
        </p>
        <p className="typography-body1 mb-0 mt-12">現場備有工具，請自備要修理的小物。</p>
      </Card>
    </>
  )
}
