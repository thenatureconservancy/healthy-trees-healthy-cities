<template>
  <div class="">
    Create a new Project

    <q-input
      color="secondary"
      style="width: 80vw"
      class="q-mb-sm"
      outlined
      v-model="pName"
      label="Name"
    />
    <q-input
      color="secondary"
      style="width: 80vw"
      type="textarea"
      outlined
      v-model="pDescription"
      label="Description"
    />
  </div>
  <div class="q-mt-md">
    Invite Members

    <q-select
      style="width: 80vw"
      color="secondary"
      label="Email"
      outlined
      v-model="pInvited"
      use-input
      use-chips
      multiple
      hide-dropdown-icon
      input-debounce="0"
      new-value-mode="add-unique"
    />
  </div>
</template>

<script>
export default {
  name: 'FormNewProject',
  data() {
    return {
      pName: '',
      pDescription: '',
      pInvited: [],
      pMembers: [],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
