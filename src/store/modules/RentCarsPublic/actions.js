import { axios } from "we-axios";

export default {
    async setRentCarsPublic({ commit, state }, page) {
        page = page ? page : 1;
        let params = {};
        params.page = page;

        for (let key in state.filters) {
            if (state.filters[key]) {
                if(key === 'begin_date' || key === 'end_date') {
                    params[`filters[${key}]`] = `${state.filters[key]}`;
                } else {
                    params[`filters[${key}]`] = `%${state.filters[key]}%`;
                }
            }
        }
        let response = await axios.get("/v1/car-search", {
            params: params
        });
        if (response.status === 200) {
            commit("SET_RENT_CARS_PUBLIC", response.data.data);
        }
        return response;
    },
    async loadCarsPublic({ commit, state }, page) {
        page = page ? page : 1;
        let params = {};
        params.page = page;

        for (let key in state.filters) {
            if (state.filters[key]) {
                params[`filters[${key}]`] = `%${state.filters[key]}%`;
            }
        }
        let response = await axios.get("/v1/car-search", {
            params: params
        });

        if (response.status === 200) {
            commit("ADD_TO_CARS_PUBLIC", response.data.data);
        }
        return response;
    },

    async searchCarsPublic({ commit }, query) {
        let response = await axios.get("/v1/car-search", {
            params: {
                "filters[name]": `%${query}%`
            }
        });

        if (response.status === 200) {
            commit("SET_RENT_CARS_SEARCH_RESULTS_PUBLIC", response.data.data);
        }

        return response;
    }
};
