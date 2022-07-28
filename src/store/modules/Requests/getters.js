export default {
    getRequest(state){
        return state.request;
    },
    getArchiveRequest(state){
        return state.archive_request;
    },
    getUserSearchResults(state) {
        state.searchResults.forEach((result) => {
            result.name = `${result.first_name} ${result.last_name} ${result.phone} `
        })
        return state.searchResults;
    },
    getRentableCarSearchResults(state) {
        state.rentableCarSearch.forEach((result) => {
            result.name = `${result.name} => ${result.car_number} `
        })
        return state.rentableCarSearch;
    },
    getCurrentRequest(state) {
        return state.currentRequest;
    }
};
