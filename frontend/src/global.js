import Vue from 'vue';
export const baseApiUrl = 'http://localhost:3000' //backend/index.js -> port 3000

export function showError(e){
    if(e && e.response && e.response.data){
        Vue.toasted.global.showError({msg: e.response.data})
    }
    else if(typeof e === 'string'){
        Vue.toasted.global.showError({msg: e})
    }
    else{
        Vue.toasted.global.showError() //default msg in msg.js
    }
}

export default {baseApiUrl, showError}