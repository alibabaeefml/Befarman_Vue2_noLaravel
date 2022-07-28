<template>
  <BaseModal
    maxWidth="550px"
    name="NewRentableCar"
    title="افزودن خودرو قابل اجاره"
    subtitle="ADD RENTABLE CAR"
    icon="WMi-plus"
    @open="setData"
    @close="resetData"
  >
    <v-card style="border-radius: 20px; width: 100%">
      <v-card-text>
        <v-row>
          <AddItem
            v-for="status in this.getRentCarsStatuses"
            :key="status.id"
            :StatusID="status.id"
            :CorrentStatusID="CorrentStatusID"
            :prtext="status.name_fa"
            :entext="status.name_en"
            :icon="status.icon"
            :Backcolor="status.color"
            :shadow="'0px 5px 10px' + status.color"
            prcolor="white"
            encolor="white"
            iconcolor="white"
            @click="changeStatus(status.id)"
          />
        </v-row>
      </v-card-text>
    </v-card>
  </BaseModal>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import AddItem from "@/components/CarRent/rentCarStatus/AddItem";
export default {
  name: "NewRequest",
  data: () => ({
    carId: null,
    statusId: null,
      CorrentStatusID:null
  }),
  components: {
    AddItem,
  },
  methods: {
    ...mapActions("RentCars", ["changeRentCarStatus"]),
    setData() {
      let modalData = this.$_getData("NewRentableCar");
      this.carId = modalData.carId;
      this.statusId = modalData.carStatusId;
        this.CorrentStatusID = modalData.carStatusId
    },
    resetData() {
      this.carId = null;
      this.statusId = null;
    },
    changeStatus(statusId) {
      this.changeRentCarStatus({
        statusId: statusId,
        carId: this.carId,
      }).then(() => {
        this.$_toggleModal("NewRentableCar")

      });
    },
  },
  computed: {
    ...mapGetters("RentCars", ["getRentCarsStatuses"]),
  },
};
</script>
<style scoped>
* {
  font-family: yekan_light;
}

label {
  color: #000;
  font-size: 17px;
}
</style>
