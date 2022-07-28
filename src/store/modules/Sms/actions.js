import { axios } from "we-axios";

export default {
    async loadSms({ commit,state },page) {
        page = page ? page : 1;
        let params = {};
        params.page = page;
        for (let key in state.filters) {
            if (state.filters[key]) {
                params[`filters[${key}]`] = `%${state.filters[key]}%`;
            }
        }
        let response = await axios.get("/v1/admin/sms",{params: params});
        commit("ADD_TO_SMS", response.data.data);
        return response;
    },
    async removeSms({ commit },id) {
        await axios.delete(`/v1/admin/sms/${id}`);
        commit("REMOVE_SMS",id);
    },

};
