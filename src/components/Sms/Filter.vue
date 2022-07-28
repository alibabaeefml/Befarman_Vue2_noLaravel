<template>
    <div class="item">
        <v-icon class="filter"> WMi-filter </v-icon>
        <div class="filterInfo">
            <h1 class="filter_pr">فـــــــــــیلتر هـــــا</h1>
            <h1 class="filter_en">FILTERS</h1>
        </div>

        <div class="filters-container">
            <BaseAutoComplete
                url="Requests/searchUsers"
                v-slot="{ filter }"
            >
                <v-autocomplete
                    style="font-family: yekan_light;padding:20px;"
                    :items="getUserSearchResults"
                    item-text="name"
                    item-value="id"
                    :chips="false"
                    white
                    dense
                    label="طرف حساب تراکنش"
                    prepend-icon=" WMi-user"
                    @keydown="filter"
                    v-model="filters.user_id"
                    @change="filterSms"
                    no-data-text="کاربر مورد نظر را جستجو کنید."
                ></v-autocomplete>
            </BaseAutoComplete>
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
    name: "transactionFilter",
    data() {
        return {
            filters: {
                user_id:null
            },
        };
    },
    methods: {
        ...mapActions("Sms", ["loadSms"]),
        ...mapMutations("Sms", ["SET_FILTERS", "RESET_SMS"]),
        filterSms() {
            clearTimeout(cancelId);
            cancelId = setTimeout(() => {
                this.SET_FILTERS(this.filters);
                this.RESET_SMS();
                this.$emit('filtered')
            }, 400);
        },
        removeFilter(){
            this.SET_FILTERS({})
            this.RESET_SMS()
            this.$emit('filtered')
            this.filters.user_id = null
        }
    },
    computed: {
        ...mapGetters("Requests", ["getUserSearchResults"]),
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
    width: 11%;
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
