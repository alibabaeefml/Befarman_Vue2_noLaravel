<template>
    <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
        <span
            v-bind="attrs"
            v-on="on"
            :class="classes"
        >
            <slot></slot>
        </span>
        </template>
        <span class="Font">{{ tooltip }}</span>
    </v-tooltip>
</template>

<script>
export default {
name: "BaseTooltip",
    props:{
    tooltip:String,
    className:String
    },
    computed: {
       classes(){
           return this.className
        }
    },
}
</script>

<style scoped>
.Font{
    font-family: yekan_light
}
.trash-button {
    position: absolute;
    top: 33%;
    left: 1.5%;
}
.message-button {
    position: absolute;
    top: 33%;
    left: 10.5%;
}
.comment-button {
    position: absolute;
    top: 33%;
    left: 13.5%;
}
.ok-button {
    position: absolute;
    top: 33%;
    left: 7.5%;
}
.edit-button {
    position: absolute;
    top: 33%;
    left: 4.5%;
}

</style>
