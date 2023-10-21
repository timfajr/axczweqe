<template>
    <div class="h-screen flex flex-col">
    <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: 100vh" ref="mapRef" renderer="webgl">

    <ol-fullscreen-control />
    <ol-scaleline-control />
    <ol-rotate-control />
    <ol-zoom-control />
    <ol-zoomslider-control />

    <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection"/>
  
    <ol-tile-layer title="Base">
      <ol-source-osm />
    </ol-tile-layer>

    <ol-webgl-points-layer :styles="webglPointsStyle" title="Point">
        <ol-source-webglpoints
          :format="geoJson"
          url="https://raw.githubusercontent.com/timfajr/axczweqe/main/src/assets/jabar_P.json"
        />
    </ol-webgl-points-layer>

    <ol-vector-layer title="Jabar">
        <ol-source-vector ref="kabupaten" url="https://raw.githubusercontent.com/timfajr/axczweqe/main/src/assets/jabar_shape.json" :format="geoJson" :projection="projection" />
        <ol-style :overrideStyleFunction="overrideStyleFunctionShape" :zIndex="1"> 
          <ol-style-stroke color="white" :width="1"></ol-style-stroke>
          <ol-style-fill color="rgba(255,255,255,0.1)" ></ol-style-fill>
          <ol-style-text font="15px sans-serif">
            <ol-style-fill color="white" ></ol-style-fill>
          </ol-style-text>
        </ol-style>
    </ol-vector-layer>

    <ol-interaction-select
      @select="shapeSelected"
      :filter="selectInteactionFilter"
    >
      <ol-style :overrideStyleFunction="overrideStyleFunctionShapeSelected">
        <ol-style-stroke color="white" :width="1"></ol-style-stroke>
          <ol-style-fill color="rgba(255,255,255,0.1)" ></ol-style-fill>
          <ol-style-text font="15px sans-serif">
            <ol-style-fill color="white" ></ol-style-fill>
          </ol-style-text>
        </ol-style>
    </ol-interaction-select>
    

    <ol-interaction-clusterselect @select="featureSelected" :pointRadius="8" :filter="featuresInteactionFilter">
      <ol-style>
        <ol-style-stroke color="green" :width="5"></ol-style-stroke>
        <ol-style-fill color="rgba(255,255,255,0.5)"></ol-style-fill>
        <ol-style-icon :src="markerIcon" :scale="0.05"></ol-style-icon>
      </ol-style>
    </ol-interaction-clusterselect>

    <ol-animated-clusterlayer :animationDuration="500" :distance="40" title="Cluster">
      <ol-source-vector :features="featurez" @featuresloadstart="featuresloadstart" @featuresloadend="featuresloadend" @featuresloaderror="featuresloaderror"/>
      <ol-style :overrideStyleFunction="overrideStyleFunctionPoint">
        <ol-style-stroke color="red" :width="2"></ol-style-stroke>
        <ol-style-fill color="rgba(255,255,255,0.1)"></ol-style-fill>

        <ol-style-circle :radius="20">
          <ol-style-stroke
            color="black"
            :width="15"
            :lineDash="[]"
            lineCap="butt"
          >
          </ol-style-stroke>
          <ol-style-fill color="black"></ol-style-fill>
        </ol-style-circle>
        <ol-style-text>
          <ol-style-fill color="white"></ol-style-fill>
        </ol-style-text>
      </ol-style>

    </ol-animated-clusterlayer>
    </ol-map>
  </div>
  </template>
  
  <script setup>
  import { ref, onMounted, inject , nextTick, computed  } from 'vue';
  import jsonfile from "../assets/jabar_P.json";
  import jsonfileS from "../assets/jabar_S.json";
  import store from '/src/store/index.js'
  import markerIcon from "../images/logo.png"

// Cluster Logic 
 import { Point } from "ol/geom"
 import Feature from "ol/Feature"
 
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
  if ( event.selected[0] && event.selected[0].values_.features[0].values_.data.name ){
  selectedpoint = {"name" : event.selected[0].values_.features[0].values_.data.name , "canvaser" : event.selected[0].values_.features[0].values_.data.canvaser, "catatan" :  event.selected[0].values_.features[0].values_.data.catatan, "memilih" : event.selected[0].values_.features[0].values_.data.memilih, "tokoh" : event.selected[0].values_.features[0].values_.data.tokoh , "mesjid": event.selected[0].values_.features[0].values_.data.mesjid};
  store.dispatch('cart/addPoint', jsonfile.features )
  store.commit('cart/initialiseStore')
  }
  else {
    selectedpoint = {}
  }
};

  const jsonfeature = jsonfile.features.length
  let featurez = computed(() => {
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

 // Cluster Logic 
  // Data Base
  let Ragu =  0
  let Jokowi = 0
  let Prabowo = 0
  let TotalSuara = 1
  let Y_hoax = 0
  let T_hoax = 0
  let pro = 0
  let t_pro = 0
  let Radikal = 0
  let status = "ready"
  let selected_city = ""

  // Data Binding
  const mapRef = ref(null);
  const sourceRef = ref(null);
  
  const shape = ref ("https://raw.githubusercontent.com/timfajr/axczweqe/main/src/assets/jabar_S.json");
  const shape2 = ref("https://openlayers.org/data/vector/ecoregions.json");

  const center = ref([107.6191, -6.9175]);
  const projection = ref('EPSG:4326');
  const zoom = ref(10);
  const rotation = ref(0);
  
  const format = inject('ol-format');
  const geoJson = new format.GeoJSON();

  const pointurl = computed(() => {
  return `http://localhost:3000/${count.value}`;
  });
  
  const webglPointsStyle = {
    "zIndex" : 15,
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

  const overrideStyleFunctionShapeSelected = (feature, style) => {
    const blue = "rgba(255,0,0,1)"
    const red = "rgba(0,0,255,1)"
    const green = "rgba(0,255,0,1)"
    const shapedata = feature.get("SuaraTerba");
    const wilayah = feature.get("WADMKK");
    const color = shapedata == "Jokowi" ? blue : shapedata == "Prabowo" ? red : green
    style.getFill().setColor(color);
    style.getText().setText(shapedata + "\n" + wilayah)
  };


const shapeSelected = (event) => {
  let Shapedata = { "kota" : event.selected[0].values_.WADMKK , "mayoritas" : event.selected[0].values_.Suara_Terba, "total_suara" : event.selected[0].values_.SUM_Masa , "total_suara_manual" : "0", "jokowi" : event.selected[0].values_.SUM_Jokowi , "prabowo" : event.selected[0].values_.SUM_Prabow , "hoax_y" : event.selected[0].values_.SUM_Y_Hoax , "hoax_t" : event.selected[0].values_.SUM_T_Hoax  ,  "hoax_r" : event.selected[0].values_.SUM_R_Hoax }
  store.dispatch('cart/addShape', Shapedata )
  store.commit('cart/initialiseStore')
};

const selectInteactionFilter = (feature) => {
  if ( feature.values_.WADMKK != undefined)
  {
    selected_city = feature.values_.WADMKK
    return feature.values_.WADMKK != undefined;
  }
};

const featuresInteactionFilter = (feature) => {
  if ( feature )
  {
    if ( feature.values_.features )
    {
    return feature.values_.features[0].values_.data.name!= undefined;
    }
  }
};

async function increment() {
    // Counting Total Base Data
    jsonfile.features.forEach( num => {
        Ragu =  Ragu +  ( num.properties.Ragu * num.properties.Masa );
        Jokowi = Jokowi + ( num.properties.Jokowi * num.properties.Masa) ;
        Prabowo = Prabowo + (num.properties.Prabowo * num.properties.Masa );
        TotalSuara = TotalSuara + num.properties.Masa;
        Y_hoax = Y_hoax + ( num.properties.Y_Hoax * num.properties.Masa );
        T_hoax = T_hoax + ( num.properties.T_Hoax * num.properties.Masa );
        pro = pro + ( num.properties.Y_Pro * num.properties.Masa );
        t_pro = t_pro + ( num.properties.T_Pro * num.properties.Masa );
        Radikal = Radikal + ( num.properties.Rdata * num.properties.Masa );
    })
    await nextTick()
    // Commit Data Update
    store.dispatch('cart/addStatistik', 
    { "Ragu" : Ragu ,
      "Jokowi" : Jokowi,
      "Prabowo" : Prabowo,
      "TotalSuara" : TotalSuara,
      "Y_hoax" : Y_hoax,
      "T_hoax" : T_hoax,
      "pro" : pro,
      "t_pro" : t_pro,
      "Radikal" : Radikal
    })
    store.dispatch('cart/addPersonal' , jsonfile.features)
    store.commit('cart/initialiseStore')
    }
  onMounted(() => {
    const map = mapRef.value ? mapRef.value.map : null;
    const source = sourceRef.value ? sourceRef.value.source : null;
    increment()
    if ( map ) {
      map.on('postcompose', function (e) {
        // console.log(document.getElementsByTagName('canvas'))
        document.querySelector('canvas').style.filter =
          'brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.5) brightness(0.7)';
      });
    }
  });
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