export default {
    getCities: (state) => (provinceId) => state.cities[provinceId],
    getProvinces(state){
        return state.provinces;
    },
};
