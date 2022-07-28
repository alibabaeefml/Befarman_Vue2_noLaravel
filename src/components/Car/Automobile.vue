<template>
    <v-col cols="12" md="3">
        <v-card class="mx-auto Car" max-width="400">
            <v-img class="white--text align-end" height="200px" :src="data.thumbnail">
            </v-img>
            <v-card-text class="text--primary">
                <div class="infobar pb-5">
                    <h3 class="Pr_info">{{ data.name_fa }}</h3>
                    <h3 class="En_info">{{ data.name_en }}</h3>
                </div>
                <v-divider style="padding-bottom: 30px"></v-divider>
            </v-card-text>
            <v-card-actions class="justify-center">
                <Button icon="WMi-trash" color="#ee3552" class="trash-button" @click="removeAutomobile(data.id)" />
                <Button icon="WMi-pencil" color="#000000" class="edit-button"
                    @click="$_toggleModal('edit-car', data)" />
            </v-card-actions>
        </v-card>
    </v-col>

</template>

<script>
import Button from "../Global/Buttons/circle"
import { mapActions } from "vuex"
export default {
    name: "Automobile",
    components: {
        Button,
    },
    props: {
        data: { default: null }
    },
    methods: {
        ...mapActions('Cars', ["removeAutomobile"])
    }
}
</script>

<style scoped>
.Car {
    border: 1px solid #cacaca;
    direction: rtl;
    border-radius: 10px;
}

.Pr_info {
    font-family: 'yekan_medium';
    font-weight: 400;
    font-size: 30px;
    padding-bottom: 10px;
}

.En_info {
    font-family: "monserat_medium";
    letter-spacing: 10px;
    color: #b2b1b0;
    font-weight: 100;
    font-size: 16px;
}

/* 
.infobar {
    margin-right: 20px;
    direction: rtl;
}

.trash-button {
    position: absolute;
    top: 85%;
    left: 37%;
}

.edit-button {
    position: absolute;
    top: 85%;
    left: 51%;
} */
</style>
