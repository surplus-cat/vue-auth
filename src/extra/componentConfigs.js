//const view = name => require(`@/views/${name}`)

//const view = name => () => import(`@/views/${name}`)
const view = name = r => require.ensure([], () => r(require(`@/views/${name}`)), '')

// const view = name => require.ensure([`./views/${name}`], function(require) {
//   require(`./views/${name}`);
// });

//const view = name => resolve => require([`@/views/${name}`], resolve)
//const view = name => () => import(/* webpackChunkName: "index" */ `@/views/${name}`)



export default {
  Common: {
    // UpdatePassword: r => require.ensure([], () => r(require('../../vue/pages/users/UpdatePassword')), 'users'),
    NotFound: require('@/page404'),
    Layout: require('@/views/layout/layout'),
    HomeMain: require('@/views/index/mainIndex')
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
