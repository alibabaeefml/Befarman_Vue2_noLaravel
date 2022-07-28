<template>
    <base-modal
        class="text-center"
        maxWidth="800px"
        title="حذف خودرو"
        subtitle="DELETE RENTABLE CAR"
        icon=" WMi-star"
        name="AcceptCarDelete"
        @open="setDATA"
    >
        <v-card style=" width: 100%; padding: 20px">
            <h1 style="font-family:yekan_medium;margin-right: 24%;margin-top: 7%;padding-bottom: 9%;">از حذف درخواست مطمئن هستید !؟</h1>
            <div>
                <v-btn @click="$_toggleModal('AcceptCarDelete')" dark elevation="5" x-large color="#ee3552">خیر</v-btn>
                <v-btn @click="deleteRequest(RentableCarID),$_toggleModal('AcceptCarDelete')" dark elevation="5" x-large color="#0d7e00" style="float: left">بله</v-btn>
            </div>
        </v-card>
    </base-modal>
</template>

<script>
import {mapActions, mapMutations} from "vuex";

export default {
    name: "AcceptCarDelete",
    methods:{
        ...mapActions("Requests", ["deleteRequest"]),
        setDATA(){
            this.RentableCarID = this.$_getData("AcceptCarDelete");
        }
    },
    data: ()=>{
        return {
            RentableCarID:null
        }
    },
}
</script>

<style scoped>

</style>
