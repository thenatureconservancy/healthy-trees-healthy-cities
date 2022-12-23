<template>
  <q-scroll-area class="scroll-height">
    <div class="q-mt-sm">
      <div class="text-right q-mr-md">
        <q-btn
          color="primary"
          padding="sm"
          size="lg"
          flat
          icon-right="sym_s_add"
          label="New Project"
          no-caps
          @click="
            $store.commit('updateLeftDrawer', {
              open: true,
              content: 'newProject',
              width: $store.state.app.screenWidth,
            })
          "
        ></q-btn>
      </div>
    </div>
    <div class="bg-white text-left q-ma-sm q-pa-md">
      <div class="">
        <p class="q-mb-none semi-bold text-body1">Select Project</p>
        <div class="row">
          <div class="col-11">
            <q-select
              outlined
              v-model="$store.state.app.defaultProject"
              :options="options"
              bottom-slots
              class="text-body1"
            >
              <template v-slot:hint>
                <span
                  v-if="$store.state.app.defaultProject !== 'Taughannok Park'"
                  class="text-orange"
                  >OWNER</span
                >
                <span
                  v-if="$store.state.app.defaultProject == 'Taughannok Park'"
                  class="text-orange"
                  >MEMBER</span
                >
              </template>
            </q-select>
          </div>
          <div class="col-1">
            <q-btn
              v-if="$store.state.app.defaultProject !== 'Taughannok Park'"
              color="primary"
              padding="md"
              size="md"
              flat
              icon="sym_s_edit"
              @click="
                $store.commit('updateLeftDrawer', {
                  open: true,
                  content: 'editProject',
                  width: $store.state.app.screenWidth,
                })
              "
            ></q-btn>
          </div>
        </div>
      </div>
      <div class="q-mt-sm q-pa-sm">
        <p
          v-if="$store.state.app.defaultProject !== 'Taughannok Park'"
          class="q-mb-none text-body2"
        >
          This is your default project. Add trees to your project to begin
          monitoring.
        </p>
        <p
          v-if="$store.state.app.defaultProject == 'Taughannok Park'"
          class="q-mb-none"
        >
          This project is set up and maintained by Friends of Taughannok park,
          501(c)3 educational, non-for-profit organization dedicated to support
          this park for the benefit of the local community.
        </p>
      </div>

      <div class="q-mt-sm q-pa-sm bg-grey-3">
        <p class="q-mb-none semi-bold text-body1">Tasks</p>
        <p class="">Select a task to view instructions</p>
        <q-chip
          size="18px"
          outline
          color="primary"
          icon="sym_s_nature"
          clickable
          @click="
            taskSelectedDialog = true;
            taskSelected = 'Add a Tree';
          "
          v-if="$store.state.app.defaultProject !== 'Taughannok Park'"
        >
          Add a Tree
        </q-chip>
        <q-chip
          size="18px"
          outline
          color="primary"
          icon="sym_s_health_and_safety"
          clickable
          @click="
            taskSelectedDialog = true;
            taskSelected = 'Health Check';
          "
          v-if="$store.state.app.defaultProject !== 'Taughannok Park'"
        >
          Health Check
        </q-chip>
        <q-chip
          size="18px"
          outline
          color="primary"
          icon="sym_s_water_drop"
          clickable
          @click="
            taskSelectedDialog = true;
            taskSelected = 'Tree Care';
          "
          v-if="$store.state.app.defaultProject !== 'Taughannok Park'"
        >
          Tree Care
        </q-chip>

        <q-chip
          size="18px"
          outline
          color="primary"
          icon="sym_s_pest_control"
          clickable
          @click="
            taskSelectedDialog = true;
            taskSelected = 'Pest Detection';
          "
        >
          Pest Detection
        </q-chip>
      </div>
      <!--div class="bg-grey-3 q-pa-sm q-mt-md">
        <p class="semi-bold q-mb-none text-body1">Filter</p>
        <p class="q-mt-none q-pt-none">
          Applied filters will limit the project trees shown in the map and
          activities shown in the log
        </p>
        <q-btn
          @click="
            $store.commit('updateLeftDrawer', {
              open: true,
              content: 'filter',
              width: 350,
            })
          "
          icon="sym_s_filter_alt"
          outline
          >Add filter</q-btn
        >
      </div-->
      <!--div class="row">
          <div
            class="col-3 q-pa-xs q-mr-md text-center text-grey-6"
            style="border: 1px solid #a4a9bc"
          >
            <span class="text-h5">1</span> <br />
            Trees Added
          </div>
          <div
            class="col-3 q-pa-xs q-mr-md text-center text-grey-6"
            style="border: 1px solid #a4a9bc"
          >
            <span class="text-h5">0</span> <br />
            Health Checks
          </div>
          <div
            class="col-3 q-pa-xs text-center text-grey-6"
            style="border: 1px solid #a4a9bc"
          >
            <span class="text-h5">0</span> <br />
            Pests Detected
          </div>
        </div-->
      <!--p
        class="subtitle2"
        v-if="$store.state.app.defaultProject !== 'Taughannok Park'"
      >
        <q-icon color="primary" size="xs" name="sym_s_nature"></q-icon>
        <b>Add a Tree</b>
        <span class="text-caption">
          Whether you are planting or its existing, add a tree for easier record
          keeping</span
        >
      </p>
      <p v-if="$store.state.app.defaultProject !== 'Taughannok Park'">
        <q-icon size="xs" color="primary" name="sym_s_water_drop"></q-icon>
        <b>Tree Care</b>
        <span class="text-caption">
          Nurture and care for your tree by watering, mulching, staking and
          creating tree beds</span
        >
      </p>
      <p v-if="$store.state.app.defaultProject !== 'Taughannok Park'">
        <q-icon
          size="xs"
          color="primary"
          name="sym_s_health_and_safety"
        ></q-icon>
        <b>Health Check</b
        ><span class="text-caption">
          Ensure your tree lives a long, healthy life with regular check
          ups</span
        >
      </p>
      <p>
        <q-icon size="xs" color="primary" name="sym_s_pest_control"></q-icon>
        <b>Pest Detection</b
        ><span class="text-caption">
          Protect your community's trees by reporting signs of
          pests/diseases</span
        >
      </p-->
    </div>
    <div class="text-center q-ml-lg q-mr-lg">
      <q-btn
        style="width: 100%"
        size="18px"
        color="primary"
        class="q-mb-xs q-mt-md"
        @click="$store.commit('updateSelectedView', 'trees')"
        >View Project Trees</q-btn
      >
      <q-btn
        style="width: 100%"
        size="18px"
        color="orange"
        class="q-mb-xs q-mt-sm"
        @click="$store.commit('updateSelectedView', 'log')"
        >View Project Log</q-btn
      >
    </div>

    <!--div class="bg-white text-left q-ma-sm q-pa-md">
      <q-toolbar
        class="q-pl-lg q-mb-md bg-grey-3"
        style="letter-spacing: 1.5px; min-height: 40px !important"
      >
        YOUR PROJECTS
        <q-space></q-space>
        <q-btn
          color="primary"
          padding="sm"
          size="md"
          flat
          icon="sym_s_add_circle"
          @click="newProjectDialog = true"
        ></q-btn>
      </q-toolbar>

      <q-list bordered class="">
        <q-item bordered clickable v-ripple @click="editProjectDialog = true">
          <q-item-section>
            <q-item-label>
              <span class="text-weight-bold">My Trees</span></q-item-label
            >
            <q-item-label caption lines="1">
              <span class="">Owner</span></q-item-label
            ></q-item-section
          >
          <q-item-section avatar>
            <q-icon color="primary" name="sym_s_arrow_right" />
          </q-item-section> </q-item
        ><q-separator></q-separator>
        <q-item clickable v-ripple @click="viewProjectDialog = true">
          <q-item-section>
            <q-item-label>
              <span class="text-weight-bold"
                >Taughannok Park</span
              ></q-item-label
            >
            <q-item-label caption lines="1">
              <span class="">Member</span></q-item-label
            ></q-item-section
          >
          <q-item-section avatar>
            <q-icon color="primary" name="sym_s_arrow_right" />
          </q-item-section> </q-item
        ><q-separator></q-separator>
        <q-item clickable v-ripple @click="editProjectDialog = true">
          <q-item-section>
            <q-item-label>
              <span class="text-weight-bold"
                >Trumansburg Neighborhood Tree Watch</span
              ></q-item-label
            >
            <q-item-label caption lines="1">
              <span class="">Owner</span></q-item-label
            ></q-item-section
          >
          <q-item-section avatar>
            <q-icon color="primary" name="sym_s_arrow_right" />
          </q-item-section>
        </q-item>
      </q-list>
    </div-->

    <!--div class="bg-white text-left q-pa-md q-ma-sm q-mt-none q-pt-none">
      <q-toolbar
        class="q-pl-lg q-mb-md bg-grey-3"
        style="letter-spacing: 1.5px; min-height: 40px !important"
        >RESOURCES</q-toolbar
      >
      <p class="subtitle2 q-mb-none">Find an Arborist</p>
      <p class="subtitle2 q-mb-none">Tree Care</p>
      <q-virtual-scroll
        :items="heavyList"
        virtual-scroll-horizontal
        v-slot="{ item, index }"
      >
        <div :key="index" :class="item.class">
          #{{ index }} - {{ item.label }}
        </div>
      </q-virtual-scroll>
      <p class="subtitle2 q-mb-none">Pest Detection</p>
      <q-virtual-scroll
        :items="heavyList2"
        virtual-scroll-horizontal

        v-slot="{ item, index }"
        style="width: 85vw"
      >
        <div :key="index" :class="item.class">
          #{{ index }} - {{ item.label }}
        </div>
      </q-virtual-scroll>
    </div-->
  </q-scroll-area>

  <!--New Project Dialog-->
  <!--q-dialog
    v-model="newProjectDialog"
    transition-show="slide-right"
    transition-hide="slide-left"
    maximized
    persistent
  >
    <q-card>
      <q-card-actions align="left">
        <q-btn
          flat
          icon="sym_s_arrow_back"
          label=""
          color="primary"
          v-close-popup
        />
        <q-chip size="lg" color="white" class="text-primary"
          >Create New Project</q-chip
        >
      </q-card-actions>
      <q-card-section class="row items-center">
        <FormNewProject></FormNewProject>
      </q-card-section>
    </q-card>
  </q-dialog-->
  <!--Edit Project Dialog-->
  <!--q-dialog
    v-model="editProjectDialog"
    transition-show="slide-right"
    transition-hide="slide-left"
    maximized
    persistent
  >
    <q-card>
      <q-card-actions align="left">
        <q-btn
          flat
          icon="sym_s_arrow_back"
          label=""
          color="primary"
          v-close-popup
        />
        <q-chip size="lg" color="white" class="text-primary"
          >Edit Project</q-chip
        >
      </q-card-actions>
      <q-card-section class="row items-center">
        <FormEditProject></FormEditProject>
      </q-card-section>
    </q-card>
  </q-dialog-->
  <!--Tasks Dialog-->
  <q-dialog
    v-model="taskSelectedDialog"
    transition-show="slide-right"
    transition-hide="slide-left"
    maximized
    persistent
  >
    <q-card>
      <q-card-actions align="left">
        <q-btn
          flat
          icon="sym_s_arrow_back"
          label=""
          color="primary"
          v-close-popup
        />
        <q-chip size="lg" color="white" class="text-primary">{{
          taskSelected
        }}</q-chip>
      </q-card-actions>
      <q-card-section class="row items-center">
        <DialogTaskInstructions></DialogTaskInstructions>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!--Filter Dialog-->
  <!--q-dialog
    v-model="showFilterDialog"
    transition-show="slide-right"
    transition-hide="slide-left"
    maximized
    persistent
    keep-alive
  >
    <q-card>
      <q-card-actions align="left">
        <q-btn
          flat
          icon="sym_s_arrow_back"
          label=""
          color="primary"
          v-close-popup
        />
        <q-chip size="lg" color="white" class="text-primary"
          >Filter Trees</q-chip
        >
      </q-card-actions>
      <q-card-section class="row items-center">
        <keep-alive><DialogFilterTrees></DialogFilterTrees></keep-alive>
      </q-card-section>
    </q-card>
  </q-dialog-->
</template>
<script>
import FormNewProject from './FormNewProject.vue';
import FormEditProject from './FormEditProject.vue';
import DialogFilterTrees from './DialogFilterTrees.vue';
import DialogTaskInstructions from './DialogTaskInstructions.vue';

export default {
  name: 'Projects',
  components: {
    FormNewProject,
    FormEditProject,
    DialogFilterTrees,
    DialogTaskInstructions,
  },
  computed: {
    filterApplied() {
      return this.$store.state.app.filterApplied;
    },
  },

  data() {
    return {
      taskSelected: '',
      taskSelectedDialog: false,
      showFilterDialog: false,
      newProjectDialog: false,
      editProjectDialog: false,
      noRipple: false,
      options: ['My Trees', 'Taughannok Park'],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.semi-bold {
  font-weight: 500;
  font-size: 20px;
}
.scroll-height {
  height: calc(100vh - 140px);
}
</style>

<style></style>
