<template>
    <div
        class="status"
        :style="'background-color:' + status.color + ' '"
        @click="$emit('click')">
        <v-icon style="color: #fff">{{ status.icon }}</v-icon><span style="color: #fff">{{ status.name }}</span>
    </div>
</template>
<script>
export default {
    name: status,
    props: {
        status,
    },
};
</script>

<style scoped>
.status {
    font-family: yekan_light;
    /*width: 290px;*/
    padding-right: 15px;
    padding-left: 15px;
    height: 26px;
    position: absolute;
    color: #000000;
    text-align: center;
    border-radius: 10px;
    border-top-right-radius: 0px;
    font-size: 13px;
}
</style>
