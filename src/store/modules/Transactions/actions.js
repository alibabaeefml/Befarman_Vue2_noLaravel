import { axios } from "we-axios";

export default {
    async loadTransactions({ commit,state },page) {
        page = page ? page : 1;
        let params = {};
        params.page = page;
        for (let key in state.filters) {
            if (state.filters[key]) {
                params[`filters[${key}]`] = `%${state.filters[key]}%`;
            }
        }
        let response = await axios.get("/v1/admin/transactions",{params: params});
        commit("SET_TRANSACTIONS", response.data.data);
    },
    async loadArchiveTransactions({ commit,state },page) {
        page = page ? page : 1;
        let params = {};
        params.page = page;
        for (let key in state.filters) {
            if (state.filters[key]) {
                params[`filters[${key}]`] = `%${state.filters[key]}%`;
            }
        }
        let response = await axios.get("/v1/admin/transactions/archive", {params: params});
        commit("SET_ARCHIVE_TRANSACTIONS", response.data.data);
    },
    async editTransaction({ commit },data) {
        let response = await axios.put(`/v1/admin/users/transaction/update/${data.id}`,data);
        console.log(data)
    },
    async restoreTransaction({ commit }, transactionId) {
        let response = await axios.post("/v1/admin/transactions/" + transactionId + '/restore');
        if (response.status === 200) {
            commit("REMOVE_ARCHIVE_TRANSACTION", response.data.data.id);
        }
        return response;
    },
    async storeTransaction({ commit },data) {
        try {
            let response = await axios.post(`/v1/admin/users/${data.customer_id}/transaction`, data);
            console.log(response.data)
            commit("ADD_TRANSACTION", response.data);
            return true
        }catch (e) {
            console.log(e)
        }

    },
    async removeTransaction({ commit },id) {
        console.log("data",id)
        let response = await axios.delete(`/v1/admin/users/transaction/${id}`);
        commit("REMOVE_TRANSACTION",id);
    },

};
