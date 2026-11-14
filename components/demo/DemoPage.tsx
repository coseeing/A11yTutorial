import { Container } from "@/components/Container/Container"
import { PageHeader } from "@/components/PageHeader/PageHeader"
import { DemoSection } from "./DemoSection"
import { PageToc } from "./PageToc"
import { DemoWorkspace } from "./DemoWorkspace"
import { DemoPageNavigation } from "./DemoPageNavigation"

export type DemoSectionSpec = {
  /** 錨點 id，同時是目錄連結的目標 */
  id: string
  title: string
  content: React.ReactNode
}

// DemoPage — 所有元件頁共用的版型。
//
// 區塊以資料傳入而非 children，這樣目錄和內容出自同一份清單，不會有目錄列了
// 一個不存在的區塊、或新增區塊忘了更新目錄的情況。
export function DemoPage({
  title,
  sections,
  groupedDemo = false,
}: {
  title: string
  sections: DemoSectionSpec[]
  groupedDemo?: boolean
}) {
  const readingSections = sections.map((section) => !groupedDemo && section.id === "demo" && section.title === "Demo 與 Accessibility Tree" ? { ...section, title: "Accessibility Tree" } : section)
  const content = readingSections.map((section) => (
    <DemoSection key={section.id} id={section.id} title={section.title}>{section.content}</DemoSection>
  ))
  return (
    <>
      <PageHeader title={title} className="desktop:py-60" />
      <Container className="py-32 tablet:px-40 desktop:max-w-[144rem] desktop:py-40">
        <div data-demo-page-layout>
          <PageToc variant="inline" sections={readingSections.map(({ id, title }) => ({ id, title }))} />
          {groupedDemo ? <div className="flex flex-col gap-40">{content}</div> : <DemoWorkspace>{content}</DemoWorkspace>}
          <DemoPageNavigation />
        </div>
      </Container>
    </>
  )
}
