<template>
	<div class="footer">
		<span>Copyright <strong>Mateus</strong></span>
	</div>
</template>

<script>
export default {
	name: 'mainFooter'
}
</script>

<style>
    .footer{
        grid-area: footer;
        background-color: #DDD;
        color: #333;

        display: flex;
        justify-content: flex-end; /*main axis */
        align-items: center; /*cross axis */
        padding-right: 10px;
    }
</style>