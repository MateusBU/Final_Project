import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

import {
  BCard,
  BTabs,
  BTab,
  BTable,
} from 'bootstrap-vue-next'

export default function setupBootstrap(app) {
  app.component('BCard', BCard)
  app.component('BTabs', BTabs)
  app.component('BTab', BTab)
  app.component('BTable', BTable)
}
