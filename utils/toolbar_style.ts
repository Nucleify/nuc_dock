import { localStorageGetItem } from '../../nuc_stores/localStorage/get_item'
import { localStorageSetItem } from '../../nuc_stores/localStorage/set_item'

export type ToolbarStyle = 'dock' | 'sidebar'

export const TOOLBAR_STYLE_KEY = 'toolbar-style'
export const TOOLBAR_STYLE_EVENT = 'toolbar-style-change'
export const TOOLBAR_MOBILE_BREAKPOINT = 992

export interface ToolbarStyleSnapshot {
  toolbarStyle: ToolbarStyle
  effectiveToolbarStyle: ToolbarStyle
}

export function getToolbarStyle(): ToolbarStyle {
  const saved = localStorageGetItem(TOOLBAR_STYLE_KEY)
  if (saved === 'dock' || saved === 'sidebar') return saved
  return 'sidebar'
}

export function isMobileToolbarViewport(width = window.innerWidth): boolean {
  return width < TOOLBAR_MOBILE_BREAKPOINT
}

export function getEffectiveToolbarStyle(
  style: ToolbarStyle,
  width = typeof window !== 'undefined'
    ? window.innerWidth
    : TOOLBAR_MOBILE_BREAKPOINT
): ToolbarStyle {
  return isMobileToolbarViewport(width) ? 'dock' : style
}

export function normalizeToolbarStyle(value: unknown): ToolbarStyle {
  if (value === 'sidebar' || value === 'dock') return value

  if (typeof value === 'object' && value !== null && 'value' in value) {
    const optionValue = (value as { value: unknown }).value
    if (optionValue === 'sidebar' || optionValue === 'dock') return optionValue
  }

  return getToolbarStyle()
}

const TOOLBAR_STYLE_SERVER_SNAPSHOT: ToolbarStyleSnapshot = {
  toolbarStyle: 'sidebar',
  effectiveToolbarStyle: 'sidebar',
}

let toolbarStyle: ToolbarStyle =
  typeof window !== 'undefined' ? getToolbarStyle() : 'sidebar'
let viewportWidth =
  typeof window !== 'undefined' ? window.innerWidth : TOOLBAR_MOBILE_BREAKPOINT
let cachedSnapshot: ToolbarStyleSnapshot = TOOLBAR_STYLE_SERVER_SNAPSHOT
let listenerCount = 0
const listeners = new Set<() => void>()

function buildSnapshot(): ToolbarStyleSnapshot {
  const effectiveToolbarStyle = getEffectiveToolbarStyle(
    toolbarStyle,
    viewportWidth
  )

  if (
    cachedSnapshot.toolbarStyle === toolbarStyle &&
    cachedSnapshot.effectiveToolbarStyle === effectiveToolbarStyle
  ) {
    return cachedSnapshot
  }

  cachedSnapshot = {
    toolbarStyle,
    effectiveToolbarStyle,
  }

  return cachedSnapshot
}

function notify(): void {
  listeners.forEach((listener) => listener())
}

function onResize(): void {
  if (typeof window === 'undefined') return
  viewportWidth = window.innerWidth
  notify()
}

function onStyleChange(event: Event): void {
  const customEvent = event as CustomEvent<ToolbarStyle>
  toolbarStyle = customEvent.detail ?? getToolbarStyle()
  notify()
}

function attach(): void {
  if (typeof window === 'undefined') return
  toolbarStyle = getToolbarStyle()
  viewportWidth = window.innerWidth
  window.addEventListener('resize', onResize)
  window.addEventListener(TOOLBAR_STYLE_EVENT, onStyleChange)
}

function detach(): void {
  if (typeof window === 'undefined') return
  window.removeEventListener('resize', onResize)
  window.removeEventListener(TOOLBAR_STYLE_EVENT, onStyleChange)
}

export function getToolbarStyleSnapshot(): ToolbarStyleSnapshot {
  return buildSnapshot()
}

export function getToolbarStyleServerSnapshot(): ToolbarStyleSnapshot {
  return TOOLBAR_STYLE_SERVER_SNAPSHOT
}

export function subscribeToolbarStyle(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange)
  listenerCount += 1

  if (listenerCount === 1) {
    attach()
  }

  return () => {
    listeners.delete(onStoreChange)
    listenerCount -= 1

    if (listenerCount === 0) {
      detach()
    }
  }
}

export function setToolbarStyle(style: unknown): void {
  const normalized = normalizeToolbarStyle(style)
  toolbarStyle = normalized
  localStorageSetItem(TOOLBAR_STYLE_KEY, normalized)

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent<ToolbarStyle>(TOOLBAR_STYLE_EVENT, { detail: normalized })
    )
  }

  notify()
}
