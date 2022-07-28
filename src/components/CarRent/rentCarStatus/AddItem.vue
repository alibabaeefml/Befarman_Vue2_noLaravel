<template >
  <div v-if="StatusID === CorrentStatusID"
    class="item"
    :style="
      ' background-color: ' +
      Backcolor +
      ';box-shadow: ' +
      shadow +
      ' '
    "
    @click="$emit('click')"
  >
    <v-icon class="icon-item"
      > {{ icon }}</v-icon
    >
    <h3 class="title-pr" :style="'color: ' + iconcolor + ' '">{{ prtext }}</h3>
    <h3 class="title-en" :style="'color: ' + iconcolor + ' '">{{ entext }}</h3>
  </div>
    <div v-else
         class="item"
         :style="'; border:4px solid '+Backcolor +' '"
         @click="$emit('click')"
    >
        <v-icon class="icon-item" :style="'color: ' + Backcolor + ' '"
        >{{ icon }}</v-icon
        >
        <h3 class="title-pr" :style="'color: ' + Backcolor + ' '">{{ prtext }}</h3>
        <h3 class="title-en" :style="'color: ' + Backcolor + ' '">{{ entext }}</h3>
    </div>
</template>

<script>
export default {
  name: "AddItem",
  props: {
    icon: { default: "" },
    Backcolor: { default: "" },
    shadow: { default: "" },
    prcolor: { default: "white" },
    encolor: { default: "" },
    border: { default: "" },
    iconcolor: { default: "" },
    prtext: { default: "" },
    entext: { default: "" },
    StatusID:{default: ""},
    CorrentStatusID:{default: ""}
  },
};
</script>

<style scoped>
* {
  font-family: yekan_light;
}

.item {
  position: relative;
  margin: 15px 0px;
  width: 90%;
  border-radius: 30px;
  border-top-right-radius: 0px;
  height: 80px;
  margin-right: auto;
  margin-left: auto;
}

.icon-item {
  font-size: 50px;
  color: white;
  margin-right: 20px;
  margin-top: 13px;
}

.title-pr {
  display: inline-block;
  color: white;
}

.title-en {
  position: absolute;
  color: white;
  letter-spacing: 15px;
  font-weight: 100;
  right: 17%;
  top: 55%;
}
</style>
