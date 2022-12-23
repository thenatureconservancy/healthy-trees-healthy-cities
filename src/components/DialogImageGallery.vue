<template>
  <div class="q-pa-md">
    <q-img
      max-height="100vh"
      src="https://placeimg.com/320/650/nature?t=26"
    ></q-img>
  </div>
</template>

<script>
export default {
  name: 'DialogImageGallery',
  data() {
    return {
      slide: 1,
    };
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.semi-bold {
  font-weight: 600;
}
</style>
