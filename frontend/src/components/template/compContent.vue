<template>
	<div class="content">
        <!-- Renders the component matching the current route -->
		<router-view></router-view> 
	</div>
</template>

<script>
export default {
	name: 'mainContent'
}
</script>

<style>
    .content{
        grid-area: content;
        background-color: #efefef;
        padding: 20px
    }
</style>