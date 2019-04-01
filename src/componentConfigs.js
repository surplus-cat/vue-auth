export default {
  Common: {
    // Admin: require('../../vue/pages/common/Admin'),
    // Index: require('../../vue/pages/common/Index'),
    // UpdatePassword: r => require.ensure([], () => r(require('../../vue/pages/users/UpdatePassword')), 'users'),
    NotFound: import('@/page404'),
    Layout: import('@/views/layout/layout'),
    HomeMain: import('@/views/index/mainIndex')
  },
  func: {
    AddArticle: import('@/views/article/addArticle'),
    AddArticleEditor: () => import('@/views/article/addArticleEditor'),
    Icon: import('@/views/icon/index'),
    Transfer: import('@/views/transfer/transfer'),
    DataTable: import('@/views/table/dataTables'),
    FilterTable: () => import('@/views/table/filterTable'),
    DragTable: () => import('@/views/table/dragTabe')
  }
}