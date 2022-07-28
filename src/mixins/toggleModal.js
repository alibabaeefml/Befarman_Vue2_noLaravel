export default function (modalName, requiredData = null, instance) {
    this.$store.dispatch('toggleModal', {
        modalName,
        requiredData
    });

}
