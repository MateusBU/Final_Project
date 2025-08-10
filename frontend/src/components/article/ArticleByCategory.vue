<template>
    <div class="articles-by-categories">
        <PageTitle icon="far fa-folder"
            :main="category.name" sub="Category"/>
    </div>
</template>

<script>
import { baseApiUrl } from '@/global';
import axios from 'axios';
import PageTitle from '../template/PageTitle.vue';

export default {
    name: 'ArticleByCategory',
    components: {PageTitle},
    data: function(){
        return{
            category: {},
            articles: [],
            page: 1,
            loadMore: true,
        }
    },
    methods:{
        getCategory(){
            const url = `${baseApiUrl}/categories/${this.category.id}`
            axios(url).then(res => this.category = res.data);
        }
    },
    mounted(){
        // console.log(this.$route.params.id); //id from url
        this.category.id = this.$route.params.id;
        this.getCategory();
    }
}
</script>

<style>

</style>