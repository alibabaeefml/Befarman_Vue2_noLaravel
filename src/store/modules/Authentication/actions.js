import { axios } from "we-axios";
import { TokenService } from "@/services/storage.services.js";

export default {
    async sendConfirmationCode({ commit }, payload) {
        let response = await axios.post("/v1/login", payload);
        if (response.status === 200) {
        }

        return response;
    },
    async info() {
        let response = await axios.get("/v1/user/info");
        return response.data.data;
    },
    async updateInfo({}, user) {
        let response = await axios.put("/v1/users/" + user.id, user);
        return response;
    },
    async checkConfirmationCode({ commit }, payload) {
        let response = await axios.post("/v1/login/code", payload);

        if (response.status === 200) {
            let token = response.data.user.token;
            localStorage.setItem("user", JSON.stringify(response.data.user));
            TokenService.saveToken(token);
        }

        return response;
    },
    checkIfIsLoggedIn() {
        let currentToken = localStorage.getItem("access_token");
        if (typeof currentToken === "string") {
            axios.get("/v1/user/info").catch(error => {
                if (error.response.status === 401) {
                    localStorage.clear();
                    window.location.reload();
                }
            });
        }
    }
};
