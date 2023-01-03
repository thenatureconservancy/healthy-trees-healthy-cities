<template>
  <div class="">
    <q-card-actions align="left">
      <q-btn
        flat
        icon="sym_s_arrow_back"
        label=""
        color="primary"
        @click="$store.commit('updateLeftDrawer', { open: false })"
      />
      <q-chip size="lg" color="white" class="text-primary">Add Tree</q-chip>
    </q-card-actions>
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
  </div>

  <q-tabs
    v-model="tab"
    dense
    class="text-grey"
    active-color="primary"
    indicator-color="primary"
    align="justify"
    narrow-indicator
  >
    <q-tab name="existing" label="Existing" />
    <q-tab name="planting" label="Planting" />
  </q-tabs>

  <q-separator />

  <q-tab-panels v-model="tab" animated>
    <q-tab-panel name="existing">
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
    </q-tab-panel>

    <q-tab-panel name="planting">
      <div class="q-gutter-sm">
        <q-radio
          size="sm"
          v-model="planting"
          val="containerized"
          label="Containerized"
        />
        <q-radio
          size="sm"
          v-model="planting"
          val="bareroot"
          label="Bare Root"
        />
        <q-radio
          size="sm"
          v-model="planting"
          val="bailedandburlap"
          label="Bailed and Burlap"
        />
      </div>
      <div>
        <q-input
          color="secondary"
          class="q-mb-sm"
          outlined
          square
          v-model="containerSize"
          label="Container Size (gallons)"
          style="font-size: 16px"
        />
        <q-input
          color="secondary"
          class="q-mb-sm"
          outlined
          square
          v-model="tCaliper"
          label="Caliper Size (inches)"
          style="font-size: 16px"
        />
        <q-input
          color="secondary"
          class="q-mb-sm"
          outlined
          square
          v-model="tHeight"
          label="Tree Height (feet)"
          style="font-size: 16px"
        />
      </div>
    </q-tab-panel>
  </q-tab-panels>
  <div class="q-ma-md">
    <q-input
      style="font-size: 16px"
      v-model="text"
      filled
      type="textarea"
      label="Notes"
    />
  </div>
  <div style="height: 600px"></div>
</template>

<script>
export default {
  name: 'FormEditProject',
  data() {
    return {
      tab: 'existing',
      tName: 'My Tree',
      tSpecies: '',
      tDBH: '',
      tCirc: '',
      tHeight: '',
      tDead: false,
      planting: '',
      tCaliper: '',
      containerSize: '',
      notes: '',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
