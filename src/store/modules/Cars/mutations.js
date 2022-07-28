import Vue from "vue";
import {cloneDeep} from "lodash";

export default {
    SET_AUTOMOBILE(state,automobile){
      state.automobile = automobile
    },
    SET_ABSTRACT_CAR(state,data) {
        Vue.set(state.automobile,state.automobile.length, data)
    },
    REMOVE_AUTOMOBILE(state,id){
      let Index = state.automobile.findIndex(car => car.id == id)
      Vue.delete(state.automobile,Index)
    },
    SET_BRANDS(state, brands) {
        state.brands = brands;
        state.cars = [];
        state.trims = [];
    },
    SET_CARS(state, cars) {
        state.cars = cars;
        state.trims = [];
    },
    SET_TRIMS(state, trims) {
        state.trims = trims;
    },
    SET_BRAND_IMAGE(state,id){
        const brand = cloneDeep(state.cars);
        let indexBrand = brand.findIndex(car => car.id === id);
        state.SelectedCarImage = brand[indexBrand].car_image
    }
};
