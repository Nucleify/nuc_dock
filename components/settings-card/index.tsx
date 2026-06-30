'use client'

import type { JSX } from 'react'
import { useMemo } from 'react'

import {
  AdLabel,
  AdSelectButton,
  NucSettingsCard,
  type ToolbarStyle,
  t,
  useToolbarStyle,
} from 'nucleify'

export interface NucDockSettingsCardInterface {
  heading?: string
}

export function NucDockSettingsCard({
  heading,
}: NucDockSettingsCardInterface): JSX.Element {
  const { toolbarStyle, setToolbarStyle } = useToolbarStyle()

  const styleOptions = useMemo(
    () => [
      {
        label: t('settings-dock-style-dock'),
        value: 'dock' as ToolbarStyle,
      },
      {
        label: t('settings-dock-style-sidebar'),
        value: 'sidebar' as ToolbarStyle,
      },
    ],
    []
  )

  return (
    <NucSettingsCard heading={heading || t('settings-dock-style')}>
      <ul className="settings-card-item-list">
        <li className="settings-card-item">
          <AdLabel label={t('settings-dock-style')} forInput="dock-style" />
          <AdSelectButton
            adType="main"
            value={toolbarStyle}
            options={styleOptions}
            optionLabel="label"
            optionValue="value"
            onChange={(event) => {
              const value = event.value
              if (value === 'dock' || value === 'sidebar') {
                setToolbarStyle(value)
              }
            }}
          />
        </li>
      </ul>
    </NucSettingsCard>
  )
}
