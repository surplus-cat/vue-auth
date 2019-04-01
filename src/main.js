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
    "component": "Layout",
    "alone": true,
    "children": [
      {
        "path": "/index",
        "iconCls": "fa fa-dashboard",
        "name": "主页",
        "component": "HomeMain",
        "children": [],
        "display": true
      }
    ]
  },
  {
    "path": "/",
    "iconCls": "el-icon-tickets",
    "name": "文章管理",
    "component": "Layout",
    "children": [
      {
        "path": "/addArticle",
        "iconCls": "el-icon-edit-outline",
        "name": "发布文章",
        "component": "func.AddArticle",
        "children": [],
        "display": false
      },
      {
        "path": "/addArticleEditor",
        "iconCls": "el-icon-edit-outline",
        "name": "发布文章-富文本",
        "component": "func.AddArticleEditor",
        "children": [],
        "display": true
      }
    ]
  },
  {
    "path": "/",
    "iconCls": "fa fa-paw",
    "name": "图标",
    "component": "Layout",
    "children": [
      {
        "path": "/icon",
        "iconCls": "fa fa-life-ring",
        "name": "内置图标",
        "component": "func.Icon",
        "children": [],
        "display": false
      }
    ]
  },
  {
    "path": "/",
    "iconCls": "fa fa-exchange",
    "name": "穿梭框",
    "component": "Layout",
    "children": [
      {
        "path": "/transfer",
        "iconCls": "fa fa-sign-in",
        "name": "穿梭框demo",
        "component": "func.Transfer",
        "children": [],
        "display": false
      }
    ]
  },
  {
    "path": "/",
    "iconCls": "fa fa-newspaper-o",
    "name": "表格",
    "component": "Layout",
    "children": [
      {
        "path": "/dataTable",
        "iconCls": "fa fa-sliders",
        "name": "多选数据表格",
        "component": "func.DataTable",
        "children": [],
        "display": false
      },
      {
        "path": "/filterTable",
        "iconCls": "fa fa-sort-amount-asc",
        "name": "筛选表格",
        "component": "func.FilterTable",
        "children": [],
        "display": false
      },
      {
        "path": "/dragTabe",
        "iconCls": "fa fa-hand-stop-o",
        "name": "拖拽排序",
        "component": "func.DragTable",
        "children": [],
        "display": false
      }
    ]
  },
  {
    "path": "/404",
    "component": "Common.NotFound",
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

var f = (a, b) => {
  if (b.display === false) {
    return a
  }
  if (b.children && b.children.length) {
    b.children = b.children.reduce(f, [])
  }
  a.push(b)
  return a
}
// var newData = menu.reduce(f, [])

var newData = menu.map(v => {
  if (!v.children) return { ...v }
  return { ...v, children: v.children.filter(n => n.display) }
})

function assignRouter(prev, next) {
  console.log(next)
  console.log(Object.keys(next), Object.values(next))
  prev.reduce((a, b) => {
    //console.log(b)
    if (b.children && b.children.length > 0) {
      b.children.filter(k => {
        console.log(k.component)
        k.component = k.component ? k.component.replace(/"/g, '') : k.component
        
      })
    } else {
      console.log(b.component)
      b.component = b.component ? b.component.replace(/"/g, '') : b.component
    }
  })
  console.log(prev)
  return prev
}

// newData.reduce((a, b) => {
//   //console.log(b)
//   if (b.children && b.children.length > 0) {
//     b.children.filter(k => {
//       console.log(k.component)
//       k.component = k.component ? k.component.replace(/"/g, '') : k.component
//     })
//   } else {
//     console.log(b.component)
//     b.component = b.component ? b.component.replace(/"/g, '') : b.component
//   }
// })
// console.log(newData)


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
  console.log(router)
  // 再实例化vue
  new Vue({
    el: '#app',
    store,
    router,
    ...App
  })
}

init(newData)
