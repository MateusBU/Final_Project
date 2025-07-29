import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

import {
  BCard,
  BTabs,
  BTab,
  BTable,
  BForm,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BButton,
} from 'bootstrap-vue-next'

export default function setupBootstrap(app) {
  app.component('BCard', BCard)
  app.component('BTabs', BTabs)
  app.component('BTab', BTab)
  app.component('BTable', BTable)
  app.component('BForm', BForm)
  app.component('BRow', BRow)
  app.component('BCol', BCol)
  app.component('BFormGroup', BFormGroup)
  app.component('BFormInput', BFormInput)
  app.component('BFormCheckbox', BFormCheckbox)
  app.component('BButton', BButton)
}
