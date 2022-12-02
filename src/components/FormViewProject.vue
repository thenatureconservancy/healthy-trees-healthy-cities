<template>
  <div class="">
    View Project

    <q-input
      color="secondary"
      style="width: 80vw"
      class="q-mb-sm"
      outlined
      v-model="pName"
      label="Name"
      disable
    />
    <q-input
      color="secondary"
      style="width: 80vw"
      type="textarea"
      outlined
      v-model="pDescription"
      label="Description"
      disable
    />
  </div>
</template>

<script>
export default {
  name: 'FormViewProject',
  data() {
    return {
      pName: 'My Trees',
      pDescription: 'Your starting project for monitoring trees',
      pInvited: [],
      pMembers: [],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
