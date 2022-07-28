import { axios } from "we-axios";

export default {
    async loadProvinces({ commit }) {
        let response = await axios.get("/v1/provinces");
        commit("SET_PROVINCES", response.data.data);
    },

    async loadCities({ commit }, provinceId) {
        let response = await axios.get("/v1/cities/" + provinceId);
        commit("SET_CITIES", response.data.data);
    },

};
