<template>
  <BaseModal
    maxWidth="500px"
    name="Message"
    title="ارسال پیام"
    subtitle="SEND MESSAGE"
    icon="WMi-plus"
    @open="setData"
    @close="resetData"
  >
    <v-card style="border-radius: 20px; width: 100%">
      <span id="mess">
        <v-textarea
          style="direction: rtl; color: black"
          prepend-inner-icon=" WMi-quote-right"
          class="mx-2"
          label="متن پیام"
          rows="10"
          v-model="message"
        ></v-textarea>
      </span>
      <v-card-actions>
          <v-btn
              class="mx-2"
              fab
              dark
              large
              color="pink"
              @click="$_toggleModal('Message')"
          >
              <v-icon dark> WMi-cancel </v-icon>
          </v-btn>
        <v-spacer></v-spacer>
        <div>
          <v-btn
            class="subBtn"
            fab
            dark
            large
            color="cyan"
            @click="sendMessageWrapper"
          >
            <v-icon dark> WMi-angle-left </v-icon>
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </BaseModal>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "sendMessage",
  data: () => ({
    userId: null,
    message: null,
  }),
  methods: {
    ...mapActions("Users", ["sendMessage"]),
    setData() {
      this.userId = this.$_getData("Message");
    },
    resetData() {
      this.userId = null;
      this.message = null;
    },
    sendMessageWrapper() {
      this.sendMessage({ userId: this.userId, message: this.message }).then(
        () => {
          this.$_toggleModal("Message");
        }
      );
    },
  },
};
</script>
<style scoped>
* {
  font-family: yekan_light;
}
</style>



