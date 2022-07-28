<template>
  <base-modal
    class="text-center"
    max-width="500"
    title="ورود"
    subtitle="LOGIN"
    icon="WMi-user"
    name="login"
    @close="setData"
  >
    <v-card style="border-radius: 20px; width: 100%; padding: 20px">
      <template v-if="formType == 'sendCode'">
        <v-text-field
            @keyup.enter="sendCodeAndCheckResults"
            label="شماره تماس"
          append-icon=" WMi-phone"
          v-model="phoneNumber"
        ></v-text-field>
        <v-btn
          block
          elevation="2"
          medium
          @click="sendCodeAndCheckResults"
          rounded
          style="background-color: #32cad5; color: #fff"
        >
          ارسال کد احراز هویت
          <v-icon> WMi-logout-1</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-text-field
            @keyup.enter="confirmCode"
          class="login_input"
          label="کد ارسالی"
          append-icon=" WMi-asterisk"
          v-model="confirmationCode"
        ></v-text-field>
        <v-btn
          block
          elevation="2"
          medium
          rounded
          style="background-color: #000000; color: #ffffff"
          @click="confirmCode"
        >
          تایید کد احراز هویت
          <v-icon> WMi-logout-1</v-icon>
        </v-btn>
      </template>
    </v-card>
  </base-modal>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      phoneNumber: null,
      confirmationCode: null,
      formType: "sendCode",
    };
  },
  methods: {
    ...mapActions("Authentication", [
      "sendConfirmationCode",
      "checkConfirmationCode",
    ]),
    sendCodeAndCheckResults() {
      let phone = { phone: this.phoneNumber };
      this.sendConfirmationCode(phone).then(() => {
        this.formType = "enterCode";
      });
    },
    confirmCode() {
      let confirmationData = {
        phone: this.phoneNumber,
        code: this.confirmationCode,
      };
      this.checkConfirmationCode(confirmationData).then(() => {
        this.$router.go(this.$router.currentRoute);
      });
    },
    setData() {
      this.formType = "sendCode";
      this.phoneNumber = null;
    },
  },
};
</script>
<style scoped>
.filterInfo {
  direction: rtl;
  position: absolute;
  right: 20%;
}
.login_input {
  width: 90%;
  margin-right: auto;
  margin-left: auto;
}
</style>
