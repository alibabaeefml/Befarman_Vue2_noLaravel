<template>
    <base-modal
        class="text-center"
        maxWidth="800px"
        title="تایید درخواست"
        subtitle="ACCEPT OR REJECT"
        icon=" WMi-star"
        name="AcceptOrReject"
        @open="setDATA"
    >
        <v-card style=" width: 100%">
            <h1 style="font-family:yekan_medium;margin-right: 27%;margin-top: 7%;padding-bottom: 9%;">آیا خودرو را تایید
                می کنید !؟</h1>
            <v-divider></v-divider>
            <v-card-actions style="background-color: #ededed">
                <v-btn @click="rejectRequestByAdmin(requestID),$_toggleModal('AcceptOrReject')" dark elevation="5"
                       x-large color="#ee3552" style="margin-right: 4%;border-radius: 30px">خیر
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn style="margin-left: 4%;border-radius: 30px;padding: 20px" @click="acceptRequestByAdmin(requestID),$_toggleModal('AcceptOrReject')" dark elevation="5"
                       x-large color="#0d7e00">بله
                </v-btn>
            </v-card-actions>
        </v-card>
    </base-modal>
</template>

<script>
import {mapActions} from "vuex"

export default {
    name: "AcceptOrReject",
    methods: {
        ...mapActions("Requests", ["rejectRequestByAdmin"]),
        ...mapActions("Requests", ["acceptRequestByAdmin"]),
        setDATA() {
            this.requestID = this.$_getData("AcceptOrReject");
        }
    },
    data: () => {
        return {
            requestID: null
        }
    },
}
</script>

<style scoped>
.title {
    font-family: "yekan_medium";;
}
</style>
