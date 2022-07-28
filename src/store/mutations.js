import Vue from "vue";


function updateOpenModals(state, modalName, requiredData) {
    let modalObject = {
        name: modalName,
        data: requiredData
    };
    if (state.openModals.some((modal) => modal.name === modalName)) {
        state.openModals.pop();
    } else {
        state.openModals.push(modalObject);
    }
}

const mutations = {
    toggleModal: (state, payload) => {
        updateOpenModals(state, payload.modalName, payload.requiredData);
    },
};

export default mutations;
