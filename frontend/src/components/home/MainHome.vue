<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Dashboard"
            sub="Knowledge Base"
        />
        <div class="stats">
            <mainStat title="Categories" :value="stat.categories"
                icon="fa fa-folder" color="#d54d50"
            />
            <mainStat title="Articles" :value="stat.articles"
                icon="fa fa-file" color="#3bc480"
            />
            <mainStat title="Users" :value="stat.users"
                icon="fa fa-user" color="#3282cd"
            />
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle.vue'
import mainStat from './mainStat.vue';
import axios from 'axios'; //request to our backend
import {baseApiUrl} from '@/global';

export default {
    name: 'MainHome',
    components: {PageTitle, mainStat},
    data: function(){
        return {
            stat:{}
        }
    },
    methods:{
        getStats(){
            console.log('oi')
            axios.get(`${baseApiUrl}/stats`)
                .then(res => this.stat = res.data);

            console.log(this.stat)
        }
    },
    mounted(){
        this.getStats();
    }
}
</script>

<style>
    .stats{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    
</style>