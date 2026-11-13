import type { Metadata } from "next"
import { Card } from "@/components/Card/Card"

export const metadata: Metadata = { title: "課程內容｜週末修繕工作坊" }

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
    </>
  )
}
