<template>
  <!--q-header class="bg-white text-primary">
    <q-toolbar style="border-bottom: 0.5px solid #49a942">
      <q-toolbar-title> Healthy Trees, Healthy Cities </q-toolbar-title>
    </q-toolbar>
  </q-header-->
  <div class="q-header">
    <!--q-toolbar class="">
      <q-select
        class="bg-white"
        outlined
        dense
        v-model="$store.state.app.defaultProject"
        :options="options"
        style="width: 100%"
        label="ACTIVE PROJECT"
        color="primary"
      >
        <template v-slot:selected-item="scope">
          <div class="ellipsis">{{ scope.opt }}</div>
        </template></q-select
      >
    </q-toolbar-->

    <div id="map" style="z-index: 99"></div>
    <div
      id="layers"
      style="position: absolute; z-index: 100; top: 75px; right: 15px"
    >
      <q-btn
        padding="10px"
        round
        icon="sym_s_layers"
        :color="layersActive ? 'primary' : 'white'"
        :text-color="layersActive ? 'white' : 'primary'"
      >
        <q-menu
          style="width: 250px"
          anchor="bottom right"
          self="bottom left"
          @before-hide="this.layersActive = false"
          @before-show="this.layersActive = true"
        >
          <q-banner>
            <br />
            <div class="text-primary">
              <span class="text-bold">Select Map Layers </span>
              <DialogMapLayers></DialogMapLayers>
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
    <div
      id="filter"
      style="position: absolute; z-index: 100; top: 135px; right: 15px"
    >
      <q-btn
        padding="10px"
        round
        icon="sym_s_highlight"
        color="white"
        text-color="primary"
        @click="
          $store.commit('updateLeftDrawer', {
            open: true,
            content: 'select',
            width: $store.state.app.screenWidth,
          })
        "
      >
      </q-btn>
    </div>
    <div
      id="addTree"
      style="position: absolute; z-index: 100; top: 15px; right: 15px"
    >
      <q-fab
        color="primary"
        padding="10px"
        text-color="white"
        icon="add"
        direction="left"
      >
        <q-fab-action
          color="white"
          text-color="primary"
          icon="sym_s_location_on"
          label="add via map"
          :disable="
            $store.state.app.defaultProject == 'Taughannok Park' ? true : false
          "
          @click="
            $store.commit('updateLeftDrawer', {
              open: true,
              content: 'addtree',
              width: $store.state.app.screenWidth,
            })
          "
        />
        <q-fab-action
          color="white"
          text-color="primary"
          icon="sym_s_my_location"
          label="add via GPS"
          :disable="
            $store.state.app.defaultProject == 'Taughannok Park' ? true : false
          "
          @click="
            $store.commit('updateLeftDrawer', {
              open: true,
              content: 'addtree',
              width: $store.state.app.screenWidth,
            })
          "
        />
      </q-fab>
    </div>

    <!--div
      id="bluelayers"
      style="position: absolute; z-index: 100; top: 78px; right: 23px"
    >
      <q-btn
        v-if="blue == 'on'"
        @click="blue = 'off'"
        round
        color="white"
        text-color="blue"
        icon="location_on"
        size="sm"
      ></q-btn>

      <q-btn
        v-if="blue == 'off'"
        @click="blue = 'on'"
        round
        color="gray"
        text-color="blue"
        icon="wrong_location"
        size="sm"
      ></q-btn>
    </div>
    <div
      id="redlayers"
      style="position: absolute; z-index: 100; top: 115px; right: 23px"
    >
      <q-btn
        v-if="red == 'on'"
        @click="red = 'off'"
        round
        color="white"
        text-color="red"
        icon="location_on"
        size="sm"
      ></q-btn>
      <q-btn
        v-if="red == 'off'"
        @click="red = 'on'"
        round
        color="gray"
        text-color="red"
        icon="wrong_location"
        size="sm"
      ></q-btn>
    </div-->
    <div id="popup" style="position: absolute; z-index: 100">
      <q-card
        class="slide-drawer slide-drawer--bottom text-white fixed-bottom column no-wrap shadow-5"
        :class="`slide-drawer--open-${drawerMode}`"
        :style="drawerStyle"
      >
        <q-card-section
          class="slide-drawer__handler--horizontal row flex-center q-pa-sm q-gutter-x-md"
          v-touch-pan.mouse.vertical="slideDrawer"
        >
          <div class="cursor-pointer" @click="cycleDrawer"></div>
        </q-card-section>
        <div
          v-touch-pan.mouse.vertical="slideDrawer"
          class="semi-bold text-subtitle2 q-mt-none q-mb-md text-black row"
        >
          <div class="col-9 q-pl-lg">
            <q-select
              v-model="$store.state.app.defaultProject"
              :options="options"
              style="width: 100%"
              color="primary"
              class="bg-grey-3 q-pl-sm"
              label="Project"
              options-selected-class="text-deep-orange"
            >
              <template v-slot:selected-item="scope">
                <div class="ellipsis">{{ scope.opt }}</div>
              </template></q-select
            >
          </div>
          <div class="col-2 self-center">
            &nbsp; &nbsp;(1<q-icon
              size="xs"
              name="location_on"
              color="red"
            ></q-icon
            >)
          </div>
        </div>

        <q-card-section
          v-touch-pan.mouse.vertical="slideDrawer"
          v-if="drawerMode !== 'handler'"
          class="col q-pa-xs"
        >
          <div class="text-h6">
            <q-card
              class="my-card q-mt-none q-pt-none"
              v-if="showCard == 'blue'"
              flat
              bordered
            >
              <q-card-section horizontal>
                <q-card-section
                  class="col-4 flex flex-center highlight-and-fade"
                >
                  <q-img
                    style="max-height: 22vh"
                    fit="contain"
                    class="rounded-borders"
                    src="img/temp.jpg"
                  >
                    <!--div
                      style="background: rgba(0, 0, 0, 0.15)"
                      class="absolute-full text-subtitle2 flex flex-center"
                      @click="imagesDialog = true"
                    >
                      <q-icon
                        style="position: absolute; bottom: 2px; right: 2px"
                        size="xs"
                        name="sym_s_search"
                      ></q-icon></div
                    --></q-img
                  >
                </q-card-section>

                <q-card-section
                  v-touch-pan.mouse.vertical="slideDrawer"
                  class="q-pt-xs col-7 self-center"
                >
                  <div class="text-h5 q-mt-sm q-mb-xs text-black">
                    White Oak
                  </div>
                  <div class="text-caption text-grey-8 q-mt-sm q-mb-xs">
                    Quercus Albus
                  </div>
                  <div class="text-caption text-grey">
                    DBH: 65 in | Height: 16 ft
                  </div>

                  <q-card-actions
                    class="flex-center"
                    v-if="$store.state.app.defaultProject !== 'Taughannok Park'"
                  >
                    <q-btn outline size="md" icon="add" no-caps color="primary">
                      Add Tree to Project</q-btn
                    >
                  </q-card-actions>
                </q-card-section>
              </q-card-section>
            </q-card>
            <q-card class="my-card q-pt-none q-mt-none" flat bordered>
              <!--div
                      style="background: rgba(0, 0, 0, 0.15)"
                      class="absolute-full text-subtitle2 flex flex-center"
                      @click="imagesDialog = true"
                    >
                      <q-icon
                        style="position: absolute; bottom: 2px; right: 2px"
                        size="xs"
                        name="sym_s_search"
                      ></q-icon></div
                    -->
              <q-card-section horizontal text-left>
                <q-card-section
                  v-touch-pan.mouse.vertical="slideDrawer"
                  class="q-pt-xs q-pb-none col-6 text-right"
                >
                  <div class="text-h6 q-mt-sm q-mb-none q-pb-none text-black">
                    White Oak
                  </div>
                  <div class="text-caption text-grey-9 q-mt-none q-pt-none">
                    Quercus Albus
                  </div>
                  <div class="text-caption text-grey">
                    DBH: 65 in | Height: 16 ft
                  </div>
                  <q-btn padding="xs" size="sm" flat color="primary">
                    View History
                  </q-btn>
                </q-card-section>
                <q-card-section
                  class="col-2 flex self-center highlight-and-fade q-pb-none q-pt-xs"
                >
                  <div class="text-primary">
                    <q-knob
                      readonly
                      v-model="treeHealthIndex"
                      :max="10"
                      show-value
                      size="80px"
                      :thickness="0.22"
                      color="orange"
                      track-color="orange-3"
                      class="text-orange"
                    /></div
                ></q-card-section>
              </q-card-section>

              <q-card-actions align="center" class="q-mt-none">
                <q-btn
                  size="md"
                  color="primary"
                  flat
                  style="background-color: #c8e6c9"
                  @click="
                    $store.commit('updateLeftDrawer', {
                      open: true,
                      content: 'health',
                      width: $store.state.app.screenWidth,
                    })
                  "
                  >Health Check</q-btn
                >
                <q-btn
                  size="md"
                  color="primary"
                  flat
                  style="background-color: #c8e6c9"
                  @click="
                    $store.commit('updateLeftDrawer', {
                      open: true,
                      content: 'care',
                      width: $store.state.app.screenWidth,
                    })
                  "
                  >Tree Care</q-btn
                >
                <q-btn
                  size="md"
                  color="primary"
                  flat
                  style="background-color: #c8e6c9"
                  @click="
                    $store.commit('updateLeftDrawer', {
                      open: true,
                      content: 'pest',
                      width: $store.state.app.screenWidth,
                    })
                  "
                  >Pest Detection</q-btn
                >
              </q-card-actions>
            </q-card>
            <q-card>
              <q-card-section>
                <q-scroll-area style="height: 350px">
                  <div class="q-gutter-sm row justify-center">
                    <div style="height: 140px; width: 150px">
                      <q-icon
                        style="
                          height: 140px;
                          max-width: 150px;
                          padding-top: 30px;
                        "
                        color="grey-5"
                        size="90px"
                        name="sym_s_add_circle"
                      ></q-icon>
                    </div>
                    <img
                      :src="'https://placeimg.com/500/300/nature?t=27'"
                      style="height: 140px; max-width: 150px"
                      @click="
                        $store.commit('updateLeftDrawer', {
                          open: true,
                          content: 'image',
                          width: $store.state.app.screenWidth,
                        })
                      "
                    />

                    <img
                      :src="'https://placeimg.com/500/300/nature?t=53'"
                      style="height: 140px; max-width: 150px"
                      @click="
                        $store.commit('updateLeftDrawer', {
                          open: true,
                          content: 'image',
                          width: $store.state.app.screenWidth,
                        })
                      "
                    />

                    <img
                      :src="'https://placeimg.com/500/300/nature?t=19'"
                      style="height: 140px; max-width: 150px"
                      @click="
                        $store.commit('updateLeftDrawer', {
                          open: true,
                          content: 'image',
                          width: $store.state.app.screenWidth,
                        })
                      "
                    />

                    <img
                      :src="'https://placeimg.com/500/300/nature?t=26'"
                      style="height: 140px; max-width: 150px"
                      @click="
                        $store.commit('updateLeftDrawer', {
                          open: true,
                          content: 'image',
                          width: $store.state.app.screenWidth,
                        })
                      "
                    />

                    <img
                      :src="'https://placeimg.com/500/300/nature?t=14'"
                      style="height: 140px; max-width: 150px"
                      @click="
                        $store.commit('updateLeftDrawer', {
                          open: true,
                          content: 'image',
                          width: $store.state.app.screenWidth,
                        })
                      "
                    />
                  </div>
                </q-scroll-area>
              </q-card-section>
            </q-card>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>

  <!--q-dialog
    v-model="imagesDialog"
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
        <q-chip size="lg" color="white" class="text-primary">Photos</q-chip>
      </q-card-actions>
      <q-card-section class="row items-center"> </q-card-section>
    </q-card>
  </q-dialog-->

  <!--q-dialog
    v-model="showLayersDialog"
    transition-show="slide-right"
    transition-hide="slide-left"
    style="width: 50%"
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
        <q-chip size="lg" color="white" class="text-primary">Layers</q-chip>
      </q-card-actions>
      <q-card-section class="row items-center">
        <DialogMapLayers></DialogMapLayers
      ></q-card-section>
    </q-card>
  </q-dialog-->

  <!--Filter Dialog-->
  <!--q-dialog
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
  </q-dialog-->

  <!--Tasks Dialog-->
  <!--q-dialog
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
        <q-chip size="lg" color="white" class="text-primary">Add Tree</q-chip>
      </q-card-actions>
      <q-card-section class="row items-center">
        <DialogTaskInstructions></DialogTaskInstructions>
      </q-card-section>
    </q-card>
  </q-dialog-->
</template>

<script>
import mapboxgl from '/node_modules/mapbox-gl/dist/mapbox-gl.js';
import L from '/node_modules/leaflet/dist/leaflet.js';
import DialogMapLayers from './DialogMapLayers.vue';
import DialogFilterTrees from './DialogFilterTrees.vue';
import DialogTaskInstructions from './DialogTaskInstructions.vue';

const drawerMinHeight = 148;
const drawerTopOffset = 75;
const drawerOpenRatioHalf = 50;

var bigBlue = '';
var bigRed = '';
export default {
  name: 'Map',
  components: { DialogMapLayers, DialogFilterTrees, DialogTaskInstructions },
  computed: {
    drawerMaxHeight() {
      return Math.max(0, this.$q.screen.height - drawerTopOffset);
    },

    drawerOpenRatio() {
      return Math.round(
        (Math.max(0, this.drawerPos - drawerMinHeight) /
          Math.max(1, this.drawerMaxHeight - drawerMinHeight)) *
          100
      );
    },

    drawerStyle() {
      return {
        height: `${this.drawerMaxHeight}px`,
        transform: `translateY(${-this.drawerPos}px)`,
      };
    },

    drawerMode() {
      if (this.drawerOpenRatio > drawerOpenRatioHalf) {
        return 'full';
      }

      return this.drawerOpenRatio > 0 ? 'half' : 'handler';
    },
  },
  data() {
    return {
      layersActive: false,
      treeHealthIndex: 6,
      taskSelectedDialog: false,
      showFilterDialog: false,
      showLayersDialog: false,
      red: 'on',
      blue: 'on',
      showCard: '',
      lorem:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      drawerPos: drawerMinHeight,
      imagesDialog: false,
      options: [
        'My Trees',
        'Taughannok Park',
        'Trumansburg Neighborhood Tree Watch',
      ],
    };
  },
  mounted() {
    this.createMap();
    this.$q.notify({
      message:
        "Looks like you don''t have any trees in your project yet.  Would you like to see instructions for adding a tree?.",
      color: 'white',
      actions: [
        {
          color: 'primary',
          label: 'Show Me',
          handler: () => {
            this.taskSelectedDialog = true;
          },
        },
      ],
    });
  },
  beforeUnmount() {
    clearTimeout(this.animateTimeout);
  },
  methods: {
    stop() {
      console.log('stops');
    },
    createMap() {
      // TO MAKE THE MAP APPEAR YOU MUST
      // ADD YOUR ACCESS TOKEN FROM
      // https://account.mapbox.com
      /*   mapboxgl.accessToken =
        'pk.eyJ1IjoidG5jbWFwYm94IiwiYSI6ImNsYmZpNzE0MDA2aHozbm1wazV1aWp3NHUifQ.7plkZIxeS9mzUXB06i-CLg';
      const map = new mapboxgl.Map({
        container: 'map', // container ID
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9, // starting zoom
      });*/

      // First, create a new Mapbox map and set the center and zoom level
      mapboxgl.accessToken =
        'pk.eyJ1IjoidG5jbWFwYm94IiwiYSI6ImNsYmZpNzE0MDA2aHozbm1wazV1aWp3NHUifQ.7plkZIxeS9mzUXB06i-CLg';
      // First, create a new Mapbox map and set the center and zoom level
      // mapboxgl.accessToken = 'your-access-token';
      // First, create a new Mapbox map and set the center and zoom level
      // mapboxgl.accessToken = 'your-access-token';
      // First, create a new Mapbox map and set the center and zoom level
      //mapboxgl.accessToken = 'your-access-token';
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [-74.5, 40],
        zoom: 9,
      });

      map.on('load', function () {
        map.addLayer({
          id: 'points',
          type: 'symbol',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [-74.5, 40],
                  },
                },
              ],
            },
          },
          layout: {
            'icon-image': 'tree-15',
          },
        });
      });
    },
    createMapLeaflet() {
      var map = L.map('map').setView([42.5423, -76.6056], 15);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      console.log(map);
      /* var colorIcon = L.Icon.extend({
        options: {
          iconSize: [25, 25],
          shadowSize: [30, 30],
          iconAnchor: [21, 22],
          shadowAnchor: [4, 62],
          popupAnchor: [-3, -76],
        },
      });*/
      var bigIcon = L.Icon.extend({
        options: {
          iconSize: [35, 35],
          shadowSize: [30, 30],
          iconAnchor: [23, 24],
          shadowAnchor: [4, 62],
          popupAnchor: [-3, -76],
        },
      });
      /* var greenIcon = new colorIcon({
        iconUrl: '/img/Map_marker.svg',
      });
      var redIcon = new colorIcon({
        iconUrl: '/img/Map_marker_red.svg',
      });*/
      bigBlue = new bigIcon({
        iconUrl: '/img/Map_marker.svg',
      });
      bigRed = new bigIcon({
        iconUrl: '/img/Map_marker_red.svg',
      });
      L.marker([42.5423, -76.6056], { icon: bigBlue })
        .on('click', this.markerOnClick)
        .addTo(map);
      L.marker([42.5423, -76.6068], { icon: bigRed })
        .on('click', this.markerOnClick)
        .addTo(map);
    },

    markerOnClick(e) {
      console.log(e.target.options.icon.options.iconUrl);
      let icon = e.target.options.icon.options.iconUrl;
      if (icon == '/img/Map_marker.svg') {
        //e.target.setIcon(bigBlue);
        this.showCard = 'blue';
      }
      if (icon == '/img/Map_marker_red.svg') {
        this.showCard = 'red';
        //e.target.setIcon(bigRed);
      }
      this.drawerPos = drawerMinHeight;
      this.cycleDrawer();
    },
    slideDrawer(ev) {
      const { direction, delta, isFinal } = ev;

      this.drawerPos = Math.max(
        drawerMinHeight,
        Math.min(this.drawerMaxHeight, this.drawerPos - delta.y)
      );

      if (isFinal === true) {
        this.$nextTick(() => {
          const aboveHalf = this.drawerOpenRatio > drawerOpenRatioHalf;
          const targetHeight =
            direction === 'up'
              ? aboveHalf
                ? this.drawerMaxHeight
                : Math.round(this.drawerMaxHeight / 2)
              : aboveHalf
              ? Math.round(this.drawerMaxHeight / 2)
              : drawerMinHeight;

          this.animateDrawerTo(targetHeight);
        });
      }
    },

    cycleDrawer() {
      const targetHeight =
        this.drawerMode === 'handler'
          ? Math.round(this.drawerMaxHeight / 2)
          : this.drawerMode === 'half'
          ? this.drawerMaxHeight
          : drawerMinHeight;

      this.animateDrawerTo(targetHeight);
    },

    animateDrawerTo(height) {
      clearTimeout(this.animateTimeout);

      const diff = height - this.drawerPos;

      if (diff !== 0) {
        this.drawerPos += Math.abs(diff) < 2 ? diff : Math.round(diff / 2);

        this.animateTimeout = setTimeout(() => {
          this.animateDrawerTo(height);
        }, 30);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="leaflet/dist/leaflet.css"></style>
<style src="mapbox-gl/dist/mapbox-gl.css"></style>
<style scoped>
.semi-bold {
  font-weight: 500;
  font-size: 17px;
}

#map {
  height: 80vh;
}
.slide-drawer--bottom {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background-color: rgb(255, 255, 255);
  background-image: radial-gradient(
    circle,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  bottom: unset;
  top: 100%;
  transition: background-color 0.3s ease-in-out;
}
.slide-drawer--bottom > div:last-child,
.slide-drawer--bottom > img:last-child {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.slide-drawer--bottom.slide-drawer--open-half {
  background-color: #ffffff;
}
.slide-drawer--bottom.slide-drawer--open-full {
  background-color: #ffffff;
}
.slide-drawer__handler--horizontal {
  cursor: grab;
}
.slide-drawer__handler--horizontal > div {
  width: 40px;
  height: 4px;
  border-radius: 4px;
  background-color: #00703c;
}
</style>
<style></style>
