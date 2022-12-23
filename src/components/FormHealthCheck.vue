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
      v-model="healthExpanded"
    >
      <q-card class="row q-ma-md q-pa-md" bordered>
        <div class="col-11">
          <q-select
            filled
            v-model="twigDiebackModel"
            :options="twigDiebackOptions"
            label="Fine Twig Dieback"
            color="primary"
            clearable
            options-selected-class="text-deep-orange"
          >
          </q-select>
        </div>
        <div class="col-1 self-center">
          <q-btn
            padding="10px"
            flat
            icon="sym_s_info"
            :color="layersActive ? 'primary' : 'white'"
            :text-color="layersActive ? 'white' : 'primary'"
          >
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

      <q-card class="row q-ma-md q-pa-md" bordered>
        <div class="col-11 text-left">Leaf Discoloration</div>
        <div class="col-1 self-center">
          <q-btn
            padding="0px"
            flat
            icon="sym_s_info"
            :color="layersActive ? 'primary' : 'white'"
            :text-color="layersActive ? 'white' : 'primary'"
          >
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
        <div class="text-left">
          <q-option-group
            v-model="leafDiscolorationModel"
            :options="leafDiscolorationOptions"
            color="primary"
            inline
          />
        </div>
      </q-card>

      <q-card class="row q-ma-md q-pa-md" bordered>
        <div class="col-11 text-left">Crown Light Exposure</div>
        <div class="col-1 self-center">
          <q-btn
            padding="0px"
            flat
            icon="sym_s_info"
            :color="layersActive ? 'primary' : 'white'"
            :text-color="layersActive ? 'white' : 'primary'"
          >
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
        <div class="text-left">
          <q-option-group
            v-model="crownLightModel"
            :options="crownLightOptions"
            color="primary"
            inline
          />
        </div>
      </q-card>

      <q-card class="row q-ma-md q-pa-md" bordered>
        <div class="col-11 text-left">Crown Vigor Rating</div>
        <div class="col-1 self-center">
          <q-btn
            padding="0px"
            flat
            icon="sym_s_info"
            :color="layersActive ? 'primary' : 'white'"
            :text-color="layersActive ? 'white' : 'primary'"
          >
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
        <div class="text-left">
          <q-option-group
            v-model="crownVigorModel"
            :options="crownVigorOptions"
            color="primary"
            inline
          />
        </div>
      </q-card>

      <q-card class="row q-ma-md q-pa-md" bordered>
        <div class="col-11">
          <q-select
            filled
            v-model="model"
            :options="options"
            label="Crown Transparency"
            color="primary"
            clearable
            options-selected-class="text-deep-orange"
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
  name: 'FormHealthCheck',
  data() {
    return {
      treeInfoExpanded: true,
      healthExpanded: true,
      tab: 'existing',
      tName: 'My Tree',
      tSpecies: '',
      tDBH: '',
      tCirc: '',
      tHeight: '',
      tDead: false,
      notes: '',
      twigDiebackModel: '',
      twigDiebackOptions: [
        { label: '1 = 0-1%(trace)', value: 0 },
        { label: '5 = 2-5%', value: 5 },
        { label: '10 = 6-10%', value: 10 },
        { label: '15 = 11-15%', value: 15 },
        { label: '20 = 16-20%', value: 20 },
        { label: '25 = 21-25%', value: 25 },
        { label: '30 = 26-30%', value: 30 },
        { label: '35 = 31-35%', value: 35 },
        { label: '40 = 36-40%', value: 40 },
        { label: '45 = 41-45%', value: 45 },
        { label: '50 = 46-50%', value: 50 },
        { label: '55 = 51-55%', value: 55 },
        { label: '60 = 56-60%', value: 60 },
        { label: '65 = 61-65%', value: 65 },
        { label: '70 = 66-70%', value: 70 },
        { label: '75 = 71-75%', value: 75 },
        { label: '80 = 76-80%', value: 80 },
        { label: '85 = 81-85%', value: 85 },
        { label: '90 = 86-90%', value: 90 },
        { label: '95 = 91-95%', value: 95 },
        { label: '99 = 96-99%', value: 99 },
        { label: '100 = 100%', value: 100 },
      ],
      leafDiscolorationModel: '',
      leafDiscolorationOptions: [
        {
          label: 'N/A',
          value: 0,
        },
        {
          label: '1',
          value: 1,
        },
        {
          label: '2',
          value: 2,
        },
        {
          label: '3',
          value: 3,
        },
        {
          label: '4',
          value: 4,
        },
        {
          label: '5',
          value: 5,
        },
      ],
      crownVigorModel: '',
      crownVigorOptions: [
        {
          label: 'N/A',
          value: 0,
        },
        {
          label: '1',
          value: 1,
        },
        {
          label: '2',
          value: 2,
        },
        {
          label: '3',
          value: 3,
        },
        {
          label: '4',
          value: 4,
        },
        {
          label: '5',
          value: 5,
        },
      ],
      crownLightModel: '',
      crownLightOptions: [
        {
          label: 'N/A',
          value: 0,
        },
        {
          label: '1',
          value: 1,
        },
        {
          label: '2',
          value: 2,
        },
        {
          label: '3',
          value: 3,
        },
        {
          label: '4',
          value: 4,
        },
        {
          label: '5',
          value: 5,
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
