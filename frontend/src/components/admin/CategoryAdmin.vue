<template>
    <div class="category-admin">
        <b-form>
            <input id="category-id" type="hidden" v-model="category.id" />
        
            <b-row>
                <b-form-group label="Name" label-for="category-name"> 
                    <b-form-input id="category-name" type="text"
                    v-model="category.name" required
                    placeholder="Inform the Category Name"/>

                </b-form-group>
            </b-row>
        
            <b-row class="mt-2">
                <b-form-group label="Category Parent" label-for="parentId-name"> 
                    <b-form-select id="parentId-name"
                        :options="categoriesOptions"
                        v-model="category.parentId">

                    </b-form-select>

                </b-form-group>
            </b-row>
        </b-form>

        <b-table hover striped :items="categories" :fields="fields">
        </b-table>
    </div>
</template>

<script>
import {baseApiUrl} from '@/global';
import axios from 'axios';

export default {
    name: 'CategoryAdmin',
    data: function(){
        return{
            mode: 'save',
            category: {},
            categories: [],
            fields: [
                {key: 'id', label: 'Code', sortable: true},
                {key: 'name', label: 'Name', sortable: true},
                {
                    key: 'parentId',
                    label: 'Parent',
                    sortable: true,
                    formatter: (value) =>{
                        if(value == null) return '--';
                        const parent = this.categories.find(c => c.id === value);
                        return parent ? parent.name : `Unknown (${value})`;
                    }
                },
                {key: 'path', label: 'Path', sortable: true},
            ],
        }
    },
    methods:{
        loadCategories(){
            const url = `${baseApiUrl}/categories`;
            axios.get(url).then(res => {this.categories = res.data;});
        },
    },
    computed: {
        categoriesOptions() {
            return this.categories.map(c => ({ value: c.id, text: c.name }));
        }
    },
    mounted(){
        this.loadCategories()
    },
}
</script>

<style>

</style>