<template>
  <div class="w-screen h-screen flex flex-col flex flex-row justify items-center overflow-hidden">
    <navbar />
    <div class="justify h-screen w-screen justify-center text-lg font-semibold text-white">
    <sidebar />
    </div>
    </div>
</template>

<script lang="js">
import navbar from "/src/components/navbar.vue"
import sidebar from "/src/components/sidebar.vue"

export default {
        name: 'App',
        data() {
          return {
          }
        },
        components : {
          navbar,
          sidebar
  },
}
</script>
