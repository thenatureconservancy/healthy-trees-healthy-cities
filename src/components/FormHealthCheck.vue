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
            v-model="model"
            :options="options"
            label="Fine Twig Dieback"
            color="teal"
            clearable
            options-selected-class="text-deep-orange"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                <q-item-section>
                  <q-item-label v-html="scope.opt.label"></q-item-label>
                  <q-item-label caption>{{
                    scope.opt.description
                  }}</q-item-label>
                </q-item-section>
                <q-item-section avatar>
                  <q-icon :name="scope.opt.icon"></q-icon>
                </q-item-section>
              </q-item>
            </template>
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
        Leaf Discoloration
        <div class="col-11 text-left">
          <q-option-group
            v-model="group"
            :options="leafDiscolorationOptions"
            color="primary"
            inline
          />
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
        Crown Light Exposure
        <div class="col-11 text-left">
          <q-option-group
            v-model="group"
            :options="leafDiscolorationOptions"
            color="primary"
            inline
          />
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
        Crown Vigor Rating
        <div class="col-11 text-left">
          <q-option-group
            v-model="group"
            :options="leafDiscolorationOptions"
            color="primary"
            inline
          />
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
        <div class="col-11">
          <q-select
            filled
            v-model="model"
            :options="options"
            label="Crown Transparency"
            color="teal"
            clearable
            options-selected-class="text-deep-orange"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                <q-item-section>
                  <q-item-label v-html="scope.opt.label"></q-item-label>
                  <q-item-label caption>{{
                    scope.opt.description
                  }}</q-item-label>
                </q-item-section>
                <q-item-section avatar>
                  <q-icon :name="scope.opt.icon"></q-icon>
                </q-item-section>
              </q-item>
            </template>
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
        <q-input v-model="text" filled type="textarea" label="Notes" />
      </div>
    </q-expansion-item>
  </q-list>
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
      options: [
        {
          label: 'Google',
          value: 'Google',
          description: 'Search engine',
          icon: 'mail',
        },
        {
          label: 'Facebook',
          value: 'Facebook',
          description: 'Social media',
          icon: 'bluetooth',
        },
        {
          label: 'Twitter',
          value: 'Twitter',
          description: 'Quick updates',
          icon: 'map',
        },
        {
          label: 'Apple',
          value: 'Apple',
          description: 'iStuff',
          icon: 'golf_course',
        },
        {
          label: 'Oracle',
          value: 'Oracle',
          disable: true,
          description: 'Databases',
          icon: 'casino',
        },
      ],
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
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
