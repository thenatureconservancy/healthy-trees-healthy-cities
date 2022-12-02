<template>
  RESOURCES
  <!--q-scroll-area class="" style="padding-bottom: 140px; height: 100vh">
    <div class="bg-white text-left q-pa-md q-ma-sm q-mt-none q-pt-none">
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
    </div>
  </q-scroll-area-->
</template>

<script>
export default {
  name: 'Resources',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
