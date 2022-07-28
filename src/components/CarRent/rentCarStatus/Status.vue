<template>
  <div
    class="status"
    :style="'background-color:' + status.color + ' '"
    @click="$emit('click')">

    <v-icon style="color: #fff">{{ status.icon }}</v-icon>{{ status.name_fa }}

  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: status,
  props: {
    statusId: {
      type: Number,
    },
  },
  computed: {
    ...mapGetters("RentCars", ["getRentCarsStatuses"]),
    status() {
      return this.getRentCarsStatuses.find(
        (singleStatus) => singleStatus.id === this.statusId
      );
    },
  },
};
</script>

<style scoped>
.status {
  font-family: yekan_light;
  width: 180px;
  height: 26px;
  position: absolute;
  color: #fff;
  text-align: center;
  position: absolute;
  right: 15%;
  border-radius: 10px;
  border-top-right-radius: 0px;
}
</style>
