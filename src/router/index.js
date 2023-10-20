import { createRouter, createWebHistory } from "vue-router";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import VueJwtDecode from "vue-jwt-decode";

// Page
import Home from '/src/page/home.vue'
import Login from '/src/page/login.vue'
import Not_found from '/src/page/notfound.vue'
import Shape from '/src/page/shape.vue'
import Map2 from '/src/page/map2.vue'

// Admin

import icon from '../images/logo.png'

'     ______       __                        '
'    / ____/___   / /_ ____  _      __ ____  '
'   / / __ / _ \ / __// __ \| | /| / // __ \ '
'  / /_/ //  __// /_ / /_/ /| |/ |/ // / / / '
'  \____/ \___/ \__/ \____/ |__/|__//_/ /_/  '
'                                            '

const routes = [

    // User
    {
      path: '/login/',
      name: 'Login',
      component: async () => await Login,
      meta: {
        title: " GIS ",
        icon: icon
      },
    },

    {
      path: '/home/',
      name: 'Home',
      component: async () => await Home,
      meta: {
        title: " GIS ",
        icon: icon
      },
    },

    {
      path: '/map2/',
      name: 'Map2',
      component: async () => await Map2,
      meta: {
        title: " GIS ",
        icon: icon
      },
    },

    {
      path: '/shape/jabar_s.json',
      name: 'Shape',
      component: async () => await Shape,
      meta: {
        title: " GIS ",
        icon: icon
      },
    },
  
    // Expired Page Handler
    {
    path: '/login/',
    name: 'Login',
    component: async () => await Login,
    meta: {
      title: "GIS",
      icon: icon
    }
    },

    // Not Found Handler
    {
      path: '/:pathMatch(.*)*',
      name: 'Notfound',
      component: async () => await Not_found,
      meta: {
        title: "GIS",
        icon: icon
      }
      },
  ]
const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: "active"
  });

 export default router;