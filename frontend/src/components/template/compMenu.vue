<template>
    <aside class="menu" v-show="isMenuVisible">
    <p>Menu visível? </p> <!-- Temporário -->
        <Tree :nodes="treeData" :config="treeOptions" :key="'main-tree'" ref="tree"/>
    </aside>
</template>

<script>
import { mapState } from 'vuex';
import Tree from 'vue3-tree';
import { baseApiUrl } from '@/global';
import axios from 'axios';

export default {
    name: 'mainMenu',
    components: { Tree },
    computed: mapState(['isMenuVisible']),
    data() {
        return {
            treeData: [],
            treeOptions: {
                labelField: 'name',
                keyField: 'id',
            }
        };
    },

    mounted() {
        this.getTreeData();
    },
    methods: {
        async getTreeData() {
            try {
                const url = `${baseApiUrl}/categories/tree`;
                const res = await axios.get(url);
                console.log('Dados recebidos:', res.data);
                this.treeData = res.data;
            } catch (err) {
                console.error('Erro ao carregar dados da árvore:', err);
            }
        },
    }
};
</script>

<style>
    .menu {
        grid-area: menu;
        background: linear-gradient(to right, #232526, #414345);

        display: flex;
        flex-direction: column;
        flex-wrap: wrap; /*break line*/
    }

    .menu a,
    .menu a:hover {
        color: #fff;
        text-decoration: none;
    }

    .menu .tree-node.selected > .tree-content,
    .menu .tree-node .tree-content:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    .tree-arrow.has-child {
        filter: brightness(2);
    }

    .menu .menu-filter {
        display: flex;
        justify-content: center;
        align-items: center;

        margin: 20px;
        padding-bottom: 8px;
        border-bottom: 1px solid #AAA;
    }

    .menu .menu-filter i {
        color: #AAA;
        margin-right: 10px;
    }

    .menu input {
        color: #CCC;
        font-size: 1.3rem;
        border: 0;
        outline: 0;
        width: 100%;
        background: transparent;
    }

    .tree-filter-empty {
        color: #CCC;
        font-size: 1.3rem;
        margin-left: 20px;
    }
</style> 