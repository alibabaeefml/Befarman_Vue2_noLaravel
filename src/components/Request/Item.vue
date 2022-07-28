<template>
    <div class="item">
        <img
            class="Car-Img"
            :src="request.car_info.car.thumbnail"
            alt=""
        />
        <div class="infobar">
            <h1 class="infoPr">{{ request.car_info.car.name_fa }}</h1>
            <h1 class="infoEn">{{ request.car_info.car.name_en }}</h1>
            <Owner title="مالک خودرو" class="owner" :OwnerName="userfullName"
                   :OwnerNumber="request.car_info.user.phone"/>
            <Owner title="درخواست دهنده" class="requester" :OwnerName="requesterfullName"
                   :OwnerNumber="request.user_requested.phone"/>
            <number-title
                class="request-time"
                :number="requestdate"
                des="روز زمان درخواست"
                numbersize="100"
                top="50%"
            />
            <status
                @click="(request.status[0].status) ? ((request.status[0].status.id == 1)
                ? $_toggleModal('AcceptOrReject',request.id)
                : (request.status[0].status.id == 6)
                ? $_toggleModal('ChangeRequestTime',request.id)
                : (request.status[0].status.id == 7)
                ? $_toggleModal('ChangeTime',request.id)
                :{}) : ''"
                :status="request.status[0].status"
            />
            <Price class="priceBox" :price="request.car_info.cost"/>
            <Button v-if="showActions" icon="WMi-trash" @click="$_toggleModal('AcceptRequestDelete',(request.id))" color="#ee3552" class="trash-button"/>
            <Button icon="WMi-align-right" @click="$_toggleModal('ShowRequest', request)" color="rgb(247, 137, 11)" class="show-button"/>
            <Button @click="$_toggleModal('EditRequest',request.id)" v-if="showActions && request.status[0].status.id < 6"
                    icon="WMi-pencil"
                    color="#000000"
                    class="edit-button"
            />
        </div>
    </div>
</template>
<script>
import Price from "../Global/Price/Price";
import Button from "../Global/Buttons/circle";
import Owner from "../Global/Owner-Info/Owner-Info";
import Status from "./Status";
import Owner1 from "../Global/Owner-Info/Owner";
import NumberTitle from "../Global/Number-Title/Number-Title";

export default {
    components: {
        Status,
        Price,
        Button,
        Owner,
        Owner1,
        NumberTitle,
    },
    props: {
        request: {default: {}},
        showActions: {default: true, type: Boolean}
    },
    computed: {
        userfullName() {
            return `${this.request.car_info.user.first_name} ${this.request.car_info.user.last_name}`;
        },
        requesterfullName() {
            return `${this.request.user_requested.first_name} ${this.request.user_requested.last_name}`;
        },
        requestdate() {
            if (this.request['time'][0]['status'] == 1){
                const StartDate = new Date(this.request['time'][0]['start_at']);
                const EndDate = new Date(this.request['time'][0].end_at);
                const diffTime = Math.abs(EndDate - StartDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays
            }
            if (this.request['time'][1]['status'] == 1){
                const StartDate = new Date(this.request['time'][1]['start_at']);
                const EndDate = new Date(this.request['time'][1].end_at);
                const diffTime = Math.abs(EndDate - StartDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays
            }
            else{
                console.log("Time not Available")
            }
        },
        giveRequestCost() {
            if (this.request['time'][0]['status'] == 1){
                return this.request['time'][0].cost
            }
            if (this.request['time'][1]['status'] == 1){
                return this.request['time'][1].cost

            }
        }
    },
};
</script>

<style scoped>
.trash-button {
    position: absolute;
    bottom: 3%;
    left: 5%;
}

.status_Btn {
    position: absolute;
    top: 23%;
    right: 23%;
}

.REC {
    width: 90px;
    height: 40px;
}

.edit-button {
    position: absolute;
    bottom: 3%;
    left: 8%;
}
.show-button {
    position: absolute;
    bottom: 3%;
    left: 11%;
}

.ok-button {
    position: absolute;
    bottom: 3%;
    left: 10.5%;
}

.priceBox {
    position: absolute;
    top: 1%;
    left: 3.5%;
}

.owner {
    position: absolute;
    direction: rtl;
    border-right: 1px solid black;
    top: 20%;
    right: 35%;
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

.request-time {
    position: absolute;
    top: -5%;
    right: 60%;
    font-size: 19px;
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
    width: 45%;
    margin-left: 56%;
    margin-top: 6%;
}

.Car-Img {
    width: 190px;
    float: right;
    padding: 11px -30px}

.infobar {
    margin: 1.35% 10px;
}

.dprice {
    direction: ltr;
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

.requester {
    position: absolute;
    direction: rtl;
    border-right: 1px solid black;
    top: 20%;
    right: 45%;
    padding-right: 10px;
}
</style>
