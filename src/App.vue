<template>
    <v-app>
        <toolbar :currentRoute="currentRouteName" />
        <router-view />
    </v-app>
</template>

<script>
import { mapActions } from "vuex";
import Toolbar from "./components/Global/Toolbar/Toolbar";

export default {
    name: "App",
    components: { Toolbar },
    methods: {
        ...mapActions("Authentication", ["checkIfIsLoggedIn"]),
    },

    computed: {
        currentRouteName() {
            return this.$route.name;
        }
    },

    created() {
        this.checkIfIsLoggedIn();
    },
    watch: {
        '$route'(to, from) {
            document.title = to.meta.title || 'Your Website'
        }
    },
};
</script> 

<style>
</style>
