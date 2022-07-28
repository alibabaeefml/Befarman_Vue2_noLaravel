<template>
    <div class="SubHead">
        <h1 id="management">MANAGEMENT</h1>
        <span v-for="(broadCamb , key) in broadCambs" :key="key">
            <router-link v-if="!broadCamb.disabled" :to="broadCamb.route_name" > <h1  id="admin">{{broadCamb.name}}</h1> </router-link>
            <h1 v-else id="admin">{{broadCamb.name}}</h1>
            <v-icon v-if="key !== broadCambs.length - 1" class="broad"> WMi-angle-left</v-icon>
        </span>
    </div>
</template>
<script>
import AllBroadCamb from '../../../router/broadCamb';
export default {
    computed: {
        broadCambs() {
            if (this.$route.name) {
                return AllBroadCamb[this.$route.name] ? AllBroadCamb[this.$route.name] : AllBroadCamb.Home
            } else {
                return AllBroadCamb.Home;
            }
        }
    }
}
</script>
<style scoped>
.v-application a {
  color: #fff;
}

.SubHead{
  width: 100%;
    background-color: rgba(24, 23, 23, 0.603);
    position: absolute;
    top: 65%;
    height: 50px;
}
#management{
  float: left;
  font-family:'monserat_medium';
  font-weight: 100;
  letter-spacing: 13px;
  padding-left: 30px;
  font-size: 18px;
  padding-top: .58%;
  }
#admin{
  float: right;
  font-family: 'yekan_medium';
  padding-right: 2%;
  font-weight: 100;
  font-size: 18px;
  padding-top: .58%;
}
.broad{
  float: right;
  padding-top: .7%;
}
</style>
