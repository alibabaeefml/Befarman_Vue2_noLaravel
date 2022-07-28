<template>
    <div class="Owner">
        <span :class="checkType()" class="OwnerName">{{ text1 }}</span><br>
        <span class="Ow">{{ text2 }}</span><br>
    </div>
</template>

<script>
export default {
    props: {
        text1: {default: ""},
        text2: {default: ""},
        Entrance: {default : false}
    },
    methods:{
        checkType(){
            if (this.Entrance == "input"){
                return "Entrance"
            }
        }
    }

}
</script>

<style scoped>
.Ow {
    font-family: 'monserat_bold';
    font-family: "yekan_light";

    color: gray;
    opacity: .6;
    font-size: 15px;
}
.Entrance{
    color: #32CAD5 !important;
}

.OwnerName {
    font-family: "yekan_light";
    font-weight: 700;
    font-size: 20px;
    color: #EE3552;

}
</style>
