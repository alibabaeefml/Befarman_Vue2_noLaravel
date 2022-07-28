export default {
    getUsers(state){
        return state.users;
    },
    getArchiveUsers(state){
        return state.archive_users;
    },
    getFiltered(state){
        return state.searchResults;
    },
    getCurrentUser(state) {
        return state.currentUser;
    }
};
