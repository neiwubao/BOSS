import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
// import defaultlogin from '@/components/login/defaultlogin'

// 测试滚动无限加载
const test = resolve => require(['@/components/testInfiniteScroll'], resolve)
// 测试vuex
const testVuex = resolve => require(['@/components/testVuex/test'], resolve)

//1 、组件异步加载，只有在组件被访问的时候才会加载，提高了性能
const home = resolve => require(['@/components/common/home'], resolve)
const joblist = resolve => require(['@/components/job/joblist'], resolve)
const jobdetail = resolve => require(['@/components/job/jobdetail'], resolve)
const company = resolve => require(['@/components/company/company'], resolve)
const comDetail = resolve => require(['@/components/company/comDetail'], resolve)
const message = resolve => require(['@/components/message/message'], resolve)
const mesChat = resolve => require(['@/components/message/mesChat'], resolve)
const mesInteract = resolve => require(['@/components/message/mesInteract'], resolve)
const meschatDetail = resolve => require(['@/components/message/meschatDetail'], resolve)
const aboutme = resolve => require(['@/components/aboutme/myinfo'], resolve)




Vue.use(Router)
// 3 如何保证在最顶部
// 3.0 路由每次进入详情，默认滚动在最顶部
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash
    }
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0
    }
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    // console.log(position)
    return position
  }
}
// 3.1 mode: 'history',
// 3.2 scrollBehavior,
// 3.3 meta: { scrollToTop: true }

export default new Router({
  mode: 'history',
  scrollBehavior,
  routes: [
      {
          path:'/',
          name:"login",
          component:login
      },
      {
          path:'/home',
          component:home,
          mate: { keepAlive: true },
          children:[
            {
              path:'/',
              name:"joblist",
              component:joblist
            },
            {
              path:"/company",
              name:"company",
              component:company
            },
            {
              path:"/message",
              component:message,
              children:[
                {
                  path:'',
                  name:"mesChat",
                  component:mesChat,
                  // children:[
                  //   {
                  //     path:'',
                  //     name:"meschatDetail",
                  //     component:meschatDetail
                  //   }
                  // ]
                },
                {
                  path:'/mesInteract',
                  name:"mesInteract",
                  component:mesInteract
                }
              ]
            },
            {
              path:"/aboutme",
              name:"me",
              component:aboutme
            },
            {
              path:"/testVuex",
              name:"testVuex",
              component:testVuex
            },
          ]
      },
      {
        path:"/detail/:jobId",
        name:"detail",
        component:jobdetail,
        meta: { scrollToTop: true }
      },
      {
      	path:"/comdetail/:id",
      	name:"comDetail",
      	component:comDetail
      },
      // 消息詳情路由
      {
        path:'/meschatDetail',
        name:"meschatDetail",
        component:meschatDetail
      },
      {
        path:"/test",
        name:"test",
        component:test
      }
  ]
})
