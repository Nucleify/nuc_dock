'use client'

import { useSyncExternalStore } from 'react'

import {
  getToolbarStyleServerSnapshot,
  getToolbarStyleSnapshot,
  setToolbarStyle,
  subscribeToolbarStyle,
  type ToolbarStyle,
} from './toolbar_style'

export function useToolbarStyle(): {
  toolbarStyle: ToolbarStyle
  effectiveToolbarStyle: ToolbarStyle
  setToolbarStyle: (style: unknown) => void
} {
  const snapshot = useSyncExternalStore(
    subscribeToolbarStyle,
    getToolbarStyleSnapshot,
    getToolbarStyleServerSnapshot
  )

  return {
    toolbarStyle: snapshot.toolbarStyle,
    effectiveToolbarStyle: snapshot.effectiveToolbarStyle,
    setToolbarStyle,
  }
}

export * from './toolbar_style'
