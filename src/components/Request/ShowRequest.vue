<template>
    <BaseModal
        width="90%"
        name="ShowRequest"
        title="نمایش جزئیات درخواست"
        subtitle="Show REQUEST"
        icon="WMi-plus"
        @open="setData"
    >
        <template v-if="request.car_info">
            <v-container fill-height fluid>
                <v-card style="width: 100%">
                    <v-card-text>
                        <v-row>
                            <v-col>
                                <img
                                    class="Car-Img"
                                    :src="request.car_info.images[0].thumbnail_300"
                                    alt=""/>
                            </v-col>
                            <v-col>
                                <h1 class="infoPr">{{ request.car_info.name }}</h1>
                                <h1 class="infoEn">{{ request.car_info.car.name_en }}</h1>
                            </v-col>
                            <v-col>
                                <Owner title="مالک خودرو" class="owner" :OwnerName="userfullName"
                                       :OwnerNumber="request.car_info.user.phone"/>
                            </v-col>
                            <v-col>
                                <Owner title="درخواست دهنده" class="requester" :OwnerName="requesterfullName"
                                       :OwnerNumber="request.user_requested.phone"/>
                            </v-col>
                            <v-col>
                                <h3>تاریخ شروع: </h3> <span>{{jalali(request.start_at)}}</span>
                                <h3>تاریخ استرداد: </h3> <span>{{jalali(request.end_at)}}</span>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-container>
            <v-container fill-height fluid>
                <v-card style="width: 100%">
                    <v-card-text>
                        <v-row>
                            <v-col>
                                <h2>مکان تحویل:</h2>
                            </v-col>
                            <v-col>
                                <p>{{request.start_delivary_place}}</p>
                            </v-col>
                        </v-row>
                        <v-row class="mt-2">
                            <v-col>
                                <h2>مکان استرداد:</h2>
                            </v-col>
                            <v-col>
                                <p>{{request.end_delivary_place}}</p>
                            </v-col>
                        </v-row>
                        <v-row v-if="contract_link" class="mt-2 mb-2">
                            <a :href="contract_link">
                                <TooltipButton small icon="WMi-download" button-color="rgb(50, 202, 213)"
                                               text="دانلود قرارداد"/>
                            </a>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-container>
            <v-container fill-height fluid>
                <v-card style="width: 100%">
                    <v-card-title>وضعیت ها</v-card-title>
                    <v-card-text>
                        <v-card v-for="(status, i) in request.status" :key="i" class="mt-2">
                            <v-card-text>
                                <v-row align="center">
                                    <v-col>
                                        <status :status="status.status"/>
                                    </v-col>
                                    <v-col>
                                        <h3>تغییر در تاریخ: </h3>
                                        <div>{{jalali(status.created_at)}}</div>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-card-text>
                </v-card>
            </v-container>
            <v-container fill-height fluid>
                <v-card style="width: 100%">
                    <v-card-title>زمان ها و تمدید ها</v-card-title>
                    <v-card-text>
                        <v-card v-for="(time, i) in request.time" :key="i" class="mt-2">
                            <v-card-text>
                                <v-row align="center">
                                    <v-col>
                                        <h3>تاریخ شروع: </h3> <span>{{jalali(time.start_at)}}</span>
                                        <h3>تاریخ پایان: </h3> <span>{{jalali(time.end_at)}}</span>
                                    </v-col>
                                    <v-col>
                                        <Price class="priceBox" :price="time.total_cost"/>
                                    </v-col>
                                    <v-col>
                                        <h3>ثبت در تاریخ: </h3> <span>{{jalali(time.created_at)}}</span>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-card-text>
                </v-card>
            </v-container>
            <v-container fill-height fluid>
                <v-card style="width: 100%">
                    <v-card-title>تحویل و استرداد ها</v-card-title>
                    <v-card-text>
                        <v-card v-for="(delivery, i) in request.delivery" :key="i" class="mt-2">
                            <v-card-text>
                                <v-row align="center">
                                    <v-col>
                                        <h2>{{delivery.type == 'take' ? 'تحویل': 'استرداد' }}</h2>
                                    </v-col>
                                    <v-col>
                                        <h3>وضعیت رنگ: </h3> <span>{{delivery.color_status}}</span>
                                    </v-col>
                                    <v-col>
                                        <h3>کیلومتر ماشین: </h3> <span>{{delivery.car_usage}}</span>
                                    </v-col>
                                    <v-col>
                                        <h3>وضعیت بنزین: </h3> <span>{{delivery.fuel_count}}</span>
                                    </v-col>
                                    <v-col>
                                        <h3>در تاریخ: </h3> <span>{{jalali(delivery.created_at)}}</span>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">{{delivery.description}}</v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-card-text>
                </v-card>
            </v-container>
        </template>
    </BaseModal>
</template>
<script>
    import Owner from "../Global/Owner-Info/Owner-Info";
    import Status from "./StatusRequest";
    import Price from "../Global/Price/Price";
    import {convertToJalali} from "../../components/Global/jalali-date"

    export default {
        name: 'ShowRequest',
        components: {
            Owner,
            Status,
            Price
        },
        data: () => ({
            request: {}
        }),
        computed: {
            contract_link() {
                if (this.request.contract_file_name) {
                    return location.origin + '/cdn/Contract/' + this.request.id + '/' + this.request.contract_file_name + '/contract.pdf';
                }
                return null
            },
            userfullName() {
                if (this.request.car_info) {
                    return `${this.request.car_info.user.first_name} ${this.request.car_info.user.last_name}`;
                }
            },
            requesterfullName() {
                if (this.request.user_requested) {
                    return `${this.request.user_requested.first_name} ${this.request.user_requested.last_name}`;
                }
            },
        },
        methods: {
            setData(request) {
                this.request = this.$_getData("ShowRequest");
            },
            jalali(date) {
                return convertToJalali(date, "hh:mm jYYYY/jMM/jDD");
            }
        }
    }
</script>
