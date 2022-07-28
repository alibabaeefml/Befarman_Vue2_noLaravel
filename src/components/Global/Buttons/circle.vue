<template>
  <v-btn :style="'  background-color:'+color+'; border:'+color+'; box-shodow:1px 1px 1px '+color+' ;box-shadow: 0px 3px 5px -1px '+color+' '"
      class="mx-2"
      fab
      dark
      small
      @click="$emit('click')"
    >
      <v-icon class="Icon" dark>
         {{icon}}
      </v-icon>
    </v-btn>
</template>

<script>
export default {
    props:{
        icon: {default: ""},
        color: {default:""},
    }
}
</script>

<style scoped>
.Icon{
    font-size: 19px;
}

</style>
