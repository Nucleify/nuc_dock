// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { ref } from 'vue'

import type { DockItemInterface } from 'atomic'
import { logout } from 'atomic'

const createDockItem = (
  icon?: string,
  label?: string,
  url?: string,
  className?: string,
  adType?: string,
  click?: () => void,
  logo?: boolean
): DockItemInterface =>
  ({
    icon,
    label,
    url,
    class: className,
    adType,
    click,
    logo,
  }) as const

function getDockData(lang: string): readonly DockItemInterface[] {
  return [
    [undefined, 'Home', `/${lang}/home`, undefined, undefined, undefined, true],
    ['prime:crown', 'Admin Panel', `/${lang}/admin`, undefined, 'admin'],
    [
      'prime:sitemap',
      'Structural',
      `/${lang}/structural`,
      undefined,
      'structural',
    ],
    ['prime:box', 'Entities', `/${lang}/entities`, undefined, 'entities'],
    ['prime:file', 'Files', `/${lang}/files`, undefined, 'files'],
    ['prime:calendar', 'Calendar', undefined, 'disabled-item'],
    [
      'prime:history',
      'Activities',
      `/${lang}/activity-log`,
      undefined,
      'activity-log',
    ],
    [
      'prime:cog',
      'Settings',
      `/${lang}/settings#modules`,
      undefined,
      'settings',
    ],
    ['prime:sign-out', 'Logout', undefined, undefined, undefined, logout],
    [undefined, 'position', undefined, 'position'],
  ] as const
}

export function getDockItems(lang: string): readonly DockItemInterface[] {
  return getDockData(lang).map(
    ([
      icon,
      label,
      url,
      className,
      adType,
      click,
      logo,
    ]): readonly DockItemInterface[] =>
      createDockItem(icon, label, url, className, adType, click, logo)
  )
}
