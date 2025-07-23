<template>
	<aside class="menu">
		
	</aside>
</template>

<script>
export default {
	name: 'mainMenu'
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