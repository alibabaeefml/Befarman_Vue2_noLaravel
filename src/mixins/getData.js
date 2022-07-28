export default {
    methods: {
        $_getData(name) {
            // this.$store.state.openModals.find(x => x.name == name).data;
            for (let modal of this.$store.state.openModals) {
                if (modal.name === name) {
                    return modal.data;
                }
            }
        }
    }
};
