<template>
  <div
    class="nuc-dock-popovers"
    :class="[position, variant, { expanded: variant === 'sidebar' || isExpanded }]"
  >
    <button
      v-if="variant !== 'sidebar'"
      type="button"
      class="nuc-dock-popovers-toggle"
      :aria-expanded="isExpanded"
      :aria-label="t('dock-tools-toggle')"
      @click="isExpanded = !isExpanded"
    >
      <ad-icon
        :icon="isExpanded ? 'mdi:chevron-down' : 'mdi:chevron-up'"
        size="1.1em"
      />
    </button>

    <div class="nuc-dock-popovers-panel">
      <ul v-if="variant === 'sidebar'" class="nuc-sidebar-list">
        <li class="nuc-sidebar-item">
          <nuc-share variant="sidebar" :position="position" />
        </li>
        <li class="nuc-sidebar-item">
          <nuc-friendship variant="sidebar" :position="position" />
        </li>
        <li class="nuc-sidebar-item">
          <nuc-terminal variant="sidebar" :position="position" />
        </li>
      </ul>

      <template v-else>
        <nuc-share :position="position" />
        <nuc-friendship :position="position" />
        <nuc-terminal :position="position" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import type { PositionType } from 'nucleify'

withDefaults(
  defineProps<{
    position?: PositionType
    variant?: 'dock' | 'sidebar'
  }>(),
  {
    position: 'bottom',
    variant: 'dock',
  }
)

const { t } = useI18n()
const isExpanded = ref(false)
</script>
