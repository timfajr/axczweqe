<template>
    <div>
      <span>{{myJson}}</span>
    </div>
  </template>
  
  <script>
  import my_json from '../assets/jabar_S.json'
  console.log('My data', my_json)
  export default{
            data(){
                return{
                    myJson: my_json
                }
            }
        }
  </script>