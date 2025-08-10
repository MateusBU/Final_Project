<template>
    <div class="category-admin">
        <b-form>
            <input id="category-id" type="hidden" v-model="category.id" />
        
            <b-row>
                <b-form-group label="Name" label-for="category-name"> 
                    <b-form-input id="category-name" type="text"
                    v-model="category.name" required
                    :readonly="mode === 'remove'"
                    :style="mode === 'remove' ? 'background-color: #e0e0e0;' : ''"
                    placeholder="Inform the Category Name"/>
                </b-form-group>
            </b-row>
        
            <b-row class="mt-2">
                <b-form-group label="Category Parent" label-for="parentId-name"> 
                    <b-form-select v-if="mode === 'save'"
                        id="parentId-name"
                        :options="categories" v-model="category.parentId" />
                    <b-form-input v-else
                        id="parentId-name" type="text"
                        v-model="category.path"
                        readonly />
                </b-form-group>
            </b-row>
        </b-form>

        <b-row>
            <b-col xs="12">
                <b-button variant="primary" v-if="mode === 'save'"
                    @click="save">Save</b-button>
                <b-button variant="danger" v-if="mode === 'remove'"
                    @click="remove">Delete</b-button>
                <b-button class="m-2" @click="reset">Cancel</b-button>
            </b-col>
        </b-row>

        <b-table hover striped :items="categories" :fields="fields">
            <template v-slot:cell(actions)="data">
                <b-button variant="warning" @click="loadCategory(data.item)" class="me-2 mb-1">
                    <i class="fa fa-pencil"></i>
                </b-button>
                
                <b-button variant="danger" @click="loadCategory(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { showSuccess, showError } from '@/config/msg'
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
                {key: 'actions', label: 'Actions'}
            ],
        }
    },
    methods:{
        loadCategories(){
            const url = `${baseApiUrl}/categories`;
            axios.get(url).then(res => {
                // this.categories = res.data
                this.categories = res.data.map(category => {
                    return { ...category, value: category.id, text: category.path }
                })
            });
        },
        save(){
            const method = this.category.id ? 'put' : 'post';
            const id = this.category.id ? `/${this.category.id}` : '';
            console.log(method)
            axios[method](`${baseApiUrl}/categories${id}`, this.category)
                .then(() =>{
                    showSuccess();
                    this.reset();
                })
                .catch(err => {
                    showError(err)
                });
        },
        reset(){
            this.mode = 'save';
            this.category = {};
            this.loadCategories();
        },
        remove(){
            const id = this.category.id;
            axios.delete(`${baseApiUrl}/categories/${id}`)
                .then(() =>{
                    showSuccess();
                    this.reset();
                })
                .catch(err => {
                    showError(err)
                });
        },
        loadCategory(category, mode = 'save'){
            this.mode = mode;
            this.category = {
                id: category.id,
                name: category.name,
                parentId: category.parentId,
            }; //load the category data, exclude path
        },
    },
    mounted(){
        this.loadCategories()
    },
}
</script>

<style>

</style>