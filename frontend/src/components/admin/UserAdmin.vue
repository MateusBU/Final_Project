<template>
    <div class="user-admin">
        <b-table hover striped :items="users" :fields="fields"></b-table>
    </div>
</template>

<script>
import {baseApiUrl} from '@/global';
import axios from 'axios';

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
                console.log(this.users);
            })
        }
    },
    mounted(){
        this.loadUsers()
    }
}
</script>

<style>

</style>