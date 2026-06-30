<template>
  <nuc-settings-card :heading="heading || t('settings-dock-style')">
    <ul class="settings-card-item-list">
      <li class="settings-card-item">
        <ad-label :label="t('settings-dock-style')" for="dock-style" />
        <ad-select-button
          id="dock-style"
          :model-value="toolbarStyle"
          :options="styleOptions"
          option-label="label"
          option-value="value"
          ad-type="main"
          @update:model-value="setToolbarStyle"
        />
      </li>
    </ul>
  </nuc-settings-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { NucSettingsCard, useToolbarStyle, type ToolbarStyle } from 'nucleify'

defineProps<{
  heading?: string
}>()

const { t } = useI18n()
const { toolbarStyle, setToolbarStyle } = useToolbarStyle()

const styleOptions = computed(() => [
  { label: t('settings-dock-style-dock'), value: 'dock' as ToolbarStyle },
  {
    label: t('settings-dock-style-sidebar'),
    value: 'sidebar' as ToolbarStyle,
  },
])
</script>
