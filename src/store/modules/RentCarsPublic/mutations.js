import Vue from "vue";
import { cloneDeep } from "lodash";

function constructNames(carObj) {
    let car = cloneDeep(carObj);

    car.name_fa = `${car.brand.name_fa ? car.brand.name_fa : ""} ${
        car.car.name_fa ? car.car.name_fa : ""
    }
    `;
    car.name_en = `${car.brand.name_en ? car.brand.name_en : ""} ${
        car.car.name_en ? car.car.name_en : ""
    }
    `;
    return car;
}

export default {
    ADD_TO_CARS_PUBLIC(state, payload) {
        payload.forEach(car => {
            state.cars.push(constructNames(car));
        });
    },
    SET_RENT_CARS_PUBLIC(state, cars) {
        state.cars = [];
        cars.forEach(car => {
            state.cars.push(constructNames(car));
        });
    },
    SET_RENT_CARS_FILTERS_PUBLIC(state, filters) {
        state.filters = filters;
        state.cars = [];
    },
    SET_RENT_CARS_SEARCH_RESULTS_PUBLIC(state, searchResults) {
        state.searchResults = searchResults;
    },
    RESET_RENT_CARS_PUBLIC(state) {
        state.cars = [];
    }
};
