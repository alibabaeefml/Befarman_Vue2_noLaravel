<template>
    <div class="item">
        <div class="infobar">
        <span @click="$_toggleModal('UserDetails', user.id)">
             <h1 class="infoPr">{{ fullName }}</h1>
             <h1 class="infoEn">{{ user.phone }}</h1>
        </span>


            <NumberTitle
                class="N1"
                :number="user.cars_count"
                numcolor="#ee3552"
                des="خودرو قابل اجاره"
                descolor="#ee3552"
            />
            <NumberTitle
                class="N2"
                :number="user.requests_count"
                numcolor="#32cad5"
                des="درخواست خودرو"
                descolor="#32cad5"
            />
            <div class="priceBox">
                <span class="price">{{ user.transactions_sum }}</span><br/>
                <span class="des">کل تراکنش ها - تومان</span>
            </div>

            <template v-if="showActions">
                <base-tooltip className="trash-button" tooltip="حذف">
                    <Button
                        icon="WMi-trash"
                        color="#ee3552"
                        @click="$_toggleModal('AcceptDelete', user.id)"
                    />
                </base-tooltip>

                <base-tooltip class-name="comment-button" tooltip="نظرات">
                    <Button
                        icon="WMi-comment-alt"
                        color="rgb(50, 202, 213)"
                        @click="$_toggleModal('commentList', {comments: user.comments, type: 'user'})"
                    />
                </base-tooltip>

                <base-tooltip class-name="message-button" tooltip="ارسال پیام">
                    <Button
                        icon="WMi-message-reply-text"
                        color="#f7890b"
                        @click="$_toggleModal('Message', user.id)"
                    />
                </base-tooltip>


                <base-tooltip v-if="user.verified == 0" class-name="ok-button" tooltip="تایید کاربر">
                    <Button @click="verifyUser(user.id, 1)" icon="WMi-ok" color="#32cad5"/>
                </base-tooltip>
                <base-tooltip v-else class-name="ok-button" tooltip="لغو تایید کاربر">
                    <Button @click="verifyUser(user.id, 0)" icon="WMi-cancel" color="#ee3552"/>
                </base-tooltip>

                <base-tooltip class-name="edit-button" tooltip=" ویرایش کاربر">
                    <Button
                        icon="WMi-pencil"
                        color="#000"
                        @click="$_toggleModal('Add-user', user)"
                    />
                </base-tooltip>
            </template>
            <template v-else>
                <base-tooltip class-name="ok-button" tooltip="بازگشت کاربر">
                    <Button @click="restoreUser(user.id)" icon="WMi-back" color="#f7890b"/>
                </base-tooltip>
            </template>
        </div>
    </div>
</template>
<script>
    import Button from "../Global/Buttons/circle";
    import NumberTitle from "@/components/Global/Number-Title/Number-Title";
    import AcceptDelete from "./AcceptDelete";
    import {mapActions, mapMutations} from "vuex";

    export default {
        components: {
            NumberTitle,
            Button,
            AcceptDelete
        },
        props: {
            user: {type: Object},
            showActions: {type: Boolean, default: true},
        },
        methods: {
            ...mapActions("Users", ["userVerify", "restoreUser"]),
            ...mapMutations("Users", ["REMOVE_VERIFY_BUTTON"]),
            verifyUser(userId, status) {
                this.userVerify({userId, status});
            }
        },
        computed: {
            fullName() {
                return `${this.user.first_name} ${this.user.last_name}`;
            },
        },
    };
</script>

<style scoped>

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

    .infobar {
        margin: 1.35% 10px;
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

    .price {
        font-size: 35px;
        font-family: "monserat_bold";
        text-align: center;
    }

    .des {
        font-size: 20px;
        font-family: "yekan_light";
    }

    .priceBox {
        position: absolute;
        top: 12%;
        right: 60%;
    }

    .N1 {
        position: absolute;
        top: 5%;
        right: 25%;
    }

    .N2 {
        position: absolute;
        top: 5%;
        right: 39%;
    }
</style>
