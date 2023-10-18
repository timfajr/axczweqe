import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from '/src/store/index.js'
import router from './router/index'
import VueCookies from "vue3-cookies";
import { useCookies } from "vue3-cookies";


// Map
import OpenLayersMap from "vue3-openlayers";
import "vue3-openlayers/styles.css";

// Font
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Data Table 
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

// Slider
import VueSplide from '@splidejs/vue-splide';

const { cookies } = useCookies();

const app = createApp(App)

library.add(fas, fab);
app.component("font-awesome-icon", FontAwesomeIcon);

app.component("EasyDataTable", Vue3EasyDataTable);
app.use(VueCookies);
app.config.devtools = false

app.use(OpenLayersMap /* options */);
app.use(VueSplide)
app.use(store)
app.use(router)
app.mount('#app')