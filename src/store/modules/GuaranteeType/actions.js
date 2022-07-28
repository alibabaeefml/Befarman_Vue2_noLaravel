import { axios } from "we-axios";
export default {


    async loadGuaranteeTypes({ commit }) {
        let response = await axios.get("/v1/guarantee-type");
        if (response.status === 200) {
            commit("SET_GUARANTEE_TYPE", response.data.data);
        }
        return response;
    },
};
