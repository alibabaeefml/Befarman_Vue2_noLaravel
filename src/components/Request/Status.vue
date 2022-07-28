<template>
    <div
        class="status"
        :style="'background-color:' + status.color + ' '"
        @click="$emit('click')">
        <v-icon style="color: #fff">{{ status.icon }}</v-icon><span style="color: #fff">{{ status.name }}</span>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    name: status,
    props: {
        status,
    },
    computed: {
        // ...mapGetters("RentCars", ["getRentCarsStatuses"]),
        // status() {
        //     return this.getRentCarsStatuses.find(
        //         (singleStatus) => singleStatus.id === this.statusId
        //     );
        // },
    },
};
</script>

<style scoped>
.status {
    font-family: yekan_light;
    width: 290px;
    height: 26px;
    position: absolute;
    color: #000000;
    text-align: center;
    position: absolute;
    right: 13%;
    border-radius: 10px;
    border-top-right-radius: 0px;
    font-size: 13px;
}
</style>
