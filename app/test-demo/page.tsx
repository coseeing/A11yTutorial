import type { Metadata } from "next"
import { WaveDemo } from "./WaveDemo"

export const metadata: Metadata = {
  title: "無障礙檢測練習 — A11y Tutorial",
  description: "以志工活動報名頁練習無障礙檢測，觀察網頁上的無障礙資訊。",
}

export default function WaveDemoPage() {
  return <WaveDemo />
}
