import { axios } from "we-axios";
import { serialize } from "object-to-formdata";

export default {
    async loadUsers({ commit, state }, page) {
        page = page ? page : 1;
        let params = {};
        params.page = page;

        for (let key in state.filters) {
            if (state.filters[key]) {
                params[`filters[${key}]`] = `%${state.filters[key]}%`;
            }
        }

        let response = await axios.get("/v1/admin/users", {
            params: params
        });
        if (response.status === 200) {
            commit("ADD_TO_USERS", response.data.data);
        }
        return response;
    },
    async loadArchiveUsers({ commit, state }, page) {
        page = page ? page : 1;
        let params = {};
        params.page = page;

        for (let key in state.filters) {
            if (state.filters[key]) {
                params[`filters[${key}]`] = `%${state.filters[key]}%`;
            }
        }

        let response = await axios.get("/v1/admin/users/archive", {
            params: params
        });
        if (response.status === 200) {
            commit("ADD_TO_ARCHIVE_USERS", response.data.data);
        }
        return response;
    },
    async restoreUser({commit}, userId) {
        let response = await axios.post("/v1/admin/users/" + userId + '/restore');
        if (response.status === 200) {
            commit("REMOVE_ARCHIVE_USERS", response.data.data.id);
        }
        return response;
    },
    async searchUsers({ commit }, query) {
        let response = await axios.get("/v1/admin/users", {
            params: {
                "filters[first_name]": `%${query}%`,
                "filters[last_name]": `%${query}%`,
                "filters[national_code]": `%${query}%`,
                "filters[phone]": `%${query}%`,
                "filters[mode]": "or"
            }
        });

        if (response.status === 200) {
            commit("SET_USERS_SEARCH_RESULT", response.data.data);
        }

        return response;
    },
    async createUser({ commit }, user) {
        let options = {
            indices: true
        };
        let formData = serialize(user, options);

        let response = await axios.post("/v1/admin/users", formData);

        if (response.status === 201) {
            commit("ADD_NEW_USER", response.data.data);
        }
        return response;
    },
    async updateUser({ commit }, user) {
        let response = await axios.put("/v1/admin/users/" + user.id, user);

        if (response.status === 200) {
            commit("UPDATE_USER", response.data.data);
        }
        return response;
    },
    async deleteUser({ commit }, userId) {
        let response = await axios.delete(`/v1/admin/users/${userId}`);

        if (response.status === 200) {
            commit("REMOVE_USER", userId);
        }
        return response;
    },
    async sendMessage({ commit }, payload) {
        let response = await axios.post(`/v1/admin/sms/${payload.userId}`, {
            message: payload.message
        });
        if (response.message === 201) {
        }
        return response;
    },
    async userVerify({ commit }, {userId, status}) {
        let response;
        if (status) {
            response = await axios.post(`/v1/admin/users/verify/${userId}`, {
            });
            commit("REMOVE_VERIFY_BUTTON",userId)
        } else {
            response = await axios.post(`/v1/admin/users/unverify/${userId}`, {
            });
            commit("ADD_VERIFY_BUTTON",userId)
        }

        return response;
    },
    async userDealis({ commit }, userId) {
        let response = await axios.get(`/v1/admin/users/${userId}`, {
        });
        commit("SET_CURRENT_USER", response.data);
    }
};
