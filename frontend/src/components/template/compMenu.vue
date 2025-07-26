<template>
	<aside class="menu" v-show="isMenuVisible">
		
	</aside>
</template>

<script>
import {mapState} from 'vuex' //responsible to map atribute from store 

export default {
	name: 'mainMenu',
    computed: mapState(['isMenuVisible'])
}
</script>

<style>
    .menu{
        grid-area: menu;
        background: linear-gradient(to right, #232526, #414345);

        display: flex;
        flex-direction: column;
        flex-wrap: wrap; /*break line */
    }
</style>