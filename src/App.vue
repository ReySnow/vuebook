<template>
  <div id="app">
    <transition name="fadeIn">
      <keep-alive>
        <router-view v-if="$route.meta.KeepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition>
     <router-view v-if="!$route.meta.KeepAlive"></router-view>
    </transition> 
     <Tab></Tab> 
  </div>
</template>
<script>
import Tab from "./base/Tab.vue";
export default {
  name: 'App',
  components: {
    Tab
  }
}
</script>

<style>
    * {
      padding: 0;
      margin: 0
    }
    a {
      text-decoration: none;
    }

    ul,li {
      list-style: none;
    }

    input,button {
       -webkit-appearance:none;
    }

    .mainContent {
        position: fixed;
        width: 100%;
        top: 40px;
        bottom: 50px;
        overflow: auto;
    }

   
    .fadeIn-enter {
        opacity: 0;
    }

    .fadeIn-enter-active {
        transition: all 1s linear;
    }

    .fadeIn-leaver-active {
        transition: all 1s linear;
        opacity: 0
    }
</style>
