<template>
    <div class="wrapper" :style="'background-color:'+BackGroundColor+''">
        <h1 :style="'color:'+NumberColor+';font-size:'+numbersize+'px;padding-top:'+paddingtop+''" class="number">
            {{ number }}%</h1>
        <span :style="'color:'+NumberColor+';top:'+top+''" class="des">{{ des }}</span>
    </div>
</template>
<script>
export default {

    props: {
        backcolor: {default: ""},
        number: {default: ""},
        des: {default: ""},
        numbersize: {default: "60"},
        top: {default: "15%"},
        paddingtop: {default: "-10px"}
    },

    computed:{
        BackGroundColor(){
            if (this.number >= 67) {return  "#EAFAFB";} else if (this.number >= 33) {return  "#FFF0E8";} else if (this.number >= 0) {return  "#FDEAED";}
        },
        NumberColor(){
            if (this.number >= 67) {return  "#32CAD5"}
            if (this.number >= 33) {return  "#FE6A1E"}
            if (this.number >= 0) {return  "#EE3552"}
        }
    }

}
</script>
<style scoped>
.wrapper {
    width: 250px;
    height: 100px;
    border-radius: 10px;
    padding: 5px 15px;
}
.number {
    font-size: 63px;
    float: right;
    font-family: "monserat_medium";
}
.des {
    font-family: "yekan_medium";
    position: absolute;
    width: 90px;
    padding: 10px;
}
</style>
