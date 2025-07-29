import { createToastInterface } from 'vue-toastification'
import '@fortawesome/fontawesome-free/css/all.css'

const toast = createToastInterface()

export function showSuccess(payload = {}) {
  const msg = payload.msg || '✅ Operation successfully completed!'
  toast.success(msg, { icon: '✅' })
}

export function showError(payload = {}) {
  const msg = payload.msg || '❌ Oops.. unexpected error'
  toast.error(msg, { icon: '❌' })
}
