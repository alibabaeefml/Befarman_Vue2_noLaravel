export default {
    getRentCars(state) {
        return state.cars;
    },
    getArchiveRentCars(state) {
        return state.archive_cars;
    },
    getRentCarsSearchResults(state) {
        return state.searchResults;
    },
    getRentCarsStatuses(state) {
        return state.statuses;
    },
    getRentCarsStatusesّFilter(state) {
        let nullItem = {
            id: null,
            name_en: "nothing",
            name_fa: "هیچکدام",
        }
        return [...state.statuses,nullItem];
    },
    getCurrentRentCar(state) {
        return state.currentRentCar;
    }
};
