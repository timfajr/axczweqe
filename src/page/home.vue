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


    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>



    <ol-fullscreen-control />
    <ol-scaleline-control />
    <ol-rotate-control />
    <ol-zoom-control />
    <ol-zoomslider-control />


    <ol-webgl-points-layer :styles="webglPointsStyle">
      <ol-source-webglpoints
        :format="geoJson"
        url="https://raw.githubusercontent.com/timfajr/axczweqe/main/src/assets/jabar_P.json"
      />
    </ol-webgl-points-layer>

    <ol-vector-layer>
      <ol-source-cluster :distance="40">
        <ol-source-vector>
          <ol-feature v-for="index in jsonfile.features" :key="index">
            <ol-geom-point
              :coordinates="[
                index.properties.longtitude,
                index.properties.latitude
              ]"
            ></ol-geom-point>
          </ol-feature>
        </ol-source-vector>
      </ol-source-cluster>

      <ol-style :overrideStyleFunction="overrideStyleFunction">
        <ol-style-stroke color="red" :width="2"></ol-style-stroke>
        <ol-style-fill color="rgba(255,255,255,0.1)"></ol-style-fill>

        <ol-style-circle :radius="10">
          <ol-style-fill color="#3399CC"></ol-style-fill>
          <ol-style-stroke color="#fff" :width="1"></ol-style-stroke>
        </ol-style-circle>
        <ol-style-text>
          <ol-style-fill color="#fff"></ol-style-fill>
        </ol-style-text>
      </ol-style>
    </ol-vector-layer>

    <ol-vector-layer
      title="Jabar"
    >
      <ol-source-vector
        ref="kabupaten"
        url="https://raw.githubusercontent.com/timfajr/axczweqe/main/src/assets/jabar_shape.json"
        :format="geoJson"
        :projection="projection"
      >
      </ol-source-vector>

      
      <ol-style :overrideStyleFunction="overrideStyleFunctionShape"> 
        <ol-style-stroke color="white" :width="1"></ol-style-stroke>
        <ol-style-fill color="rgba(255,255,255,0.1)" ></ol-style-fill>
        <ol-style-text font="15px sans-serif">
          <ol-style-fill color="white" ></ol-style-fill>
        </ol-style-text>
      </ol-style>


    </ol-vector-layer>

  </ol-map>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import jsonfile from "../assets/jabar_P.json";

// Data Binding
const mapRef = ref(null);
const sourceRef = ref(null);

const shape = ref ("https://raw.githubusercontent.com/timfajr/axczweqe/main/src/assets/jabar_S.json");
const shape2 = ref("https://openlayers.org/data/vector/ecoregions.json");
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
  "circle-radius": 6,
  "circle-fill-color": "yellow",
  "circle-stroke-width": 2,
  "circle-stroke-color": "darkblue",
  "circle-opacity": [
    "interpolate",
    ["linear"],
    ["get", "population"],
    40000,
    1,
    2000000,
    1,
  ],
};

const parse_json = ref([]);
console.log(jsonfile.features[0].properties.latitude)

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

const overrideStyleFunctionShape = (feature, style) => {
  const blue = "rgba(255,0,0,0.1)"
  const red = "rgba(0,0,255,0.1)"
  const green = "rgba(0,255,0,0.1)"
  const shapedata = feature.get("SuaraTerba");
  const wilayah = feature.get("WADMKK");
  const color = shapedata == "Jokowi" ? blue : shapedata == "Prabowo" ? red : green
  style.getFill().setColor(color);
  style.getText().setText(shapedata + "\n" + wilayah)
};

const overrideStyleFunction = (feature, style, resolution) => {
  console.log({ feature, style, resolution });
  const clusteredFeatures = feature.get("features");
  const size = clusteredFeatures.length;
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
