<template>
  <div class="wrapper" v-if="loginMode == 'login'">
    <div class="q-mb-lg">
      <div class="loginHeader">Login</div>
      <div class="loginSubText">Please sign in to continue.</div>
    </div>

    <q-input
      color="secondary"
      outlined
      v-model="username"
      label="Email"
      type="email"
      :rules="[(val) => val.length <= 3 || 'Please use maximum 3 characters']"
    >
      <template v-slot:prepend>
        <q-icon name="email" />
      </template>
    </q-input>
    <q-input
      color="secondary"
      outlined
      v-model="password"
      label="Password"
      type="password"
    >
      <template v-slot:prepend>
        <q-icon name="lock" />
      </template>
      <template v-slot:append>
        <q-btn flat style="font-weight: bold" color="primary" label="FORGOT" />
        <!-- <div class="forgot-pass-btn">FORGOT</div> -->
        <!-- <q-btn @click="login" color="primary" class="">Forgot</q-btn> -->
      </template>
    </q-input>
    <div class="row justify-end">
      <q-btn
        @click="login"
        size="18px"
        icon-right="login"
        color="primary"
        class="q-mb-xs q-mt-lg"
        >Login</q-btn
      >
    </div>
    <div class="no-account-wrapper">
      Don't have an account? <span @click="loginMode = 'signup'">Sign Up</span>
    </div>
  </div>

  <div class="wrapper" v-if="loginMode == 'signup'">
    <div class="q-mb-lg">
      <div class="loginHeader">Create Account</div>
      <div class="loginSubText">Create an account to contribute.</div>
    </div>
    <q-input
      color="secondary"
      class="q-mb-md"
      outlined
      v-model="username"
      label="Email"
      type="email"
    >
      <template v-slot:prepend>
        <q-icon name="email" />
      </template>
    </q-input>
    <q-input
      color="secondary"
      class="q-mb-md"
      outlined
      v-model="password"
      label="Password"
      type="password"
    >
      <template v-slot:prepend>
        <q-icon name="lock" />
      </template>
    </q-input>
    <q-input
      color="secondary"
      class="q-mb-md"
      outlined
      v-model="password"
      label="Confirm Password"
      type="password"
    >
      <template v-slot:prepend>
        <q-icon name="lock" />
      </template>
    </q-input>
    <div class="row justify-end">
      <q-btn
        @click="accountCreate"
        size="18px"
        color="primary"
        icon-right="login"
        class="q-mb-xs q-mt-md"
        >Sign Up</q-btn
      >
    </div>

    <div class="no-account-wrapper">
      Already have an account? <span @click="loginMode = 'login'">Sign In</span>
    </div>
  </div>

  <!-- <q-btn
    @click="confirmSignup"
    size="18px"
    color="primary"
    class="q-mb-xs q-mt-md"
    >Confirm Sign Up</q-btn
  > -->
  <!-- <q-btn
    @click="getCurrentUserIdToken"
    size="18px"
    color="primary"
    class="q-mb-xs q-mt-md"
    >getCurrentUserIdToken</q-btn
  > -->
</template>

<script>
export default {
  data() {
    return {
      loginMode: 'login',
      username: '',
      password: '',
    };
  },
  methods: {
    accountCreate() {
      this.$store.dispatch('createAccount');
    },
    login() {
      console.log(this.username, this.password);
      this.$store.dispatch('login');
    },
    confirmSignup() {
      this.$store.dispatch('confirmSignup');
    },

    getCurrentUserIdToken() {
      this.$store.dispatch('getCurrentUserIdToken');
    },
  },
};
</script>

<style scoped>
.wrapper {
  padding: 20px;
  text-align: left;
}
.loginHeader {
  font-size: 40px;
  font-weight: bold;
}
.loginSubText {
  font-size: 20px;
  font-weight: bold;
  color: darkgray;
}
.no-account-wrapper {
  margin-top: 50px;
  font-size: 20px;
  text-align: center;
}
.no-account-wrapper span {
  font-weight: bold;
  font-size: 22px;
  color: var(--q-primary) !important;
}
.forgot-pass-btn {
  font-weight: bold;
  font-size: 16px;
  color: var(--q-primary) !important;
}
</style>
