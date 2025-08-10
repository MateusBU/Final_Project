<template>
    <div class="articles-by-categories">
        <PageTitle icon="far fa-folder"
            :main="category.name" sub="Category"/>

        <ul>
            <li v-for="article in articles" :key="article.id">
                {{ article.name }}
            </li>
        </ul>
        <div class="load-more">
            <button v-if="loadMore" 
            class="btn btn-lg btn-outline-primary"
            @click="getArticles">Load More Articles</button>
        </div>
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
            const url = `${baseApiUrl}/categories/${this.category.id}`;
            axios(url).then(res => this.category = res.data);
        },
        getArticles(){
            const url = `${baseApiUrl}/categories/${this.category.id}/articles?page=${this.page}`;
            axios(url).then(res => {
                this.articles = this.articles.concat(res.data);
                this.page++;

                if(res.data.length === 0){ //there is no data (article)
                    this.loadMore = false;
                } 
            });
        }
    },
    mounted(){
        // console.log(this.$route.params.id); //id from url
        this.category.id = this.$route.params.id;
        this.getCategory();
        this.getArticles();
    }
}
</script>

<style>
    .articles-by-categories ul{
        list-style-type: none;
        padding: 0px;
    }

    .articles-by-categories .load-more{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 25px;
    }
</style>