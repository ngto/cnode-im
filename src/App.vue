<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
         <router-view></router-view>
    </transition>
    <!--<div class="login">-->
    <!--</div>-->
  </div>
</template>

<script>

export default {
  name: 'app',

}
</script>

<style lang="scss">
  //公共样式
  @import './style/common';
  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .1s;
  }
  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
</style>
