import { Container } from "@/components/Container/Container"
import { PageHeader } from "@/components/PageHeader/PageHeader"
import { DemoSection } from "./DemoSection"
import { PageToc } from "./PageToc"

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
}: {
  title: string
  sections: DemoSectionSpec[]
}) {
  return (
    <>
      <PageHeader title={title} />
      <Container className="py-48 desktop:py-60">
        <div className="flex gap-48">
          <div className="flex min-w-0 flex-1 flex-col gap-48">
            {sections.map((section) => (
              <DemoSection key={section.id} id={section.id} title={section.title}>
                {section.content}
              </DemoSection>
            ))}
          </div>
          <PageToc sections={sections.map(({ id, title }) => ({ id, title }))} />
        </div>
      </Container>
    </>
  )
}
