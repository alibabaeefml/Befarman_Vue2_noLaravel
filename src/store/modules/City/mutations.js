import Vue from 'vue'
export default {
    SET_CITIES(state, cities) {
        if (cities.length) {
            Vue.set(state.cities, cities[0].province_id, cities)
        }
    },
    SET_PROVINCES(state, provinces) {
        state.provinces = provinces
    },
}
