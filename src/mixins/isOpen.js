export default function (modalName) {
    for (let modal of this.$store.state.openModals) {
        if (modal.name === modalName) {
            return true;
        }
    }
    return false
}
