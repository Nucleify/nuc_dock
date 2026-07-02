<template>
  <aside class="nuc-sidebar" :class="{ staff: isStaff }">
    <div class="nuc-sidebar-header">
      <nuxt-link
        :to="`/${lang}/home`"
        class="nuc-sidebar-logo"
        aria-label="Nucleify home"
      >
        <ad-logo nui-type="main" :dimensions="32" />
        <span class="nuc-sidebar-logo-label">Nucleify</span>
      </nuxt-link>
    </div>

    <nav class="nuc-sidebar-nav" aria-label="Main navigation">
      <ul class="nuc-sidebar-list">
        <li
          v-for="item in navItems"
          :key="item.label"
          class="nuc-sidebar-item"
          :class="{
            'is-active': isActive(item),
            'is-staff-only': isStaffOnly(item),
          }"
        >
          <nuxt-link
            v-if="item.url"
            :to="item.url"
            class="nuc-sidebar-link"
            :nui-type="item.nuiType"
          >
            <ad-icon
              v-if="item.icon"
              :icon="item.icon"
              :nui-type="item.nuiType"
              size="1.25em"
            />
            <span>{{ item.label }}</span>
          </nuxt-link>
        </li>
      </ul>
    </nav>

    <div class="nuc-sidebar-footer">
      <p class="nuc-sidebar-section-label">{{ t('dock-tools') }}</p>
      <nuc-dock-popovers position="bottom" variant="sidebar" />

      <ul v-if="logoutItem" class="nuc-sidebar-list">
        <li class="nuc-sidebar-item">
          <button
            type="button"
            class="nuc-sidebar-link is-logout"
            @click="logoutItem.click"
          >
            <ad-icon
              v-if="logoutItem.icon"
              :icon="logoutItem.icon"
              size="1.25em"
            />
            <span>{{ logoutItem.label }}</span>
          </button>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import {
  checkIsStaff,
  getDockItems,
  getToolbarLogoutItem,
  getToolbarNavItems,
  NucDockPopovers,
  sessionStorageGetItem,
  type DockItemInterface,
} from 'nucleify'

const route = useRoute()
const { t } = useI18n()
const isStaff = ref(false)

const lang = computed(() => (route.params.lang as string) || 'en')

const navItems = computed(() => getToolbarNavItems(getDockItems(lang.value, t)))

const logoutItem = computed(() =>
  getToolbarLogoutItem(getDockItems(lang.value, t))
)

function isStaffOnly(item: DockItemInterface): boolean {
  const url = item.url ?? ''
  return (
    url.endsWith('/admin') ||
    url.endsWith('/structural') ||
    url.endsWith('/translations') ||
    url.endsWith('/builder')
  )
}

function isActive(item: DockItemInterface): boolean {
  if (!item.url) return false

  const [path, hash] = item.url.split('#')
  const currentPath = route.path
  const currentHash = route.hash

  if (hash) {
    return currentPath === path && currentHash === `#${hash}`
  }

  return currentPath === path || currentPath.startsWith(`${path}/`)
}

onMounted(() => {
  isStaff.value = checkIsStaff(sessionStorageGetItem('user_role')!)
})
</script>

<style lang="scss">
@import 'index';
</style>
