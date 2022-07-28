<template>
    <div class="text-center">
        <v-dialog
            v-model="dialog"
            width="500"
        >
            <template v-slot:activator="{ on, attrs }">
                <base-tooltip tooltip="توضیحات بیشتر">
                    <v-icon class="more" v-bind="attrs" v-on="on">WMi-info-circled-alt</v-icon>
                </base-tooltip>
            </template>
            <v-card>
                <v-card-title class="headline grey lighten-2">
                    <h3 class="Font">توضیحات بیشتر</h3>
                </v-card-title>
                <v-col cols="12">
                    <h2 class="Font ModalTitle" >مدارک :</h2>
                    <v-carousel
                        next-icon=" WMi-angle-right"
                        prev-icon=" WMi-angle-left"
                        delimiter-icon=" WMi-circle"
                        cycle
                        height="330"
                        class="Slider"
                    >
                        <v-carousel-item style="width: 100%;height: 100%"
                                         v-for="(image,i) in getCurrentRentCar.certificates"
                                         :key="i"
                                         :src="image.thumbnail"
                                         @click="ShowImage(image.image)"
                        ></v-carousel-item>
                    </v-carousel>

                    <h3 class="ModalTitle">توضیحات : </h3>
                    <p class="Font">{{ getCurrentRentCar.details }}</p>
                    <h3 class="ModalTitle">کدام قسمت های خودرو رنگ شده است !؟  </h3>
                    <p class="Font">{{getCurrentRentCar.painted}}</p>
                    <h3 class="ModalTitle">کدام قسمت های خودرو تعویض شده است !؟  </h3>
                    <p class="ModalTitle">{{getCurrentRentCar.changed_parts}}</p>
                </v-col>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn @click="dialog = false"class="mx-2" fab dark small color="pink">
                        <v-icon dark> WMi-cancel</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>

                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: "MoreDetalis",
    props:{
        getCurrentRentCar:Object
    },
    data() {
        return {
            dialog: false,
        }
    },
    methods:{
        ShowImage(img){
            window.open(img, '_blank');
        }
    }
}
</script>

<style scoped>
.Font{
    font-family : yekan_light
}
.Slider {
    height: 330px;
    cursor: pointer;
    width: 450px;
}

.ModalTitle{
    padding: 15px;
    font-family : yekan_light
}
</style>
