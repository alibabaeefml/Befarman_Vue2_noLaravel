<template>
    <base-modal
        class="text-center"
        max-width="800"
        title="اضافه کردن خودرو"
        subtitle="NEW CAR"
        icon="WMi-car-side"
        name="add-car"
        @open="setData"
    >
        <v-card-text>
            <v-row>
                <v-col cols="12">
                    <div v-if="image" style="width:100%">
                        <img :src="image" width="100%">
                    </div>
                    <v-file-input
                        @change="changeImage"
                        v-model="car.image"
                        label="تصویر خودرو را بارگذاری کنید"
                        outlined
                        dense
                        prepend-icon="WMi-camera"
                    ></v-file-input>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    <v-select
                        label="برند خودرو"
                        v-validate="'required|email'"
                        name="brand"
                        :items="getBrands"
                        item-value="id"
                        item-text="name_fa"
                        prepend-icon="WMi-car-side"
                        append-icon="WMi-down-open"
                        v-model="car.brand_id"
                    ></v-select>
                </v-col>
                <v-col cols="4">
                    <v-text-field
                        type="text"
                        label="نام فارسی"
                        v-model="car.name_fa"
                    >
                        <v-icon slot="prepend"> WMi-text</v-icon>
                    </v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-text-field
                        type="text"
                        label="نام انگلیسی"
                        v-model="car.name_en"

                    >
                        <v-icon slot="prepend"> WMi-text</v-icon>
                    </v-text-field>
                </v-col>
            </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions style="background-color: #ededed;width: 100%">
            <v-btn @click="$_toggleModal('add-car')"  class="mx-2" fab dark large color="pink" style="position: absolute;right: 10px">
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
                    @click="sumbitCar"
                >
                    <v-icon dark> WMi-ok</v-icon>
                </v-btn>
            </div>
        </v-card-actions>
    </base-modal>
</template>
<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: 'AddCar',
    computed: {
        ...mapGetters("Cars", ["getBrands", "getCars", "getTrims", "getSelectedCarImage"]),
    },
    methods: {
        ...mapActions("Cars", ["loadBrands", "loadCars", "loadTrims", "submitAutomobile"]),
        setData() {
            if (!this.getBrands.length) {
                this.loadBrands();
            }
        },
        async sumbitCar() {
            let result = await this.submitAutomobile(this.car);
            if(result) {
                this.$_toggleModal("add-car");
            }
        },
        changeImage(file) {
            let reader = new FileReader();
            reader.onload = () => {
                this.image = reader.result;
            };
            reader.readAsDataURL(file);
        }
    },
    data() {
        return {
            crop_data: null,
            url: null,
            image: '',
            car: {
                brand_id: null,
                name_en: null,
                name_fa: null,
                image: [],
            }
        }
    }
}
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
