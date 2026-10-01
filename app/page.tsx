import { Container } from "@/components/Container/Container"
import { PageHeader } from "@/components/PageHeader/PageHeader"
import { publishedComponents } from "@/lib/components-registry"

export default function HomePage() {
  // 只列出已完成的元件。尚未動工的仍留在 registry 裡作為範圍紀錄，但不對外顯示 ——
  // 點進去是 404 的入口比沒有入口更糟。
  const components = publishedComponents()

  return (
    <>
      <PageHeader title="A11y Tutorial" />
      <Container as="section" className="py-48 desktop:py-60">
        <h2 className="typography-headline3 m-0 mb-24 text-teal-700">元件清單</h2>
        <ul className="m-0 grid list-none gap-24 p-0 tablet:grid-cols-2 desktop:grid-cols-3">
          {components.map((component) => (
            <li key={component.slug}>
              <a
                href={`/${component.slug}`}
                className="flex h-full items-center rounded-24 border border-bg-warm-gray bg-neutral-white p-24 no-underline transition-colors hover:bg-bg-light-off-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"
              >
                <h3 className="typography-headline4 m-0 text-teal-700">{component.name}</h3>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </>
  )
}
