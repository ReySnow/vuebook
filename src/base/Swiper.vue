<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(slide, index) in sliders" :key="index"><img :src="slide" /></swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
  export default {
    name: 'carrousel',
    props:[
        "sliders"
    ],
    data() { 
      return {
        swiperOption: {
            autoplay: 3500,
            setWrapperSize :true,
            pagination : '.swiper-pagination',
            paginationClickable :true,
            mousewheelControl : true,
            observeParents:true,
            pagination: {
            el: '.swiper-pagination'
          }
        },
        swiperSlides: [1, 2, 3, 4, 5]
      }
    },
    mounted() {
      setInterval(() => {
        console.log('simulate async data')
        if (this.swiperSlides.length < 10) {
          this.swiperSlides.push(this.swiperSlides.length + 1)
        }
      }, 3000)
    }
  }
</script>
<style scoped>
    
</style>