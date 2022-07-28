import Vue from "vue";

export default {
    SET_ARCHIVE_TRANSACTIONS(state, transactions) {
        state.archive_transactions = transactions
    },
    SET_TRANSACTIONS(state, transactions) {
        state.transactions = transactions
    },
    ADD_TRANSACTION(state, transaction) {
        state.transactions.unshift(transaction)
    },
    REMOVE_TRANSACTION(state,id) {
        let Index = state.transactions.findIndex(tr => tr.id === id)
        Vue.delete(state.transactions,Index)
    },
    REMOVE_ARCHIVE_TRANSACTION(state,id) {
        let Index = state.archive_transactions.findIndex(tr => tr.id === id)
        Vue.delete(state.archive_transactions,Index)
    },
    SET_FILTERS(state,filters){
        state.filters = filters
    }
}
