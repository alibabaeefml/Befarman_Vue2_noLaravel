<template>
    <v-row :class="rowClass(itemData.type)">
        <v-col :class="itemClass(itemData.type)" cols="3">
            <h2 style="color:#fff;font-family: 'monserat_medium';font-size: 50px;text-align:center;padding: 10px">
                {{ itemData.fee }}
                {{ plusOrMinus(itemData.type) }} </h2>
            <span style="color: #fff;font-family:'yekan_light';position: absolute;bottom: 10%;right: 18%;">تومان</span>
        </v-col>
        <v-col cols="2">
        </v-col>
        <v-col cols="2">
            <data-item :text1="itemData.title" :Entrance="itemData.type" class="data_1" :class="dataItemClass(itemData.type)" :text2="itemData.description"/>
        </v-col>
        <v-col cols="2">
            <data-item :text1="itemData.customer.name" :Entrance="itemData.type" class="data_2" :class="dataItemClass(itemData.type)" :text2="itemData.customer.phone"/>
        </v-col>
        <v-col cols="3" style="direction : ltr" v-if="showActions">
            <Button icon="WMi-trash" @click="removeTransaction(itemData.id)" color="#ee3552" class="trash-button"/>
            <Button icon="WMi-pencil" color="#000000" class="ok-button" @click="$_toggleModal('editTransaction',itemData)" />

        </v-col>
        <v-col cols="3" v-else style="direction: ltr">
            <Button icon="WMi-back" @click="restoreTransaction(itemData.id)" color="#f7890b" class="trash-button"/>
        </v-col>
    </v-row>
</template>

<script>
import DataItem from "./dataItem";
import Button from "../Global/Buttons/circle";
import {mapActions} from "vuex";

export default{
    components: {
        DataItem,
        Button
    },
    props: {
        Entrance: {default: false},
        itemData: {default: {}},
        showActions: {default: true, type: Boolean},
    },
    methods: {
        ...mapActions("Transactions", ["removeTransaction", "restoreTransaction"]),
        itemClass(en) {
            if (en == "input") {
                return 'trueEntrance'
            } else {
                return 'falseEntrance'
            }
        },
        rowClass(en) {
            if (en == "input") {
                return 'trueRowEntrance'
            } else {
                return 'falseRowEntrance'
            }
        },
        dataItemClass(en) {
            if (en == "input") {
                return 'trueDataItem'
            } else {
                return 'falseDataItem'
            }
        },
        plusOrMinus(type) {
            if (type == "input") {
                return "+"
            } else {
                return "-"
            }
        }

    },
    computed: {}
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
