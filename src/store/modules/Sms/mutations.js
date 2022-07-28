import Vue from "vue";

export default {
    ADD_TO_SMS(state, sms) {
        Vue.set(state, 'sms', [...state.sms, ...sms])
    },
    REMOVE_SMS(state,id) {
        let Index = state.sms.findIndex(tr => tr.id === id)
        Vue.delete(state.sms,Index)
    },
    SET_FILTERS(state,filters){
        state.filters = filters
    },
    RESET_SMS(state){
        state.sms = []
    }
}
