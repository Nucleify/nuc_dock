import type { Ref } from 'vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'

import {
  getToolbarStyleSnapshot,
  setToolbarStyle,
  subscribeToolbarStyle,
  type ToolbarStyle,
  type ToolbarStyleSnapshot,
} from './toolbar_style'

export function useToolbarStyle(): {
  toolbarStyle: Ref<ToolbarStyle>
  effectiveToolbarStyle: Ref<ToolbarStyle>
  setToolbarStyle: (style: unknown) => void
} {
  const snapshot = ref<ToolbarStyleSnapshot>(getToolbarStyleSnapshot())
  let unsubscribe: (() => void) | undefined

  const toolbarStyle = computed(() => snapshot.value.toolbarStyle)
  const effectiveToolbarStyle = computed(
    () => snapshot.value.effectiveToolbarStyle
  )

  onMounted(() => {
    snapshot.value = getToolbarStyleSnapshot()
    unsubscribe = subscribeToolbarStyle(() => {
      snapshot.value = getToolbarStyleSnapshot()
    })
  })

  onUnmounted(() => {
    unsubscribe?.()
  })

  return {
    toolbarStyle,
    effectiveToolbarStyle,
    setToolbarStyle,
  }
}

export * from './toolbar_style'
