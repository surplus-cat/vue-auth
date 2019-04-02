export default {
  Common: {
    // Admin: require('../../vue/pages/common/Admin'),
    // Index: require('../../vue/pages/common/Index'),
    // UpdatePassword: r => require.ensure([], () => r(require('../../vue/pages/users/UpdatePassword')), 'users'),
    NotFound: require('@/page404'),
    Layout: require('@/views/layout/layout'),
    HomeMain: require('@/views/index/mainIndex')
  },
  func: {
    AddArticle: require('@/views/article/addArticle'),
    AddArticleEditor: require('@/views/article/addArticleEditor'),
    Icon: require('@/views/icon/index'),
    Transfer: require('@/views/transfer/transfer'),
    DataTable: require('@/views/table/dataTables'),
    FilterTable: require('@/views/table/filterTable'),
    DragTable: require('@/views/table/dragTabe')
  }
}
