// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from './btnPermission'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import 'font-awesome/css/font-awesome.css'

import App from './App.vue'
import Router from 'vue-router'
import store from './vuex'
import componentConfig from './extra/componentConfigs'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI)

//  获取角色信息，根据用户权限动态加载路由
// router.beforeEach((to, from, next) => {
//   // console.log(store.getters.token)
//   // debugger

//   if (store.getters.token) {
//     store.dispatch('setToken', store.getters.token)
//     if (to.path === '/login') {
//       next({ path: '/' })
//     } else {
//       if (!store.getters.info.role) {
//         // const role = ['/markdown', '/erji', '/erji2', '/siji', '/wuji']
//         !async function getAddRouters() {
//           await store.dispatch('getInfo', store.getters.token)
//           await store.dispatch('newRoutes', store.getters.info.role)
//           console.log(store.getters.addRouters)
//           await router.addRoutes(store.getters.addRouters)
//           next({ path: '/index' })
//         }()
//       } else {
//         let is404 = to.matched.some(record => {
//           if (record.meta.role) {
//             return record.meta.role.indexOf(store.getters.info.role) === -1
//           }
//         })
//         if (is404) {
//           next({ path: '/404' })
//           return false
//         }
//         next()
//       }
//     }
//   } else {
//     if (to.path === '/login') {
//       next()
//     }
//     next({ path: '/login' })

//   }
// })
axios.post('https://www.easy-mock.com/mock/5c9da69927388d303f3837b7/example/login', {
  username: '1111',
  password: '1111'
}).then(res => {
  sessionStorage.user = JSON.stringify(res.data)
})
// if (!sessionStorage.user) location.href = 'http://localhost:8964/login.html'
const menu = JSON.parse(sessionStorage.user).data.userMenu
console.log(componentConfig)
console.log(typeof componentConfig.Common.HomeMain)
console.log(componentConfig.func.AddArticle)
console.log(typeof componentConfig.func.AddArticle)

// 处理数据
var newData = menu.map(v => {
  if (!v.children) return { ...v }
  return { ...v, children: v.children.filter(n => n.display) }
})

//console.log(newData)

function assignRouter (prev, next) {
  prev.reduce((a, b) => {
    if (b.children && b.children.length > 0) {
      if (b.components) {
        let squs = Object.keys(next).findIndex(v => { return b.components.indexOf(v) > -1 })
        let nums = Object.keys(Object.values(next)[squs]).findIndex(v => { return b.components.indexOf(v) > -1 })

        b.components = Object.values(next)[squs][Object.keys(Object.values(next)[squs])[nums]]
      }
      b.children.filter(k => {
        let index = Object.keys(next).findIndex(v => { return k.components.indexOf(v) > -1 })
        let idx = Object.keys(Object.values(next)[index]).findIndex(v => { return k.components.indexOf(v) > -1 })

        k.components = Object.values(next)[index][Object.keys(Object.values(next)[index])[idx]]
      })
    } else {
      if (b.components) {
        let squ = Object.keys(next).findIndex(v => { return b.components.indexOf(v) > -1 })
        let num = Object.keys(Object.values(next)[squ]).findIndex(v => { return b.components.indexOf(v) > -1 })
        b.components = Object.values(next)[squ][Object.keys(Object.values(next)[squ])[num]]
      }
    }
  }, [])
  return prev
}

// new Login(function (err, data) {
//   if (err) {
//     // 登录出错
//   } else {
//     // 登录成功
//     init(data);
//   }
// }).init();

const init = function (data) {
  // 先配置路由信息
  // componentConfigs 是本地的组件配置
  let routers = assignRouter(data, componentConfig)
  // 实例化路由
  let router = new Router({routes: routers})
  store.commit('setRouters', routers)
  store.commit('initTab', sessionStorage.tabnavBox ? JSON.parse(sessionStorage.tabnavBox) : [
    {
      title: '主页',
      path: '/index'
    }
  ])
  // 再实例化vue
  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app')
}

init(newData)
