import { axios } from "we-axios";
import {serialize} from "object-to-formdata";
export default {


    async loadRequests({ commit, state }, page) {
        page = page ? page : 1;
        let params = {};
        params.page = page;

        for (let key in state.filters) {
            if (state.filters[key]) {
                params[`filters[${key}]`] = `%${state.filters[key]}%`;
            }
        }
        let response = await axios.get("/v1/admin/car-request", {
            params
        });
        if (response.status === 200) {
            commit("ADD_TO_REQUEST", response.data.data);
        }
        return response;
    },
    async loadArchiveRequests({ commit, state }, page) {
        page = page ? page : 1;
        let params = {};
        params.page = page;

        for (let key in state.filters) {
            if (state.filters[key]) {
                params[`filters[${key}]`] = `%${state.filters[key]}%`;
            }
        }
        let response = await axios.get("/v1/admin/car-request/archive", {
            params
        });
        if (response.status === 200) {
            commit("ADD_TO_ARCHIVE_REQUEST", response.data.data);
        }
        return response;
    },

    async deleteRequest({ commit }, requestId) {
        let response = await axios.delete(`/v1/admin/car-request/${requestId}`);

        if (response.status === 200) {
            commit("REMOVE_REQUEST", requestId);
        }
        return response;
    },

    async searchUsers({ commit }, query) {
        let response = await axios.get("/v1/admin/users", {
            params: {
                "filters[name]": `%${query}%`,
                "filters[phone]": `%${query}%`,
                "filters[mode]": 'or'
            }
        });

        if (response.status === 200) {
            commit("SET_USERS_SEARCH_RESULT", response.data.data);
        }

        return response;
    },

    async searchRentableCar({ commit }, query) {
        let response = await axios.get("/v1/admin/users", {
            params: {
                "filters[first_name]": `%${query}%`,
                "filters[last_name]": `%${query}%`,
                "filters[mode]": "or"
            }
        });
        if (response.status === 200) {
            commit("SET_USERS_SEARCH_RESULT", response.data.data);
        }
        return response;
    },

    async searchRentCars({ commit, state }, query) {
        let response = await axios.get("/v1/admin/client-car", {
            params: {
                "filters[name]": `%${query}%`,
                "filters[car_number]": `%${query}%`,
                "filters[mode]": "or"
            }
        });
        if (response.status === 200) {
            commit("SET_RENTABLE_CAR_SEARCH_RESULT", response.data.data);
        }
        return response;
    },

    async sendRequests({ commit,dispatch }, Request) {
        let response = await axios.post("/v1/admin/car-request", Request);
        commit("ADD_NEW_REQUEST", response.data.message.content);
        return response;
    },
    async sendPublicRequests({ commit,dispatch }, Request) {
        try {
            let response = await axios.post("/v1/car-request", Request);
            this.$_toggleModal("OrderAlert")
            commit("ADD_NEW_REQUEST", response.data.message.content);
        }catch (e) {
            console.log(e)
        }
    },

    async sendUserRequests({ commit,dispatch }, Request) {
        let response = await axios.post("/v1/web-car-request", Request);
            commit("ADD_NEW_REQUEST", response.data.message.content);
        return response;
    },


    async setCurrentrequest({ commit }, carId) {
        let response = await axios.get(`/v1/admin/car-request/${carId}`);

        if (response.status === 200) {
            commit("SET_CURRENT_REQUEST", response.data.data);
        }

        return response;
    },

    async editRequest({ commit }, newRequest) {
        let response = await axios.put(`/v1/admin/car-request/${newRequest.carId}`,newRequest.requestdata);

        if (response.status === 200) {
            setTimeout(function(){ location.reload() }, 700);

        }
        // return response;
    },
    async rejectRequestByAdmin({ commit,dispatch}, RequestId) {
        let response = await axios.post(`/v1/car-request/admin-reject/${RequestId}`);
        if (response.status === 200) {
            commit("RESET_REQUESTS");
            dispatch('loadRequests')
        }
    },
    async acceptRequestByAdmin({ commit,dispatch}, RequestId) {
        let response = await axios.post(`/v1/car-request/admin-accept/${RequestId}`);
        if (response.status === 200) {
            commit("RESET_REQUESTS");
            dispatch('loadRequests')
        }
    },
    async ChangeTime({ commit }, newRequest) {
        let response = await axios.post(`/v1/admin/car-request/extend-day/${newRequest.carId}`,newRequest.requestdata);
        if (response.status === 200) {
            setTimeout(function(){ location.reload() }, 700);

        }
        // return response;
    },
    async AcceptChangeTimeByAdmin({ commit }, RequestID) {
        let response = await axios.post(`/v1/car-request/change-time/admin-accept/${RequestID}`);
        if (response.status === 200) {
            setTimeout(function(){ location.reload() }, 700);

        }
        // return response;
    },
    async RejectChangeTimeByAdmin({ commit }, RequestID) {
        let response = await axios.post(`/v1/car-request/change-time/admin-reject/${RequestID}`);
        if (response.status === 200) {
            setTimeout(function(){ location.reload() }, 700);

        }
        // return response;
    },
};
