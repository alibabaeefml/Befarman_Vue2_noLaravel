<template>
    <v-row class="item" v-if="car.user">
        <v-col>
            <img class="Car-Img" :src="car.thumbnail ? car.thumbnail : car.car.thumbnail " alt="" @click="$_toggleModal('rentCarDetails', car.id)"/>
        </v-col>
        <v-col>
            <h1 class="infoPr" @click="$_toggleModal('rentCarDetails', car.id)">{{ car.name_fa }}</h1>
            <h1 class="infoEn" @click="$_toggleModal('rentCarDetails', car.id)">{{ car.name_en }}</h1>
            <status :statusId="car.status_id"
                    @click="$_toggleModal('NewRentableCar', {carId: car.id,carStatusId: car.status_id,correctStatus:car.status_id})"/>
        </v-col>
        <v-col>
            <Owner class="owner" title="مالک خودرو" :OwnerName="OwnerFullName" :OwnerNumber="car.user.phone"/>
        </v-col>
        <v-col>
        </v-col>
        <v-col>
            <Price class="priceBox" :price="car.cost"/>
        </v-col>
        <v-col class="ma-8" v-if="showActions">
            <TooltipButton small v-if="dates && dates.length" icon="WMi-calendar-2" @click="showDates = true"
                           button-color="rgb(255, 107, 87)" text="تاریخ رزرو"/>
            <TooltipButton small icon="WMi-comment-alt" button-color="rgb(50, 202, 213)" text="نظرات"
                           @click="$_toggleModal('commentList', {comments:car.comments, type: 'car'})"/>
            <TooltipButton small icon="WMi-pencil" button-color="#000000" text="ویرایش"
                           @click="$_toggleModal('addRentCar',(car))"/>
            <TooltipButton small icon="WMi-trash" button-color="#ee3552" text="حذف"
                           @click="$_toggleModal('AcceptCarDelete',(car.id))"/>
        </v-col>
        <v-col class="ma-8" v-else>
            <TooltipButton small icon="WMi-back" button-color="#f7890b" text="بازگشت خودرو"
                           @click="restoreCar(car.id)"/>
        </v-col>
        <ShowPersianDate v-if="dates && dates.length" :show.sync="showDates" :dates="dates"/>
    </v-row>
</template>

<script>
    import Price from "../Global/Price/Price";
    import Button from "../Global/Buttons/circle";
    import Owner from "../Global/Owner-Info/Owner-Info";
    import Status from "@/components/CarRent/rentCarStatus/Status";
    import Owner1 from "../Global/Owner-Info/Owner";
    import ShowPersianDate from "../Global/ShowPersianDate";
    import {mapActions} from "vuex";

    export default {
        components: {
            Status,
            Price,
            Button,
            Owner,
            Owner1,
            ShowPersianDate,
        },
        data: () => ({
            showDates: false
        }),
        computed: {
            OwnerFullName() {
                if (this.car && this.car.user) {
                    return this.car.user.first_name + " " + this.car.user.last_name
                }
                return '';
            },
            dates() {
                if (this.car.requests && this.car.requests.length) {
                    let reqeusts = [];
                    for (let request of this.car.requests) {
                        if (request.hasOwnProperty('start_at') && request.start_at && request.end_at) {
                            let dates = this.getDatesInRange(new Date(request.start_at), new Date(request.end_at));
                            reqeusts = [...dates, ...reqeusts]
                        }
                    }
                    return reqeusts;
                }
                return [];
            },
        },
        methods: {
            ...mapActions("RentCars", ["restoreCar"]),
            getDatesInRange(startDate, endDate) {
                const date = new Date(startDate.getTime());
                const dates = [];
                while (date <= endDate) {
                    dates.push(new Date(date));
                    date.setDate(date.getDate() + 1);
                    date.setHours(0, 0, 0, 0)
                }

                return dates;
            }
        },
        props: {
            car: {type: Object},
            showActions: {type: Boolean, default: true},
        },

    };
</script>

<style scoped>
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

    .Car-Img {
        height: 100px;
        max-width: 130px;
        float: right;
        padding: 11px -30px
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

</style>
