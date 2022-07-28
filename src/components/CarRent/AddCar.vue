<template>
    <BaseModal
        width="900"
        name="addRentCar"
        title="افزودن خودرو"
        subtitle="Add New Car"
        icon="WMi-plus"
        @open="setData"
        @close="resetData"
    >
        <v-card style="border-radius: 20px; width: 100%">
            <v-card-text>
                <v-row>
                    <v-col cols="3">
                        <v-select
                            label="برند خودرو"
                            v-validate="'required|email'"
                            name="brand"
                            :items="getBrands"
                            item-value="id"
                            item-text="name_fa"
                            prepend-icon="WMi-car-side"
                            append-icon="WMi-down-open"
                            @input="loadRelatedCars"
                            v-model="car.brand_id"
                        ></v-select>
                        <span>{{ errors.first('email') }}</span>
                    </v-col>

                    <v-col cols="3">
                        <v-select
                            label="مدل خودرو"
                            :items="getCars"
                            item-value="id"
                            item-text="name_fa"
                            prepend-icon="WMi-car-side"
                            append-icon="WMi-down-open"
                            @input="loadRelatedTrims"
                            v-model="car.car_id"
                            v-if="getCars.length"
                        ></v-select>
                    </v-col>

                    <v-col cols="3">
                        <v-select
                            v-model="car.trim_id"
                            label="تریم"
                            :items="getTrims"
                            item-value="id"
                            item-text="name_fa"
                            prepend-icon="WMi-car-side"
                            append-icon="WMi-down-open"
                            v-if="getTrims.length"
                        ></v-select>
                    </v-col>

                    <v-col cols="3">
                        <BaseAutoComplete
                            url="Users/searchUsers"
                            style="margin-top: 20px"
                            v-slot="{ filter }"
                        >
                            <v-autocomplete
                                v-model="car.user_id"
                                :items="getUsersList"
                                item-text="name"
                                item-value="id"
                                :chips="false"
                                dense
                                label="مالک خودرو"
                                append-icon="mdi-magnify"
                                @keydown="filter"
                                no-data-text="مالک خودرو را جستجو کنید."
                            ></v-autocomplete>
                        </BaseAutoComplete>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col lg="4" xl="4">

<!--                        <img style="width: 100%" :src="getSelectedCarImage"/>-->

                        <cropper-image :stencil-props="{aspectRatio: 1}" :crop_data.sync="car.crop_data" v-model="car.image" :url.sync="car.thumbnail" />

                    </v-col>
                    <v-col cols="8">
                        <v-row>
                            <v-col lg="6" xl="6">
                                <v-text-field label="پلاک خودرو" v-model="car.car_number">
                                    <v-icon slot="prepend"> WMi-barcode</v-icon>
                                </v-text-field>
                            </v-col>
                            <v-col lg="6" xl="6">
                                <v-text-field
                                    type="number"
                                    label="کارکرد خودرو"
                                    v-model="car.car_usage"
                                >
                                    <v-icon slot="prepend"> WMi-car-side</v-icon>
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col lg="6" xl="6">
                                <v-text-field
                                    type="number"
                                    label="هزینه روزانه"
                                    v-model="car.rent_cost"
                                >
                                    <v-icon slot="prepend"> WMi-cash</v-icon>
                                </v-text-field>
                            </v-col>
                            <v-col lg="6" xl="6">

                                <v-select
                                    style="margin-top: 4px; padding-right: 10px"
                                    label="رنگ خودرو"
                                    :items="colors"
                                    name="color"
                                    item-text="name"
                                    item-value="color"
                                    prepend-icon=" WMi-art-gallery"
                                    append-icon="WMi-down-open"
                                    v-model="car.color"
                                ></v-select>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col lg="6" xl="6">
                                <v-select
                                    style="margin-top: 27px; padding-right: 10px"
                                    label="سال تولید خودرو"
                                    :items="year"
                                    prepend-icon="WMi-car-side"
                                    append-icon="WMi-down-open"
                                    v-model="car.made_at"
                                ></v-select>
                            </v-col>
                            <v-col lg="6" xl="6">
                                <v-select
                                    style="margin-top: 27px; padding-right: 10px"
                                    label="وضعیت رنگ خودرو"
                                    :items="colorStatus"
                                    item-text="name"
                                    item-value="value"
                                    prepend-icon="WMi-car-side"
                                    append-icon="WMi-down-open"
                                    v-model="car.color_status"
                                ></v-select>
                            </v-col>
                            <v-col lg="6" xl="6">
                                <v-select
                                    style="margin-top: 27px; padding-right: 10px"
                                    label="وضعیت جی پی اس"
                                    :items="booleanStatus"
                                    item-text="name"
                                    item-value="value"
                                    prepend-icon="WMi-map"
                                    append-icon="WMi-down-open"
                                    v-model="car.gps"
                                ></v-select>
                            </v-col>
                            <v-col lg="6" xl="6">
                                <v-select
                                    style="margin-top: 27px; padding-right: 10px"
                                    label="وضعیت بیمه"
                                    :items="booleanStatus"
                                    item-text="name"
                                    item-value="value"
                                    prepend-icon="WMi-car-side"
                                    append-icon="WMi-down-open"
                                    v-model="car.insurance"
                                ></v-select>
                            </v-col>
                        </v-row>

                        <v-col lg="12" xl="12" style="padding: 40px 0px">
                            <h2 style="direction: rtl; padding: 20px 10px">
                                <v-icon>WMi-shield</v-icon>
                                نوع ضمانت :
                            </h2>
                            <div class="radio">
                <span class="check" v-for="guaranteetype in getGuaranteeTypes">
                  <input
                      type="checkbox"
                      :name="guaranteetype.name"
                      :value="guaranteetype.id"
                      v-model="car.guaranteeTypes"
                  />
                  <label>{{guaranteetype.name}}</label>
                </span>

                            </div>
                            <v-switch v-model="car.third_party_insurance" :true-value="1" :false-value="0" inset label="بیمه شخص ثالث"></v-switch>
                            <v-switch inset v-model="car.body_insurance" :true-value="1" :false-value="0" label="بیمه بدنه"></v-switch>
                            <v-switch inset v-model="car.befarman_gps" :true-value="1" :false-value="0"
                                      label="آیا مایل هستید بفرمان روی ماشین شما GPS نصب کند ؟"></v-switch>
                        </v-col>
                    </v-col>
                </v-row>
                <v-col xl="12" lg="12">
                    <Dropzone
                        :batchId="car.thumbnail_batch_id"
                        placeholder="عکس های ماشین را در اینجا قرار دهید"
                        collection="car_images"
                        :images="car.images.filter(x => x.collection_name === 'car_images')"
                        v-if="dropzoneActive"
                    />
                </v-col>
                <v-col xl="12" lg="12">
                    <Dropzone
                        :batchId="car.cert_batch_id"
                        placeholder="عکس های مدارک را در اینجا قرار دهید"
                        collection="car_certificates"
                        :images="car.certificates.filter(x => x.collection_name === 'car_certificates')"
                        v-if="dropzoneActive"
                    />
                </v-col>

                <v-row>
                    <v-col lg="12" xl="12">
                        <v-textarea
                            prepend-icon=" WMi-quote-right"
                            label="توضیحات"
                            v-model="car.details"
                        ></v-textarea>
                    </v-col>
                    <v-col lg="6" xl="6">
                        <v-textarea
                            prepend-icon="WMi-question-circle-o"
                            label="کدام قسمت ها رنگی شده اند؟"
                            v-model="car.painted"
                        ></v-textarea>
                    </v-col>
                    <v-col lg="6" xl="6">
                        <v-textarea
                            prepend-icon="WMi-car-side"
                            label="کدام قسمت های خودرو تعویض شده اند؟"
                            v-model="car.changed_parts"
                        ></v-textarea>
                    </v-col>
                    <v-col lg="4" xl="4">
                        <v-text-field
                            prepend-icon="WMi-car-side"
                            label="تخفیف بیمه"
                            v-model="car.insurance_discount"
                        />
                    </v-col>
                    <v-col lg="4" xl="4">
                        <v-select
                            prepend-icon="WMi-glyph-12"
                            append-icon="WMi-down-open"
                            label="سوخت"
                            :items="fuels"
                            item-text="name"
                            item-value="value"
                            v-model="car.fuel"
                        ></v-select>
                    </v-col>
                    <v-col lg="3" xl="3">
                        <persian-date
                            v-model="car.last_oil_change"
                            type="date"
                            label="آخرین تاریخ تعویض روغن"
                        />
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions style="background-color: #ededed">
                <v-btn @click="$_toggleModal('addRentCar')" class="mx-2" fab dark large color="pink">
                    <v-icon dark> WMi-cancel</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    class="subBtn"
                    fab
                    dark
                    large
                    color="cyan"
                    @click="createCar(car)"
                >
                    <v-icon dark> WMi-ok</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </BaseModal>
</template>
<script>
    import Dropzone from "@Components/Global/Dropzone";
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import PersianDate from "../Global/PersianDate";
    import {cloneDeep} from "lodash";
    import CropperImage from "../Global/CropperImage";

    let car = {
        gps: null,
        insurance: null,
        user_id: null,
        brand_id: null,
        car_id: null,
        trim_id: null,
        car_number: null,
        color: null,
        made_at: null,
        car_usage: null,
        color_status: null,
        cost: null,
        fuel: null,
        last_oil_change: null,
        insurance_discount: null,
        details: null,
        painted: null,
        changed_parts: null,
        status_id: 1,
        guaranteeTypes: [],
        thumbnail: null,
        images: [],
        certificates: [],
        cert_batch_id: null,
        thumbnail_batch_id: null,
        name: null,
        third_party_insurance: 0,
        body_insurance: 0,
        befarman_gps: 0
    };

    export default {
        components: {
            CropperImage,
            Dropzone,
            PersianDate,
        },
        data() {
            return {
                NewCarImage: this.getSelectedCarImage,
                dropzoneActive: false,
                fuels: [
                    {
                        name: "بنزین",
                        value: "بنزین",
                    },
                    {
                        name: "دوگانه سوز",
                        value: "دوگانه سوز",
                    },
                    {
                        name: "هیبریدی",
                        value: "هیبریدی",
                    },
                ],
                car: {...car},
                year: [
                    '1380',
                    '1381',
                    '1382',
                    '1383',
                    '1384',
                    '1385',
                    '1386',
                    '1387',
                    '1388',
                    '1389',
                    '1390',
                    '1391',
                    '1392',
                    '1393',
                    '1393',
                    '1394',
                    '1395',
                    '1396',
                    '1397',
                    '1398',
                    '1399',
                    '1400',
                ],
                colorStatus: [
                    {
                        name: "بی رنگ",
                        value: "بی رنگ",
                    },
                    {
                        name: "رنگ شده",
                        value: "رنگ شده",
                    },
                ],
                booleanStatus: [
                    {
                        name: "دارد",
                        value: 1,
                    },
                    {
                        name: "ندارد",
                        value: 0,
                    },
                ],
                colors: [
                    {name: "قرمز", color: "قرمز", hex: "#ee3552"},
                    {name: "قهوه ای", color: "قهوه ای", hex: "#915117"},
                    {name: "خاکستری", color: "خاکستری", hex: "#828282"},
                    {name: "مشکی", color: "مشکی", hex: "#000"},
                    {name: "سفید", color: "سفید", hex: "#fff"},
                    {name: "بژ", color: "بژ", hex: "#fff"},
                    {name: "مسی", color: "مسی", hex: "#fff"},
                    {name: "زیتونی", color: "زیتونی", hex: "#fff"},
                    {name: "نوک مدادی", color: "نوک مدادی", hex: "#fff"},
                    {name: "اطلسی", color: "اطلسی", hex: "#fff"},
                    {name: "آبی", color: "آبی", hex: "#fff"},
                    {name: "بنفش", color: "بنفش", hex: "#fff"},
                    {name: "آلبالویی", color: "آلبالویی", hex: "#fff"},
                    {name: "نقره آبی", color: "نقره آبی", hex: "#fff"},
                    {name: "سبز", color: "سبز", hex: "#fff"},
                    {name: "نارنجی", color: "نارنجی", hex: "#fff"},
                ],
            };
        },
        computed: {
            ...mapGetters("Cars", ["getBrands", "getCars", "getTrims", "getSelectedCarImage"]),
            ...mapGetters("Users", ["getUsers", "getFiltered"]),
            ...mapGetters("GuaranteeType", ["getGuaranteeTypes"]),
            getUsersList() {
                let usersList = [];
                this.getFiltered.forEach((user) => {
                    usersList.push({
                        id: user.id,
                        name: `${user.first_name} ${user.last_name} ${user.phone}`,
                    });
                });
                return usersList;
            },
        },
        methods: {
            ...mapActions("RentCars", ["createRentCar", "updateRentCar"]),
            ...mapActions("GuaranteeType", ["loadGuaranteeTypes"]),
            ...mapActions("Cars", ["loadBrands", "loadCars", "loadTrims"]),
            ...mapMutations("Cars", ["SET_CARS", "SET_BRAND_IMAGE"]),
            ...mapMutations("Users", ["SET_USERS_SEARCH_RESULT"]),
            async loadRelatedCars(brandId) {
                await this.loadCars(brandId);
                this.car.car_id = null;
            },
            async loadRelatedTrims(carId) {
                this.SET_BRAND_IMAGE(carId);
                await this.loadTrims(carId);
                this.car.trim_id = null;
            },
            async setData() {
                if (!this.getBrands.length) {
                    this.loadBrands();
                }

                if (this.$_getData("addRentCar")) {
                    let car = cloneDeep(this.$_getData("addRentCar"));
                    car.brand_id = car.brand.id;
                    car.guaranteeTypes = car.guaranteeTypes.map(x => x.id);
                    this.car = {...this.car, ...car};
                    await this.loadRelatedCars(car.brand_id);
                    this.car.car_id = car.car.id;
                    await this.loadRelatedTrims(car.car.id);
                    this.car.trim_id = car.trim.id;
                    this.SET_USERS_SEARCH_RESULT([car.user]);
                    this.car.user_id = car.user.id;
                }

                function generateBatchId() {
                    return [...Array(40)]
                        .map((i) => (~~(Math.random() * 36)).toString(36))
                        .join("");
                }


                if (!this.$_getData("addRentCar")) {
                    this.SET_CARS([]);
                }

                this.car.cert_batch_id = generateBatchId();
                this.car.thumbnail_batch_id = generateBatchId();

                this.dropzoneActive = true;
            },
            resetData() {
                this.car = {...car};
                this.dropzoneActive = false;
            },
            async createCar() {
                let cars = this.getCars;
                let carIndex = cars.findIndex((car) => car.id === this.car.car_id);
                this.car.name = cars[carIndex]["name_fa"];

                if (this.car.trim_id) {
                    let trims = this.getTrims;
                    let trimIndex = trims.findIndex((trim) => trim.id === this.car.trim_id);
                    this.car.name = `${this.car.name} ${trims[trimIndex]["name_fa"]}`;
                }
                let response;
                if (this.car.id) {
                    response = await this.updateRentCar(this.car);
                } else {
                    response = await this.createRentCar(this.car);
                }
                if ([200, 201].includes(response.status)) {
                    this.$_toggleModal("addRentCar");
                }
            },
        },
        created() {
            this.loadGuaranteeTypes();
        }
    };
</script>

<style scoped>
    * {
        font-family: yekan_light;
    }

    label {
        left: 80%;
        color: red;
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
        right: 11%;
    }

    .radio {
        direction: rtl;
        font-family: yekan_light;
    }

    .check {
        padding: 20px;
        font-family: yekan_light;
    }

    label {
        color: #000;
        font-size: 17px;
    }
</style>
