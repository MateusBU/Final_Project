<template>
	<div id="app" :class="{'hide-menu': !isMenuVisible}">
		<mainHeader title="Mateus - knowledge base" :hideToggle="false"/>
		<mainMenu />
		<mainContent />
		<mainFooter />
	</div>
</template>

<script>
import {mapState} from 'vuex';
import mainHeader from './components/template/compHeader.vue';
import mainFooter from './components/template/compFooter.vue';
import mainMenu from './components/template/compMenu.vue';
import mainContent from './components/template/compContent.vue';
export default {
	name: "App",
	components: {mainContent, mainHeader, mainMenu, mainFooter},
	computed: mapState(['isMenuVisible'])
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