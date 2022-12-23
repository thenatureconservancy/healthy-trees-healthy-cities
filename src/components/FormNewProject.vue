<template>
  <q-card-actions align="left">
    <q-btn
      flat
      icon="sym_s_arrow_back"
      label=""
      color="primary"
      @click="$store.commit('updateLeftDrawer', { open: false })"
    />
    <q-chip size="lg" color="white" class="text-primary"
      >Create New Project</q-chip
    >
  </q-card-actions>
  <div class="q-ma-md" style="max-width: $state.app.screenWidth">
    <q-input
      color="secondary"
      class="q-mb-sm"
      outlined
      v-model="pName"
      label="Name"
      style="font-size: 16px"
    />
    <q-input
      color="secondary"
      type="textarea"
      outlined
      v-model="pDescription"
      label="Description"
      style="font-size: 16px"
    />
  </div>
  <div class="q-ma-md text-left">
    Invite Members

    <q-select
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
      style="font-size: 16px"
      options-selected-class="text-deep-orange"
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
