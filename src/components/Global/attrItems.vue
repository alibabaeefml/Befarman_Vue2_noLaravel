<template>
    <v-row >
        <v-col cols="3" xs="12">
            <v-icon style="display: inline;color: #1d1d1d;font-size: 50px">{{ icon }}</v-icon>
        </v-col>
        <v-col cols="9" xs="12">
            <h1 style="display: inline">{{ title }}</h1>
            <h3 style="width: 100%;color: #727272">{{ des }}</h3>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "attrItems",
    props: {
        icon:{default:""},
        title:{default:""},
        des:{default:""},
    }
}
</script>

<style scoped>
*{
    font-family: yekan_light;
    font-weight: 900;
}

</style>
