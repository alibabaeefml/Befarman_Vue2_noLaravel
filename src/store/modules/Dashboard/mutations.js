import { cloneDeep } from "lodash";
export default {
    GET_CARS_COUNT(state, payload) {
        state.carsCount = payload;
    },
    GET_REQUESTS_COUNT(state, payload) {
        state.requestCount = payload;
    },
};

