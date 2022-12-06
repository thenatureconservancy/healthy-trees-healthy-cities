<template>
  <h6>Example Authentication</h6>
  <q-input
    color="secondary"
    style="width: 80vw"
    class="q-mb-sm"
    outlined
    v-model="username"
    label="Email"
  />
  <q-input
    color="secondary"
    style="width: 80vw"
    class="q-mb-sm"
    outlined
    v-model="password"
    label="Password"
  />

  <q-btn @click="login" size="18px" color="primary" class="q-mb-xs q-mt-md"
    >Login</q-btn
  >
  <q-btn
    @click="accountCreate"
    size="18px"
    color="primary"
    class="q-mb-xs q-mt-md"
    >Test Account Create</q-btn
  >
  <q-btn
    @click="confirmSignup"
    size="18px"
    color="primary"
    class="q-mb-xs q-mt-md"
    >Confirm Sign Up</q-btn
  >
  <q-btn
    @click="getCurrentUserIdToken"
    size="18px"
    color="primary"
    class="q-mb-xs q-mt-md"
    >getCurrentUserIdToken</q-btn
  >
</template>

<script>
export default {
  data() {
    return {
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

<style></style>
