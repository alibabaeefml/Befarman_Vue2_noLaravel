<template>
    <div class="item">
        <v-icon class="filter"> WMi-car-side </v-icon>
        <div class="filterInfo">
            <h1 class="filter_pr">بــــفــــرمــــان</h1>
            <h1 class="filter_en">BEFARMAN</h1>
        </div>

    </div>
</template>

<script>
let cancelId;
export default {
    name: "CarFilter",
};
</script>

<style scoped>
*{
    font-family: 'yekan_light'
}
.item {
    direction: rtl;
    margin-right: auto;
    margin-left: auto;
    margin-top: 20px;
    width: 95%;
    height: 100px;
    border: 2px black solid;
    border-radius: 10px;
    transition: 0.2s;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.filter {
    width: 100px;
    font-size: 70px;
    padding-top: 20px;
    padding-left: 15px;
    color: black;
}
.filter_pr {
    font-family: yekan_light;
    font-size: 30px;
}
.filter_en {
    font-family: monserat_medium;
    font-size: 13px;
    letter-spacing: 18px;
    font-width: 100;
}
.filterInfo {
    direction: rtl;
}
.filterer {
    width: 9%;
    direction: rtl;
    font-family: yekan_light;
    font-size: 13px;
}

.filters-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 50px;
}
</style>
