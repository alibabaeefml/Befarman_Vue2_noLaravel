<template>
    <BaseModal
        width="900"
        name="Newrequest"
        title="ثبت درخواست جدید"
        subtitle="NEW REQUEST"
        icon="WMi-plus"
    >
        <v-card style="border-radius: 20px; width: 100%">
            <div class="Flex-container">
                    <v-col lg="4" xl="4">
                        <PersianDate label="تاریخ شروع" v-model="Request.start_at" type="date"/>
                    </v-col>
                    <v-col lg="4" xl="4">
                        <PersianDate label="تاریخ پایان" v-model="Request.end_at" type="date"/>
                    </v-col>
                <v-col lg="4" xl="4" style="margin-top: 20px">
                    <BaseAutoComplete
                        url="Requests/searchUsers"
                        v-slot="{ filter }"
                    >
                        <v-autocomplete
                            v-model="Request.user_id"
                            :items="getUserSearchResults"
                            item-text="name"
                            item-value="id"
                            :chips="false"
                            white
                            dense
                            label="شخص درخواست دهنده"
                            prepend-icon=" WMi-car-side"
                            @keydown="filter"
                            no-data-text="کاربر مورد نظر را جستجو کنید."
                        ></v-autocomplete>
                    </BaseAutoComplete>
                </v-col>
            </div>
                <v-divider style="margin-top: 40px"></v-divider>
            <div class="Flex-container">

            </div>
            <div class="Flex-container">
                <v-col lg="4" xl="4" >
                    <BaseAutoComplete
                        url="Requests/searchRentCars"
                        v-slot="{ filter }"
                    >
                        <v-autocomplete
                            v-model="Request.client_car_id"
                            :items="getRentableCarSearchResults"
                            item-text="name"
                            item-value="id"
                            :chips="false"
                            white
                            dense
                            label="مدل خودرو"
                            prepend-icon="WMi-car-side"
                            @keydown="filter"
                            no-data-text="مدل خودرو مورد نظر را جستجو کنید."
                        ></v-autocomplete>
                    </BaseAutoComplete>
                </v-col>
                    <v-col lg="4" xl="4">
                        <div>
                            <NumberTitle
                                style="padding-right: 37%;"
                                :number="days"
                                des="روز زمان درخواست"
                                numcolor="black"
                                descolor="black"
                                top="55%"
                                numbersize="100"
                            />
                        </div>
                    </v-col>
                    <v-col lg="4" xl="4">
                        <Price
                            style="padding-right: 30%;padding-top: 13%;"
                            :price="carSelected.cost"
                        />
                    </v-col>

            </div>
            <v-divider></v-divider>
            <v-card-actions style="background-color: #ededed">
                <v-btn @click="$_toggleModal('Newrequest')"  class="mx-2" fab dark large color="pink" style="position: absolute;right: 10px">
                    <v-icon dark> WMi-cancel</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <div style="margin-right: 82%">
                    <v-btn
                        class="subBtn"
                        fab
                        dark
                        large
                        color="cyan"
                        @click="createRequestAndCloseModal(Request)"
                    >
                        <v-icon dark> WMi-ok</v-icon>
                    </v-btn>
                </div>
            </v-card-actions>
        </v-card>
    </BaseModal>
</template>
<script>
import PersianDate from "../Global/PersianDate";
import NumberTitle from "../Global/Number-Title/Number-Title"
import Price from "../Global/Price/Price"
import {mapGetters,mapActions,mapState} from "vuex";

export default {
    name: 'AddRequest',
    components: {
        PersianDate,
        NumberTitle,
        Price
    },
    data: () => ({
        Request:{
            user_id:null,
            client_car_id:null,
            start_at:null,
            end_at:null,
        },
        userId:null,
        carSelected: {
        cost:0
        },
    }),

    methods: {
        ...mapActions("Requests", ["sendRequests"]),
        createRequestAndCloseModal(Request) {
            this.sendRequests(Request);
            this.$_toggleModal("Newrequest");
        },
    },
    computed:{
        ...mapGetters("Requests", ["getUserSearchResults"]),
        ...mapGetters("Requests", ["getRentableCarSearchResults"]),

        days: function() {
            const date1 = new Date(this.Request.start_at);
            const date2 = new Date(this.Request.end_at);
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays
        },
    },
    watch:{
        'Request.client_car_id': function(){
            this.carSelected = this.getRentableCarSearchResults.find(car => car.id === this.Request.client_car_id);
        }
    }


};
</script>
<style scoped>
* {
    font-family: yekan_light;
}

.infobar {
    color: black;
    margin-top: 25%;
    margin-right: 15%;
}

infoPr {
    font-family: "yekan_light";
    color: black;
    line-height: 130px;
}
.Flex-container{
    display: flex;
    flex-flow: wrap row;
    padding-top: 20px;
    justify-content: center;
    align-self: center;
}
label {
    color: #000;
    font-size: 17px;
}

</style>
