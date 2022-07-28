<template>
  <div class="Owner">
      <span class="Ow">{{ title }}</span><br>
      <span class="OwnerName">{{OwnerName}}</span><br>
      <span class="OwnerNumber">{{OwnerNumber}}</span>
  </div>
</template>

<script>
export default {
    props:{
        OwnerName:{default:""},
        OwnerNumber:{default:""},
        title:{default:""},
    }

}
</script>

<style scoped>
.Ow{
    font-family: "yekan_light";
    font-size: 13px;
}
.OwnerName{
    font-family: "yekan_light";
    font-weight: 900;
}
.OwnerNumber{
    font-family: 'monserat_bold';
    color: gray;
}
</style>
