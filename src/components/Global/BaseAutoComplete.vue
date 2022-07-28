<template>
  <div>
    <slot :filter="filter"></slot>
  </div>
</template>

<script>
let cancelId;
export default {
  name: "BaseAutoComplete",
  data: () => ({}),
  props: {
    url: {
      type: String,
    },
  },
  methods: {
    filter(e) {
      clearTimeout(cancelId);
      if (
        e.target.value &&
        e.target.value.length > 1 &&
        e.code !== 'Tab' &&
        e.code !== 'Enter'
      ) {
        cancelId = setTimeout(() => {
          this.$store.dispatch(this.url, e.target.value);
        }, 400);
      }
    },
  },
};
</script>

<style>
</style>
