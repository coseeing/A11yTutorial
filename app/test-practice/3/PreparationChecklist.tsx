"use client"

import { useState } from "react"
import { Button } from "@/components/Button/Button"
import { Checkbox } from "@/components/Checkbox/Checkbox"
import { Field } from "@/components/Field/Field"
import { Input } from "@/components/Input/Input"

export function PreparationChecklist() {
  const [confirmed, setConfirmed] = useState(false)

  return (
    <form
      className="grid gap-12"
      onSubmit={(event) => {
        event.preventDefault()
        setConfirmed(true)
      }}
    >
      <p className="typography-body2 m-0 text-teal-700">練習時請使用虛構資料。</p>
      <div className="grid gap-8">
        {/* WAVE label_missing: visible text intentionally has no programmatic association. */}
        <p className="typography-strong2 m-0 text-teal-700">姓名</p>
        <Input id="practice-name" name="name" autoComplete="off" />
      </div>
      <Field label="電子信箱" htmlFor="practice-email">
        {/* WAVE aria_reference_broken: the referenced description ID intentionally does not exist. */}
        <Input id="practice-email" name="email" type="email" autoComplete="off" aria-describedby="practice-email-help" />
        <p id="practice-contact-help" className="typography-body2 m-0 text-teal-700">僅用於通知課程異動。</p>
      </Field>
      <Checkbox
        required
        label="我已確認報到資訊與要帶的物品"
        onChange={() => setConfirmed(false)}
      />
      <div><Button type="submit" variant="small" theme="light">送出模擬報名</Button></div>
      <p role="status" className="typography-body1 m-0">
        {confirmed ? "已完成模擬報名。" : ""}
      </p>
    </form>
  )
}
