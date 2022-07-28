<template>
    <BaseModal
        title="جزییات خودرو"
        subtitle="Car Details"
        width="900"
        name="rentCarDetails"
        icon="WMi-car-side"
        @open="setData"
    >
        <v-card-text style="height: 440px;  overflow-y: scroll;">
            <v-row>
                <v-col xl="6" lg="6" md="6" sm="12" cols="12">
                    <v-carousel
                        next-icon=" WMi-angle-right"
                        prev-icon=" WMi-angle-left"
                        delimiter-icon=" WMi-circle"
                        height="330"
                    >
                        <v-carousel-item class="Carousel"
                                         v-for="(image,i) in getCurrentRentCar.images"
                                         :key="i"
                                         :src="image.thumbnail"
                                         @click="ShowImage(image.image)"
                        ></v-carousel-item>
                    </v-carousel>
                </v-col>
                <v-col xl="6" lg="6" md="6" sm="12" cols="12">
                    <v-row>
                        <v-col xl="6" lg="6" md="6" sm="6" xs="12">
                            <Owner
                                title="مالک خودرو"
                                :OwnerName="`${getCurrentRentCar.user.first_name} ${getCurrentRentCar.user.last_name}`"
                                :OwnerNumber="getCurrentRentCar.user.phone"
                            />
                        </v-col>
                        <v-col xl="6" lg="6" md="6" sm="6" xs="12">
                            <Owner1
                                text1="رنگ خودرو"
                                :text2="getCurrentRentCar.color"
                            />

                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col xl="6" lg="6" md="6" sm="6" xs="12">
                            <Owner1
                                text1="کارکرد خودرو"
                                :text2="getCurrentRentCar.car_usage"
                            />
                        </v-col>
                        <v-col xl="6" lg="6" md="6" sm="6" xs="12">
                            <Owner1
                                text1="وضعیت رنگ خودرو"
                                :text2="getCurrentRentCar.color_status"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col xl="6" lg="6" md="6" sm="6" xs="12">
                            <Owner1
                                text1="سوخت"
                                :text2="getCurrentRentCar.fuel"
                            />
                        </v-col>
                        <v-col xl="6" lg="6" md="6" sm="6" xs="12">
                            <Owner1
                                text1="شماره پلاک خودرو"
                                :text2="getCurrentRentCar.car_number"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col xl="6" lg="6" md="6" sm="6" cols="6">
                            <Owner1
                                text1="ساخت تولید خودرو"
                                :text2="getCurrentRentCar.made_at"
                            />
                        </v-col>
                        <v-col xl="6" lg="6" md="6" sm="6" xs="12">
                            <Owner1
                                v-if="getCurrentRentCar.guaranteeTypes"
                                text1="نوع ضمانت"
                                :values="getCurrentRentCar.guaranteeTypes.map(x => x.name)"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col xl="6" lg="6" md="6" sm="6" cols="6">
                            <Owner1
                                text1="آخرین تاریخ تعویض روغن"
                                :text2="convertToJalaliDate(getCurrentRentCar.last_oil_change)"
                            />
                        </v-col>
                        <v-col xl="6" lg="6" md="6" sm="6" xs="12">
                            <Owner1
                                text1="نصب GPS بفرمان روی ماشین"
                                :text2="getCurrentRentCar.befarman_gps ? 'بله' : 'خیر'"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col xl="6" lg="6" md="6" sm="6" xs="12">
                            <Owner1
                                text1="تخفیف بیمه"
                                :text2="getCurrentRentCar.insurance_discount"
                            />
                        </v-col>
                        <v-col xl="6" lg="6" md="6" sm="6" xs="12">
                            <Owner1
                                text1="GPS"
                                :text2="getGPS"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col xl="6" lg="6" md="6" sm="6" xs="12">
                            <Owner1
                                text1="بیمه شخص ثالت"
                                :text2="getThird_party_insurance"
                            />
                        </v-col>
                        <v-col xl="6" lg="6" md="6" sm="6" xs="12">
                            <Owner1
                                text1="بیمه بدنه"
                                :text2="getBody_insurance"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                            <v-col cols="12">
                                <Price :price="getCurrentRentCar.cost"/>
                            </v-col>
                        </v-row>

                    <More-detalis v-if="isAdmin" :getCurrentRentCar="getCurrentRentCar" class="more"/>
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
import MoreDetalis from "./MoreDetalis";
import {convertToJalali} from "../../components/Global/jalali-date";
import {mapActions, mapGetters} from "vuex";
let currentUser = JSON.parse(localStorage.getItem("user"));
export default {
    name: "rendCarDetails",
    data: () => ({
        isAdmin: currentUser ? !!currentUser.is_admin : false
    }),
    components: {
        Owner,
        Status,
        Owner1,
        Price,
        MoreDetalis
    },
    computed: {
        ...mapGetters("RentCars",["getCurrentRentCar"]),
        getBody_insurance(){
            if(this.getCurrentRentCar.body_insurance == 1){
                return "دارد"
            } else {
                return "ندارد"
            }
        },
        getThird_party_insurance(){
            if(this.getCurrentRentCar.third_party_insurance == 1){
                return "دارد"
            } else {
                return "ندارد"
            }
        },
        getGPS(){
          if (this.getCurrentRentCar.gps == 1){
              return "دارد"
          }
          else {
              return "ندارد"
          }
        },
        contract() {
            if (this.getCurrentRentCar.contract == "check") {
                return "چک"
            } else {
                return "وجه نقد"
            }
        }
    },
    methods: {
        ...mapActions("RentCars", ["setCurrentRentCar"]),
        convertToJalaliDate(date) {
            if (this.isDate(date)) {
                return convertToJalali(date);
            } else {
                return date;
            }
        },
        isDate(date ) {
            return !!(date && !(+(date)) && Date.parse(date));
        },
        setData() {
            let carId = this.$_getData("rentCarDetails");
            this.setCurrentRentCar(carId);
        },
        ShowImage(img){
            window.open(img, '_blank');
        }
    },
};
</script>

<style scoped>


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

.priceBox {
    position: absolute;
    top: 12%;
    right: 60%;
}

.owner {
    position: absolute;
    direction: rtl;
    border-right: 1px solid black;
    top: 20%;
    right: 40%;
    padding-right: 10px;
}

.o-detalis {
    border-right: 1px solid black;
    direction: rtl;
    padding-right: 10px;
    margin-top: 6%;
    position: absolute;
    top: 10%;
    right: 50%;
}

.color-car {
    border-right: 1px solid black;
    direction: rtl;
    padding-right: 10px;
    position: absolute;
    top: 10%;
    right: 50%;
    margin-top: 14.5%;
}

.pelak {
    border-right: 1px solid black;
    direction: rtl;
    padding-right: 10px;
    position: absolute;
    top: 10%;
    right: 70%;
    margin-top: 14.5%;
}
.Carousel{
    width: 100%;height: 100%
}


.contract {
    border-right: 1px solid black;
    direction: rtl;
    padding-right: 10px;
    position: absolute;
    top: 35%;
    right: 70%;
    margin-top: 14.5%;
}

.fuel {
    border-right: 1px solid black;
    direction: rtl;
    padding-right: 10px;
    position: absolute;
    top: -3%;
    right: 70%;
    margin-top: 14.5%;
}

.getThird_party_insurance {
    border-right: 1px solid black;
    direction: rtl;
    padding-right: 10px;
    position: absolute;
    top: 10%;
    right: 85%;
    margin-top: 14.5%;
}
.body_insurance{
    border-right: 1px solid black;
    direction: rtl;
    padding-right: 10px;
    position: absolute;
    top: 22%;
    right: 85%;
    margin-top: 14.5%;
}

.car-use {
    border-right: 1px solid black;
    direction: rtl;
    padding-right: 10px;
    position: absolute;
    top: 10%;
    right: 50%;
    margin-top: 21.5%;
}

.create {
    border-right: 1px solid black;
    direction: rtl;
    padding-right: 10px;
    position: absolute;
    top: 10%;
    right: 70%;
    margin-top: 21.5%;
}

.insurance_discount {
    border-right: 1px solid black;
    direction: rtl;
    padding-right: 10px;
    position: absolute;
    top: 35%;
    right: 50%;
    margin-top: 21.5%;
}
.GPS{
    border-right: 1px solid black;
    direction: rtl;
    padding-right: 10px;
    position: absolute;
    top: 35%;
    right: 70%;
    margin-top: 21.5%;
}

.car-color {
    border-right: 1px solid black;
    direction: rtl;
    padding-right: 10px;
    position: absolute;
    top: 10%;
    right: 50%;
    margin-top: 27.5%;
}

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

.more {
    position: absolute;
    left: 15px;
    top: 21%;
}

.img-detalis {
    width: 45%;
    margin-left: 56%;
    margin-top: 6%;
}

.Car-Img {
    width: 260px;
    float: right;
}

.infobar {
    margin: 1.35% 10px;
}

.dprice {
    position: absolute;
    left: 3%;
    bottom: 5%;
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
