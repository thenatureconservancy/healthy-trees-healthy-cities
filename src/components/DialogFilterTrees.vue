<template>
  <div style="width: 100%">
    <p class="semi-bold q-mb-none q-mt-lg text-body1">
      View trees with tasks by member:
    </p>
    <q-option-group
      v-model="selectedMembers"
      :options="members"
      color="primary"
      type="checkbox"
    />
  </div>

  <div>
    <p class="semi-bold q-mb-none q-mt-lg text-body1">
      View trees with tasks by time frame:
    </p>
    <div class="q-pa-md">
      <q-date v-model="dateRange" range />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DialogFilterTrees',
  data() {
    return {
      dateRange: {},
      selectedMembers: ['op1', 'op2', 'op3'],
      members: [
        {
          label: 'Tyler Ruff',
          value: 'op1',
        },
        {
          label: 'Adrian Bruce',
          value: 'op2',
        },
        {
          label: 'Matthew Ruff',
          value: 'op3',
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.semi-bold {
  font-weight: 600;
}
</style>
