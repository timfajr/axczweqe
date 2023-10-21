<template>
  <ol-map
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    style="height: 400px"
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

    <ol-interaction-select
      @select="featureSelected"
    >
      <ol-style>
        <ol-style-stroke color="white" :width="10"></ol-style-stroke>
        <ol-style-fill color="white"></ol-style-fill>
      </ol-style>
    </ol-interaction-select>

    <ol-vector-layer>
      <ol-source-vector
        ref="cities"
        url="https://raw.githubusercontent.com/timfajr/axczweqe/main/src/assets/jabar_shape.json"
        :format="geoJson"
        :projection="projection"
      >
      </ol-source-vector>

      <ol-style> 
          <ol-style-stroke color="red" :width="1"></ol-style-stroke>
          <ol-style-fill color="rgba(255,255,255,0.5)"></ol-style-fill>
          <ol-style-text font="15px sans-serif">
            <ol-style-fill color="red" ></ol-style-fill>
          </ol-style-text>
        </ol-style>
    </ol-vector-layer>

  </ol-map>
</template>

<script setup>
import markerIcon from "../images/logo.png"
import { ref, inject } from "vue";

const center = ref([40, 40]);
const projection = ref("EPSG:4326");
const zoom = ref(8);
const rotation = ref(0);

const format = inject("ol-format");

const geoJson = new format.GeoJSON();

const selectConditions = inject("ol-selectconditions");
const selectCondition = selectConditions.pointerMove;

const featureSelected = (event) => {
  console.log(event);
};

const selectInteactionFilter = (feature) => {
  return feature.values_.name != undefined;
};
</script>