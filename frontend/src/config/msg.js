import { createToastInterface } from 'vue-toastification'
import '@fortawesome/fontawesome-free/css/all.css'

const toast = createToastInterface()

function extractMessageFromError(err, fallback) {
  if (!err) return fallback;

  // Axios-style response payload
  const data = err.response?.data;

  if (typeof data === 'string') return data;
  if (data?.msg && typeof data.msg === 'string') return data.msg;
  if (data?.error && typeof data.error === 'string') return data.error;

  // Generic Error object
  if (err.message && typeof err.message === 'string') return err.message;

  return fallback;
}

export function showSuccess(payload = {}) {
  let msg;

  if (payload instanceof Error || payload?.isAxiosError || payload?.response) {
    // allow passing an error object directly
    msg = extractMessageFromError(payload, '✅ Operation successfully completed!');
  } else {
    msg = payload.msg || '✅ Operation successfully completed!';
  }

  toast.success(msg, { icon: '✅' });
}

export function showError(payload = {}) {
  let msg;

  if (payload instanceof Error || payload?.isAxiosError || payload?.response) {
    msg = extractMessageFromError(payload, '❌ Oops.. unexpected error');
  } else {
    msg = payload.msg || '❌ Oops.. unexpected error';
  }

  toast.error(msg, { icon: '❌' });
}