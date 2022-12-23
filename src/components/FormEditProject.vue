<template>
  <q-card-actions align="left">
    <q-btn
      flat
      icon="sym_s_arrow_back"
      label=""
      color="primary"
      @click="$store.commit('updateLeftDrawer', { open: false })"
    />
    <q-chip size="lg" color="white" class="text-primary">Edit Project</q-chip>
  </q-card-actions>
  <div class="q-ma-md text-left">
    Edit Details

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
    />
  </div>

  <div class="q-ma-md text-left">
    Members
    <q-list>
      <q-list-item v-for="(val, index) in pMembers" :key="index">
        <q-item clickable v-ripple @click="viewProjectDialog = true">
          <q-item-section>
            <q-item-label>
              <span class="text-secondary">
                {{ val.firstName }} {{ val.lastName }}</span
              ></q-item-label
            >
          </q-item-section></q-item
        ></q-list-item
      >
    </q-list>
  </div>
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
