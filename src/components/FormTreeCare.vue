<template>
  <q-card-actions align="left">
    <q-btn
      flat
      icon="sym_s_arrow_back"
      label=""
      color="primary"
      @click="$store.commit('updateLeftDrawer', { open: false })"
    />
    <q-chip size="lg" color="white" class="text-primary">Tree Care</q-chip>
  </q-card-actions>

  <q-list bordered class="rounded-borders">
    <q-expansion-item
      expand-separator
      icon="sym_s_nature"
      label="Tree Info"
      header-class="bg-green-3 text-body1 text-bold"
      v-model="treeInfoExpanded"
    >
      <div class="q-ma-md">
        <q-input
          color="secondary"
          class="q-mb-sm"
          outlined
          square
          v-model="tName"
          label="Tree Name"
          style="font-size: 16px"
        />
        <q-input
          color="secondary"
          class="q-mb-sm"
          outlined
          square
          v-model="tSpecies"
          label="Species"
          style="font-size: 16px"
        />
      </div>

      <div class="q-ma-md row">
        <div class="col-5">
          <q-input
            color="secondary"
            class="q-mb-sm"
            outlined
            square
            v-model="tDBH"
            label="DBH (in)"
            style="font-size: 16px"
          />
        </div>
        <div class="col-2 self-center">OR</div>
        <div class="col-5">
          <q-input
            color="secondary"
            class="q-mb-sm"
            outlined
            square
            v-model="tCirc"
            label="Circumference (in)"
            style="font-size: 16px"
          />
        </div>
      </div>
      <div class="q-ma-md text-left">
        <q-input
          color="secondary"
          class="q-mb-sm"
          outlined
          square
          v-model="tHeight"
          label="Tree Height (feet)"
          style="font-size: 16px"
        />

        <q-checkbox v-model="tDead">Dead</q-checkbox>
      </div>
    </q-expansion-item>

    <q-expansion-item
      expand-separator
      icon="sym_s_water_drop"
      label="Tree Care"
      header-class="bg-green-3 text-body1 text-bold"
      v-model="healthExpanded"
    >
      <div class="q-ma-md">
        <q-select
          filled
          v-model="model"
          :options="options"
          label="Stewardship Tasks"
          multiple
          emit-value
          map-options
          options-selected-class="text-deep-orange"
        >
          <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
            <q-item v-bind="itemProps">
              <q-item-section>
                <q-item-label v-html="opt.label" />
              </q-item-section>
              <q-item-section side>
                <q-checkbox
                  :model-value="selected"
                  @update:model-value="toggleOption(opt)"
                />
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="q-ma-md">
        <q-input
          v-model="time"
          filled
          label="Time Spent (hours - decimal for partial hours)"
          style="font-size: 16px"
        />
      </div>
      <div class="q-ma-md">
        <q-input
          v-model="text"
          filled
          type="textarea"
          label="Notes"
          style="font-size: 16px"
        />
      </div>
    </q-expansion-item>
  </q-list>
  <div style="height: 250px"></div>
</template>

<script>
export default {
  name: 'FormTreeCare',
  data() {
    return {
      treeInfoExpanded: true,
      healthExpanded: true,
      tName: 'My Tree',
      tSpecies: '',
      tDBH: '',
      tCirc: '',
      tHeight: '',
      tDead: false,
      notes: '',
      model: [],

      options: [
        {
          label: 'Water',
          value: 1,
        },
        {
          label: 'Topsoil over roots',
          value: 2,
        },
        {
          label: 'Mulch over roots',
          value: 3,
        },
        {
          label: 'Removal of refuse / liter',
          value: 4,
        },
        {
          label: 'Stake tree for safety / protection from cars',
          value: 5,
        },
        {
          label: 'Stake tree for lean',
          value: 6,
        },
        {
          label: 'Install tree fence / guard',
          value: 7,
        },
        {
          label: 'Dead / diseased branch pruning',
          value: 8,
        },
        {
          label: 'Manage soil',
          value: 9,
        },
        {
          label: 'Weed tree bed',
          value: 10,
        },
        {
          label: 'Enlarge tree bed',
          value: 11,
        },
        {
          label: 'Pruned suckers',
          value: 12,
        },
        {
          label: 'Remoed crossing branches',
          value: 13,
        },
        {
          label: 'Pruned major structural branches',
          value: 14,
        },
        {
          label: 'Other - see notes',
          value: 15,
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
