<template>
    <BaseModal
        width="900"
        name="ChangeRequestTime"
        title="تغییر زمان"
        subtitle="CHANGE TIME"
        icon="WMi-user-clock"
        @open="setData"
    >
        <v-card style="border-radius: 20px; width: 100%">
            <v-card-text>
                <v-row>
                    <v-col lg="4" xl="4"><img style="width: 130%;" alt=""
                                              :src="getCurrentRequest.car_info.car.thumbnail"></v-col>
                    <v-col lg="4" xl="4">
                        <div class="infobar">
                            <h1 class="infoPr">{{ getCurrentRequest.car_info.car.name_fa }}</h1>
                            <h1 class="infoEn">{{ getCurrentRequest.car_info.car.name_en }}</h1>
                        </div>
                    </v-col>
                    <v-col lg="4" xl="4">
                        <div class="N1">
                            <NumberTitle
                                backcolor="#fff0e8"
                                number="45%"
                                numcolor="#fe6a1e"
                                des="درصد رضایت"
                                descolor="#fe6a1e"
                                paddingtop="31px"
                                top="20.7%"
                            />
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col lg="3" xl="3">
                        <PersianDate type="date" label="تاریخ پایان" v-model="newRequest.requestdata.end_at"/>
                    </v-col>

                    <v-col lg="3" xl="3" style="margin-right: 11%">
                        <div style="margin-top: 20px">
                            <NumberTitle
                                :number="requestdate"
                                des="روز زمان درخواست"
                                numcolor="black"
                                descolor="black"
                                top="54%"
                                numbersize="100"
                            />
                        </div>
                    </v-col>

                    <v-col lg="3" xl="3" style="margin-right: 10%" >
                        <Price style="padding-top: 25px"
                            :price="getCurrentRequest.car_info.cost"
                        />
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions style="background-color: #ededed">
                <v-btn @click="$_toggleModal('ChangeRequestTime')" class="mx-2" fab dark large color="pink" style="position: absolute;right: 10px">
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
                        @click="ChangeTime(newRequest)"
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
import {mapActions, mapGetters, mapMutations} from "vuex";
export default {
    components: {
        PersianDate,
        NumberTitle,
        Price
    },
    data: () => ({
        newRequest: {
            requestdata: {
                end_at: null,
            },
            carId: null
        },
    }),
    methods: {
        ...mapActions("Requests", ["setCurrentrequest"]),
        ...mapActions("Requests", ["ChangeTime"]),
        ...mapMutations("Requests", ["RESET_CURRENT_REQUEST"]),
        setData() {
            let carId = this.$_getData("ChangeRequestTime");
            this.newRequest.carId = this.$_getData("ChangeRequestTime");
            this.setCurrentrequest(carId).then(() => {
                this.newRequest.requestdata.start_at = this.getCurrentRequest['time'][0]['start_at']
                this.newRequest.requestdata.end_at = this.getCurrentRequest['time'].slice(-1)[0].end_at
            })
        },
    },
        computed: {
            ...mapGetters("Requests", ["getCurrentRequest"]),
            requestdate() {
                const StartDate = new Date(this.newRequest.requestdata.start_at);
                const EndDate = new Date(this.newRequest.requestdata.end_at);
                const diffTime = Math.abs(EndDate - StartDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays
            }
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

.infoEn {
    font-family: "monserat_medium";
    font-weight: 100;
    letter-spacing: 10px;
    font-size: 14px;
    color: gray;
}

.N1 {
    margin-top: 18%;
}

label {
    color: #000;
    font-size: 17px;
}

</style>
