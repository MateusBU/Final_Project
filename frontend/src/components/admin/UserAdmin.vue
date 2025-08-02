<template>
    <div class="user-admin">
        <b-form>
            <input id="user-id" type="hidden" v-model="user.id" />
            <b-row>
                <b-col md="6" sm="12"> <!--small devices or smaller 12 columns, medium devices or bigger 6-->
                    <b-form-group label="Name:" label-for="user-name">
                        <b-form-input id="user-name" type="text"
                        v-model="user.name" required
                        :readonly="mode === 'remove'"
                        :style="mode === 'remove' ? 'background-color: #e0e0e0;' : ''"
                        placeholder="Inform the User Name"/>
                    </b-form-group>
                </b-col>

                <b-col md="6" sm="12"> <!--small devices or smaller 12 columns, medium devices or bigger 6-->
                    <b-form-group label="E-mail:" label-for="user-email">
                        <b-form-input id="user-email" type="text"
                        v-model="user.email" required
                        :readonly="mode === 'remove'"
                        :style="mode === 'remove' ? 'background-color: #e0e0e0;' : ''"
                        placeholder="Inform the User E-mail"/>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-form-checkbox id="user-admin" v-show="mode === 'save'"
                v-model="user.admin" class="mt-3 mb-3">
                Administrator?
            </b-form-checkbox>

            <b-row v-show="mode === 'save'">
                <b-col md="6" sm="12"> <!--small devices or smaller 12 columns, medium devices or bigger 6-->
                    <b-form-group label="Password:" label-for="user-password">
                        <b-form-input id="user-password" type="password"
                        v-model="user.password" required
                        placeholder="Inform the User Password"/>
                    </b-form-group>
                </b-col>

                <b-col md="6" sm="12"> <!--small devices or smaller 12 columns, medium devices or bigger 6-->
                    <b-form-group label="Password Cofirmation:" label-for="user-confirm-password">
                        <b-form-input id="user-confirm-password" type="password"
                        v-model="user.confirmPassword" required
                        placeholder="Confirm the User Password"/>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" v-if="mode === 'save'"
                        @click="save">Save</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'"
                        @click="remove">Delete</b-button>
                    <b-button class="m-2" @click="reset">Cancel</b-button>
                </b-col>
            </b-row>

        </b-form>
        <hr>
        <b-table hover striped :items="users" :fields="fields">
            <template v-slot:cell(actions)="data">
                <b-button variant="warning" @click="loadUser(data.item)" class="me-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                
                <b-button variant="danger" @click="loadUser(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import {baseApiUrl} from '@/global';
import axios from 'axios';
import { showSuccess, showError } from '@/config/msg'

export default {
    name: 'UserAdmin',
    data: function(){ //points ot a function that returns an object
        return{
            mode: 'save',
            user: {},
            users: [],
            fields: [
                {key: 'id', label: 'Code', sortable: true},
                {key: 'name', label: 'Name', sortable: true},
                {key: 'email', label: 'E-mail', sortable: true},
                {key: 'admin', label: 'Admin', sortable: true,
                    formatter: value => value ? 'Yes' : 'No'},
                {key: 'actions', label: 'Actions'}
            ],
        }
    },
    methods:{
        //TODO pagination
        loadUsers(){
            const url = `${baseApiUrl}/users`;
            axios.get(url).then(res => {
                this.users = res.data;
                
            })
        },
        save() {
            const method = this.user.id ? 'put' : 'post'; //if there is id, the method is put otherwise post
            const id = this.user.id ? `/${this.user.id}` : '';
            console.log(this.user)
            axios[method](`${baseApiUrl}/users${id}`, this.user)
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
            this.user = {};
            this.loadUsers();
        },
        remove(){
            const id = this.user.id;
            axios.delete(`${baseApiUrl}/users/${id}`)
                .then(() =>{
                    showSuccess();
                    this.reset();
                })
                .catch(err => {
                    showError(err)
                });
        },
        loadUser(user, mode = 'save'){
            this.mode = mode;
            this.user = {...user}; //load the user data
        },
    },
    mounted(){
        this.loadUsers()
    }
}
</script>

<style>

</style>