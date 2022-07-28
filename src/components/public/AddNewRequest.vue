<template>
    <BaseModal
        width="900"
        name="NewPublicRequest"
        title="ثبت درخواست جدید"
        subtitle="NEW REQUEST"
        icon="WMi-plus"
        @open="setData"
    >
        <v-card v-if="carData" style="border-radius: 20px; width: 100%">
            <v-row>
                <v-col cols="4">
                    <img width="100%" :src="carData.car.thumbnail" alt="car Image"/>
                </v-col>
                <v-col cols="5">
                    <h2 class="name-fa-title">{{carData.name_fa}}</h2>
                    <h3 class="name-en-title">{{carData.name_en}}</h3>
                </v-col>
                <v-col cols="3">
                    <third-number-title class="avg" :number="carData.avg_vote" des="درصد رضایت"/>

                </v-col>

            </v-row>
            <v-divider style="margin-top: 40px"></v-divider>
                    <v-container>
    <v-row>
        <v-col lg="3" xl="2">
            <PersianDate label="تاریخ شروع" v-model="Request.start_at" type="date"/>
        </v-col>
        <v-col lg="3" xl="2">
            <PersianDate label="تاریخ پایان" v-model="Request.end_at" type="date"/>
        </v-col>
        <v-col lg="3" xl="4">
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
        <v-col lg="3" xl="4">
            <Price
                style="padding-right: 30%;padding-top: 13%;"
                :price="carData.rent_cost"
            />
        </v-col>
    </v-row>

</v-container>
            <v-divider></v-divider>
            <v-card-actions style="background-color: #ededed">
                <v-btn @click="$_toggleModal('NewPublicRequest')"  class="mx-2" fab dark large color="pink" style="position: absolute;right: 10px">
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
import ThirdNumberTitle from "../Global/Number-Title/Third-Number-Title";

import {mapGetters,mapActions,mapState} from "vuex";

export default {
    name: 'AddNewRequest',
    components: {
        PersianDate,
        NumberTitle,
        Price,
        ThirdNumberTitle
    },
    data: () => ({
        carData:null,
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
        ...mapActions("Requests", ["sendPublicRequests"]),
        createRequestAndCloseModal(Request) {
            this.sendPublicRequests(Request);
            this.$_toggleModal("NewPublicRequest");

        },
        setData() {
            const UserId = JSON.parse(localStorage.getItem("user")).id
            this.carData = this.$_getData("NewPublicRequest");
            this.Request.client_car_id = this.carData.id
            this.Request.user_id = UserId
        },

    },
    computed:{
        days: function() {
            const date1 = new Date(this.Request.start_at);
            const date2 = new Date(this.Request.end_at);
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays
        },
    },



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
.name-en-title{
    font-family:monserat_medium;
    font-weight: 100 !important;
    color: gray;
    letter-spacing: 10px;
}
.name-fa-title{
    margin-top:2.25rem;
    font-family: yekan_light;
}
.avg{
    position: absolute;
    top: 5%;
    left: 2%;
}

</style>
