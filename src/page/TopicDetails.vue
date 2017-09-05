<template>
  <div class="TopicDetails">
    <HeadTop title-text="CNODE-IM" left-show="true" right-show="true"></HeadTop>
    <section class="m">
      <div class="m-t">
        <h2>{{details.title}}</h2>
        <div class="u-d">
          <img :src="author.avatar_url" alt="">
          <span>{{author.loginname}}</span>
          <van-tag type="danger" v-if="details.top">置顶</van-tag>
          <span class="sub">回复:{{details.reply_count}}</span>
          <span class="sub">查看:{{details.visit_count}}</span>
          <span class="sub">更新于:{{details.last_reply_at | ago}}</span>
        </div>
      </div>
      <div class="m-c markdown-text" v-html="details.content"></div>
      <div class="m-b">
        <h2>{{details.reply_count}}回复：</h2>
        <dl v-for="(item,index) in details.replies">
          <dt>
            <img :src="item.author.avatar_url" alt="">
            <span>{{item.author.loginname}}</span>
            <span class="sub">{{index}}楼</span>
            <span class="sub">{{item.create_at | ago}}</span>
          </dt>
          <dd>
            <div v-html="item.content"></div>
          </dd>
        </dl>
      </div>
    </section>
    <div class="loading" v-if="loading">
      <cube-shadow></cube-shadow>
      <div class="mark"></div>
    </div>
  </div>
</template>

<script>
import CubeShadow from 'vue-loading-spinner/src/components/RotateSquare2.vue'
import { getTopicDetails } from '../service/getData';
import HeadTop from '@/components/head.vue'

import moment from 'moment';

export default {
  name:'TopicDetails',
  data(){
    return{
      detaisId:'',
      details:'',
      author:'',
      loading:false
    }
  },
  methods:{
    async initData(){
      this.loading = true;
      let details = await getTopicDetails(this.detailsId);
      details = details.data;
      this.author =details.author;
      this.details = {...details};
      this.loading = false;
    }
  },
  mounted(){
    this.detailsId = this.$route.params.id;
    this.initData();
  },
  filters: {
    ago(time) {
      //设置显示中文
      moment.lang('zh-cn');
      return moment(time).fromNow().trim();
    }
  },
  components: {
    CubeShadow,
    HeadTop
  }
}
</script>

<style lang="scss">
  @import "../style/markdow";
.m{
  padding-top:2rem;
  &-t{
    position: relative;
    background: #ffffff;
    padding:.6rem;
    h2{
      font-size:.8rem;
      line-height:1.5;
    }
    .u-d{
      margin-top:.5rem;
      img{
        width:1rem;
        height:1rem;
        border-radius: 100%;
      }
      span{
        font-size:.5rem;
      }
      img,span{
        display: inline-block;
        vertical-align: middle;
      }
      .sub{
        color: #838383;
      }
    }
    &:before{
      content: '';
      position: absolute;
      left:.6rem;
      right:.6rem;
      bottom:0;
      border-bottom:1px solid #e5e5e5;
    }
  }
  &-c{
    background: #ffffff;
    padding:.6rem;
    position: relative;
    &:before{
      content: '';
      position: absolute;
      left:.6rem;
      right:.6rem;
      bottom:0;
      border-bottom:1px solid #e5e5e5;
    }
  }
  &-b{
    background: #ffffff;
    padding:.6rem;
    h2{
      height:1.5rem;
      line-height:1.5rem;
      font-size:.6rem;
      margin:0 -.6rem;
      padding:0 .6rem;
      margin-bottom:.6rem;
      background: #f7f7f9;
      color: #ff4444;
    }
    dl{
      position: relative;
      &:before{
        content: '';
        position: absolute;
        left:0;
        right:-.6rem;
        bottom:0;
        border-bottom:1px solid #e5e5e5;
      }
      padding:.4rem 0;
      dt{
        img{
          width:1rem;
          height:1rem;
          border-radius: 100%;
        }
        span{
          font-size:.5rem;
          &.sub{
            color: #838383;
          }
        }
        img,span{
          display: inline-block;
          vertical-align: middle;
        }
      }
      dd{
        padding:.3rem 0 .3rem 1.2rem;
      }
    }
  }
}
  .van-tag{
    line-height:1;
  }
</style>
