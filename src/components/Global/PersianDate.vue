<template>
  <div>
    <v-text-field
      v-model="dateShow"
      :label="label"
      prepend-icon="WMi-calendar-alt"
      :id="'my-custom-date-' + uniqueId"
      readonly
      :dark="dark"
      :color="color"
      @click="show = true"
    />
    <date-picker
      v-model="dateShow"
      locale="fa,en"
      :locale-config="localeConfig"
      :format="defaultDisplayFormat"
      :inputFormat="defaultInputFormat"
      @change="$emit('input', $event.format(defaultFormat))"
      :type="type"
      :auto-submit="true"
      :element="'my-custom-date-' + uniqueId"
      :editable="true"
      :show="show"
      :min="minimum"
      :max="maximum"
      @close="show = false"
      :color="colorDate ? colorDate : color"
    />
  </div>
</template>
<script>
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import moment from "jalali-moment";

export default {
  components: {
    datePicker: VuePersianDatetimePicker,
  },
  props: {
    color: { default: "black" },
    dark: { default: false },
    colorDate: { default: null },
    defaultDate: {
      default: "now",
      type: String,
      validator: (val) => ["now", "empty"].includes(val),
    },
    min: { default: null },
    max: { default: null },
    displayFormat: { default: null },
    inputFormat: { default: null },
    format: { default: null },
    type: {
      default: "datetime",
      type: String,
      validator: (val) => ["datetime", "time", "date"].includes(val),
    },
    label: { default: "در تاریخ " },
    value: { default: null },
  },
  data: () => ({
    localeConfig: {
      fa: {
        lang: { label: "شمسی" },
      },
      en: {
        lang: { label: "Gregorian" },
      },
    },
    show: false,
    uniqueId: Math.floor(Math.random() * 10000),
  }),
  computed: {
    dateShow: {
      get() {
        if (this.value) {
          return moment(new Date(this.value)).locale('fa').format(this.defaultDisplayFormat);
        } else {
          if (this.defaultDate === "now") {
            this.$emit("input", moment(new Date()).format(this.defaultFormat));
            return moment(new Date()).locale('fa').format(this.defaultDisplayFormat);
          } else {
            return "";
          }
        }
      },
      set(value) {},
    },
    defaultDisplayFormat() {
      if (!this.displayFormat) {
        if (this.type === "datetime") {
          return "jDD jMMMM jYYYY ساعت HH:mm";
        } else if (this.type === "date") {
          return "jDD jMMMM jYYYY";
        } else if (this.type === "time") {
          return "HH:mm";
        }
      }
      return this.displayFormat;
    },
    defaultInputFormat() {
      if (!this.inputFormat) {
        if (this.type === "datetime") {
          return "YYYY-MM-DD HH:mm";
        } else if (this.type === "date") {
          return "YYYY-MM-DD";
        } else if (this.type === "time") {
          return "HH:mm";
        }
      }
      return this.inputFormat;
    },
    defaultFormat() {
      if (!this.format) {
        if (this.type === "datetime") {
          return "YYYY-MM-DD HH:mm";
        } else if (this.type === "date") {
          return "YYYY-MM-DD";
        } else if (this.type === "time") {
          return "HH:mm";
        }
      }
      return this.format;
    },
    minimum() {
      if (this.min === "now") {
        return moment(new Date()).format(this.defaultInputFormat);
      } else {
        return this.min;
      }
    },
    maximum() {
      if (this.max === "now") {
        return moment(new Date()).format(this.defaultInputFormat);
      } else {
        return this.max;
      }
    },
  },
};
</script>
