<template>
   <div>
      <MHeader :back="true">列表</MHeader>
      <div class="carrousel">
          <Swiper :sliders="sliders"></Swiper>      
      </div>   
   </div>  
</template>
<script>
   import MHeader from "../base/MHeader.vue";
   import Swiper from "../base/Swiper.vue";
   import {getSliders}  from "../api/index.js"
   export default {
       async created() {
          alert(1); 
          let {data:sliders} = await getSliders();
          this.sliders = sliders;
       },
       data() {
           return {
               sliders:[]
           }
       },
       components: {
           MHeader,
           Swiper
       }
   }
</script>
<style>
</style>
