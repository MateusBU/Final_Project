<template>
	<div id="app" :class="{'hide-menu': !isMenuVisible || !user}">
		<mainHeader title="Mateus - knowledge base" 
			:hideToggle="!user"
			:hideUserDropdown="!user"	
		/>
		<mainMenu v-if="user"/>
		<PageLoad v-if="validatingToken"/>
		<mainContent v-else/>
		<mainFooter />
	</div>
</template>

<script>
/* eslint-env browser */
import axios from 'axios';
import { baseApiUrl, userKey } from "./global";
import {mapState} from 'vuex';
import mainHeader from './components/template/compHeader.vue';
import mainFooter from './components/template/compFooter.vue';
import mainMenu from './components/template/compMenu.vue';
import mainContent from './components/template/compContent.vue';
import PageLoad from "./components/template/PageLoad.vue";

export default {
	name: "App",
	components: {mainContent, mainHeader, mainMenu, mainFooter, PageLoad},
	computed: mapState(['isMenuVisible', 'user']),
	data: function(){
		return{
			validatingToken: true
		}
	},
	methods:{
		async validateToken(){
			this.validatingToken = true;

			const json = localStorage.getItem(userKey);
			const userData = JSON.parse(json)
			this.$store.commit('setUser' , null)

			if(!userData){ //if there is no data, there is no user to validate token, it goes to auth url
				this.validatingToken = false;
				this.$router.push({name: 'auth'});
				return;
			}

			const res = await axios.post(`${baseApiUrl}/validateToken`, userData);

			if(res.data){
				this.$store.commit('setUser', userData);
			}
			else{
				localStorage.removeItem(userKey);
				this.$router.push({name: 'auth'});
			}

			this.validatingToken = false;
		}
	},
	created(){
		this.validateToken()
	}
}
</script>

<style>
	*{
		font-family: "Lato", sans-serif;
	}

	body{
		margin:0;
	}

	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		height: 100vh;  /*whole screen */
		width: 100vw;
		display: grid;
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns: 300px 1fr;
		grid-template-areas:
			"header header"
			"menu content"
			"menu footer";
	}

	#app.hide-menu{
		grid-template-areas: 
			"header header"
			"content content"
			"footer footer";
	}
</style>