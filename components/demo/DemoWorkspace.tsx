"use client"

import { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import type { A11yNode } from "@/lib/a11y/compute-node"
import { cn } from "@/lib/cn"
import { resolveObservation } from "@/lib/a11y/observation-target"

export type PairInfo = { marker: string; line: "solid" | "dashed" | "dotted"; cardId?: string; demoHeadingId?: string; markerPosition?: "outside-left" | "rail-right"; outlineSelector?: string }
type Observation = PairInfo & { id: string; selector: string; node: A11yNode | null }
type Registration = { id: string; selector: string; requestedMarker?: string; markerPosition?: PairInfo["markerPosition"]; outlineSelector?: string }
type WorkspaceContext = {
  demoHost: HTMLDivElement | null
  observations: Observation[]
  register: (registration: Registration) => void
  update: (id: string, node: A11yNode | null) => void
  unregister: (id: string) => void
}
const Context = createContext<WorkspaceContext | null>(null)

export function pairFor(marker: string): PairInfo {
  return { marker, line: (["solid", "dashed", "dotted"] as const)[(marker.charCodeAt(0) - 65) % 3] }
}

export function PairMarker({ pair, className }: { pair: PairInfo; className?: string }) {
  return <span aria-hidden="true" className={cn(
    "typography-strong2 inline-flex size-28 shrink-0 items-center justify-center leading-none",
    pair.line === "solid" ? "rounded-full bg-teal-PRIMARY text-neutral-white" : pair.line === "dashed" ? "rounded-8 border-2 border-dashed border-teal-PRIMARY bg-neutral-white text-teal-PRIMARY" : "rotate-45 rounded-[0.4rem] border-2 border-dotted border-teal-PRIMARY bg-neutral-white text-teal-PRIMARY",
    className,
  )}><span className={pair.line === "dotted" ? "-rotate-45" : undefined}>{pair.marker}</span></span>
}

export function useDemoHost() {
  return useContext(Context)
}

export function useObservationPair(selector: string, node: A11yNode | null, requestedMarker?: string, markerPosition?: PairInfo["markerPosition"], outlineSelector?: string): PairInfo | undefined {
  const workspace = useContext(Context)
  const id = useId()
  const register = workspace?.register
  const update = workspace?.update
  const unregister = workspace?.unregister

  useEffect(() => {
    register?.({ id, selector, requestedMarker, markerPosition, outlineSelector })
  }, [id, selector, requestedMarker, markerPosition, outlineSelector, register])
  useEffect(() => () => unregister?.(id), [id, unregister])
  useEffect(() => { update?.(id, node) }, [id, node, update])

  return workspace?.observations.find((observation) => observation.id === id)
}

export function DemoWorkspace({ children, title = "互動 Demo", headingId = "interactive-demo-heading", headingLevel = 2, showGuidance = true }: { children: React.ReactNode; title?: string; headingId?: string; headingLevel?: 2 | 3; showGuidance?: boolean }) {
  const Heading = headingLevel === 3 ? "h3" : "h2"
  const dockRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canPin, setCanPin] = useState(false)
  const [demoOverflows, setDemoOverflows] = useState(false)
  const [demoHost, setDemoHost] = useState<HTMLDivElement | null>(null)
  const [observations, setObservations] = useState<Observation[]>([])
  const register = useCallback(({ id, selector, requestedMarker, markerPosition, outlineSelector }: Registration) => {
    setObservations((current) => {
      const existing = current.find((item) => item.id === id)
      if (existing) {
        if (existing.selector === selector && existing.markerPosition === markerPosition && existing.outlineSelector === outlineSelector) return current
        return current.map((item) => item.id === id ? { ...item, selector, markerPosition, outlineSelector } : item)
      }
      const taken = new Set(current.map((item) => item.marker))
      let index = 0
      while (taken.has(String.fromCharCode(65 + index))) index++
      const marker = requestedMarker ?? String.fromCharCode(65 + index)
      return [...current, { id, selector, node: null, ...pairFor(marker), markerPosition, outlineSelector, cardId: `observation-card-${id}`, demoHeadingId: headingId }]
    })
  }, [headingId])
  const update = useCallback((id: string, node: A11yNode | null) => {
    setObservations((current) => {
      const item = current.find((entry) => entry.id === id)
      if (!item || item.node === node) return current
      return current.map((entry) => entry.id === id ? { ...entry, node } : entry)
    })
  }, [])
  const unregister = useCallback((id: string) => setObservations((current) => current.filter((entry) => entry.id !== id)), [])
  const context = useMemo(() => ({ demoHost, observations, register, update, unregister }), [demoHost, observations, register, update, unregister])

  useEffect(() => {
    const dock = dockRef.current
    const layout = dock?.closest("[data-demo-page-layout]") ?? dock?.parentElement?.parentElement
    if (!dock) return
    let frame = 0
    const measure = () => {
      const tocHeight = parseFloat(getComputedStyle(dock).getPropertyValue("--demo-toc-height")) || 0
      setCanPin(window.innerWidth >= 768 && window.innerHeight - tocHeight - 48 >= 320)
      const scroll = scrollRef.current
      setDemoOverflows(!!scroll && scroll.scrollHeight > scroll.clientHeight + 1)
    }
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure) }
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null
    observer?.observe(dock)
    if (scrollRef.current) observer?.observe(scrollRef.current)
    const changes = new MutationObserver(schedule)
    if (layout) changes.observe(layout, { attributes: true, attributeFilter: ["style"] })
    window.addEventListener("resize", schedule)
    measure()
    return () => { cancelAnimationFrame(frame); observer?.disconnect(); changes.disconnect(); window.removeEventListener("resize", schedule) }
  }, [])

  return <Context.Provider value={context}>
    {showGuidance && <div data-demo-guidance className="mb-24 flex flex-col gap-12 rounded-16 border border-bg-warm-gray bg-neutral-white p-16">
      <p className="typography-body2 m-0 text-teal-300">操作 Demo，對照相同字母與框線的屬性卡；也可以用 A、B、C 連結跳到對應卡片。</p>
    </div>}
    <div data-demo-workspace className="grid items-start gap-32 tablet:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] desktop:gap-40">
      <div ref={dockRef} data-demo-dock data-demo-sticky={canPin} className={cn("min-w-0 self-start", canPin && "sticky top-[calc(var(--demo-toc-height,0px)+2.4rem)]")}>
        <section aria-labelledby={headingId} className={cn("flex min-h-0 flex-col rounded-24 border border-bg-warm-gray bg-neutral-white p-20 tablet:p-24", canPin && "max-h-[calc(100dvh-var(--demo-toc-height,0px)-4.8rem)]")}>
          <Heading id={headingId} tabIndex={-1} className="typography-headline3 m-0 scroll-mt-24 rounded-8 text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY">{title}</Heading>
          <div ref={scrollRef} data-demo-scroll data-demo-overflows={demoOverflows} tabIndex={canPin && demoOverflows ? 0 : undefined} role={canPin && demoOverflows ? "region" : undefined} aria-label={canPin && demoOverflows ? "Demo 操作區，可捲動" : undefined} className={cn("-mx-12 mt-12 min-h-0 p-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY", canPin && "overflow-y-auto overscroll-y-contain")}>
            <div ref={setDemoHost} data-demo-host className="relative flex min-w-0 flex-col gap-24" />
          </div>
          <div className="mt-12 flex shrink-0 flex-wrap gap-16 border-t border-bg-warm-gray pt-16" role="group" aria-label="觀察對象標記">
            {observations.map((observation) => <a key={observation.id} href={`#${observation.cardId}`} aria-label={`${title === "互動 Demo" ? "" : `${title}，`}查看標記 ${observation.marker}：${observation.node?.role || "等待觀察目標"} 的屬性`} className="typography-body2 inline-flex items-center gap-8 rounded-8 text-teal-300 underline underline-offset-4 hover:bg-bg-light-beige focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"><PairMarker pair={observation} />{observation.node?.role || "等待觀察目標"}</a>)}
          </div>
        </section>
      </div>
      <div data-demo-reading className="flex min-w-0 flex-col gap-40">{children}</div>
    </div>
    <PairOverlays observations={observations} />
  </Context.Provider>
}

type Box = { id: string; pair: PairInfo; left: number; top: number; width: number; height: number; container: HTMLElement; local: boolean; showMarker: boolean }

function PairOverlays({ observations }: { observations: Observation[] }) {
  const [boxes, setBoxes] = useState<Box[]>([])
  useEffect(() => {
    let frame = 0
    const measure = () => {
      const next: Box[] = []
      for (const item of observations) {
        const target = resolveObservation(item.outlineSelector ?? item.selector).target
        if (!target || target.closest('[hidden], [aria-hidden="true"]')) continue
        if (target.tagName === "DIALOG" && !target.hasAttribute("open")) continue
        const rect = target.getBoundingClientRect()
        if (!rect.width || !rect.height || !target.getClientRects().length) continue
        const modal = target.closest<HTMLDialogElement>("dialog[open]")
        const localHost = modal ? null : target.closest<HTMLElement>("[data-demo-host]")
        const origin = localHost?.getBoundingClientRect()
        const fragments = getComputedStyle(target).display === "inline" ? Array.from(target.getClientRects()) : [rect]
        fragments.filter((fragment) => fragment.width && fragment.height).forEach((fragment, index) => {
          next.push({ id: `${item.id}-${index}`, pair: item, left: fragment.left - (origin?.left ?? 0) - 4, top: fragment.top - (origin?.top ?? 0) - 4, width: fragment.width + 8, height: fragment.height + 8, container: modal ?? localHost ?? target.ownerDocument.body, local: !!localHost, showMarker: index === 0 })
        })
      }
      setBoxes((previous) => previous.length === next.length && previous.every((box, index) => {
        const other = next[index]
        return box.id === other.id && box.left === other.left && box.top === other.top && box.width === other.width && box.height === other.height && box.local === other.local && box.container === other.container && box.pair.markerPosition === other.pair.markerPosition
      }) ? previous : next)
    }
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure) }
    let roots: Document[] = []
    const observer = new MutationObserver((records) => {
      bindRoots()
      if (records.some((record) => !(record.target.nodeType === 1 ? record.target as Element : record.target.parentElement)?.closest("[data-pair-overlay]"))) schedule()
    })
    const resize = typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null
    const onLoad = () => { bindRoots(); schedule() }
    const unbind = () => {
      for (const root of roots) {
        root.removeEventListener("scroll", schedule, true)
        root.removeEventListener("load", onLoad, true)
        root.defaultView?.removeEventListener("resize", schedule)
      }
    }
    const bindRoots = () => {
      const next = [...new Set([document, ...observations.flatMap((item) => resolveObservation(item.selector).documents)])]
      if (next.length === roots.length && next.every((root, index) => root === roots[index])) return
      unbind()
      observer.disconnect()
      resize?.disconnect()
      roots = next
      for (const root of roots) {
        observer.observe(root.body ?? root.documentElement, { childList: true, subtree: true, attributes: true, characterData: true })
        resize?.observe(root.body ?? root.documentElement)
        root.addEventListener("scroll", schedule, true)
        root.addEventListener("load", onLoad, true)
        root.defaultView?.addEventListener("resize", schedule)
      }
    }
    bindRoots()
    measure()
    return () => { cancelAnimationFrame(frame); observer.disconnect(); resize?.disconnect(); unbind() }
  }, [observations])

  return <>{boxes.map((box) => createPortal(
    <div key={box.id} data-pair-overlay={box.pair.marker} aria-hidden="true" className={cn("pointer-events-none inset-0 z-50", box.local ? "absolute" : "fixed overflow-hidden")}>
      <div data-pair-outline={box.pair.marker} className={cn("absolute rounded-8 border-2 border-teal-PRIMARY", box.pair.line === "dashed" ? "border-dashed" : box.pair.line === "dotted" ? "border-dotted" : "border-solid")} style={{ left: box.left, top: box.top, width: box.width, height: box.height }}>
        {box.showMarker && (box.pair.markerPosition === "rail-right" ? <span className="absolute top-1/2 -translate-y-1/2" style={{ left: box.container.clientWidth - box.left - 32 }}><PairMarker pair={box.pair} /></span> : <PairMarker pair={box.pair} className={cn("absolute", box.pair.markerPosition === "outside-left" ? "top-1/2 -left-40 -translate-y-1/2" : cn(box.container.tagName === "BODY" ? "top-12" : "-top-12", box.pair.marker === "A" ? box.container.tagName === "BODY" ? "left-12" : "-left-12" : box.container.tagName === "BODY" ? "right-12" : box.pair.line === "dotted" ? "-right-8" : "-right-12"))} />)}
      </div>
    </div>, box.container, box.id,
  ))}</>
}
