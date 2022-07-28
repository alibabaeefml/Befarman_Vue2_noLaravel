<template>
  <div class="item">
    <v-icon class="filter"> WMi-filter </v-icon>
    <div class="filterInfo">
      <h1 class="filter_pr">فـــــــــــیلتر هـــــا</h1>
      <h1 class="filter_en">FILTERS</h1>
    </div>
    <div class="filters-container">
      <persian-date
          class="padding"
          color-date="black"
        color="white"
        label="تاریخ شروع"
        v-model="filters.start_date"
        defaultDate="empty"
      />
      <persian-date
        class="padding"
        color-date="black"
        color="white"
        label="تاریخ پایان"
        v-model="filters.end_date"
        defaultDate="empty"
      />
      <BaseAutoComplete
        url="RentCarsPublic/searchCarsPublic"
        v-slot="{ filter }"
      >
        <v-autocomplete
          v-model="filters.name"
          class="padding"
          style="margin-top: 18px;"
          :items="getRentCarsSearchResultsPublic"
          item-text="name"
          item-value="name"
          :chips="false"
          dense
          label="مدل خودرو"
          append-icon="mdi-magnify"
          @keydown="filter"
          no-data-text="مدل خودرو را جستجو کنید."
        ></v-autocomplete>
      </BaseAutoComplete>
      <v-btn
        style="background-color: white;margin:30px"
        color="black"
        elevation="2"
        fab
        icon
        x-large
        @click="filterCars"
      >
        <v-icon> WMi-search</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
let cancelId;
import { mapActions, mapMutations, mapGetters } from "vuex";
import PersianDate from "@/components/Global/PersianDate";

export default {
  name: "CarFilter",
  components: {
    PersianDate,
  },
  data() {
    return {
      filters: {
        start_date: null,
        end_date: null,
        name: null,
      },
    };
  },
  methods: {
    ...mapActions("RentCarsPublic", ["loadCarsPublic"]),
    ...mapMutations("RentCarsPublic", ["SET_RENT_CARS_FILTERS_PUBLIC"]),
    filterCars() {
      clearTimeout(cancelId);
      cancelId = setTimeout(() => {
        this.SET_RENT_CARS_FILTERS_PUBLIC(this.filters);
        this.loadCarsPublic();
      }, 400);
    },
  },
  computed: {
    ...mapGetters("RentCarsPublic", [
      "getRentCarsSearchResultsPublic",
      "getRentCarsFiltersPublic",
    ]),
  },
  created() {
    this.filters = this.getRentCarsFiltersPublic;
  },
};
</script>

<style scoped>
.item {
  direction: rtl;
  margin-right: auto;
  margin-left: auto;
  margin-top: 20px;
  width: 95%;
  height: 100px;
  border: 2px black solid;
  border-radius: 10px;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.filter {
  width: 100px;
  font-size: 70px;
  padding-top: 20px;
  color: black;
}
.filter_pr {
  font-family: yekan_light;
  font-size: 30px;
}
.filter_en {
  font-family: monserat_medium;
  font-size: 13px;
  letter-spacing: 18px;
  font-width: 100;
}
.filterInfo {
  direction: rtl;
}
.filterer {
  width: 9%;
  direction: rtl;
  font-family: yekan_light;
  font-size: 13px;
}

.filters-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: auto;
}
.padding{
    padding: 20px;
}
</style>
