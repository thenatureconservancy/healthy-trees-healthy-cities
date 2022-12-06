<template>
  <!-- SETTINGS -->
  <TheLoginForm />
</template>

<script>
import TheLoginForm from './authentication/TheLoginForm.vue';
export default {
  name: 'Settings',
  components: { TheLoginForm },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
