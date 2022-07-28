<template>
    <base-modal
        class="text-center"
        maxWidth="800px"
        title="ثبت تراکنش جدید "
        subtitle="NEW TRANSACTION "
        icon=" WMi-plus"
        name="addTransaction"
        @open="openModal()"
    >
        <v-card style="border-radius: 20px; width: 100%">
            <v-card-text>
                <v-row>
                    <add-transaction-tab @changeTab="changeTab"/>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-text-field
                            type="number"
                            label="مبلغ تراکنش (تومان)"
                            v-model="Transaction.fee"
                        >
                            <v-icon slot="prepend"> WMi-number</v-icon>
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <BaseAutoComplete
                            url="Requests/searchUsers"
                            v-slot="{ filter }"
                        >
                            <v-autocomplete
                                style="font-family: yekan_light;padding:20px;"
                                v-model="Transaction.customer_id"
                                :items="getUserSearchResults"
                                item-text="name"
                                item-value="id"
                                :chips="false"
                                white
                                dense
                                label="طرف حساب تراکنش"
                                prepend-icon=" WMi-user"
                                @keydown="filter"
                                no-data-text="کاربر مورد نظر را جستجو کنید."
                            ></v-autocomplete>
                        </BaseAutoComplete>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4">
                        <PersianDate v-model="Transaction.transaction_time" label="تاریخ تراکنش" type="date"/>
                    </v-col>
                    <v-col cols="4">
                        <PersianDate label="ساعت تراکنش" type="time"/>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field
                            type="number"
                            label="شماره تراکنش"
                            v-model="Transaction.transaction_id"
                        >
                            <v-icon slot="prepend"> WMi-number</v-icon>
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                            type="text"
                            label="عنوان تراکنش"
                            v-model="Transaction.title"
                        >
                            <v-icon slot="prepend"> WMi-text</v-icon>
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-textarea
                            style="direction: rtl; color: black"
                            prepend-inner-icon="WMi-quote-right"
                            class="mx-2"
                            label="توضیحات تراکنش"
                            v-model="Transaction.description"
                            rows="3"></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions style="background-color: #ededed">
                <v-btn @click="$_toggleModal('addTransaction')" class="mx-2" fab dark large color="pink">
                    <v-icon dark> WMi-cancel</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    class="subBtn"
                    fab
                    dark
                    large
                    color="cyan"
                    @click="submitTransactions()"
                >
                    <v-icon dark> WMi-ok</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </base-modal>
</template>

<script>
import AddTransactionTab from "./addTransactionTab";
import PersianDate from "../Global/PersianDate";
import {mapGetters,mapActions} from "vuex";
export default {
    name: "addTransaction",
    components: {AddTransactionTab,PersianDate},
    data(){
        return{
            Transaction:{
                customer_id:null,
                fee:0,
                title:null,
                transaction_id : null,
                transaction_time :null,
                description : null,
                type : "input"
            }
        }
    },
    computed:{
        ...mapGetters("Requests", ["getUserSearchResults"]),
    },
    methods:{
        ...mapActions("Transactions",["storeTransaction"]),
        changeTab: function (Tab) {
            this.Transaction.type = Tab;
        },
        submitTransactions(){
            try{
                let x = this.storeTransaction(this.Transaction)
                x.then(function(result) {
                    if(result){
                        this.$_toggleModal('addTransaction')
                    }
                }.bind(this));
            }catch (e) {
                console.log(e)
            }
        },
        openModal(){
            this.Transaction = {
                customer_id:null,
                fee:0,
                title:null,
                transaction_id : null,
                transaction_time :null,
                description : null,
                type : "input"
            }
        }
    }
}
</script>

<style scoped>
*{
    font-family: "yekan_light";
}
</style>
