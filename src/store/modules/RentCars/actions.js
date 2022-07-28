import { axios } from "we-axios";
import { serialize } from "object-to-formdata";

export default {
    async setRentCars({ commit, state }, page) {
        page = page ? page : 1;
        let params = {};
        params.page = page;

        for (let key in state.filters) {
            if (state.filters[key]) {
                params[`filters[${key}]`] = `%${state.filters[key]}%`;
            }
        }
        let response = await axios.get("/v1/admin/client-car", {
            params: params
        });
        if (response.status === 200) {
            commit("SET_RENT_CARS", response.data.data);
        }
        return response;
    },
    async restoreCar({commit}, carId) {
        let response = await axios.post("/v1/admin/client-car/" + carId + '/restore');
        if (response.status === 200) {
            commit("REMOVE_ARCHIVE_RENT_CAR", response.data.data.id);
        }
        return response;
    },
    async loadCars({ commit, state }, page) {
        page = page ? page : 1;
        let params = {};
        params.page = page;
        for (let key in state.filters) {
            if (state.filters[key]) {
                params[`filters[${key}]`] = `%${state.filters[key]}%`;
            }
        }
        let response = await axios.get("/v1/admin/client-car", {
            params: params
        });

        if (response.status === 200) {
            commit("ADD_TO_CARS", response.data.data);
        }
        return response;
    },
    async loadArchiveCars({ commit, state }, page) {
        page = page ? page : 1;
        let params = {};
        params.page = page;
        for (let key in state.filters) {
            if (state.filters[key]) {
                params[`filters[${key}]`] = `%${state.filters[key]}%`;
            }
        }
        let response = await axios.get("/v1/admin/client-car/archive", {
            params: params
        });

        if (response.status === 200) {
            commit("ADD_TO_ARCHIVE_CARS", response.data.data);
        }
        return response;
    },
    async createRentCar({ commit }, car) {
        let options = {
            indices: true
        };
        let formData = serialize(car, options);
        let response = await axios.post("/v1/admin/client-car", formData);

        if (response.status === 201) {
            commit("STORE_RENT_CAR", response.data);
        }

        return response;
    },
    async updateRentCar({ commit }, car) {
        car['_method'] = 'put';
        let options = {
            indices: true
        };
        let formData = serialize(car, options);
        let response = await axios.post("/v1/admin/client-car/" + car.id, formData);
        if (response.status === 200) {
            commit("UPDATE_RENT_CAR", response.data.data);
        }

        return response;
    },
    async removeRentCar({ commit }, carId) {
            let response = await axios.delete(`/v1/admin/client-car/${carId}`);
            if (response.status === 200) {
                commit("REMOVE_RENT_CAR", carId);
            }
    },
    async searchCars({ commit }, query) {
        let response = await axios.get("/v1/admin/client-car", {
            params: {
                "filters[name]": `%${query}%`
            }
        });

        if (response.status === 200) {
            commit("SET_RENT_CARS_SEARCH_RESULTS", response.data.data);
        }

        return response;
    },
    async setRentCarsStatuses({ commit }) {
        let response = await axios.get("/v1/client-car-status");

        if (response.status === 200) {
            commit("SET_RENT_CARS_STATUSES", response.data);
        }

        return response;
    },
    async changeRentCarStatus({ commit }, payload) {
        let response = await axios.put(
            `/v1/admin/client-car/${payload.carId}/change-status`,
            { status_id: payload.statusId }
        );

        if (response.status === 200) {
            commit("CHANGE_RENT_CAR_STATUS", payload);
        }

        return response;
    },
    async setCurrentRentCar({ commit }, carId) {
        let currentUser = JSON.parse(localStorage.getItem("user"));
        let token = localStorage.getItem("access_token");
        let response;
        if (token && currentUser && !!currentUser.is_admin) {
            response = await axios.get(`v1/admin/client-car/${carId}`);
        } else {
            response = await axios.get(`v1/client-car/${carId}`);
        }
        if (response.status === 200) {
            commit("SET_CURRENT_RENT_CAR", response.data);
        }
        return response;
    }
};
