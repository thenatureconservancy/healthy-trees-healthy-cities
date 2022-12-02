<template>
  <div class="">
    Edit Project

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

  <div class="q-mt-md">
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
