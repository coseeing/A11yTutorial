import type { ReactNode } from "react"
import { Container } from "@/components/Container/Container"

export default function PracticeLayout({ children }: { children: ReactNode }) {
  return <Container className="flex flex-col gap-24 py-32 tablet:py-48">{children}</Container>
}
