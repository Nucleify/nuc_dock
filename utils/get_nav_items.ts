import type { DockItemInterface } from 'nucleify'

export function getToolbarNavItems(
  items: readonly DockItemInterface[]
): DockItemInterface[] {
  return items.filter(
    (item) => item.label !== 'position' && !item.logo && !item.click
  )
}

export function getToolbarLogoutItem(
  items: readonly DockItemInterface[]
): DockItemInterface | undefined {
  return items.find((item) => item.click && !item.url)
}
