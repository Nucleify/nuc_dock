import type { App } from 'vue'

import { NucDock, NucDockSettingsCard, NucSidebar } from 'nucleify'

export function registerNucDock(app: App<Element>): void {
  app.component('nuc-dock', NucDock)
  app.component('nuc-sidebar', NucSidebar)
  app.component('nuc-dock-settings-card', NucDockSettingsCard)
}
