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
      >Filter Project Trees</q-chip
    >
  </q-card-actions>
  <div class="text-left q-ma-md">
    <div>
      <p class="semi-bold q-mb-none q-mt-lg text-body1">By task performed:</p>
      <q-checkbox
        style="width: 100%"
        v-for="opt in tasks"
        v-model="opt.model"
        :key="opt.value"
        color="primary"
        type="checkbox"
        >{{ opt.label }}</q-checkbox
      >
    </div>

    <div>
      <p class="semi-bold q-mb-none q-mt-lg text-body1">By contributor:</p>

      <q-checkbox
        style="width: 100%"
        v-for="opt in members"
        v-model="opt.model"
        :key="opt.value"
        color="primary"
        type="checkbox"
        >{{ opt.label }}</q-checkbox
      >
    </div>

    <div>
      <p class="semi-bold q-mb-none q-mt-lg text-body1">By date range:</p>
      <div class="q-pa-md">
        <q-date v-model="dateRange" style="width: 100%" range />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DialogFilterTrees',
  data() {
    return {
      dateRange: {},
      members: [
        {
          label: 'Tyler Ruff',
          value: 'op1',
          model: true,
        },
        {
          label: 'Adrian Bruce',
          value: 'op2',
          model: true,
        },
        {
          label: 'Matthew Ruff',
          value: 'op3',
          model: true,
        },
      ],
      tasks: [
        {
          label: 'Add a Tree',
          value: 'op1',
          model: true,
        },
        {
          label: 'Health Check',
          value: 'op2',
          model: true,
        },
        {
          label: 'Tree Care',
          value: 'op3',
          model: true,
        },
        {
          label: 'Pest Detection',
          value: 'op4',
          model: true,
        },
      ],
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
