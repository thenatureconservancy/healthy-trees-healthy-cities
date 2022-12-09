<template>
  <div class="">
    Edit Project

    <q-input
      color="secondary"
      style="width: 80vw"
      class="q-mb-sm"
      outlined
      square
      v-model="tName"
      label="Give the tree a name"
    />
    <q-input
      color="secondary"
      style="width: 80vw"
      class="q-mb-sm"
      outlined
      square
      v-model="tSpecies"
      label="Species"
    />
  </div>
  Elmira, New Yorktroyp
</template>

<script>
export default {
  name: 'FormEditProject',
  data() {
    return {
      pName: 'My Trees',
      pDescription: 'Your starting project for monitoring trees',
      pInvited: [],
      pMembers: [{ firstName: 'Tyler', lastName: 'Ruff' }],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
