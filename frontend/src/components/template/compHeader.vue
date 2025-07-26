<template>
	<header class="header">
		<a class="toggle" @click="toggleMenu" v-if="!hideToggle">
            <i class="fa fa-lg" :class="icon"></i>
        </a>
        <h1 class="title">
            <router-link to="/">
                {{ title }}
            </router-link>
        </h1>
        <userDropdown v-if="!hideUserDropdown"/>
	</header>
</template>

<script>
import UserDropdown from "./userDropdown.vue";

export default {
	name: 'mainHeader',
    components: {UserDropdown},
    // Props are passed from the parent component
    props:{
        title: String,
        hideToggle: Boolean,
        hideUserDropdown: Boolean
    },
    // Computed properties are cached and only re-evaluated
    // when their reactive dependencies change.
    computed:{
        // This returns a fixed icon class for now.
        icon(){
            return this.$store.state.isMenuVisible ? "fa-angle-left" : "fa-angle-down";
        }
    }
   ,
   methods:{
    //this.$store ->  is the standard way to access that object inside any Vue component.
        toggleMenu(){
            //this.$store.commit('toggleMenu', true) params isVisible receives true
            this.$store.commit('toggleMenu')
        }
   } 
}
</script>

<style>
    .header{
        grid-area: header;
        background: linear-gradient(to right, #1e469a, #49a7c1);

        display: flex;
        justify-content: center; /*main axis */
        align-items: center; /*cross axis */
    }

    .title{
        font-size: 1.2rem;
        color: #fff;
        font-weight: 100;
        flex-grow: 1;
        text-align: center;
    }

    .title a{
        color: #FFF;
        text-decoration: none;
    }

    .title a:hover{
        color: #FFF;
        text-decoration: none;
        
    }

    header{
        color:#1e469a;
    }

    header.header > a.toggle{
        width: 60px;
        height: 100%;
        color: #fff;

        justify-self: flex-start;
        text-decoration: none;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    header.header > a.toggle:hover{
        color: #fff;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 10%;
    }
</style>