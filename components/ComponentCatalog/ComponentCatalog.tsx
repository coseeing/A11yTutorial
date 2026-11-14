"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/Button/Button"
import { Input } from "@/components/Input/Input"
import { Select } from "@/components/Select/Select"
import { Tabs } from "@/components/Tabs/Tabs"
import { Tag } from "@/components/Tag/Tag"
import { Link } from "@/components/Link/Link"
import { ComponentIllustration } from "./ComponentIllustration"
import { ArrowRightIcon, SearchIcon } from "@/components/Icons/Icons"
import { appPath } from "@/lib/app-path"
import { groupCatalog, matchReason, searchCatalog, type CatalogEntry, type CatalogGroup, type CatalogView } from "@/lib/component-catalog"

const VIEWS: CatalogView[] = ["overview", "wcag", "roles"]
const LABELS = ["總覽", "依 WCAG SC", "依角色語意"]
const GRID = "m-0 grid list-none gap-24 p-0 tablet:grid-cols-2 desktop:grid-cols-3"

export function ComponentCatalog({ entries }: { entries: CatalogEntry[] }) {
  useEffect(() => {
    if (window.location.hash !== "#catalog-heading") return
    const heading = document.getElementById("catalog-heading")
    heading?.focus({ preventScroll: true })
    heading?.scrollIntoView?.({ block: "start" })
  }, [])
  const [query, setQuery] = useState("")
  const [activeView, setActiveView] = useState<CatalogView>("overview")
  const [sc, setSc] = useState("")
  const [role, setRole] = useState("")
  const [level, setLevel] = useState("")
  const [announcement, setAnnouncement] = useState("")
  const searched = useMemo(() => searchCatalog(entries, query), [entries, query])
  const allSc = useMemo(() => groupCatalog(entries, "wcag"), [entries])
  const allRoles = useMemo(() => groupCatalog(entries, "roles"), [entries])
  const levels = [...new Set(allSc.map((group) => group.level!))].sort()
  const scGroups = groupCatalog(searched, "wcag").filter((group) => (!sc || group.id === sc) && (!level || group.level === level))
  const roleGroups = groupCatalog(searched, "roles").filter((group) => !role || group.id === role)
  const groups = activeView === "wcag" ? scGroups : roleGroups
  const visibleCount = activeView === "overview" ? searched.length : new Set(groups.flatMap((g) => g.entries.map((e) => e.slug))).size

  function reset() {
    setQuery("")
    setSc("")
    setRole("")
    setLevel("")
    setAnnouncement("已清除所有搜尋與篩選條件。")
  }

  const searchControls = <CatalogSearch view={activeView} query={query} onQueryChange={(value) => { setQuery(value); setAnnouncement("") }} onClear={reset} />

  return (
    <div>
      <div className="mb-24 flex flex-wrap items-start justify-between gap-16">
        <div>
          <div className="flex items-center gap-12">
            <h2 id="catalog-heading" tabIndex={-1} className="typography-headline3 m-0 scroll-mt-24 rounded-8 text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY">元件清單</h2>
            <Tag>{entries.length} 個元件</Tag>
          </div>
          <p className="typography-body1 m-0 mt-12 text-teal-300">從元件、成功準則或角色語意出發，找到你想了解的無障礙實作。</p>
        </div>
      </div>
      <p role="status" aria-atomic="true" className="sr-only">{announcement || `${LABELS[VIEWS.indexOf(activeView)]}${query.trim() ? `，搜尋「${query.trim()}」` : ""}：找到 ${visibleCount} 個元件。`}</p>
      <Tabs label="元件清單檢視方式" onChange={(index) => { setActiveView(VIEWS[index]); setAnnouncement("") }} items={[
        { label: LABELS[0], content: activeView === "overview" && (
          <div>
            {searchControls}
            <ResultSummary count={visibleCount} query={query} />
            {searched.length ? <ul className={GRID}>{searched.map((entry) => <ComponentCard key={entry.slug} entry={entry} query={query} />)}</ul> : <EmptyState />}
          </div>
        ) },
        { label: LABELS[1], content: activeView === "wcag" && (
          <div>
            {searchControls}
            <p className="typography-body1 m-0 mb-20 text-teal-300">查看各條成功準則在哪些元件中有對應說明；同一元件可能出現在多條準則下，元件總數不重複計算。</p>
            <div className="mb-24 grid gap-16 tablet:grid-cols-2">
              <div>
                <label htmlFor="sc-filter" className="typography-strong2 mb-8 block">選擇成功準則</label>
                <Select id="sc-filter" value={sc} onChange={(e) => { setSc(e.target.value); setAnnouncement("") }}>
                  <option value="">所有成功準則</option>
                  {allSc.map((group) => <option key={group.id} value={group.id}>{group.id} {group.name}（{group.entries.length} 個元件）</option>)}
                </Select>
              </div>
              <div>
                <label htmlFor="level-filter" className="typography-strong2 mb-8 block">準則等級</label>
                <Select id="level-filter" value={level} onChange={(e) => { setLevel(e.target.value); setAnnouncement("") }}>
                  <option value="">所有等級</option>
                  {levels.map((item) => <option key={item} value={item}>等級 {item}</option>)}
                </Select>
              </div>
            </div>
            <ResultSummary count={visibleCount} query={query} groupCount={scGroups.length} groupKind="wcag" />
            <GroupedResults groups={scGroups} view="wcag" query={query} />
            <p className="typography-body2 m-0 mt-24 text-teal-300">此處整理元件說明中的 SC 對應，不代表元件已通過完整 WCAG 等級驗證。</p>
          </div>
        ) },
        { label: LABELS[2], content: activeView === "roles" && (
          <div>
            {searchControls}
            <p className="typography-body1 m-0 mb-20 text-teal-300">同一元件可包含多種角色，不同元件也可能共享角色。以下依元件頁介紹的角色整理，包含原生 HTML 的隱含語意與不同變體。</p>
            <div className="mb-24 tablet:max-w-[48rem]">
              <label htmlFor="role-filter" className="typography-strong2 mb-8 block">選擇角色語意</label>
              <Select id="role-filter" value={role} onChange={(e) => { setRole(e.target.value); setAnnouncement("") }}>
                <option value="">所有角色</option>
                {allRoles.map((group) => <option key={group.id} value={group.id}>{group.id}（{group.entries.length} 個元件）</option>)}
              </Select>
            </div>
            <ResultSummary count={visibleCount} query={query} groupCount={roleGroups.length} groupKind="roles" />
            <GroupedResults groups={roleGroups} view="roles" query={query} />
          </div>
        ) },
      ]} />
    </div>
  )
}

function CatalogSearch({ view, query, onQueryChange, onClear }: { view: CatalogView; query: string; onQueryChange: (value: string) => void; onClear: () => void }) {
  const inputId = `catalog-search-${view}`
  const helpId = `search-help-${view}`
  return <search aria-label={`${LABELS[VIEWS.indexOf(view)]}：搜尋元件說明`} className="mb-24 block rounded-24 border border-bg-warm-gray bg-neutral-white p-20 tablet:p-24">
    <label htmlFor={inputId} className="typography-strong1 mb-12 block text-teal-700">搜尋元件與說明內容</label>
    <div className="flex flex-col gap-12 tablet:flex-row tablet:items-center">
      <div className="relative min-w-0 flex-1">
        <SearchIcon className="pointer-events-none absolute left-16 top-1/2 size-20 -translate-y-1/2 text-teal-300" />
        <Input id={inputId} type="search" value={query} onChange={(e) => onQueryChange(e.target.value)} placeholder="例如：Accordion、aria-expanded、2.1.1、焦點" aria-describedby={helpId} className="min-h-48 pl-48" />
      </div>
      <Button variant="small" theme="greenStroke" onClick={onClear} className="min-h-48 shrink-0 self-start tablet:self-auto">清除條件</Button>
    </div>
    <p id={helpId} className="typography-body2 m-0 mt-12 text-teal-300">可搜尋元件名稱、角色、ARIA 屬性、WCAG 編號與 APG 規則內容。</p>
  </search>
}

function ResultSummary({ count, query, groupCount, groupKind }: { count: number; query: string; groupCount?: number; groupKind?: "wcag" | "roles" }) {
  return <p className="typography-body2 m-0 mb-20 text-teal-300">{query.trim() ? `「${query.trim()}」的搜尋結果：` : "目前顯示 "}<strong className="font-bold text-teal-700">{count} 個元件</strong>{groupCount !== undefined ? groupKind === "wcag" ? `，對應 ${groupCount} 條 WCAG SC` : `，包含 ${groupCount} 種角色語意` : ""}</p>
}

function GroupedResults({ groups, view, query }: { groups: CatalogGroup[]; view: "wcag" | "roles"; query: string }) {
  if (!groups.length) return <EmptyState />
  return <div className="flex flex-col gap-40">{groups.map((group) => (
    <section key={group.id}>
      <div className="mb-16 flex flex-wrap items-center gap-12 border-b border-bg-warm-gray pb-12">
        <h3 id={`group-${view}-${group.id}`} className="typography-headline4 m-0 text-teal-700">{view === "wcag" ? `${group.id} ${group.name}` : group.name}</h3>
        {group.level && <Tag>等級 {group.level}</Tag>}
        <span className="typography-body2 text-teal-300">{group.entries.length} 個元件</span>
      </div>
      <ul className={GRID}>{group.entries.map((entry) => <ComponentCard key={entry.slug} entry={entry} query={query} group={group} view={view} />)}</ul>
    </section>
  ))}</div>
}

function ComponentCard({ entry, query, group, view }: { entry: CatalogEntry; query: string; group?: CatalogGroup; view?: "wcag" | "roles" }) {
  const match = matchReason(entry, query)
  const criterion = view === "wcag" ? entry.wcag.find((s) => s.id === group?.id) : undefined
  const section = view === "wcag" ? "wcag" : view === "roles" ? "aria" : match?.section
  const pageHref = appPath(`/${entry.slug}/`)
  const sectionLabel = section === "wcag" ? "查看 WCAG 對應" : section === "aria" ? view === "roles" ? "查看角色與 ARIA 說明" : "查看 ARIA 屬性" : section === "apg" ? "查看 APG 規則" : "查看元件說明"
  const headingId = `component-${view ?? "overview"}-${group?.id ?? "all"}-${entry.slug}`
  const shownRoles = view === "roles" && group ? [group.id] : entry.roles.length === 4 ? entry.roles : entry.roles.slice(0, 3)
  const hiddenRoleCount = view === "roles" ? 0 : entry.roles.length - shownRoles.length
  const mainLink = <Link href={pageHref} aria-label={`${entry.name} 元件說明`} className="text-teal-700 no-underline after:absolute after:inset-0 after:z-0 after:rounded-24 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-orange-PRIMARY">{entry.name}</Link>
  return (
    <li>
      <div className="group relative isolate flex h-full flex-col rounded-24 border border-bg-warm-gray bg-neutral-white p-24 transition-colors hover:border-teal-100 hover:bg-bg-light-off-white">
        <div className="mb-16 flex items-center gap-12 tablet:gap-16">
          <ComponentIllustration slug={entry.slug} />
          <div className="flex min-w-0 flex-1 items-center justify-between gap-8 tablet:gap-12">
            {group ? <h4 id={headingId} className="typography-headline4 m-0 text-teal-700">{mainLink}</h4> : <h3 id={headingId} className="typography-headline4 m-0 text-teal-700">{mainLink}</h3>}
            <ArrowRightIcon className="h-12 w-24 shrink-0 text-teal-300 tablet:w-32" />
          </div>
        </div>
        <p className="typography-body2 m-0 text-teal-300">{entry.summary}</p>
        <div className="mt-20 flex flex-wrap gap-8">
          {shownRoles.map((role) => <span key={role} className="typography-body3 rounded-8 border border-bg-warm-gray px-8 py-4 text-teal-300">{role}</span>)}
          {hiddenRoleCount > 0 && <span className="typography-body3 self-center text-teal-300">+{hiddenRoleCount}</span>}
        </div>
        {criterion && <p className="typography-body2 m-0 mt-16 border-t border-bg-warm-gray pt-16 text-teal-300">{criterion.note}</p>}
        {query.trim() && match && <p className="typography-body2 m-0 mt-16 border-t border-bg-warm-gray pt-16 text-teal-300"><strong className="font-bold text-teal-PRIMARY">{match.label}：</strong>{match.text}</p>}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-8 pt-16">
          <Link href={`${pageHref}${section ? `#${section}` : ""}`} aria-label={`${sectionLabel}：${entry.name}`} className="typography-strong2 relative z-10 -ml-8 inline-flex rounded-8 px-8 py-4 text-teal-PRIMARY no-underline transition-colors hover:bg-bg-light-beige hover:text-teal-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY">{sectionLabel}</Link>
          {view && <span className="typography-body3 text-teal-300">{entry.wcag.length} 條 SC 對應</span>}
        </div>
      </div>
    </li>
  )
}

function EmptyState() {
  return <div className="rounded-24 border border-bg-warm-gray bg-neutral-white p-32 text-center tablet:p-48">
    <p className="typography-headline4 m-0 text-teal-700">沒有符合條件的元件</p>
    <p className="typography-body1 m-0 mt-12 text-teal-300">試試其他關鍵字，或使用上方「清除條件」重新查看所有元件。</p>
  </div>
}
