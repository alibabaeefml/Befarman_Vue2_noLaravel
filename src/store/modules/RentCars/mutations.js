import { cloneDeep } from "lodash";
import Vue from "vue";

function constructNames(carObj) {
    let car = cloneDeep(carObj);

    car.name_fa = `${car.car ? car.car.name_fa : ""} ${
        car.trim ? car.trim.name_fa : ""
    }`;
    car.name_en = `${car.car ? car.car.name_en : ""} ${
        car.trim ? car.trim.name_en : ""
    }`;

    return car;
}
export default {
    ADD_TO_CARS(state, payload) {
        payload.forEach(car => {
            state.cars.push(constructNames(car));
        });
    },
    ADD_TO_ARCHIVE_CARS(state, payload) {
        payload.forEach(car => {
            state.archive_cars.push(constructNames(car));
        });
    },
    REMOVE_RENT_CAR(state, carId) {
        state.cars = state.cars.filter(car => car.id !== carId);
    },
    REMOVE_ARCHIVE_RENT_CAR(state, carId) {
        state.archive_cars = state.archive_cars.filter(car => car.id !== carId);
    },
    STORE_RENT_CAR(state, car) {
        state.cars.unshift(constructNames(car));
    },
    UPDATE_RENT_CAR(state, car) {
        let index = state.cars.findIndex(x => x.id === car.id);
        Vue.set(state.cars, index, {...state.cars[index], ...car});
    },

    SET_RENT_CARS(state, cars) {
        state.cars = [];
        cars.forEach(car => {
            state.cars.push(constructNames(car));
        });
    },
    SET_RENT_CARS_FILTERS(state, filters) {
        state.filters = filters;
        state.cars = [];
    },
    SET_RENT_CARS_EMPTY(state){
        state.filters = [];
    },
    SET_RENT_CARS_SEARCH_RESULTS(state, searchResults) {
        state.searchResults = searchResults;
    },
    SET_RENT_CARS_STATUSES(state, statuses) {
        state.statuses = statuses;
    },
    CHANGE_RENT_CAR_STATUS(state, payload) {
        let carIndex = state.cars.findIndex(car => car.id === payload.carId);
        state.cars[carIndex].status_id = payload.statusId;
    },
    SET_CURRENT_RENT_CAR(state, payload) {
        state.currentRentCar = payload;
    },
    RESET_RENTABLE_CAR(state){
        state.cars = [];
    },
    RESET_ARCHIVE_RENTABLE_CAR(state){
        state.archive_cars = [];
    },
};
