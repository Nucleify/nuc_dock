// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { ref } from 'vue'
import type { Composer } from 'vue-i18n'

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

function getDockData(
  lang: string,
  t: Composer['t']
): readonly DockItemInterface[] {
  return [
    [
      undefined,
      t('dock-home'),
      `/${lang}/home`,
      undefined,
      undefined,
      undefined,
      true,
    ],
    ['prime:crown', t('dock-admin'), `/${lang}/admin`, undefined, 'admin'],
    [
      'prime:sitemap',
      t('dock-structural'),
      `/${lang}/structural`,
      undefined,
      'structural',
    ],
    [
      'prime:box',
      t('dock-entities'),
      `/${lang}/entities`,
      undefined,
      'entities',
    ],
    ['prime:file', t('dock-files'), `/${lang}/files`, undefined, 'files'],
    ['prime:calendar', t('dock-calendar'), undefined, 'disabled-item'],
    [
      'prime:history',
      t('dock-activities'),
      `/${lang}/activity-log`,
      undefined,
      'activity-log',
    ],
    [
      'prime:cog',
      t('dock-settings'),
      `/${lang}/settings#modules`,
      undefined,
      'settings',
    ],
    [
      'prime:sign-out',
      t('dock-logout'),
      undefined,
      undefined,
      undefined,
      logout,
    ],
    [undefined, 'position', undefined, 'position'],
  ] as const
}

export function getDockItems(
  lang: string,
  t: Composer['t']
): readonly DockItemInterface[] {
  return getDockData(lang, t).map(
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
