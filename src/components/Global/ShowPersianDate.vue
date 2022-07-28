<template>
    <div v-if="dates && dates.length">
        <date-picker
            v-model="dates"
            multiple
            :element="'my-custom-date-' + uniqueId"
            custom-input="#my-custom-editable-input"
            :editable="false"
            :show="showPicker"
            @close="showPicker = false"
            :color="colorDate ? colorDate : color"
        >
            <!-- slot for "submit-btn" -->
            <template #submit-btn="{ vm, canSubmit, color, submit, lang }">
                <div></div>
            </template>

            <!-- slot for "cancel-btn" -->
            <template #cancel-btn="{ vm, color, lang }">
                <div></div>
            </template>

            <!-- slot for "now-btn" -->
            <template #now-btn="{ vm, color, goToday, lang }">
                <div></div>
            </template>
        </date-picker>
    </div>
</template>
<script>
    import VuePersianDatetimePicker from "vue-persian-datetime-picker";

    export default {
        components: {
            datePicker: VuePersianDatetimePicker,
        },
        props: {
            dates: {default: () => ([])},
            show: {default: false, type: Boolean},
            color: {default: "black"},
            colorDate: {default: null},
        },
        computed: {
            showPicker: {
                get() {
                    return this.show;
                },
                set(value) {
                    this.$emit('update:show', value);
                }
            }
        },
        data: () => ({
            uniqueId: Math.floor(Math.random() * 10000),
        }),
    };
</script>
