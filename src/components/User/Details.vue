<template>
    <BaseModal
        title="اطلاعات کاربر"
        subtitle="USER DETALIS"
        width="900"
        name="UserDetails"
        icon="WMi-user"
        @open="setData"
        @close="resetData"
    >
        <v-card-text>
            <v-row>
                <v-col lg="4" md="4" sm="12">
                    <!--                    <img class="img-detalis" :src="getCurrentUser.data.thumbnail" alt=""/>-->
                    <v-carousel
                        next-icon=" WMi-angle-right"
                        prev-icon=" WMi-angle-left"
                        delimiter-icon=" WMi-circle"
                        height="330"
                    >
                        <v-carousel-item class="Carousel"
                                         v-for="(image,i) in getCurrentUser.data.certificates"
                                         :key="i"
                                         :src="image.thumbnail"
                                         @click="ShowImage(image.image)"
                        ></v-carousel-item>
                    </v-carousel>
                </v-col>
                <v-col lg="8" md="8" sm="12">
                    <v-row>
                        <v-col lg="6" md="6" sm="12" style="border-right: 1px solid;">
                            <Owner1
                                class="display_name"
                                text1="نام و نام خانوادگی کاربر"
                                :text2="`${getCurrentUser.data.first_name} ${getCurrentUser.data.last_name}`"
                            />
                            <Owner1
                                class="phone"
                                text1="شماره تلفن"
                                :text2="getCurrentUser.data.phone"
                            />
                            <Owner1
                                class="national_code"
                                text1="کد ملی"
                                :text2="getCurrentUser.data.national_code"
                            />
                            <Owner1
                                class="born_year"
                                text1="سال تولد"
                                :text2="jalali(getCurrentUser.data.born_year)"
                            />
                            <Owner1
                                class="national_code"
                                text1="تابعیت"
                                :text2="getCurrentUser.data.citizenship"
                            />
                            <Owner1
                                class="national_code"
                                text1=" شماره گذرنامه"
                                :text2="getCurrentUser.data.passport_number"
                            />
                            <Owner1
                                class="national_code"
                                text1=" شماره گواهی نامه"
                                :text2="getCurrentUser.data.license_number"
                            />
                            <Owner1
                                class="father_name"
                                text1="نام پدر"
                                :text2="getCurrentUser.data.father_name"
                            />
                        </v-col>

                        <v-col lg="6" md="6" sm="12" style="border-right: 1px solid;">
                            <Owner1
                                class="national_code"
                                text1=" شهر تولد"
                                :text2="getCurrentUser.data.born_city"
                            />

                            <Owner1
                                class="city"
                                text1="شهر"
                                :text2="getCurrentUser.data.city ? getCurrentUser.data.city.name : ''"
                            />

                            <Owner1
                                class="address"
                                text1="نوع محل سکونت"
                                :text2="getCurrentUser.data.location_type"
                            />
                            <Owner1
                                class="address"
                                text1="آدرس"
                                :text2="getCurrentUser.data.address"
                            />
                            <Owner1
                                class="home_phone"
                                text1="تلفن منزل"
                                :text2="getCurrentUser.data.home_phone"
                            />
                            <Owner1
                                class="job"
                                text1="میزان تحصیلات"
                                :text2="getCurrentUser.data.education_rate"
                            />
                            <Owner1
                                class="job"
                                text1="شغل"
                                :text2="getCurrentUser.data.job"
                            />
                            <Owner1
                                class="workplace"
                                text1="آدرس محل کار"
                                :text2="getCurrentUser.data.workplace"
                            />
                            <Owner1
                                class="workplace"
                                text1="تلفن محل کار"
                                :text2="getCurrentUser.data.work_phone"
                            />


                        </v-col>
                    </v-row>
                    <v-row cols="12">
                        <v-col cols="4">
                            <Owner1
                                class="workplace"
                                text1="نام بانک"
                                :text2="getCurrentUser.data.bank ? getCurrentUser.data.bank.name : ''"
                            />
                        </v-col>
                        <v-col cols="4">
                            <Owner1
                                class="workplace"
                                text1="شماره حساب"
                                :text2="getCurrentUser.data.bank ? getCurrentUser.data.bank.account_number : ''"
                            />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" v-if="typeof getCurrentUser.data.relatives == 'object'" :key="i" v-for="(relatives, i) in getCurrentUser.data.relatives">
                    <v-row>
                        <v-col cols="3">
                            <Owner1
                                class="workplace"
                                text1="نام"
                                :text2="relatives.name"
                            />
                        </v-col>
                        <v-col cols="2">
                            <Owner1
                                class="workplace"
                                text1="نسبت"
                                :text2="relatives.relative"
                            />
                        </v-col>
                        <v-col cols="2">
                            <Owner1
                                class="workplace"
                                text1="شماره تلفن"
                                :text2="relatives.phone"
                            />
                        </v-col>
                        <v-col cols="5">
                            <Owner1
                                class="workplace"
                                text1="آدرس"
                                :text2="relatives.address"
                            />
                        </v-col>
                    </v-row>
                </v-col>

            </v-row>
        </v-card-text>
    </BaseModal>
</template>

<script>
    import Owner from "../Global/Owner-Info/Owner-Info";
    import Status from "@/components/CarRent/rentCarStatus/Status";
    import Owner1 from "../Global/Owner-Info/Owner";
    import Price from "@Components/Global/Price/Price";
    import moment from "jalali-moment";
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "rendCarDetails",
        components: {
            Owner,
            Status,
            Owner1,
            Price,
        },
        computed: {
            ...mapGetters("Users", ["getCurrentUser"]),
        },

        methods: {
            ...mapActions("Users", ["userDealis"]),
            ...mapMutations("Users", ["RESET_CURRENT_USER"]),
            setData() {
                let UserId = this.$_getData("UserDetails");
                this.userDealis(UserId);
                this.getCurrentUser;
            },
            resetData() {
                this.RESET_CURRENT_USER()
            },
            jalali(value) {
                return this.convertToJalali(value);
            },
            convertToJalali: function (date = null, format = "jYYYY/jMM/jDD", defaultDate = 'مشخص نشده است.') {
                return date ? moment(date).locale('fa').format(format) : defaultDate;
            },
            ShowImage(img){
                window.open(img, '_blank');
            }
        },
    }
</script>
<style scoped>
    .trash-button {
        position: absolute;
        top: 33%;
        left: 1.5%;
    }

    .edit-button {
        position: absolute;
        top: 33%;
        left: 4.5%;
    }

    .ok-button {
        position: absolute;
        top: 33%;
        left: 7.5%;
    }

    /*.priceBox {*/
    /*    position: absolute;*/
    /*    top: 12%;*/
    /*    right: 60%;*/
    /*}*/

    /*.owner {*/
    /*    position: absolute;*/
    /*    direction: rtl;*/
    /*    border-right: 1px solid black;*/
    /*    top: 20%;*/
    /*    right: 40%;*/
    /*    padding-right: 10px;*/
    /*}*/

    .o-detalis {
        border-right: 1px solid black;
        direction: rtl;
        padding-right: 10px;
        margin-top: 6%;
        position: absolute;
        top: 10%;
        right: 50%;
    }

    /*.display_name {*/
    /*    border-right: 1px solid black;*/
    /*    direction: rtl;*/
    /*    padding-right: 10px;*/
    /*    position: absolute;*/
    /*    top: 3%;*/
    /*    right: 40%;*/
    /*    margin-top: 14.5%;*/
    /*}*/

    /*.father_name {*/
    /*    border-right: 1px solid black;*/
    /*    direction: rtl;*/
    /*    padding-right: 10px;*/
    /*    position: absolute;*/
    /*    top: 39%;*/
    /*    right: 40%;*/
    /*    margin-top: 14.5%;*/
    /*}*/

    /*.phone {*/
    /*    border-right: 1px solid black;*/
    /*    direction: rtl;*/
    /*    padding-right: 10px;*/
    /*    position: absolute;*/
    /*    top: 2%;*/
    /*    right: 40%;*/
    /*    margin-top: 21.5%;*/
    /*}*/

    /*.address {*/
    /*    border-right: 1px solid black;*/
    /*    direction: rtl;*/
    /*    padding-right: 10px;*/
    /*    position: absolute;*/
    /*    top: 26%;*/
    /*    right: 65%;*/
    /*    margin-top: 21.5%;*/
    /*}*/
    /*.workplace{*/
    /*    border-right: 1px solid black;*/
    /*    direction: rtl;*/
    /*    padding-right: 10px;*/
    /*    position: absolute;*/
    /*    top: 14%;*/
    /*    right: 65%;*/
    /*    margin-top: 21.5%;*/
    /*}*/
    /*.born_year{*/
    /*    border-right: 1px solid black;*/
    /*    direction: rtl;*/
    /*    padding-right: 10px;*/
    /*    position: absolute;*/
    /*    top: 38%;*/
    /*    right: 65%;*/
    /*    margin-top: 21.5%;*/
    /*}*/
    /*.home_phone{*/
    /*    border-right: 1px solid black;*/
    /*    direction: rtl;*/
    /*    padding-right: 10px;*/
    /*    position: absolute;*/
    /*    top: -9.5%;*/
    /*    right: 85%;*/
    /*    margin-top: 21.5%;*/
    /*}*/
    /*.job{*/
    /*    border-right: 1px solid black;*/
    /*    direction: rtl;*/
    /*    padding-right: 10px;*/
    /*    position: absolute;*/
    /*    top: 38%;*/
    /*    right: 40%;*/
    /*    margin-top: 21.5%;*/
    /*}*/

    /*.national_code {*/
    /*    border-right: 1px solid black;*/
    /*    direction: rtl;*/
    /*    padding-right: 10px;*/
    /*    position: absolute;*/
    /*    top: 3%;*/
    /*    right: 40%;*/
    /*    margin-top: 27.5%;*/
    /*}*/
    /*.city{*/
    /*    border-right: 1px solid black;*/
    /*    direction: rtl;*/
    /*    padding-right: 10px;*/
    /*    position: absolute;*/
    /*    top: -20%;*/
    /*    right: 65%;*/
    /*    margin-top: 27.5%;*/
    /*}*/
    .item {
        position: relative;
        direction: rtl;
        margin-right: auto;
        margin-left: auto;
        margin-top: 20px;
        width: 95%;
        height: 130px;
        border: 1px rgb(214, 214, 214) solid;
        border-radius: 6px;
        transition: 0.2s;
    }

    .img-detalis {
        width: 25%;
        margin-top: 6%;
        border-radius: 99999px;
        margin-right: 10%;
    }

    /*.born_city{*/
    /*    border-right: 1px solid black;*/
    /*    direction: rtl;*/
    /*    padding-right: 10px;*/
    /*    position: absolute;*/
    /*    top: -9%;*/
    /*    right: 65%;*/
    /*    margin-top: 27.5%;*/
    /*}*/

    .Car-Img {
        width: 260px;
        float: right;
    }

    .infobar {
        margin: 1.35% 10px;
    }

    .dprice {
        margin-left: 6%;
        padding-top: 2%;
    }

    .infobarD {
        position: absolute;
        right: 17%;
        text-align: center;
        bottom: 28%;
    }

    .infoPr {
        font-family: "yekan_light";
    }

    .infoEn {
        font-family: "monserat_medium";
        font-weight: 100;
        letter-spacing: 10px;
        font-size: 14px;
        color: gray;
    }

    .item:hover {
        border: 1px solid #6d6d6d;
        border-radius: 5px;
    }

    .filterInfo {
        color: #ffffff;
    }

    .headlogin {
        height: 100px;
        background-color: black;
    }

    .filter_pr {
        font-size: 20px;
        font-family: "yekan_light";
    }

    .filter_en {
        font-size: 16px;
        letter-spacing: 15px;
        font-family: "monserat_medium";
    }

    .login_icon {
        font-size: 60px;
        position: absolute;
        float: right;
        right: 15px;
        color: #fff;
    }

    .filterInfo {
        direction: rtl;
        position: absolute;
        right: 9%;
    }
</style>
