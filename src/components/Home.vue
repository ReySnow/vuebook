<template>
   <div>
      <MHeader>首页</MHeader>
      <div class="mainContent">
          <Loading v-if="loading"></Loading>
          <template v-else>
            <Swiper :sliders="sliders"></Swiper>
            <h3>热门图书</h3>
            <ul>
              <li v-for="book in hotBooks">
                  <img  :src="book.bookCover"/>
                  <b>{{book.bookName}}</b>
              </li>
            </ul>
          </template>
      </div>   
   </div>    
</template>
<script>
   import MHeader from "../base/MHeader.vue";
   import Swiper from "../base/Swiper.vue";
   import {getAll}  from "../api/index.js"
   import Loading from "../base/Loading.vue" 
   export default {
       created() {
            this.getData();       
       },
       data() {
           return {
               sliders:[],
               hotBooks:[],
               loading: true
           }
       },
       components: {
           MHeader,
           Swiper,
           Loading
       },
       methods: {
          async getData() {
              let [sliders,hotBooks] = await getAll();
              this.sliders = sliders;
              this.hotBooks = hotBooks;
              // 轮播图和热门图书数据全部获取完毕
              this.loading = false;
          }
       }
   }
</script>
<style scoped lang="less">
    li {
        width: 50%;
        float: left;
        text-align: center;
        margin: 5px 0;
    }
</style>
