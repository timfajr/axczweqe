<template>
    <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      renderer="webgl"
      style="height: 100vh"
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
  
      <ol-interaction-clusterselect @select="featureSelected" :pointRadius="20">
        <ol-style>
          <ol-style-stroke color="green" :width="5"></ol-style-stroke>
          <ol-style-fill color="rgba(255,255,255,0.5)"></ol-style-fill>
          <ol-style-icon :src="markerIcon" :scale="0.05"></ol-style-icon>
        </ol-style>
      </ol-interaction-clusterselect>
  
      <ol-animated-clusterlayer :animationDuration="500" :distance="40">
        <ol-source-vector
          ref="vectorsource"
          :features="features"
          @featuresloadstart="featuresloadstart"
          @featuresloadend="featuresloadend"
          @featuresloaderror="featuresloaderror"
        />
  
        <ol-style :overrideStyleFunction="overrideStyleFunctionPoint">
          <ol-style-stroke color="red" :width="2"></ol-style-stroke>
          <ol-style-fill color="rgba(255,255,255,0.1)"></ol-style-fill>
  
          <ol-style-circle :radius="20">
            <ol-style-stroke
              color="black"
              :width="15"
              :lineDash="[]"
              lineCap="butt"
            ></ol-style-stroke>
            <ol-style-fill color="black"></ol-style-fill>
          </ol-style-circle>
  
          <ol-style-text>
            <ol-style-fill color="white"></ol-style-fill>
          </ol-style-text>
        </ol-style>
      </ol-animated-clusterlayer>
    </ol-map>
  </template>
  
  <script setup>
  import { computed, ref , onMounted } from "vue"
  import { Point } from "ol/geom"
  import Feature from "ol/Feature"
  import markerIcon from "../images/logo.png"
  import jsonfile from "../assets/jabar_P.json"
  import store from '/src/store/index.js'
  
  const jsonfeature = jsonfile.features.length
  
  const center = ref([107.6191, -6.9175]);
  const projection = ref('EPSG:4326');
  const zoom = ref(10);
  const rotation = ref(0);
  let selectedpoint = [];
  
  let features = computed(() => {
    return Array.from({ length: jsonfeature }, (_, i) => {
      const map = new Feature({
        geometry: new Point([
        jsonfile.features[i].properties.longtitude,
        jsonfile.features[i].properties.latitude
        ]),
        index: i,
      });
      map.setProperties({'data' : {"name" : jsonfile.features[i].properties.nama_warga , "canvaser" : jsonfile.features[i].properties.nama_canva , "catatan" : jsonfile.features[i].properties.catatan , "memilih" : jsonfile.features[i].properties.SuaraTerba , "mesjid" : jsonfile.features[i].properties.mesjid , "tokoh": jsonfile.features[i].properties.Tokoh}})
      map.setId(i);
      return map
    });
  });
  
  console.log(jsonfile.features[0])
  
  const overrideStyleFunctionPoint = (feature, style) => {
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
  
  const featureSelected = (event) => {
    console.log(event)
    if ( event.selected[0] && event.selected[0].values_.features[0].values_.data.name ){
    selectedpoint = {"name" : event.selected[0].values_.features[0].values_.data.name , "canvaser" : event.selected[0].values_.features[0].values_.data.canvaser, "catatan" :  event.selected[0].values_.features[0].values_.data.catatan, "memilih" : event.selected[0].values_.features[0].values_.data.memilih, "tokoh" : event.selected[0].values_.features[0].values_.data.tokoh , "mesjid": event.selected[0].values_.features[0].values_.data.mesjid};
    store.dispatch('cart/addPoint', selectedpoint )
    store.commit('cart/initialiseStore')
    console.log(selectedpoint);
    }
    else {
      selectedpoint = []
    }
  };
  
  // Function
  
  function featuresloadstart() {
    console.log("features load start");
  }
  function featuresloaderror() {
    console.log("features load error");
  }
  function featuresloadend() {
    console.log("features load end");
  }
  
  // Vue Function
  
  onMounted(() => {
    store.commit('cart/initialiseStore')
  })
  
  </script>
  
  <style scoped>
  input {
    margin: 0.5rem;
    padding: 0.25rem 0.5rem;
    font-size: 1rem;
    border: 1px solid black;
    width: 100px;
  }
  </style>