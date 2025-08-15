import { useToast } from 'vue-toastification'

export const baseApiUrl = 'http://localhost:3000'
export const userKey = '__final_project_user'

export function showError(e) {
    const toast = useToast()
    let msg = 'Unexpected error'

    if (e && e.response && e.response.data) {
        msg = e.response.data
    } else if (typeof e === 'string') {
        msg = e
    }

    toast.error(msg)
}

export default { baseApiUrl, showError, userKey }
