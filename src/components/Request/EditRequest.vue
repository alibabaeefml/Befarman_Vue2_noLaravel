<template>
    <BaseModal
        width="900"
        name="EditRequest"
        title="ویرایش درخواست"
        subtitle="EDIT REQUEST"
        icon="WMi-plus"
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
                            <third-number-title
                                :number="getCurrentRequest.car_info.avg_vote"
                                des="درصد رضایت"
                                paddingtop="31px"
                                top="20.7%"
                            />
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col lg="3" xl="3">
                        <PersianDate v-model="newRequest.requestdata.start_at" label="تاریخ شروع" />
                    </v-col>
                    <v-col lg="3" xl="3">
                        <PersianDate v-model="newRequest.requestdata.end_at" label="تاریخ پایان"/>
                    </v-col>
                    <v-col lg="3" xl="3">
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

                    <v-col lg="3" xl="3">

                        <Price
                            :price="getCurrentRequest.car_info.cost"
                        />
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions style="background-color: #ededed">
                <v-btn @click="$_toggleModal('EditRequest')" class="mx-2" fab dark large color="pink" style="position: absolute;right: 10px">
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
                        @click="editRequest(newRequest)"
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
import ThirdNumberTitle from "../Global/Number-Title/Third-Number-Title";
export default {
    components: {
        ThirdNumberTitle,
        PersianDate,
        NumberTitle,
        Price
    },
    data: () => ({
        newRequest: {
            requestdata: {
                start_at: null,
                end_at: null,
                _method: "put"
            },
            carId: null
        },
    }),
    methods: {
        ...mapActions("Requests", ["setCurrentrequest"]),
        ...mapActions("Requests", ["editRequest"]),
        ...mapMutations("Requests", ["RESET_CURRENT_REQUEST"]),
        setData() {
            let carId = this.$_getData("EditRequest");
            this.newRequest.carId = this.$_getData("EditRequest");
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
