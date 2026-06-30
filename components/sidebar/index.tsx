'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import type { JSX } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  AdIcon,
  AdLogo,
  checkIsStaff,
  type DockItemInterface,
  getDockItems,
  getToolbarLogoutItem,
  getToolbarNavItems,
  NucDockPopovers,
  sessionStorageGetItem,
} from 'nucleify'

import './_index.scss'

function isStaffOnly(item: DockItemInterface): boolean {
  const url = item.url ?? ''
  return (
    url.endsWith('/admin') ||
    url.endsWith('/structural') ||
    url.endsWith('/translations') ||
    url.endsWith('/builder')
  )
}

export function NucSidebar(): JSX.Element {
  const params = useParams()
  const pathname = usePathname()
  const { t } = useTranslation()
  const [isStaff, setIsStaff] = useState(false)

  const lang = (params?.lang as string) || 'en'
  const dockItems = useMemo(() => getDockItems(lang, t), [lang, t])

  const navItems = useMemo(() => getToolbarNavItems(dockItems), [dockItems])

  const logoutItem = useMemo(() => getToolbarLogoutItem(dockItems), [dockItems])

  useEffect(() => {
    const userRole = sessionStorageGetItem('user_role')
    if (userRole) {
      setIsStaff(checkIsStaff(userRole))
    }
  }, [])

  function isActive(item: DockItemInterface): boolean {
    if (!item.url) return false

    const [path, hash] = item.url.split('#')
    const currentHash =
      typeof window !== 'undefined' ? window.location.hash : ''

    if (hash) {
      return pathname === path && currentHash === `#${hash}`
    }

    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <aside className={`nuc-sidebar${isStaff ? ' staff' : ''}`}>
      <div className="nuc-sidebar-header">
        <Link
          href={`/${lang}/home`}
          className="nuc-sidebar-logo"
          aria-label="Nucleify home"
        >
          <AdLogo adType="main" dimensions={32} />
          <span className="nuc-sidebar-logo-label">Nucleify</span>
        </Link>
      </div>

      <nav className="nuc-sidebar-nav" aria-label="Main navigation">
        <ul className="nuc-sidebar-list">
          {navItems.map((item) => (
            <li
              key={item.label}
              className={[
                'nuc-sidebar-item',
                isActive(item) ? 'is-active' : '',
                isStaffOnly(item) ? 'is-staff-only' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {item.url ? (
                <Link
                  href={item.url}
                  className="nuc-sidebar-link"
                  {...(item.adType ? { 'data-ad-type': item.adType } : {})}
                >
                  {item.icon ? (
                    <AdIcon
                      icon={item.icon}
                      adType={item.adType}
                      size="1.25em"
                    />
                  ) : null}
                  <span>{item.label}</span>
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      </nav>

      <div className="nuc-sidebar-footer">
        <p className="nuc-sidebar-section-label">{t('dock-tools')}</p>
        <NucDockPopovers position="bottom" variant="sidebar" />

        {logoutItem ? (
          <ul className="nuc-sidebar-list">
            <li className="nuc-sidebar-item">
              <button
                type="button"
                className="nuc-sidebar-link is-logout"
                onClick={logoutItem.click}
              >
                {logoutItem.icon ? (
                  <AdIcon icon={logoutItem.icon} size="1.25em" />
                ) : null}
                <span>{logoutItem.label}</span>
              </button>
            </li>
          </ul>
        ) : null}
      </div>
    </aside>
  )
}
