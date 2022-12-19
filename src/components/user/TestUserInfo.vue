<template>
  <div>
    <q-btn
      @click="exampleApiRequest"
      size="18px"
      color="primary"
      class="q-mb-xs q-mt-md"
      >Query your private user info from DB</q-btn
    >
    <br />
    <br />
    <div>{{ userInfo }}</div>
  </div>
</template>

<script>
export default {
  methods: {
    exampleApiRequest() {
      this.$store.state.userStore.userInfo = '';
      this.$store.dispatch('getUserInfo');
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.userStore.userInfo;
    },
  },
};
</script>

<style scoped></style>
