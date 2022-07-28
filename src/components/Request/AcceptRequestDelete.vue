<template>
    <base-modal
        class="text-center"
        maxWidth="800px"
        title="حذف درخواست"
        subtitle="DELETE RENTABLE CAR"
        icon=" WMi-star"
        name="AcceptRequestDelete"
        @open="setDATA"
    >
        <v-card style=" width: 100%; padding: 20px">
            <p style="font-family:yekan_medium;margin-right: 24%;margin-top: 7%;padding-bottom: 9%;">از حذف این درخواست مطمئن هستید !؟ با این کار درخواست شما در هر مرحله ای که باشد حذف می شود. اگر این در خواست در حالت اجاره است این کار انجام نشود.</p>
            <div>
                <v-btn @click="$_toggleModal('AcceptRequestDelete')" dark elevation="5" x-large color="#ee3552">خیر</v-btn>
                <v-btn @click="deleteRequest(requestId),$_toggleModal('AcceptRequestDelete')" dark elevation="5" x-large color="#0d7e00" style="float: left">بله</v-btn>
            </div>
        </v-card>
    </base-modal>
</template>

<script>
    import {mapActions, mapMutations} from "vuex";

    export default {
        name: "AcceptRequestDelete",
        methods:{
                ...mapActions("Requests", ["deleteRequest"]),
            setDATA(){
                this.requestId = this.$_getData("AcceptRequestDelete");
            }
        },
        data: ()=>{
            return {
                requestId:null
            }
        },
    }
</script>

<style scoped>

</style>
