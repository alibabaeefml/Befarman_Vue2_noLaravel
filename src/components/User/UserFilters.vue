<template>
  <div class="item">
    <v-icon class="filter"> WMi-filter </v-icon>
    <div class="filterInfo">
      <h1 class="filter_pr">فـــــــــــیلتر هـــــا</h1>
      <h1 class="filter_en">FILTERS</h1>
    </div>

    <div class="filters-container">
      <v-text-field
        label="نام کوچک"
        v-model="filters.first_name"
        class="filterer"
        @input="filterUsers"
      >
        <v-icon slot="prepend"> WMi-user </v-icon>
      </v-text-field>
      <v-text-field
        label="نام خانوادگی"
        v-model="filters.last_name"
        class="filterer"
        @input="filterUsers"
      >
        <v-icon slot="prepend"> WMi-user </v-icon>
      </v-text-field>
      <v-text-field
        label="کد ملی"
        v-model="filters.national_code"
        class="filterer"
        @input="filterUsers"
      >
        <v-icon slot="prepend"> WMi-user </v-icon>
      </v-text-field>
      <v-text-field
        label="شماره ی همراه"
        v-model="filters.phone"
        class="filterer"
        @input="filterUsers"
      >
        <v-icon slot="prepend"> WMi-user </v-icon>
      </v-text-field>
        <BaseTooltip tooltip="حذف فیلتر">
        <v-btn  @click="removeFilter()"  class="mx-2" fab dark small color="pink">
            <v-icon dark> WMi-cancel</v-icon>
        </v-btn>
        </BaseTooltip>
    </div>
  </div>
</template>

<script>
let cancelId;
import { mapActions, mapMutations } from "vuex";
export default {
  name: "CarFilter",
  data() {
    return {
      filters: {
        first_name: null,
        last_name: null,
        national_code: null,
        phone: null,
        car_number: null,
      },
    };
  },
  methods: {
    ...mapActions("Users", ["loadUsers"]),
    ...mapMutations("Users", ["SET_USERS_FILTERS"]),
    filterUsers() {
      clearTimeout(cancelId);
      cancelId = setTimeout(() => {
        this.SET_USERS_FILTERS(this.filters);
        this.loadUsers();
      }, 400);
    },
      removeFilter(){
        this.filters = {
            first_name: null,
            last_name: null,
            national_code: null,
            phone: null,
            car_number: null,
        },
        this.SET_USERS_FILTERS(null)
        this.loadUsers()
      }
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
  margin-right: 50px;
}
</style>
