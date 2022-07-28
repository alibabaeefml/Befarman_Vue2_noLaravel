import Vue from 'vue';
export default {
    ADD_TO_USERS(state, payload){
        payload.forEach(user => {
            state.users.push(user);
        })
    },
    ADD_TO_ARCHIVE_USERS(state, payload){
        payload.forEach(user => {
            state.archive_users.push(user);
        })
    },
    SET_USERS_SEARCH_RESULT(state, payload){
        state.searchResults = payload;
    },
    ADD_NEW_USER(state, payload){
        state.users.unshift(payload);
    },
    REMOVE_USER(state, userId){
        state.users = state.users.filter(user => user.id !== userId)
    },
    REMOVE_ARCHIVE_USERS(state, userId){
        state.archive_users = state.archive_users.filter(user => user.id !== userId)
    },
    UPDATE_USER(state, user){
        let index = state.users.findIndex(x => x.id === user.id);
        Vue.set(state.users, index, {...state.users[index], ...user})
    },
    SET_USERS_FILTERS(state, filters){
        state.filters = filters;
        state.users = [];
    },
    REMOVE_VERIFY_BUTTON(state , payload) {
    let userVrifyed = state.users.find(user => user.id == payload)
        userVrifyed.verified = 1
    },
    ADD_VERIFY_BUTTON(state , payload) {
    let userVrifyed = state.users.find(user => user.id == payload)
        userVrifyed.verified = 0
    },
    SET_CURRENT_USER(state, payload){
        state.currentUser = payload;
    },
    RESET_CURRENT_USER(state) {
        state.currentUser = {data:{first_name:" ",last_name:" "}}
    }
};

