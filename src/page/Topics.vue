<template>
  <div class="Topic">
    <HeadTop title-text="CNODE-IM" v-show="headerShow" left-show='false' right-show='true'></HeadTop>
    <van-tabs @click="changeTab" :style="{'top':headerShow ? '2rem': '0rem'}">
      <van-tab title="全部"></van-tab>
      <van-tab title="精华"></van-tab>
      <van-tab title="分享"></van-tab>
      <van-tab title="问答"></van-tab>
      <van-tab title="招聘"></van-tab>
      <!--<van-tab title="客户端测试"></van-tab>-->
    </van-tabs>
      <van-cell-group :style="{'padding-top':headerShow ? '4rem': '2rem'}">
        <van-cell v-for="(item,index) in topicsLisy" key="index" :url="'#/topicDetails/'+item.id" is-link>
          <template slot="title">
            <div>
              <van-tag type="danger" v-if="item.top">置顶</van-tag>
              <span class="van-cell-text">
                 {{item.title}}
                 </span>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
      <div class="load-more" @click="loadMore">点击加载更多</div>
    <div class="loading" v-if="loading">
      <cube-shadow></cube-shadow>
      <div class="mark"></div>
    </div>
  </div>
</template>

<script>
import { getList,getUser } from '../service/getData';
import {mapState, mapActions} from 'vuex'
import CubeShadow from 'vue-loading-spinner/src/components/RotateSquare2.vue';
import HeadTop from '@/components/head.vue'
export default {
  name: 'hello',
  data () {
    return {
      topicsLisy:[],
      pTab:'all',
      page:1,
      headerShow:true,
      loading:false,
      preventRepeat:false,
    }
  },
  methods:{
    ...mapActions([
      'getUserInfo'
    ]),
    async getTabListData(){
      this.loading = true;
      let res = await getList(this.pTab,this.page);
      res = res.data;
      this.topicsLisy = [...res];
      console.log(this.topicsLisy);
      this.loading = false;
    },
    async initData(){
      console.log(this.userInfo);
      this.getTabListData();
    },
    async loadMore(){
      if (this.preventRepeat) {
        return
      }
      this.loading = true;
      this.preventRepeat = true;
      this.page ++;
      let res = await getList(this.pTab,this.page);
      res= res.data;
      this.topicsLisy = [...this.topicsLisy, ...res];
      this.preventRepeat = false;
      this.loading = false;
    },
    changeTab(index){
      let listTabTitle = ['all','good','share','ask','job','dev'];
      this.pTab = listTabTitle[index];
      this.getTabListData();
      this.page = 1;
    }
  },
  mounted(){
      this.getUserInfo();
      this.initData();
      let that = this;
      window.onscroll = function(){
        var t = document.documentElement.scrollTop || document.body.scrollTop;  //获取距离页面顶部的距离
        that.headerShow = t >100 ? false : true;
      }
  },
  components: {
    CubeShadow,
    HeadTop
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.van-cell__title{
    &>div{
      max-width:98%;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      &>span:nth-child(1){
      }
      &>span:nth-child(2){
        vertical-align: middle;
      }
    }
}
.van-tabs{
  position: fixed;
  z-index: 100;
  left: 0;
  width:100%;
}
.van-tabs__nav--line{
  height:2rem;
  .van-tab{
    line-height: 2rem;
  }
}
.van-cell{
  padding:.5rem .6rem .5rem 0;
}
.load-more{
  text-align: center;
  height:44px;
  background: #fff;
  color: #888;
  background: #f7f7f7;
  line-height:44px;
  font-size:14px;
}
</style>
