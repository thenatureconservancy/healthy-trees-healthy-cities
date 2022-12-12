<template>
  <q-card-actions align="left">
    <q-btn
      flat
      icon="sym_s_arrow_back"
      label=""
      color="primary"
      @click="$store.commit('updateLeftDrawer', { open: false, content: '' })"
    />
    <q-chip size="lg" color="white" class="text-primary">Layers</q-chip>
  </q-card-actions>
  <div class="q-ma-md text-left">
    <p class="semi-bold q-mb-none q-mt-none text-body1">
      Select layers to show on map :
    </p>
    <q-checkbox
      style="width: 100%"
      v-for="opt in layers"
      v-model="opt.model"
      :key="opt.value"
      color="primary"
      type="checkbox"
      ><q-icon size="sm" :name="opt.iconName" :color="opt.iconColor"></q-icon>
      &nbsp;{{ opt.label }}</q-checkbox
    >
  </div>
</template>

<script>
export default {
  name: 'DialogFilterTrees',
  data() {
    return {
      layers: [
        {
          label: 'Project Trees',
          value: 'op1',
          iconName: 'location_on',
          iconColor: 'red',
          model: true,
        },
        {
          label: 'All Trees',
          value: 'op2',
          iconName: 'location_on',
          iconColor: 'blue',
          model: true,
        },
        {
          label: 'Dead Trees',
          value: 'op3',
          iconName: 'location_on',
          iconColor: 'grey-7',
          model: false,
        },
        {
          label: 'Removed Trees',
          value: 'op4',
          iconName: 'sym_s_disabled_by_default',
          iconColor: 'purple',
          model: false,
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.semi-bold {
  font-weight: 500;
}
</style>
