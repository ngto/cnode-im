<template>
  <div>
    <header class="head">
      <div  class="head-left" @click="$router.back(-1)">
        <i v-if="leftShow === 'true'" class="iconfont icon-fanhui"></i>
      </div>
      <h1 class="head-text">{{titleText}}</h1>
      <div v-if="rightShow === 'true'" class="head-right">
        <img v-if="userInfo" :src="userInfo.avatar_url" alt="">
        <i v-else="" class="iconfont icon-shiliangzhinengduixiang"></i>
      </div>
    </header>
  </div>
</template>

<script>

import {mapState, mapActions} from 'vuex';
import { getList } from '../service/getData';

export default {
  name: '',
  data () {
    return {

    }
  },
  props:['leftShow','rightShow','titleText'],
  methods:{
  },
  mounted(){
    this.getUserInfo();
  },
  computed: {
    //获取states数据
    ...mapState([
      'userInfo'
    ]),
  },
  methods: {
    //调用action方法
    ...mapActions([
      'getUserInfo'
    ]),
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .head{
    height:2rem;
    text-align: center;
    font-size:.6rem;
    background: #ffffff;
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top:0;
    left:0;
    right:0;
    z-index:10;
    transition: all .5s ease;
    &-left,&-right{
      height:100%;
      line-height:2rem;
      flex:1;
      i{
        color: #ff4444;
      }
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &-right{
      img{
        width:1.5rem;
        height:1.5rem;
        border-radius: 100%;
        border:1px solid #f7f7f7;
      }
    }
    &-text{
       flex:6;
       height:100%;
       line-height:2rem;
       color: #ff4444;
       display: -webkit-box;
       -webkit-box-orient: vertical;
       -webkit-line-clamp: 1;
       overflow: hidden;
     }
    &:before{
       content: '';
       position: absolute;
       left:0;
       right:0;
       bottom:0;
       border-bottom:1px solid #e5e5e5;
     }
  }
</style>
