import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify);

export default new Vuetify({
    rtl: true,
    theme: {
        options: {
            customProperties: true,
        },
    },
})
