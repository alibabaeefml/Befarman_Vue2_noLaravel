<template>
  <div class="headlogin">
    <v-icon class="login_icon">{{ icon }}</v-icon>
    <div class="filterInfo">
      <h1 class="filter_pr">{{ title }}</h1>
      <h1 class="filter_en">{{ subtitle }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseHeader",
  props: {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    icon: {
      type: String,
    },
  },
};
</script>

<style scoped>
* {
  font-family: yekan_light;
}

.filterInfo {
  color: #ffffff;
  padding-right: 4%;
}

.headlogin {
  height: 100px;
  background-color: black;
  justify-content: flex-start;
  width: 100%;
  height: 100px;
  background-color: black;
  display: flex;
  align-items: center;
  direction: rtl;
  padding: 10px 20px;
}

.filter_pr {
  font-size: 20px;
}

.filter_en {
  font-size: 16px;
  letter-spacing: 15px;
  margin-right: -15px;
}

@media only screen and (max-width:900px) {
  .filter_en {
    font-size: 16px;
    margin-right: -10px;
    letter-spacing: 10px;
  }
}

.login_icon {
  font-size: 60px !important;
  color: #fff !important;
}
</style>
