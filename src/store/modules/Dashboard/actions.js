import { axios } from "we-axios";

export default {
    async loadCarsCount({ commit }) {
        let response = await axios.get("/v1/cars-count");
        if (response.status === 201 || 200) {
            commit("GET_CARS_COUNT", response.data.data.cars_count);
        }
        return response;
    },
    async loadRequestsCount({ commit }) {
        let response = await axios.get("/v1/requests-count");
        if (response.status === 201 || 200) {
            commit("GET_REQUESTS_COUNT", response.data.data.requests_count);
        }
        return response;
    },
};
