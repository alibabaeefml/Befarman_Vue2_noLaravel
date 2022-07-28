<template>
    <div class="wrapper" :style="'background-color:'+backcolor+''">
        <h1 :style="'color:'+numcolor+';font-size:'+numbersize+'px;padding-top:'+paddingtop+''" class="number">
            {{ number }}</h1>
        <span :style="'color:'+descolor+';top:'+top+''" class="des">{{ des }}</span>
    </div>
</template>
<script>
export default {
    props: {
        backcolor: {default: ""},
        number: {default: ""},
        des: {default: ""},
        numcolor: {default: ""},
        descolor: {default: ""},
        numbersize: {default: "60"},
        top: {default: "15%"},
        paddingtop: {default: "-10px"}
    }
}
</script>
<style scoped>
.wrapper {
    width: 210px;
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
