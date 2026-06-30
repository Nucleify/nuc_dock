'use client'

import type { JSX } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import type { PositionType } from 'nucleify'
import { AdIcon, NucFriendship, NucShare, NucTerminal } from 'nucleify'

interface NucDockPopoversProps {
  position?: PositionType
  variant?: 'dock' | 'sidebar'
}

export function NucDockPopovers({
  position = 'bottom',
  variant = 'dock',
}: NucDockPopoversProps): JSX.Element {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)
  const isSidebar = variant === 'sidebar'

  return (
    <div
      className={[
        position,
        variant,
        'nuc-dock-popovers',
        isSidebar || isExpanded ? 'expanded' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {!isSidebar ? (
        <button
          type="button"
          className="nuc-dock-popovers-toggle"
          aria-expanded={isExpanded}
          aria-label={t('dock-tools-toggle')}
          onClick={() => setIsExpanded((value) => !value)}
        >
          <AdIcon
            icon={isExpanded ? 'mdi:chevron-down' : 'mdi:chevron-up'}
            size="1.1em"
          />
        </button>
      ) : null}

      <div className="nuc-dock-popovers-panel">
        {isSidebar ? (
          <ul className="nuc-sidebar-list">
            <li className="nuc-sidebar-item">
              <NucShare variant="sidebar" position={position} />
            </li>
            <li className="nuc-sidebar-item">
              <NucFriendship variant="sidebar" position={position} />
            </li>
            <li className="nuc-sidebar-item">
              <NucTerminal variant="sidebar" position={position} />
            </li>
          </ul>
        ) : (
          <>
            <NucShare position={position} />
            <NucFriendship position={position} />
            <NucTerminal position={position} />
          </>
        )}
      </div>
    </div>
  )
}
