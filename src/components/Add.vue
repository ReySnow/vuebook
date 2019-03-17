<template>
   <div class="add">
      <MHeader :back="true">添加</MHeader>
      <ul>
              <li>
                <label for="bookName">
                  书名
                </label>
                <input type="text" id="bookName" v-model="book.bookName"/>
              </li>
              <li>
                <label for="bookDesc">
                   内容简介
                </label>
                <input type="text" id="bookDesc" v-model="book.bookDesc"/> 
              </li>
              <li>
                 <label for="bookPrice">
                    价格
                </label>
                <input type="text" id="bookPrice" v-model="book.bookPrice"/> 
              </li> 
              <li>
                <label for="bookDesc">
                   封面
                </label>
                <input type="text" id="bookCover" v-model="book.bookCover"/> 
              </li>
              <li>
                  <button @click="saveBook">保存</button>
              </li>
           </ul>    
   </div>
</template>
<script>
   import MHeader from "../base/MHeader.vue"
   import {addBook} from "../api"
   export default {
       data() {
           return {
               book: {}
           }
       },
       methods: {
           async saveBook() {
               let data = await addBook(this.book);
               // 跳转到列表
               this.$router.push("/list");
           }
       },
       components: {
           MHeader
       }
   }
</script>
<style scoped>
   .add ul {
        position: absolute;
        top: 50px;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
        z-index: 999;
        margin: 0 20px 0;
    }

    .add label {
        font-size: 25px;
        display: block;
    }

    .add input {
        height: 25px;
        width: 100%;
        font-size: 20px;
    }

    .add button {
        margin-top: 10px;
        outline: none;
        border: none;
        width: 80px;
        height: 30px;
        border-radius: 8px;
        background: #afd9ee;
        font-size: 18px;
    }
</style>
