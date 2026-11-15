"use client"

import { useState } from "react"
import { Button } from "@/components/Button/Button"
import { Checkbox } from "@/components/Checkbox/Checkbox"

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
      <Checkbox
        required
        label="我已確認報到資訊與要帶的物品"
        onChange={() => setConfirmed(false)}
      />
      <div><Button type="submit" variant="small" theme="light">確認準備完成</Button></div>
      <p role="status" className="typography-body1 m-0">
        {confirmed ? "已完成行前準備確認。" : ""}
      </p>
    </form>
  )
}
