<template>
   <div class="header">
      <slot></slot>
      <i class="iconfont icon-icon-test" v-if="back" @click="goBack"></i>
   </div>
</template>
<script>
   export default {
       props: {
           back: {
               type: Boolean,
               default: false
           }
       },
       methods: {
           goBack() {
               this.$router.go(-1);
           }
       }
   }
</script>
<style scoped lang="less">
    .header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        text-align: center;
        height: 40px;
        line-height: 40px;
        font-weight: 700;
        background: #afd9ee;
        i {
        position: absolute;
        left: 10px;
        font-size: 20px;
        }
    }

</style>
