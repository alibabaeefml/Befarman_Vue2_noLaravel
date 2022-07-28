<template>
    <v-row :class="itemData.status === 'success' ? 'trueRowEntrance' : 'falseRowEntrance'">
        <v-col cols="3">
            <div>
                {{ itemData.user ? itemData.user.name : '' }}
            </div>
            <span>{{ itemData.user ? itemData.user.phone : '' }}</span>
        </v-col>
        <v-col cols="7">
            <div>{{itemData.message}}</div>
        </v-col>
        <v-col cols="2">
            <div>{{convertToJalaliDate(itemData.created_at)}}</div>
        </v-col>
    </v-row>
</template>

<script>
    import {convertToJalali} from "../Global/jalali-date";

export default{
    props: {
        itemData: {default: {}},
    },
    methods: {
        convertToJalaliDate(date) {
            if (this.isDate(date)) {
                return convertToJalali(date, "jYYYY/jMM/jDD HH:ss");
            } else {
                return date;
            }
        },
        isDate(date ) {
            return !!(date && !(+(date)) && Date.parse(date));
        },
    }
};
</script>

<style scoped>
.trash-button {
    position: absolute;
    top: 33%;
    left: 1.5%;
}

.trueEntrance {
    background-color: #32CAD5;
    height: 100%;
}

.falseEntrance {
    background-color: #EE3552;
    height: 100%;
}

.trueDataItem {
    border-right: 1px solid #32CAD5;
}

.falseDataItem {
    border-right: 1px solid #EE3552;
}

.ok-button {
    position: absolute;
    top: 33%;
    left: 5.5%;
}

.priceBox {
    position: absolute;
    top: 12%;
    right: 60%;
}

.data_1 {
    position: absolute;
    direction: rtl;
    top: 20%;
    right: 40%;
    padding: 10px;
    padding-right: 10px;
}

.data_2 {
    position: absolute;
    direction: rtl;
    top: 20%;
    right: 60%;
    padding: 10px;
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
    right: 65%;
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
    right: 65%;
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

.trueRowEntrance {
    position: relative;
    direction: rtl;
    margin-right: auto;
    margin-left: auto;
    margin-top: 20px;
    width: 95%;
    background-color: rgb(50, 202, 213, .1);
    height: 130px;
    border: 1px #32CAD5 solid;
    border-radius: 6px;
    transition: 0.2s;
}

.falseRowEntrance {
    position: relative;
    direction: rtl;
    margin-right: auto;
    margin-left: auto;
    margin-top: 20px;
    width: 95%;
    background-color: rgb(238, 53, 82, .1);
    height: 130px;
    border: 1px #EE3552 solid;
    border-radius: 6px;
    transition: 0.2s;
}

.img-detalis {
    width: 45%;
    margin-left: 56%;
    margin-top: 6%;
}

.Car-Img {
    width: 190px;
    float: right;
    padding: 11px -30px
}

.infobar {
    margin: 1.35% 10px;
}

.dprice {
    direction: rtl;
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
