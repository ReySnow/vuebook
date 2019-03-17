<template>
   <div>
      <MHeader>列表</MHeader>
      <div class="mainContent">
          <ul>
              <router-link v-for="book in books" :to="{name:'detail',params:{bid:book.bookId}}" :key="book.bookId" tag="li">
                  <img :src="book.bookCover"/>
                  <div>
                      <h4>{{book.bookName}}</h4>
                      <p>{{book.bookDesc}}</p>
                      <b>{{book.bookPrice}}</b>
                      <div><button @click.stop="remove(book.bookId)">删除</button></div>    
                  </div>
              </router-link>
          </ul>
          <div class="more" @click="getMore">加载更多</div>
      </div>   
   </div>
</template>
<script>
   import MHeader from "../base/MHeader.vue"
   import  {pagination,removeBook}  from "../api/index.js"
   export default {
       data() {
           return {books:[],index:0,hasMore:true}
       },
       created() {
           this.getBooks();
       }, 
       methods: {
           getMore() {
               this.getBooks(this.index);
           },
           async getBooks() { // 0~4 5~9 10~15
                let {hasMore,books} = await pagination(this.index);
                this.books = [...this.books,...books];  
                this.hasMore = hasMore;  
                this.index = this.books.length;        
           },
           async remove(id) {
                await removeBook(id); // 删除某本书
                // 删除前台数据
                this.books = this.books.filter(item=>item.bookId !== id);
           }
       },
       components: {
           MHeader  
       }
   }
</script>
<style scoped>
    .mainContent ul {
        display: flex;
        flex-wrap: wrap;
    }

    .mainContent ul li {
        display: flex;
        
    }

    .mainContent ul h4{
        line-height: 30px;
        height: 30px;
    }

    .mainContent ul b {
        font-size: 20px;
        color: orange;
    }

    .mainContent ul li div {
        padding: 10px 0;
    }

    .mainContent ul li p {
        margin: 10px 0;
    }

    .mainContent button {
        outline: none;
        border: none;
        width: 80px;
        height: 30px;
        border-radius: 8px;
        background: #afd9ee;
        font-size: 18px;

    }

    .mainContent .more {
        margin: 0 10px;
        height: 30px;
        line-height: 30px;
        background: #afd9ee;
        font-size: 20px;
        text-align: center;
    }
</style>
