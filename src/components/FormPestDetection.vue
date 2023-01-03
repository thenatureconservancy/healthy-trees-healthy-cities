<template>
  <q-card-actions align="left">
    <q-btn
      flat
      icon="sym_s_arrow_back"
      label=""
      color="primary"
      @click="$store.commit('updateLeftDrawer', { open: false })"
    />
    <q-chip size="lg" color="white" class="text-primary">Health Check</q-chip>
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
      icon="sym_s_health_and_safety"
      label="Health Check"
      header-class="bg-green-3 text-body1 text-bold"
      v-model="pestExpanded"
    >
      <q-card
        v-for="(select, index) in pestSelects"
        :key="index"
        class="row q-ma-md q-pa-md"
        bordered
      >
        <div class="col-11">
          <q-select
            dense
            filled
            v-model="select.model"
            :options="select.options"
            :label="select.label"
            color="primary"
            clearable
            options-selected-class="text-deep-orange"
            :bg-color="
              select.model == '' || select.model == null ? '' : 'white'
            "
          >
          </q-select>
        </div>
        <div class="col-1 self-center">
          <q-btn padding="10px" flat icon="sym_s_info">
            <q-menu
              style="width: 250px"
              anchor="bottom right"
              self="bottom left"
            >
              <q-banner>
                <br />
                <div class="text-primary">
                  <span class="text-bold">Info</span>
                </div>
                <q-btn
                  class="float-right"
                  label="OK"
                  color="primary"
                  flat
                  v-close-popup
                />
              </q-banner> </q-menu
          ></q-btn>
        </div>
      </q-card>
      <q-card
        v-for="(btn, index) in pestBtns"
        :key="index"
        class="row q-ma-md q-pa-md"
        bordered
      >
        <div class="col-11 text-left">
          {{ btn.label }}
          <q-option-group
            v-model="btn.model"
            :options="btn.options"
            color="primary"
            inline
          />
        </div>
        <div class="col-1 self-center">
          <q-btn padding="10px" flat icon="sym_s_info">
            <q-menu
              style="width: 250px"
              anchor="bottom right"
              self="bottom left"
            >
              <q-banner>
                <br />
                <div class="text-primary">
                  <span class="text-bold">Info</span>
                </div>
                <q-btn
                  class="float-right"
                  label="OK"
                  color="primary"
                  flat
                  v-close-popup
                />
              </q-banner> </q-menu
          ></q-btn>
        </div>
      </q-card>

      <div class="q-ma-md">
        <q-input v-model="text" filled type="textarea" label="Notes" />
      </div>
    </q-expansion-item>
  </q-list>
  <div style="height: 600px"></div>
</template>

<script>
export default {
  name: 'FormPestDetection',
  data() {
    return {
      treeInfoExpanded: true,
      pestExpanded: true,
      tab: 'existing',
      tName: 'My Tree',
      tSpecies: '',
      tDBH: '',
      tCirc: '',
      tHeight: '',
      tDead: false,
      notes: '',
      pestSelects: [
        {
          label: 'Exit holes',
          options: [
            { label: 'None', value: 0, model: '' },
            { label: 'Pencil-width round exit holes', value: 1 },
            { label: 'Small, D-shaped exit holes', value: 2 },
            {
              label:
                'Multiple exit holes roughly the size of a pen tip (resembling shotgun spray)',
              value: 3,
            },
            {
              label: 'Tiny holes surrounded by cankers (or abnormal growth)',
              value: 4,
            },
            {
              label: 'Other',
              value: 5,
            },
          ],
          model: '',
        },
        {
          label: 'Exudation',
          options: [
            {
              label: 'None',
              value: 0,
            },
            { label: 'Red or black staining ("ooze")', value: 1 },
            { label: 'Black fungal mat present below cracked bark', value: 2 },
            {
              label:
                'Brown fungal mat present in sapwood (internal tree, only visible through craked bark)',
              value: 3,
            },
            { label: 'Apple cider odor', value: 4 },
            {
              label: 'Wet or dry discoloration of bark around exit holes',
              value: 5,
            },
            {
              label:
                'White powdery substance around exit holes (sometimes called "sugar volcanoes")',
              value: 6,
            },
            {
              label:
                'Black or reddish ooze around cankers (3 ft to 6 ft off the ground)',
              value: 7,
            },
            {
              label: 'White woolly egg masses on the undersides of leaves',
              value: 8,
            },
            { label: 'Other', value: 9 },
          ],
          model: '',
        },
        {
          label: 'Egg sites / Eggs',
          options: [
            {
              label: 'None',
              value: 0,
            },
            {
              label: 'Waxy, woolly white egg masses at base of needles',
              value: 1,
            },
            {
              label: 'Fluffy brown egg masses on trunk',
              value: 2,
            },
            {
              label: 'Clusters of small oval eggs',
              value: 3,
            },
            { label: 'Shallow, round discolored "divots"', value: 4 },
            { label: 'Other', value: 5 },
          ],
          model: '',
        },
        {
          label: 'Appearance of adult insect or larvae',
          options: [
            { label: 'None', value: 0 },
            { label: 'Moth with white to light brown wings', value: 1 },
            {
              label: 'Black beetle with white spots and long antennae',
              value: 2,
            },
            { label: 'Small emerald green beetle', value: 3 },
            {
              label: 'Small brown beetle with orange spots on its outer wings',
              value: 4,
            },
            {
              label:
                'Caterpillar with three sets of blue spots, six sets of red spots',
              value: 5,
            },
            { label: 'Tiny brown beetle (PSHB)', value: 6 },
            { label: 'Bright green winged insect (Citrus psyllid)', value: 7 },
            {
              label: 'Other',
              value: 8,
            },
          ],
          model: '',
        },
        {
          label: 'Damaged fruits / tree buds',
          options: [
            { label: 'None', value: 0 },
            { label: 'Misshapen fruits', value: 1 },
            {
              label: 'Discolored fruits',
              value: 2,
            },
            { label: 'Buds appear shriveled', value: 3 },
            { label: 'Other', value: 4 },
          ],
          model: '',
        },
        {
          label: 'Holes in leaves',
          options: [
            { label: 'None', value: 0 },
            { label: 'Holes on leaves are near outer edge of leaf', value: 1 },
            {
              label:
                'Holes are closer to the central vein (midrib) of the leaf',
              value: 2,
            },
            {
              label: 'Both',
              value: 3,
            },
            { label: 'Other', value: 4 },
          ],
          model: '',
        },
      ],
      pestBtns: [
        {
          label: 'Frass',
          options: [
            { label: 'Yes', value: 0 },
            { label: 'No', value: 1 },
          ],
          model: '',
        },
        {
          label: 'Epicormic Sprouts',
          options: [
            { label: 'Yes', value: 0 },
            { label: 'No', value: 1 },
          ],
          model: '',
        },
        {
          label: 'Blonding',
          options: [
            { label: 'Yes', value: 0 },
            { label: 'No', value: 1 },
          ],
          model: '',
        },
        {
          label: 'S-shaped Galleries',
          options: [
            { label: 'Yes', value: 0 },
            { label: 'No', value: 1 },
          ],
          model: '',
        },
        {
          label: 'Bark Fissures',
          options: [
            { label: 'Yes', value: 0 },
            { label: 'No', value: 1 },
          ],
          model: '',
        },
        {
          label: 'Cankers / Dead Bark',
          options: [
            { label: 'Yes', value: 0 },
            { label: 'No', value: 1 },
          ],
          model: '',
        },
        {
          label: 'Galls on Twigs / Branches / Leaves',
          options: [
            { label: 'Yes', value: 0 },
            { label: 'No', value: 1 },
          ],
          model: '',
        },
        {
          label: 'Fine Twig Dieback / Dead Twigs',
          options: [
            { label: 'Yes', value: 0 },
            { label: 'No', value: 1 },
          ],
          model: '',
        },
        {
          label: 'Leaf Discoloration (deciduous)',
          options: [
            { label: 'Yes', value: 0 },
            { label: 'No', value: 1 },
          ],
          model: '',
        },
        {
          label: 'Needle Discoloration',
          options: [
            { label: 'Yes', value: 0 },
            { label: 'No', value: 1 },
          ],
          model: '',
        },
        {
          label: 'Wilted or Browning Leaves',
          options: [
            { label: 'Yes', value: 0 },
            { label: 'No', value: 1 },
          ],
          model: '',
        },
        {
          label: 'Premature Leaf Loss',
          options: [
            { label: 'Yes', value: 0 },
            { label: 'No', value: 1 },
          ],
          model: '',
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
