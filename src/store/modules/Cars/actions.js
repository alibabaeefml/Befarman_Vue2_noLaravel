import { axios } from "we-axios";
import {serialize} from "object-to-formdata";
export default {
    async loadAutomobile({ commit }) {
        let response = await axios.get("/v1/abstract-car");
        if (response.status === 200) {
            commit("SET_AUTOMOBILE", response.data.data);
        }
        return response;
    },
    async submitAutomobile({ commit }, data) {

        let response = await axios.post("/v1/abstract-car", serialize(data));
        if (response.status === 201) {
            commit("SET_ABSTRACT_CAR",response.data)
            return response.data;
        }
    },
    async editAutomobile({commit},data){
      let response = await axios.put(`v1/abstract-car/${data.id}`,data)
    },

    async removeAutomobile({ commit },id) {
        let response = await axios.delete(`/v1/abstract-car/${id}`);
        commit("REMOVE_AUTOMOBILE",id);

    },

    async loadBrands({ commit }) {
        let response = await axios.get("/v1/brands");

        if (response.status === 200) {
            commit("SET_BRANDS", response.data);
        }
        return response;
    },
    async loadCars({ commit }, brandId) {
        let response = await axios.get("/v1/cars", {
            params: {
                "filters[brand_id]": brandId
            },
        });

        if (response.status === 200) {
            commit("SET_CARS", response.data);
        }
        return response;
    },
    async loadTrims({ commit }, carNameFa) {
        let response = await axios.get("/v1/trims", {
            params: {
                "filters[car_id]": carNameFa
            }
        });

        if (response.status === 200) {
            commit("SET_TRIMS", response.data);
        }
        return response;
    }
};
