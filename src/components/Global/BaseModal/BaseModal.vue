<template>
    <v-dialog class="b-modal" :max-width="maxWidth" v-model="activator">
        <v-card>
            <v-card-title class="b-modal__title">
                <BaseHeader :title="title" :subtitle="subtitle" :icon="icon" />
            </v-card-title>
            <v-card-actions class="b-modal__body">
                <slot></slot>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import BaseHeader from "./BaseHeader";

export default {
    name: "BaseModal",
    data: () => ({
        status: "close",
    }),
    components: {
        BaseHeader,
    },
    props: {
        name: {
            type: String,
            required: true,
        },
        maxWidth: {
            type: String,
            default: "1000",
        },
        title: {
            type: String,
            default: "No Title",
        },
        subtitle: {
            type: String,
            default: "No Subtitle",
        },
        icon: {
            type: String,
            default: "WMi-user"
        }
    },
    computed: {
        activator: {
            get() {
                if (this.$_isOpen(this.name) && this.status !== "open") {
                    this.status = "open";
                    this.$emit("open");
                } else if (!this.$_isOpen(this.name) && this.status !== "close") {
                    this.status = "close";
                    this.$emit("close");
                }
                return this.$_isOpen(this.name);
            },
            set(value) {
                if (value && this.status !== "open") {
                    this.status = "open";
                    this.$emit("open");
                } else if (!value && this.status !== "close") {
                    this.status = "close";
                    this.$_toggleModal(this.name, null);
                    this.$emit("close");
                }
            },
        },
    },
};
</script>
<style scoped>
.b-modal__body {
    flex-wrap: wrap;
    padding: 0px !important;
    overflow: hidden;
}

.b-modal__title {
    padding: 0 !important;
}
</style>
