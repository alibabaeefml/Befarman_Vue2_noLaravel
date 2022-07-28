<template>
    <BaseModal
        maxWidth="680px"
        name="ChangeTime"
        title="درخواست تغییر زمان اجاره"
        subtitle="DURATION CHANGE REQUEST"
        icon=" WMi-back-in-time"
        @open="setData"
    >
        <v-card style=" width: 100%">
            <v-card-text>
                <v-row style="height: 0px">
                    <v-col xl="5" lg="5">
                        <second-number-title
                            :number="jalali(newRequest.requestdata.start_at)"
                            numcolor="#1c2e4a"
                            descolor="#1c2e4a"
                            top="12%"
                        />
                    </v-col>
                    <v-col xl="2" lg="2">
                        <div>
                            <h2 style="text-align: center;color: #1c2e4a;font-family:'yekan_medium'">تا</h2>
                        </div>
                    </v-col>
                    <v-col xl="5" lg="5">
                        <second-number-title
                            :number="jalali(newRequest.requestdata.end_at)"
                            numcolor="#1c2e4a"
                            descolor="#1c2e4a"
                            top="3%"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col xl="12" lg="12" style="margin-right: 40%;padding-top: 50px">
                        <v-icon color="#1c2e4a" style="font-size: 80px"> WMi-angle-down</v-icon>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col xl="5" lg="5">
                        <second-number-title
                            :number="jalali(newRequest.requestdata.new_start_at)"
                            numcolor="#32cad5"
                            descolor="#32cad5"
                            top="12%"
                        />
                    </v-col>
                    <v-col xl="2" lg="2">
                        <div>
                            <h2 style="text-align: center;color: #32cad5;font-family:'yekan_medium'">تا</h2>
                        </div>
                    </v-col>
                    <v-col xl="5" lg="5">
                        <second-number-title
                            :number="jalali(newRequest.requestdata.new_end_at)"
                            numcolor="#32cad5"
                            descolor="#32cad5"
                            top="3%"
                        />
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn
                    elevation="2"
                    rounded
                    style="background-color: #ee3552; color: #ffffff;width: 27%;padding: 25px 0px;font-family:yekan_medium;font-size: 16px;letter-spacing: 0px;    margin: 10px;"
                    @click="RejectChangeTimeByAdmin(newRequest.MyRequestID)"
                >
                    <v-icon>WMi-cancel</v-icon>
                    رد کردن تاریخ جدید
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    elevation="2"
                    rounded
                    style="background-color: rgb(17 162 0); color: #ffffff;width: 27%;padding: 25px 0px;font-family:yekan_medium;font-size: 16px;letter-spacing: 0px;    margin: 10px;"
                    @click="AcceptChangeTimeByAdmin(newRequest.MyRequestID)"
                >
                    <v-icon> WMi-ok</v-icon>
                    تایید تاریخ جدید
                </v-btn>
            </v-card-actions>
        </v-card>
    </BaseModal>
</template>
<script>
import {convertToJalali} from "../../components/Global/jalali-date"
import {mapActions, mapGetters, mapMutations} from "vuex";
import SecondNumberTitle from "../Global/Number-Title/Second-Number-Title";

export default {
    name: "ChangeTime",
    components: {
        SecondNumberTitle,
    },
    data: () => ({
        newRequest: {
            requestdata: {
                start_at: null,
                end_at: null,
                new_start_at: null,
                new_end_at: null
            },
            MyRequestID: null
        },
    }),
    methods: {
        ...mapActions("Requests", ["setCurrentrequest"]),
        ...mapActions("Requests", ["ChangeTime"]),
        ...mapActions("Requests", ["AcceptChangeTimeByAdmin"]),
        ...mapActions("Requests", ["RejectChangeTimeByAdmin"]),
        ...mapMutations("Requests", ["RESET_CURRENT_REQUEST"]),
        setData() {
            this.newRequest.MyRequestID = this.$_getData("ChangeTime");
            this.setCurrentrequest(this.newRequest.MyRequestID).then(() => {
                this.newRequest.requestdata.start_at = this.getCurrentRequest['time'][1]['start_at']
                this.newRequest.requestdata.end_at = this.getCurrentRequest['time'][1].end_at
                this.newRequest.requestdata.new_start_at = this.getCurrentRequest['time'][0]['start_at']
                this.newRequest.requestdata.new_end_at = this.getCurrentRequest['time'][0].end_at
            })
        },
        jalali(value) {
            return convertToJalali(value);
        }
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

}
</script>

<style scoped>

</style>
