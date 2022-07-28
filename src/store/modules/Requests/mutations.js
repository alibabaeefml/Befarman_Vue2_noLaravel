import Vue from 'vue';
export default {
    ADD_TO_REQUEST(state, payload){
        payload.forEach(request => {
            state.request.push(request);
        })
    },
    ADD_TO_ARCHIVE_REQUEST(state, payload){
        payload.forEach(request => {
            state.archive_request.push(request);
        })
    },
    REMOVE_REQUEST(state, requestId){
        let Index = state.request.findIndex(request => request.id == requestId)
        Vue.delete(state.request,Index)
    },
    SET_FILTERS(state,value){
      state.filters =  value
    },
    SET_USERS_SEARCH_RESULT(state, payload){
        state.searchResults = payload;
    },
    SET_RENTABLE_CAR_SEARCH_RESULT(state, payload){
        state.rentableCarSearch = payload;
    },
    ADD_NEW_REQUEST(state, payload){
        console.log(payload)
        state.request.unshift(payload);
    },
    RESET_REQUESTS(state) {
        state.request = [];
    },
    RESET_ARCHIVE_REQUESTS(state) {
        state.archive_request = [];
    },
    SET_CURRENT_REQUEST(state, payload) {
        state.currentRequest = payload;
    },
    ADD_NEW_STATUS(state, payload) {
        state.currentRequest = payload;
    },
    RESET_CURRENT_REQUEST(state) {
        state.currentRequest = [];
    },

};
