<template>
  <q-layout view="lHh lpR lFf">
    <q-header class="bg-white text-primary">
      <q-toolbar style="border-bottom: 0.5px solid #49a942">
        <q-toolbar-title> Healthy Trees, Healthy Cities </q-toolbar-title>

        <q-btn
          icon="sym_s_account_circle"
          color="primary"
          flat
          round
          padding="sm"
          @click="selected = 'settings'"
        ></q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="$store.state.app.leftDrawer.open"
      side="left"
      bordered
      overlay
      :width="$store.state.app.leftDrawer.width"
    >
      <!-- drawer content -->
      <FormPestDetection
        v-if="$store.state.app.leftDrawer.content == 'pest'"
      ></FormPestDetection>
      <keep-alive>
        <DialogSelectTrees
          v-if="$store.state.app.leftDrawer.content == 'select'"
        ></DialogSelectTrees>
      </keep-alive>
      <FormHealthCheck
        v-if="$store.state.app.leftDrawer.content == 'health'"
      ></FormHealthCheck>
      <FormTreeCare
        v-if="$store.state.app.leftDrawer.content == 'care'"
      ></FormTreeCare>
      <FormAddTree
        v-if="$store.state.app.leftDrawer.content == 'addtree'"
      ></FormAddTree>
      <DialogImageGallery
        v-if="$store.state.app.leftDrawer.content == 'image'"
      ></DialogImageGallery>

      <keep-alive
        ><DialogFilterTrees
          v-if="$store.state.app.leftDrawer.content == 'filter'"
        ></DialogFilterTrees
      ></keep-alive>

      <FormNewProject
        v-if="$store.state.app.leftDrawer.content == 'newProject'"
      ></FormNewProject>
      <FormEditProject
        v-if="$store.state.app.leftDrawer.content == 'editProject'"
      ></FormEditProject>
    </q-drawer>

    <q-page-container class="" style="padding-top: 1px">
      <Projects v-if="this.selected == 'home'"></Projects>
      <Map v-if="this.selected == 'trees'"></Map>
      <log v-if="this.selected == 'log'"></log>
      <settings v-if="this.selected == 'settings'"></settings>
      <Resources v-if="this.selected == 'resources'"></Resources>
      <!--q-slide-transition v-show="this.selected == 'home'"
        ><div><home></home></div>
      </q-slide-transition>
      <q-slide-transition v-show="this.selected == 'trees'">
        <div><trees></trees></div>
      </q-slide-transition>
      <q-slide-transition v-show="this.selected == 'log'"
        ><div><log></log></div>
      </q-slide-transition>
      <q-slide-transition v-show="this.selected == 'settings'"
        ><div><settings></settings></div></q-slide-transition-->
    </q-page-container>
    <q-footer elevated class="bg-grey-8 text-white">
      <q-footer class="bg-white">
        <q-btn-group
          spread
          class="text-blue q-mb-md no-shadow"
          style="border-top: 1px solid #49a942"
        >
          <q-btn
            :class="this.selected == 'home' ? 'text-primary' : 'text-grey-6'"
            stack
            flat
            size=""
            color=""
            label="Projects"
            icon="sym_s_folder_shared"
            :ripple="noRipple"
            @click="selected = 'home'"
            no-caps
          />
          <q-btn
            :class="this.selected == 'trees' ? 'text-primary' : 'text-grey-6'"
            stack
            flat
            size=""
            color=""
            label="Map"
            icon="sym_s_nature"
            :ripple="noRipple"
            @click="selected = 'trees'"
            no-caps
          />
          <q-btn
            :class="this.selected == 'log' ? 'text-primary' : 'text-grey-6'"
            stack
            flat
            size=""
            color=""
            label="Log"
            icon="sym_s_leaderboard"
            :ripple="noRipple"
            @click="selected = 'log'"
            no-caps
          />
          <q-btn
            :class="
              this.selected == 'resources' ? 'text-primary' : 'text-grey-6'
            "
            stack
            flat
            size=""
            color=""
            label="Resources"
            icon="sym_s_video_library"
            :ripple="noRipple"
            @click="selected = 'resources'"
            no-caps
          />
        </q-btn-group>
      </q-footer>
    </q-footer>
  </q-layout>
</template>

<script>
import Projects from './components/Projects.vue';
import log from './components/log.vue';
import settings from './components/settings.vue';
import Resources from './components/Resources.vue';
import Map from './components/Map.vue';
import DialogFilterTrees from './components/DialogFilterTrees.vue';
import DialogSelectTrees from './components/DialogSelectTrees.vue';
import DialogImageGallery from './components/DialogImageGallery.vue';
import FormNewProject from './components/FormNewProject.vue';
import FormEditProject from './components/FormEditProject.vue';
import FormAddTree from './components/FormAddTree.vue';
import FormHealthCheck from './components/FormHealthCheck.vue';
import FormTreeCare from './components/FormTreeCare.vue';
import FormPestDetection from './components/FormPestDetection.vue';

export default {
  name: 'App',
  components: {
    Projects,
    Map,
    log,
    settings,
    Resources,
    DialogFilterTrees,
    DialogSelectTrees,
    FormNewProject,
    FormEditProject,
    DialogImageGallery,
    FormAddTree,
    FormHealthCheck,
    FormTreeCare,
    FormPestDetection,
  },
  computed: {
    selectedView() {
      return this.$store.state.app.selectedView;
    },
  },
  watch: {
    selectedView() {
      if (this.selectedView) {
        this.selected = this.selectedView;
        this.$store.commit('updateSelectedView', '');
      }
    },
  },
  data() {
    return {
      noRipple: false,
      selected: 'home',
    };
  },
  mounted() {
    this.$store.dispatch('loginAtAppLoad');
    //get screen width
    let width = parseInt(this.$q.screen.width);
    this.$store.commit('updateScreenWidth', width);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 50px;
}
</style>
