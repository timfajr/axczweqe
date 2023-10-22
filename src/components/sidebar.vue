<template>
<div class="justify h-screen w-screen justify-center text-lg font-semibold text-white">
        <!-- View Item-->
        <div v-if="viewhidden == false" class="fixed z-20 w-screen h-full min-h-screen bg-black bg-opacity-50">
        <div class="flex h-screen flex-row place-items-center justify-center ">
          <div class="w-4/12 bg-mainblue rounded-xl flex flex-col place-items-center">
            <div class="flex self-end p-4">
            <button class="bg-mainyellow w-8 h-8 rounded flex place-items-center justify-center font-semibold text-mainblue" @click="viewhidden = !viewhidden">
              X
            </button>
          </div>
          <div class="flex self-center w-full h-full p-4 flex-col text-white -mt-4">
            <div class="bg-white rounded flex pl-4 py-2 justify-center place-items-center bg-opacity-10">
              Data : {{ this.$store.state.cart.selected_features.name }} , Status : {{ this.$store.state.cart.selected_features.memilih }}
            </div>
            <div class="bg-white rounded flex flex-col px-4 py-4 mt-4 bg-opacity-10 ">

              <p class="pl-2"> Nama Warga </p>
              <p class="bg-white bg-opacity-10 rounded-xl p-2 truncate">
                {{ this.$store.state.cart.selected_features.name }}
              </p>

              <p class="pl-2"> Nama Canvaser </p>
              <p class="bg-white bg-opacity-10 rounded-xl p-2 truncate">
                {{ this.$store.state.cart.selected_features.canvaser }}
              </p>

              <p class="pl-2"> Catatan </p>
              <p class="bg-white bg-opacity-10 rounded-xl p-2 truncate">
                {{ this.$store.state.cart.selected_features.catatan }}
              </p>
              
              <p class="pl-2"> Memilih </p>
              <p class="bg-white bg-opacity-10 rounded-xl p-2 truncate">
                {{ this.$store.state.cart.selected_features.memilih }}
              </p>

              <p class="pl-2"> Asal Mesjid </p>
              <p class="bg-white bg-opacity-10 rounded-xl p-2 truncate">
                {{ this.$store.state.cart.selected_features.mesjid  }}
              </p>

              <p class="pl-2"> Tokoh Mesjid </p>
              <p class="bg-white bg-opacity-10 rounded-xl p-2 truncate">
                {{ this.$store.state.cart.selected_features.tokoh  }}
              </p>

            </div>
          </div>
        </div>
      </div>
      </div>
      <!-- View Item-->
  <div class="bg-green flex flex-row justify-between rounded-2xl font-normal">
    <!-- Begin  -->
    <div class="h-screen w-3/12 justify-items-start bg-mainblack">
    <div class="flex justify-center pt-10">
      <p>
       Data Statisik Total
      </p>
    </div>
    <!-- Wrapper Statistik  -->
    <div class="flex justify-center rounded-xl pt-5"> 
    <div class="flex justify-center bg-white bg-opacity-5 rounded-2xl p-2">
        <div class="flex flex-col space-y-2 justify-center ">
        <!-- Number Wrapper  -->
        <div class = "flex flex-row space-x-1 rounded-2xl">
            <div class=" text-centre rounded-xl flex bg-white bg-opacity-10 h-8 px-2">
            <p class="text-sm justify-center self-center align-center item-center ">
            Total Data Titik
            </p>
            </div>

            <div class="flex flex-row bg-white bg-opacity-10 rounded-xl h-8 px-2">    
            <div class="flex flex-row">
                <font-awesome-icon icon="fa-solid fa-check" class="text-textwhite w-4 h-4 rounded mr-2 justify-center self-center align-center item-center " />
            </div>
            <p class="text-base text-mainyellow justify-center self-center align-center item-center ">
            {{ this.$store.state.cart.statistik["TotalSuara"] }}
            </p>    
            </div>
            
        </div>
        <!-- Number Wrapper  -->
        <!-- Number Wrapper  -->
        <div class = "flex flex-row space-x-1 rounded-2xl">
            <div class=" text-centre rounded-xl flex bg-white bg-opacity-10 h-8 px-2 mr-2">
            <p class="text-sm justify-center self-center align-center item-center ">
            Pending
            </p>
            </div>

            <div class="flex flex-row bg-white bg-opacity-10 rounded-xl h-8 px-2">    
            <div class="flex flex-row">
                <font-awesome-icon icon="fa-solid fa-inbox" class="text-textwhite w-4 h-4 rounded mr-2 justify-center self-center align-center item-center " />
            </div>
            <p class="text-base text-mainyellow justify-center self-center align-center item-center ">
              {{ this.$store.state.cart.statistik["Radikal"] }}
            </p>    
            </div>
            
        </div>
        <!-- Number Wrapper  -->
        </div>
    </div>
</div>
    <!-- Wrapper Statistik  -->
    <div class="flex justify-center pt-10">
      <p>
       Data Suara Personal
      </p>
    </div>
    <!-- CHART  -->
    <div class="mt-5">
      <apexchart ref="donut" width="350" type="donut" :options="chartOptions" :series="series" />
    </div>
    <!-- CHART  -->
    <div class="flex justify-center pt-10">
      <p>
       Data Hoax
      </p>
    </div>

    <apexchart ref="donut2" width="350" type="donut" :options="chartOptions2" :series="series2" />
    </div>
 <!-- Right Side Start  -->

    <Maps class="h-screen w-screen justify-items-center " @onChange="childCallBack" />
    <div class="h-screen w-3/12 justify-items-end bg-mainblack">
    <div class="flex justify-center pt-10">
      <p>
    Selected Region
      </p>
    </div>
    <div class="flex justify-center mt-10">
      <p>
       Wilayah {{ this.$store.state.cart.selected_shape.kota }}
      </p>
    </div>

    <div class="mt-5">
      <apexchart ref="donut3" width="350" type="donut" :options="chartOptions" :series="series3" />
    </div>

    <div class="flex justify-center mt-10">
      <p>
       Data Hoax
      </p>
    </div>

    <div class="mt-5">
      <apexchart ref="donut3" width="350" type="donut" :options="chartOptions2" :series="series4" />
    </div>
    
    <div class="flex justify-center align-center self-end p-8 mt-6">
      <button class="flex bg-mainyellow text-mainblack p-2 rounded-xl mt-4 font-semibold" @click="popup()"> Buka Data Warga </button>
    </div>
    </div>
    <!-- End  -->
  </div>

</div>
</template>
<script>
import Maps from "/src/components/map.vue"

export default {
    name: 'App',
    data: function() {
      return {
        Wilayah:"",
        Jokowi:"",
        Prabowo:"",
        Imbang:"",
        viewhidden: true,
        status : "loading",
        chartOptions: {
          plotOptions: {
            pie: {
              expandOnClick: false
            }
          },
          colors: ['#FF595E', '#1982C4', '#A5B557'],
          labels: ["Jokowi", "Prabowo", "Ragu"],
          tooltip: {
            enabled: true,
            onDatasetHover: {
          highlightDataSeries: true,
      },
          },
          stroke: {
              show: true,
              curve: 'smooth',
              lineCap: 'butt',
              colors: "#202020",
              width: 6,
              dashArray: 0, 
          },
          legend: {
          position: 'bottom',
          labels: {
          colors: "white",
          useSeriesColors: true
          },
          },
        },
        chartOptions2: {
          plotOptions: {
            pie: {
              expandOnClick: false
            }
          },
          colors: ['#FF595E', '#1982C4',],
          labels: [" Percaya Hoax ", "Tidak Percaya Hoax"],
          tooltip: {
            enabled: true,
            onDatasetHover: {
          highlightDataSeries: true,
      },
          },
          stroke: {
              show: true,
              curve: 'smooth',
              lineCap: 'butt',
              colors: "#202020",
              width: 6,
              dashArray: 0, 
          },
          legend: {
          position: 'bottom',
          labels: {
          colors: "white",
          useSeriesColors: true
          },
          },
        },
        series: [0,0,0],
        series2: [0,0],
        series3: [0,0,0],
        series4: [0,0],
        }
    },
    components : {
    Maps
    },

    // Update Crud
    mounted(){
      this.updateChart()
    },
    methods:{
     updateChart() {
        this.series = [ this.$store.state.cart.statistik["Jokowi"] ,this.$store.state.cart.statistik["Prabowo"] ,this.$store.state.cart.statistik["Ragu"] ]
        this.series2 = [ this.$store.state.cart.statistik["Y_hoax"] ,this.$store.state.cart.statistik["T_hoax"] ]
        this.series3 = [ this.$store.state.cart.selected_shape["jokowi"] , this.$store.state.cart.selected_shape["prabowo"] , this.$store.state.cart.selected_shape["ragu"] ]
        this.series4 = [ this.$store.state.cart.selected_shape["hoax_y"] , this.$store.state.cart.selected_shape["hoax_t"] ]
      },
      childCallBack(message) {
        console.log(message)
        if ( message == "region"){
        this.series3 = [ this.$store.state.cart.selected_shape["jokowi"] , this.$store.state.cart.selected_shape["prabowo"] , this.$store.state.cart.selected_shape["ragu"] ]
        this.series4 = [ this.$store.state.cart.selected_shape["hoax_y"] , this.$store.state.cart.selected_shape["hoax_t"] ]
        }
      },
      popup(){
        this.viewhidden = false
      }
    },
    computed: {
    statistik_wilayah () {
      return this.$store.getters['cart/loadstatistikwilayah']
    },
    selectedfeature () {
      return this.$store.getters['cart/loadselectedfeature']
    }
  }
}
</script>
<style>
@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>