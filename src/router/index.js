import cn from '../i18n/lang/cn'
import Vue from 'vue'
import Router from 'vue-router'
import CommerViews from '@/views/commerViews'
import Login from '@/views/login/index'
import Layout from '@/views/layout/layout'
import HomeMain from '@/views/index/mainIndex'

// 不是必须加载的组件使用懒加载
const Icon = () => import('@/views/icon/index')
// const Erji = () => import('@/views/duoji/erji')
// const Erji2 = () => import('@/views/duoji/erji2')
// const Sanji = () => import('@/views/duoji/sanji')
// const Sanji2 = () => import('@/views/duoji/sanji2')
// const Siji = () => import('@/views/duoji/siji')
// const Wuji = () => import('@/views/duoji/wuji')
const Transfer = () => import('@/views/transfer/transfer')
const DataTable = () => import('@/views/table/dataTables')
const FilterTable = () => import('@/views/table/filterTable')
const DragTable = () => import('@/views/table/dragTabe')
// const Upload = () => import('@/views/upload/upload')
// const Markdown = () => import('@/views/editor/markdownView')
// const WangeditorView = () => import('@/views/editor/wangeditorView')
const NotFound = () => import('@/page404')
const AddArticle = () => import('@/views/article/addArticle')
const AddArticleEditor = () => import('@/views/article/addArticleEditor')
// const NavClassify = () => import('@/views/syssetting/navClassify')
// const pagePermissions = () => import('@/views/permissions/pagePermissions')
// const btnPermissions = () => import('@/views/permissions/btnPermissions')
// const setting = () => import('@/views/permissions/index.vue')
// const role = () => import('@/views/permissions/role.vue')
// const admin = () => import('@/views/permissions/admin.vue')

Vue.use(Router)
let defaultRouter = [
  { path: '/',
    redirect: '/index',
    hidden: true,
    children: []
  },
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true,
    children: []
  },
  {
    path: '/index',
    iconCls: 'fa fa-dashboard', // 图标样式class
    name: '主页',
    component: Layout,
    alone: true,
    children: [
      {
        path: '/index',
        iconCls: 'fa fa-dashboard', // 图标样式class
        name: '主页',
        component: HomeMain,
        children: []
      }
    ]
  },
  {
    path: '/404',
    component: NotFound,
    name: '404',
    hidden: true,
    children: []
  }
]

let addRouter = [
  {
    path: '/',
    iconCls: 'el-icon-tickets', // 图标样式class
    name: '文章管理',
    component: Layout,
    children: [
      {
        path: '/addArticle',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: '发布文章',
        component: AddArticle,
        children: []
      },
      {
        path: '/addArticleEditor',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: '发布文章-富文本',
        component: AddArticleEditor,
        children: []
      }
    ]
  },
  {
    path: '/',
    iconCls: 'fa fa-paw', // 图标样式class
    name: '图标',
    component: Layout,
    children: [
      {
        path: '/icon',
        iconCls: 'fa fa-life-ring', // 图标样式class
        name: '内置图标',
        component: Icon,
        children: []
      }
    ]
  },
  {
    path: '/',
    iconCls: 'fa fa-exchange', // 图标样式class
    name: '穿梭框',
    component: Layout,
    children: [
      {
        path: '/transfer',
        iconCls: 'fa fa-sign-in', // 图标样式class
        name: '穿梭框demo',
        component: Transfer,
        children: []
      }
    ]
  },
  {
    path: '/',
    iconCls: 'fa fa-newspaper-o', // 图标样式class
    name: '表格',
    component: Layout,
    children: [
      {
        path: '/dataTable',
        iconCls: 'fa fa-sliders', // 图标样式class
        name: '多选数据表格',
        component: DataTable,
        children: []
      },
      {
        path: '/filterTable',
        iconCls: 'fa fa-sort-amount-asc', // 图标样式class
        name: '筛选表格',
        component: FilterTable,
        children: []
      },
      {
        path: '/dragTabe',
        iconCls: 'fa fa-hand-stop-o', // 图标样式class
        name: '拖拽排序',
        component: DragTable,
        children: []
      }
    ]
  },

  // {
  //   path: '/',
  //   iconCls: 'fa fa-server',
  //   name: routeName.multiDirectory,
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/erji1',
  //       iconCls: 'fa fa-server',
  //       name: routeName['menu2-1'],
  //       component: Erji,
  //       children: []
  //     },
  //     {
  //       path: '/erji2',
  //       iconCls: 'fa fa-server',
  //       name: routeName['menu2-2'],
  //       component: Erji2,
  //       children: []
  //     },
  //     {
  //       path: '/erji3',
  //       iconCls: 'fa fa-server',
  //       name: routeName['menu2-3'],
  //       component: CommerViews, // 无限极菜单的容器
  //       children: [
  //         {
  //           path: '/sanji1',
  //           iconCls: 'fa fa-server',
  //           name: routeName['menu3-1'],
  //           component: Sanji,
  //           children: []
  //         },
  //         {
  //           path: '/sanji2',
  //           iconCls: 'fa fa-server',
  //           name: routeName['menu3-2'],
  //           component: Sanji2,
  //           children: []
  //         },
  //         {
  //           path: '/sanji3',
  //           iconCls: 'fa fa-server',
  //           name: routeName['menu3-3'],
  //           component: CommerViews,
  //           children: [
  //             {
  //               path: '/siji',
  //               iconCls: 'fa fa-server',
  //               name: routeName['menu4-1'],
  //               component: Siji,
  //               children: []
  //             },
  //             {
  //               path: '/siji1',
  //               iconCls: 'fa fa-server',
  //               name: routeName['menu4-2'],
  //               component: CommerViews,
  //               children: [
  //                 {
  //                   path: '/wuji',
  //                   iconCls: 'fa fa-server',
  //                   name: routeName['menu5-1'],
  //                   component: Wuji,
  //                   children: []
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   path: '/',
  //   iconCls: 'fa fa-cloud-upload', // 图标样式class
  //   name: routeName.upload,
  //   component: Layout,
  //   meta: {role: ['superAdmin']},
  //   children: [
  //     {
  //       path: '/upload',
  //       iconCls: 'el-icon-upload2', // 图标样式class
  //       name: routeName.fileUpload,
  //       component: Upload,
  //       children: []
  //     }
  //   ]
  // },
  // {
  //   path: '/',
  //   iconCls: 'el-icon-edit', // 图标样式class
  //   name: routeName.editor,
  //   component: Layout,
  //   meta: {role: ['superAdmin', 'admin']},
  //   children: [
  //     {
  //       path: '/markdown',
  //       iconCls: 'fa fa-file-code-o', // 图标样式class
  //       name: routeName.markdown,
  //       component: Markdown,
  //       children: []
  //     },
  //     {
  //       path: '/wangeditor',
  //       iconCls: 'fa fa-file-code-o', // 图标样式class
  //       name: routeName.wangeditor,
  //       component: WangeditorView,
  //       children: []
  //     }
  //   ]
  // },
  // {
  //   path: '/',
  //   iconCls: 'el-icon-setting', // 图标样式class
  //   name: routeName.systemSettings,
  //   component: Layout,
  //   meta: {role: ['superAdmin']},
  //   children: [
  //     {
  //       path: '/navClassifies',
  //       iconCls: 'el-icon-menu', // 图标样式class
  //       name: routeName.navMenu,
  //       component: NavClassify,
  //       children: []
  //     }
  //   ]
  // },
  { path: '*',
    redirect: '/404',
    hidden: true,
    children: []
  }
]

let fullPath = defaultRouter.concat(addRouter)
export default new Router({
  routes: fullPath
})
export {defaultRouter, addRouter, fullPath}
