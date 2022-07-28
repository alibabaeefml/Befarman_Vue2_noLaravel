<template>
  <div class="Owner">
    <span class="Ow">{{text1}}</span><br>
    <span v-if="text2" class="OwnerName">{{text2}}</span><br>
    <span v-if="values.length" class="OwnerName">{{values.join( ' - ')}}</span><br>
  </div>
</template>

<script>
export default {
  props:{
    text1:{default:""},
    text2:{default:""},
    values:{default: () => ([]), type: Array},
  }

}
</script>

<style scoped>
.Ow{
  font-family: "yekan_light";
  font-size: 15px;
}
.OwnerName{
  font-family: "yekan_light";
  font-weight: 700;
  font-size: 20px;
}
</style>
