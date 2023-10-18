<template>
  <ol-map
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    style="height: 100vh"
    ref="mapRef"
  >
    <ol-view
      ref="view"
      :center="center"
      :rotation="rotation"
      :zoom="zoom"
      :projection="projection"
    />

    <ol-vector-layer>
      <ol-source-vector :url="shape" :format="geoJson"> </ol-source-vector>
    </ol-vector-layer>

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>
    <ol-fullscreen-control />
    <ol-scaleline-control />
    <ol-rotate-control />
    <ol-zoom-control />
    <ol-zoomslider-control />
    <ol-zoomtoextent-control
      :extent="[
      -5.318421740712579, 41.16082274292913, 9.73284186155716,
      51.21957336557702,
    ]"
      tipLabel="Reset View"
    />

  </ol-map>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';

// Data Binding
const mapRef = ref(null);
const sourceRef = ref(null);

const shape = ref ("http://localhost:5173/shape/jabar_s.json");
const url = ref(
  'https://openlayers.org/en/latest/examples/data/geojson/world-cities.geojson'
);
const center = ref([107.6191, -6.9175]);
const projection = ref('EPSG:4326');
const zoom = ref(10);
const rotation = ref(0);

const format = inject('ol-format');
const geoJson = new format.GeoJSON();


const webglPointsStyle = {
  'circle-radius': 6,
  'circle-fill-color': 'yellow',
  'circle-stroke-width': 2,
  'circle-stroke-color': 'darkblue',
  'circle-opacity': [
    'interpolate',
    ['linear'],
    ['get', 'population'],
    40000,
    0.6,
    2000000,
    0.92,
  ],
};

const selectConditions = inject("ol-selectconditions");
const selectCondition = selectConditions.pointerMove;
const selectedCityName = ref("");
const selectedCityPosition = ref([]);
const extent = inject("ol-extent");
const Feature = inject("ol-feature");
const Geom = inject("ol-geom");

const featureSelected = (event) => {
  if (event.selected.length == 1) {
    selectedCityPosition.value = extent.getCenter(
      event.selected[0].getGeometry().extent_,
    );
    selectedCityName.value = event.selected[0].values_.name;
  } else {
    selectedCityName.value = "";
  }
};

const overrideStyleFunction = (feature, style) => {
  const clusteredFeatures = feature.get("features");
  const size = clusteredFeatures.length;

  const color = size > 20 ? "192,0,0" : size > 8 ? "255,128,0" : "0,128,0";
  const radius = Math.max(8, Math.min(size, 20));
  const dash = (2 * Math.PI * radius) / 6;
  const calculatedDash = [0, dash, dash, dash, dash, dash, dash];

  style.getImage().getStroke().setLineDash(dash);
  style
    .getImage()
    .getStroke()
    .setColor("rgba(" + color + ",0.5)");
  style.getImage().getStroke().setLineDash(calculatedDash);
  style
    .getImage()
    .getFill()
    .setColor("rgba(" + color + ",1)");

  style.getImage().setRadius(radius);

  style.getText().setText(size.toString());
};

const selectInteactionFilter = (feature) => {
  return feature.values_.name != undefined;
};

const getRandomInRange = (from, to, fixed) => {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
};

onMounted(() => {
  const map = mapRef.value ? mapRef.value.map : null;
  const source = sourceRef.value ? sourceRef.value.source : null;

  if (map) {
    map.on('postcompose', function (e) {
      document.querySelector('canvas').style.filter =
        'brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.5) brightness(0.7)';
    });
  }
});
</script>
