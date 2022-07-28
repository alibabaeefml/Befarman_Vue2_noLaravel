import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store.js";
import vuetify from "./plugins/vuetify";
import style from "./assets/Style/style.css";
import { ApiService } from "./services/api.services.js";
import "./utils/baseComponents.js";

if (localStorage.getItem("access_token")) {
    ApiService.setAuthHeader();
}

import InfiniteLoading from "vue-infinite-loading";
Vue.use(InfiniteLoading, {
    slots: {
        noMore: "آیتم دیگری وجود ندارد.",
        noResults: "آیتم دیگری برای نمایش وجود ندارد.",
        error: "مشکلی در بارگزاری آیتم ها پیش آمده است."
    }
});

import Axios from "we-axios";
Vue.use(Axios, {
    base_uri: "https://app.befarman.com/api"
});

import Auth from "wa-auth";
Vue.use(Auth);


import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

Vue.use(VueMoment, {
    moment,
})


import $_getData from "./mixins/getData";
Vue.mixin($_getData);

import $_mixin from "./mixins";
Vue.mixin($_mixin);

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);


Vue.config.productionTip = false;

new Vue({
    style,
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");
