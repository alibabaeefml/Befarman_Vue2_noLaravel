<template>
    <div>
        <span id="pricee" class="price">{{ price }}</span><br>
        <span id="des" class="des">{{ text }}</span>
    </div>
</template>
<script>
export default {
    props: {
        price: {default: ""},
        text:{default : "هزینه روزانه - تومان"}
    }
}
</script>
<style scoped>
.price {
    font-size: 35px;
    font-family: 'monserat_bold';
    text-align: center;
    color: black;
}

.des {
    font-size: 20px;
    font-family: "yekan_light";
}
</style>
