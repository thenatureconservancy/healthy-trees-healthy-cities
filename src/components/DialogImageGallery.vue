<template>
  <div class="q-pa-md">
    <q-carousel
      style="width: $store.state.app.screenWith; height: 100vh"
      animated
      v-model="slide"
      arrows
      navigation
      infinite
    >
      <q-carousel-slide
        :name="1"
        img-src="https://placeimg.com/320/640/nature?t=26"
      />
      <q-carousel-slide
        :name="2"
        img-src="https://placeimg.com/320/640/nature?t=17"
      />
      <q-carousel-slide
        :name="3"
        img-src="https://placeimg.com/320/640/nature?t=69"
      />
      <q-carousel-slide
        :name="4"
        img-src="https://placeimg.com/320/640/nature?t=14"
      />

      <template v-slot:control>
        <q-carousel-control position="top-left" :offset="[18, 18]">
          <q-btn
            round
            color="white"
            text-color="primary"
            icon="close"
            @click="$store.commit('updateLeftDrawer', { open: false })"
          />
        </q-carousel-control>
      </template>
    </q-carousel>
  </div>
</template>

<script>
export default {
  name: 'DialogImageGallery',
  data() {
    return {
      slide: 1,
    };
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.semi-bold {
  font-weight: 600;
}
</style>
