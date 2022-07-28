<template>
    <span>
        <v-tooltip
            :top="top"
            :bottom="bottom"
            :left="left"
            :right="right"
            :color="tooltipColor"
            :transition="transition"
        >
            <template v-slot:activator="{ on }">
                <v-btn
                    slot="activator"
                    :color="buttonColor"
                    :dark="dark"
                    :light="light"
                    v-on="on"
                    @click="$emit('click', $event)"
                    :small="small"
                    :large="large"
                    :x-large="xLarge"
                    :x-small="xSmall"
                    :type="type"
                    :outlined="outlined"
                    :icon="onlyIcon"
                    fab
                    :class="buttonClass"
                    :disabled="disabled"
                >
                    <v-icon dark>{{ icon }}</v-icon>
                </v-btn>
            </template>
            <span :class="textClass">{{ text }}</span>
        </v-tooltip>
    </span>
</template>

<script>
export default {
    name: "tooltipButton",
    props: {
        icon: {
            type: String,
            default: "WMi-user",
        },
        buttonColor: {
            type: String,
            default: "black",
        },
        buttonClass: {
            type: String,
            default: "",
        },
        textClass: {
            type: String,
            default: "",
        },
        text: {
            type: String,
            default: "متن پیش فرض",
        },
        type: {
            type: String,
            default: "button",
        },
        tooltipColor: {
            type: String,
            default: "black",
        },
        bottom: {
            type: Boolean,
            default: false,
        },
        left: {
            type: Boolean,
            default: false,
        },
        right: {
            type: Boolean,
            default: false,
        },
        transition: {
            type: String,
            default: "fade-transition",
        },
        light: {
            type: Boolean,
            default: false,
        },
        small: {
            type: Boolean,
            default: false,
        },
        large: {
            type: Boolean,
            default: false,
        },
        xSmall: {
            type: Boolean,
            default: false,
        },
        xLarge: {
            type: Boolean,
            default: false,
        },
        outlined: {
            type: Boolean,
            default: false,
        },
        onlyIcon: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        top() {
            return !this.bottom && !this.left && !this.right ? true : false;
        },
        dark() {
            return !this.light ? true : false;
        },
    },
};
</script>
