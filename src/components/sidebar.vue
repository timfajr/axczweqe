<template>
<div class="justify h-screen w-screen justify-center text-lg font-semibold text-white">
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
            Reviewed
            </p>
            </div>

            <div class="flex flex-row bg-white bg-opacity-10 rounded-xl h-8 px-2">    
            <div class="flex flex-row">
                <font-awesome-icon icon="fa-solid fa-check" class="text-textwhite w-4 h-4 rounded mr-2 justify-center self-center align-center item-center " />
            </div>
            <p class="text-base text-mainyellow justify-center self-center align-center item-center ">
            100.238.000
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
            126
            </p>    
            </div>
            
        </div>
        <!-- Number Wrapper  -->
        </div>
    </div>
</div>
    <!-- Wrapper Statistik  -->
    <apexchart
      width="300"
      type="donut"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    </div>
 
    <Maps class="h-screen w-screen justify-items-center " />
    <div class="h-screen w-3/12 justify-items-end bg-mainblack">
        <div class="flex justify-center pt-10">
      <p>
    Selected Region
      </p>
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
    data() {
      return {
        Wilayah:"",
        Jokowi:"",
        Prabowo:"",
        Imbang:"",
        chartOptions: {
        labels: ['Jokowi', 'Prabowo', 'Ragu'],
        legend: {
          show: false
        },
        stroke: {
          width: 0,
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 90,
            offsetY: 10,
          },
        }
        },
        series: [44, 55, 13, 33],
      }
    },
    components : {
    Maps
    },
    // Update Crud
    mounted(){
    },
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