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
import componentConfig from './componentConfigs'

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

const menu = [
  {
    "path": "/",
    "redirect": "/index",
    "hidden": true,
    "children": []
  },
  {
    "path": "/index",
    "iconCls": "fa fa-dashboard",
    "name": "主页",
    "components": "Common.Layout",
    "alone": true,
    "children": [
      {
        "path": "/index",
        "iconCls": "fa fa-dashboard",
        "name": "主页",
        "components": "Common.HomeMain",
        "children": [],
        "display": true
      }
    ]
  },
  {
    "path": "/",
    "iconCls": "el-icon-tickets",
    "name": "文章管理",
    "components": "Common.Layout",
    "children": [
      {
        "path": "/addArticle",
        "iconCls": "el-icon-edit-outline",
        "name": "发布文章",
        "components": "func.AddArticle",
        "children": [],
        "display": false
      },
      {
        "path": "/addArticleEditor",
        "iconCls": "el-icon-edit-outline",
        "name": "发布文章-富文本",
        "components": "func.AddArticleEditor",
        "children": [],
        "display": true
      }
    ]
  },
  {
    "path": "/",
    "iconCls": "fa fa-paw",
    "name": "图标",
    "components": "Common.Layout",
    "children": [
      {
        "path": "/icon",
        "iconCls": "fa fa-life-ring",
        "name": "内置图标",
        "components": "func.Icon",
        "children": [],
        "display": false
      }
    ]
  },
  {
    "path": "/",
    "iconCls": "fa fa-exchange",
    "name": "穿梭框",
    "components": "Common.Layout",
    "children": [
      {
        "path": "/transfer",
        "iconCls": "fa fa-sign-in",
        "name": "穿梭框demo",
        "components": "func.Transfer",
        "children": [],
        "display": true
      }
    ]
  },
  {
    "path": "/",
    "iconCls": "fa fa-newspaper-o",
    "name": "表格",
    "components": "Common.Layout",
    "children": [
      {
        "path": "/dataTable",
        "iconCls": "fa fa-sliders",
        "name": "多选数据表格",
        "components": "func.DataTable",
        "children": [],
        "display": false
      },
      {
        "path": "/filterTable",
        "iconCls": "fa fa-sort-amount-asc",
        "name": "筛选表格",
        "components": "func.FilterTable",
        "children": [],
        "display": false
      },
      {
        "path": "/dragTabe",
        "iconCls": "fa fa-hand-stop-o",
        "name": "拖拽排序",
        "components": "func.DragTable",
        "children": [],
        "display": true
      }
    ]
  },
  {
    "path": "/404",
    "components": "Common.NotFound",
    "name": "404",
    "hidden": true,
    "children": []
  },
  {
    "path": "*",
    "redirect": "/404",
    "hidden": true,
    "children": []
  }
]

// 处理数据
var newData = menu.map(v => {
  if (!v.children) return { ...v }
  return { ...v, children: v.children.filter(n => n.display) }
})

function assignRouter(prev, next) {
  console.log(next)
  prev.reduce((a, b) => {
    // console.log(b)
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
  console.log(routers);
  // 实例化路由
  let router = new Router({routes: routers})
  store.commit('setRouters', routers)
  // 再实例化vue
  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app')
}

init(newData)
