<template>
    <BaseModal
        maxWidth="500px"
        name="OrderAlert"
        title="نتیجه درخواست"
        subtitle="REQUEST RESULT"
        icon=" WMi-doc-text-inv"
    >
        <v-card style=" width: 100%">
            <v-card-text>
                <v-row>
                    <v-col lg="6" xl="6">
                        <v-icon style="color:#32cad5;font-size: 200px"> WMi-clock</v-icon>
                    </v-col>
                    <v-col lg="6" xl="6">
                        <h2 class="main-text">درخــــــواست شمـــــا
                            <br> در حــال
                            <span>پردازش</span>
                            است</h2>
                        <h3 class="phone-number">
                            025<b>31634</b></h3>
                    </v-col>


                </v-row>
            </v-card-text>
        </v-card>
    </BaseModal>
</template>
<script>
import Number_title from "../../components/Global/Number-Title/Number-Title"

export default {
    name: "OrderAlert",
    components: {
        Number_title
    }
}
</script>

<style scoped>
* {
    font-family: yekan_light;
}

.main-text {
    color: black;
    font-size: 24px;
    line-height: 35px;
    font-weight: 200;
    width: 100%;
    text-align: center;
    margin-top: 15px
}

span {
    font-weight: 800;
}

.phone-number {
    color: black;
    font-size: 19px;
    font-weight: 100;
    width: 100%;
    text-align: center;
    margin-top: 15px;
    font-family: monserat_medium
}
.phone-number b{
    font-family: monserat_bold;font-weight: 900;font-size:25px
}
</style>
