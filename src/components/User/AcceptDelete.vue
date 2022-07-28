<template>
    <base-modal
        class="text-center"
        maxWidth="800px"
        title="حذف کاربر"
        subtitle="DELETE USER"
        icon=" WMi-star"
        name="AcceptDelete"
        @open="setDATA"
    >
        <v-card style=" width: 100%; padding: 20px">
            <h1 style="font-family:yekan_medium;margin-right: 24%;margin-top: 7%;padding-bottom: 9%;">از حذف کاربر مطمئن هستید !؟</h1>
            <div>
                <v-btn @click="$_toggleModal('AcceptDelete')" dark elevation="5" x-large color="#ee3552">خیر</v-btn>
                <v-btn @click="deleteUser(UserID),$_toggleModal('AcceptDelete')" dark elevation="5" x-large color="#0d7e00" style="float: left">بله</v-btn>
            </div>
        </v-card>
    </base-modal>
</template>

<script>
import {mapActions, mapMutations} from "vuex";
export default {
name: "AcceptDelete",
    methods:{
        ...mapActions("Users", ["deleteUser"]),
        setDATA(){
            this.UserID = this.$_getData("AcceptDelete");
        }
    },
    data: ()=>{
        return {
            UserID:null
        }
    },
}
</script>

<style scoped>

</style>
