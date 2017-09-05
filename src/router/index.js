import Vue from 'vue'
import Router from 'vue-router'

const topics = r => require.ensure([], () => r(require('../page/Topics')), 'Topics');
const topicDetails = r => require.ensure([], () => r(require('../page/TopicDetails')), 'TopicDetails');


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'topics',
      component: topics
    },
    {
      path: '/topicDetails/:id',
      name: 'topicDetails',
      component: topicDetails
    },
  ]
})
