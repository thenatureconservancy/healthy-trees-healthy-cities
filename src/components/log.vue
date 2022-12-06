<template>
  <div class="semi-bold text-subtitle2 q-mt-none q-mb-md text-black row">
    <div class="col-4 self-center">Active Project:</div>
    <div class="col-6 self-center">
      {{ $store.state.app.defaultProject }}
      <q-btn
        color="primary"
        padding="sm"
        size="md"
        flat
        icon="sym_s_edit"
        @click="$store.commit('updateSelectedView', 'home')"
      ></q-btn>
    </div>
    <div class="col-2 self-center">
      <q-btn
        color="primary"
        padding="sm"
        size="md"
        flat
        icon="sym_s_filter_alt"
        @click="this.showFilterDialog = true"
      ></q-btn>
    </div>
  </div>
  <q-separator inset></q-separator>
  <q-scroll-area class="scroll-height">
    <div class="q-ma-xl text-left">
      <q-timeline color="secondary">
        <q-timeline-entry heading>July, 2022 </q-timeline-entry>

        <q-timeline-entry
          color="blue"
          title="Health Check"
          subtitle="July 20, 2022"
          avatar="https://cdn.quasar.dev/img/avatar2.jpg"
        >
          <div>
            <q-btn flat color="primary">View tree</q-btn>
            <q-btn flat color="primary">View record</q-btn>
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          title="Remove Tree"
          subtitle="July 14, 2022"
          color="red"
          avatar="https://cdn.quasar.dev/img/avatar2.jpg"
        >
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <div>
            <q-btn flat color="primary">View tree</q-btn>
            <q-btn flat color="primary">View record</q-btn>
          </div>
        </q-timeline-entry>

        <q-timeline-entry heading> May, 2022 </q-timeline-entry>

        <q-timeline-entry
          title="Health Check"
          subtitle="May 15, 2022"
          avatar="https://cdn.quasar.dev/img/avatar2.jpg"
          color="blue"
        >
          <div>
            <q-btn flat color="primary">View tree</q-btn>
            <q-btn flat color="primary">View record</q-btn>
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          title="Health Check"
          subtitle="May 15, 2022"
          icon="M&nbsp;B"
          color="blue"
        >
          <div>
            <q-btn flat color="primary">View tree</q-btn>
            <q-btn flat color="primary">View record</q-btn>
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          title="Pest Detection"
          subtitle="May 5, 2022"
          color="orange"
          avatar="https://cdn.quasar.dev/img/avatar2.jpg"
        >
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          </div>
          <div>
            <q-btn flat color="primary">View tree</q-btn>
            <q-btn flat color="primary">View record</q-btn>
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          title="Add Tree"
          subtitle="May 1, 2022"
          icon="T&nbsp;R"
        >
          <div>
            Notes: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <div>
            <q-btn flat color="primary">View tree</q-btn>
            <q-btn flat color="primary">View record</q-btn>
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          title="Add Tree"
          subtitle="May 1, 2022"
          icon="T&nbsp;R"
        >
          <div>
            Notes: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <div>
            <q-btn flat color="primary">View tree</q-btn>
            <q-btn flat color="primary">View record</q-btn>
          </div>
        </q-timeline-entry>
      </q-timeline>
    </div>
  </q-scroll-area>
  <!--Filter Dialog-->
  <q-dialog
    v-model="showFilterDialog"
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
          >Filter Trees</q-chip
        >
      </q-card-actions>
      <q-card-section class="row items-center">
        <DialogFilterTrees></DialogFilterTrees>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import DialogFilterTrees from './DialogFilterTrees.vue';
export default {
  name: 'log',
  components: { DialogFilterTrees },
  data() {
    return {
      showFilterDialog: false,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scroll-height {
  height: calc(100vh - 140px);
}

.semi-bold {
  font-weight: 500;
  font-size: 17px;
}
</style>
