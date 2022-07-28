<template>
    <base-modal
        class="text-center"
        maxWidth="700px"
        title="افزودن کاربر"
        subtitle="ADD USER"
        icon="WMi-user-plus"
        name="Add-user"
        @open="setData"
    >
        <v-card style="border-radius: 20px; width: 100%;">
            <v-card-text>
                <v-row>
                    <v-col cols="4">
                        <v-text-field label="نام کاربر" v-model="user.first_name">
                            <v-icon slot="prepend"> WMi-user</v-icon>
                        </v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field label=" نام خانوادگی کاربر" v-model="user.last_name">
                            <v-icon slot="prepend"> WMi-user</v-icon>
                        </v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field label="نام پدر" v-model="user.father_name">
                            <v-icon slot="prepend"> WMi-user-tie</v-icon>
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4">
                        <v-text-field label="شماره تماس" v-model="user.phone">
                            <v-icon slot="prepend"> WMi-mobile</v-icon>
                        </v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-autocomplete
                            prepend-icon="WMi-Educational"
                            append-icon="WMi-down-open"
                            v-model="user.education_rate"
                            :items="educationRates"
                            label="میزان تحصیلات"
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field label="شماره گواهی نامه" v-model="user.license_number">
                            <v-icon slot="prepend"> WMi-doc-text-inv</v-icon>
                        </v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field label=" کد ملی" v-model="user.national_code">
                            <v-icon slot="prepend"> WMi-credit-card-alt</v-icon>
                        </v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field label="شهر تولد" v-model="user.born_city">
                            <v-icon slot="prepend">WMi-map-marked</v-icon>
                        </v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field label="سال تولد" v-model="user.born_year">
                            <v-icon slot="prepend">WMi-calendar-1</v-icon>
                        </v-text-field>
                    </v-col>
                    <v-row>
                        <v-col cols="4">
                            <v-autocomplete label="استان" :items="getProvinces" @change="changeProvince(user.province_id)" item-value="id" item-text="name"
                                            append-icon="WMi-down-open" v-model="user.province_id">
                                <v-icon slot="prepend"> WMi-map-marked</v-icon>
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="4">
                            <v-autocomplete label="شهر" :items="getCities(user.province_id)" item-value="id" item-text="name"
                                            append-icon="WMi-down-open" v-model="user.city_id">
                                <v-icon slot="prepend"> WMi-map-marked</v-icon>
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="4">
                            <v-autocomplete
                                prepend-icon="WMi-Real-Estate"
                                append-icon="WMi-down-open"
                                v-model="user.location_type"
                                :items="locationTypes"
                                label="نوع محل سکونت"
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="9">
                            <v-text-field
                                prepend-icon="WMi-map"
                                v-model="user.address"
                                label="آدرس"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field label="شماره تلفن منزل" v-model="user.home_phone">
                                <v-icon slot="prepend"> WMi-phone</v-icon>
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-autocomplete
                                prepend-icon="WMi-align-right"
                                append-icon="WMi-down-open"
                                v-model="user.citizenship"
                                :items="citizenships"
                                label="تابعیت"
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field
                                prepend-icon="WMi-credit-card-alt"
                                v-model="user.passport_number"
                                label="شماره گذرنامه"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">
                            <v-text-field label="شغل" v-model="user.job">
                                <v-icon slot="prepend"> WMi-doc-text-inv</v-icon>
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="آدرس محل کار" v-model="user.workplace">
                                <v-icon slot="prepend">WMi-map</v-icon>
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="تلفن محل کار" v-model="user.work_phone">
                                <v-icon slot="prepend">WMi-phone</v-icon>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">
                            <v-autocomplete
                                prepend-icon="WMi-bank"
                                append-icon="WMi-down-open"
                                v-model="user.bank.name"
                                :items="bankNames"
                                label="نام بانک"
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="شماره حساب بانک" v-model="user.bank.account_number">
                                <v-icon slot="prepend">WMi-account_number</v-icon>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">
                            <v-text-field label="نام" v-model="user.relatives[0].name">
                                <v-icon slot="prepend">WMi-user</v-icon>
                            </v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field label="نسبت" v-model="user.relatives[0].relative">
                                <v-icon slot="prepend">WMi-info</v-icon>
                            </v-text-field>
                        </v-col>
                        <v-col cols="3">

                            <v-text-field label="شماره تماس" v-model="user.relatives[0].phone">
                                <v-icon slot="prepend">WMi-mobile</v-icon>
                            </v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field label="آدرس" v-model="user.relatives[0].address">
                                <v-icon slot="prepend">WMi-map</v-icon>
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="3">
                            <v-text-field label="نام" v-model="user.relatives[1].name">
                                <v-icon slot="prepend">WMi-user</v-icon>
                            </v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field label="نسبت" v-model="user.relatives[1].relative">
                                <v-icon slot="prepend">WMi-info</v-icon>
                            </v-text-field>
                        </v-col>
                        <v-col cols="3">

                            <v-text-field label="شماره تماس" v-model="user.relatives[1].phone">
                                <v-icon slot="prepend">WMi-mobile</v-icon>
                            </v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field label="آدرس" v-model="user.relatives[1].address">
                                <v-icon slot="prepend">WMi-map</v-icon>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-col xl="12" lg="12">
                        <Dropzone
                            :batchId="user.user_cert_batch_id"
                            placeholder="عکس های مدارک را در اینجا قرار دهید"
                            collection="user_certificates"
                            :images="user.certificates.filter(x => x.collection_name === 'user_certificates')"
                        />
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions style="background-color: #ededed">
                <v-btn
                    class="mx-2"
                    fab
                    dark
                    large
                    color="pink"
                    @click="$_toggleModal('Add-user')"
                >
                    <v-icon dark> WMi-cancel</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    class="mx-2"
                    fab
                    dark
                    large
                    color="cyan"
                    @click="createUserAndCloseModal(user)"
                >
                    <v-icon dark> WMi-ok</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </base-modal>
</template>
<script>
    import Dropzone from "@Components/Global/Dropzone";
    import CropperImage from "@Components/Global/CropperImage";
    import PersianDate from "../Global/PersianDate";
    import {mapActions, mapGetters} from "vuex";
    import {cloneDeep} from "lodash";
    let User_Default = {
        first_name: null,
        last_name: null,
        phone: null,
        national_code: null,
        father_name: null,
        address: null,
        crop_data: null,
        born_city: null,
        born_year: null,
        city: null,
        home_phone: null,
        job: null,
        user_cert_batch_id: null,
        workplace: null,
        certificates: [],
        bank: {name: '', account_number: ''},
        relatives: [
            {name: null},
            {name: null}
        ],
    };
    export default {
        components: {
            CropperImage,
            PersianDate,
            Dropzone
        },
        data() {
            return {
                user: cloneDeep(User_Default),
                locationTypes: ['شخصی', 'استیجاری', 'سایر'],
                citizenships: ['ایرانی', 'اتباع'],
                bankNames: ['ملی', 'سپه', 'ملت', 'کشاورزی', 'مسکن', 'صادرات', 'پارسیان', 'شهر', 'دی', 'تجارت', 'رفاه', 'گردشگری', 'رسالت', 'انصار', 'مهر اقتصاد', 'سایر'],
                educationRates: ['پایین تر از دیپلم', 'دیپلم', 'کاردانی', 'لیسانس', 'فوق لیسانس', 'دکتری', 'سایر'],
            };
        },
        computed: {
            ...mapGetters('City', ["getCities", "getProvinces"])
        },
        methods: {
            ...mapActions("Users", ["createUser", "updateUser"]),
            ...mapActions("City", ["loadProvinces", "loadCities"]),
            changeProvince(provinceId) {
                this.loadCities(provinceId);
            },
            createUserAndCloseModal(user) {
                if (this.user.id) {
                    this.updateUser(user).then(() => {
                        this.$_toggleModal("Add-user");
                    });
                } else {
                    this.createUser(user).then(() => {
                        this.$_toggleModal("Add-user");
                    });
                }

            },
            generateBatchId() {
                return [...Array(40)]
                    .map((i) => (~~(Math.random() * 36)).toString(36))
                    .join("");
            },
            async setData() {
                if (this.$_getData("Add-user")) {
                    this.user = cloneDeep(this.$_getData("Add-user"));
                    if (!this.user.relatives) {
                        this.user.relatives = [{name: null}, {name: null}]
                    }
                    if (!this.user.bank) {
                        this.user.bank = {name: null, account_number: ''}
                    }
                    if (this.user.city) {
                        this.loadCities(this.user.city.province_id)
                    }
                } else {
                    this.user = cloneDeep(User_Default)
                }
                this.user.user_cert_batch_id = this.generateBatchId();
            },
        },
        created() {
            this.loadProvinces();
        }
    };
</script>
<style scoped>
    * {
        font-family: yekan_light;
    }

    .filterInfo {
        color: #ffffff;
    }

    .AddUser {
        position: fixed;
        bottom: 15px;
        left: 15px;
    }

    .headlogin {
        height: 100px;
        background-color: black;
    }

    .subBtn {
        display: none;
        margin: 100px;
    }

    .filter_pr {
        font-size: 20px;
    }

    .filter_en {
        font-size: 16px;
        letter-spacing: 15px;
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
        right: 20%;
    }

    .login_input {
        width: 100%;
        display: inline-block;
        padding: 10px;
        margin-right: auto;
        margin-left: auto;
    }
</style>
