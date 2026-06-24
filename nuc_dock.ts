import type { App } from 'vue'

import { NucDock } from 'nucleify'

export function registerNucDock(app: App<Element>): void {
  app.component('nuc-dock', NucDock)
}
