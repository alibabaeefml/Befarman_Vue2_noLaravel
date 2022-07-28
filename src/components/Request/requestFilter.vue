<template>
    <div class="item">
        <v-icon class="filter"> WMi-filter </v-icon>
        <div class="filterInfo">
            <h1 class="filter_pr">فـــــــــــیلتر هـــــا</h1>
            <h1 class="filter_en">FILTERS</h1>
        </div>

        <div class="filters-container">
            <v-text-field
                label="نام خودرو"
                v-model="filters.name"
                class="filterer"
                @input="filterCars"
            >
                <v-icon slot="prepend"> WMi-user </v-icon>
            </v-text-field>

            <v-text-field
                label="نام مالک"
                v-model="filters.owner_name"
                class="filterer"
                @input="filterCars"
            >
                <v-icon slot="prepend"> WMi-user </v-icon>
            </v-text-field>

            <v-autocomplete
                :items="years"
                label="سال تولید"
                item-text="name"
                item-value="value"
                v-model="filters.made_at"
                class="filterer"
                @input="filterCars"
            >
                <v-icon slot="prepend"> WMi-user </v-icon>
            </v-autocomplete>
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
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
    name: "requestFilter",
    data() {
        return {
            filters: {
                name: null,
                made_at: null,
                car_usage: null,
                status_id: null,
            },
            years: [
                {name:"هیچکدام",value:null},
                1380,
                1381,
                1382,
                1383,
                1384,
                1385,
                1386,
                1387,
                1388,
                1389,
                1390,
                1391,
                1392,
                1393,
                1393,
                1394,
                1395,
                1396,
                1397,
                1398,
                1399,
                1400,
            ],
        };
    },
    methods: {
        ...mapActions("Requests", ["loadRequests"]),
        ...mapMutations("Requests", ["SET_FILTERS","RESET_REQUESTS"]),
        filterCars() {
            clearTimeout(cancelId);
            cancelId = setTimeout(() => {
                this.RESET_REQUESTS()
                this.SET_FILTERS(this.filters);
                this.loadRequests();
            }, 400);
        },
        removeFilter(){
            this.filters = {
                name: null,
                made_at: null,
                car_usage: null,
                status_id: null,
            },
                this.RESET_REQUESTS()
            this.SET_FILTERS(null);
            this.loadRequests();
        }
    },
};
</script>

<style scoped>
*{
    font-family: 'yekan_light'
}
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
