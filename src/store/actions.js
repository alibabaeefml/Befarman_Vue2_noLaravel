import {
    axios
} from "we-axios";

const actions = {
    toggleModal: ({ commit }, payload) => {
        commit('toggleModal', payload);
    },
};

export default actions;
