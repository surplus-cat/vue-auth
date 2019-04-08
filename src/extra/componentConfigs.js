//const view = name => require(`@/views/${name}`)

//const view = name => () => import(`@/views/${name}`).then(m => m.default)

// const view = (AsyncView) => ({
//   // 需要加载的组件 (应该是一个 `Promise` 对象)
//   component: AsyncView,
//   // 异步组件加载时使用的组件
//   //loading: LoadingComponent,
//   // 加载失败时使用的组件
//   //error: ErrorComponent,
//   // 展示加载时组件的延时时间。默认值是 200 (毫秒)
//   delay: 200,
//   // 如果提供了超时时间且组件加载也超时了，
//   // 则使用加载失败时使用的组件。默认值是：`Infinity`
//   timeout: 3000
// })

//const view = name = resolve => require.ensure([], () => resolve(require(`${name}`)), 'thunk')

// const view = name => require.ensure([`./views/${name}`], function(require) {
//   require(`./views/${name}`);
// });

const view = name => resolve => require([`../views/${name}`], resolve)
//const view = name => () => import(/* webpackChunkName: "index" */ `@/views/${name}`)



export default {
  Common: {
    // UpdatePassword: r => require.ensure([], () => r(require('../../vue/pages/users/UpdatePassword')), 'users'),
    HomeMain: require('@/views/index/mainIndex.vue').default,
    NotFound: require('@/page404').default,
    Layout: require('@/views/layout/layout').default,
  },
  func: {
    AddArticle: view("article/addArticle"),
    AddArticleEditor: view("article/addArticleEditor"),
    Icon: view("icon/index"),
    Transfer: view("transfer/transfer"),
    DataTable: view("table/dataTables"),
    FilterTable: view("table/filterTable"),
    DragTable: view("table/dragTabe")
  }
}
