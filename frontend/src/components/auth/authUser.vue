<template>
    <div class="auth-content">
        <div class="auth-modal">
            <img src="@/assets/logo.png" alt="Logo" width="200">
            <hr>
            <div class="auth-title">{{ showSignup ? 'Register' : 'Login' }}</div>

            <input v-if="showSignup" type="text" v-model="user.name" placeholder="User Name">
            <input type="text" name="email" v-model="user.email" placeholder="User E-mail">

            <input type="password" name="password" v-model="user.password" placeholder="User Password">
            <input v-if="showSignup" type="password" v-model="user.confirmPassword" placeholder="Confirm Password">

            <button v-if="showSignup" @click="signup">Register</button>
            <button v-else @click="signin">Login</button>

            <a href @click.prevent="showSignup = !showSignup">
                <span v-if="showSignup">Already registered? Log in here</span>
                <span v-else>Don't have an account? Register now</span>
            </a>
        </div>
    </div>
</template>

<script>
/* eslint-env browser */

import { baseApiUrl, showError, userKey } from '@/global';
import axios from 'axios';
import { showSuccess } from '@/config/msg'

export default {
    name: 'AuthUser',
    data: function(){
        return{
            showSignup: false, //shows signup or signin (login)
            user: {}
        }
    },
    methods:{
        signin(){
            axios.post(`${baseApiUrl}/signin`, this.user)
                .then(res =>{
                    this.$store.commit('setUser', res.data); //localStorage. storage in the browser, so the login is saved
                    //object -> string and save it
                    localStorage.setItem(userKey, JSON.stringify(res.data));
                    this.$router.push({path: '/'}); //navigation to the main url
                })
                .catch(showError)
        },
        signup(){
            axios.post(`${baseApiUrl}/signup`, this.user)
                .then(() =>{
                    showSuccess();
                    this.user = {};
                    this.showSignup = false;
                })
                .catch(showError)
        }
    }
}
</script>

<style>
    .auth-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-modal {
        background-color: #FFF;
        width: 350px;
        padding: 35px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-title {
        font-size: 1.2rem;
        font-weight: 100;
        margin-top: 10px;
        margin-bottom: 15px;
    }

    .auth-modal input {
        border: 1px solid #BBB;
        width: 100%;
        margin-bottom: 15px;
        padding: 3px 8px;
        outline: none;
        border-radius: 5px;
    }

    .auth-modal button {
        align-self: flex-end;
        background-color: #2460ae;
        color: #FFF;
        padding: 5px 15px;
        border-radius: 5px;
    }

    .auth-modal a {
        margin-top: 35px;
    }

    .auth-modal hr {
        border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right,
            rgba(120, 120, 120, 0),
            rgba(120, 120, 120, 0.75),
            rgba(120, 120, 120, 0));
    }
</style>