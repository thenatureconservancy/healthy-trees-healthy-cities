<template>
  <div style="width: 100%">
    <q-card class="my-card q-mb-lg" flat>
      <q-card-section class="q-pb-xs">
        <p class="text-body1 q-mb-none q-pb-none">
          1. First check the map to see if your tree is already on the map
        </p></q-card-section
      >
      <q-separator inset spaced></q-separator>
      <q-card-section horizontal>
        <q-icon
          class="col-3 self-center"
          name="location_on"
          size="40px"
          color="blue"
        />
        <q-card-section>
          Blue markers represent existing trees. Click the blue marker to see
          details. To use the tree, click &nbsp;
          <span class="text-bold">'Add to Project'</span>.
        </q-card-section>
      </q-card-section>
    </q-card>

    <q-card class="my-card q-mb-lg" flat>
      <q-card-section class="q-pb-xs">
        <p class="text-body1 q-mb-none q-pb-none">
          2. If you dont see your tree, add it to the map
        </p></q-card-section
      >
      <q-separator inset spaced></q-separator>
      <q-card-section horizontal class="">
        <div class="col-3 self-center text-center">
          <q-avatar
            font-size="30px"
            size="40px"
            padding="md"
            icon="sym_s_add"
            text-color="white"
            color="primary"
          >
          </q-avatar>
        </div>

        <q-card-section class="text-body2">
          Choose to &nbsp;<span class="text-bold">'Add via Map' </span> if you
          want to pan the map to place the tree. Choose &nbsp;
          <span class="text-bold">'Add via GPS' </span>to use your mobile device
          location to place the tree.
        </q-card-section>
      </q-card-section>
    </q-card>

    <q-card class="my-card q-mb-lg" flat>
      <q-card-section class="q-pb-xs">
        <p class="text-body1 q-mb-none q-pb-none">
          3. Perfom tasks on Project Trees
        </p></q-card-section
      >
      <q-separator inset spaced></q-separator>
      <q-card-section horizontal>
        <q-icon
          class="col-3 self-center"
          name="location_on"
          size="40px"
          color="red"
        />
        <q-card-section>
          Red markers represent trees in your project. Click the red marker to
          perform tasks on a tree.
        </q-card-section>
      </q-card-section> </q-card
    ><br />
  </div>
</template>

<script>
export default {
  name: 'DialogTaskInstructions',
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.semi-bold {
  font-weight: 600;
}
</style>
