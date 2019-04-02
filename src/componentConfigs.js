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
    // AddArticle: require('@/views/article/addArticle'),
    // AddArticleEditor: require('@/views/article/addArticleEditor'),
    // Icon: require('@/views/icon/index'),
    // Transfer: require('@/views/transfer/transfer'),
    // DataTable: require('@/views/table/dataTables'),
    // FilterTable: require('@/views/table/filterTable'),
    // DragTable: require('@/views/table/dragTabe')
    AddArticle: r => require.ensure([], () => r(require('./views/article/addArticle')), 'chunknam1'),
    AddArticleEditor: r => require.ensure([], () => r(require('./views/article/addArticleEditor')), 'chunknam01'),
    Icon: r => require.ensure([], () => r(require('./views/icon/index')), 'chunknam2'),
    Transfer: r => require.ensure([], () => r(require('./views/transfer/transfer')), 'chunknam3'),
    DataTable: r => require.ensure([], () => r(require('./views/table/dataTables')), 'chunknam4'),
    FilterTable: r => require.ensure([], () => r(require('./views/table/filterTable')), 'chunknam5'),
    DragTable: r => require.ensure([], () => r(require('./views/table/dragTabe')), 'chunknam6')
    // AddArticle: () => import(/* webpackChunkName: "index" */ '@/views/article/addArticle'),
    // AddArticleEditor: () => import(/* webpackChunkName: "index" */ '@/views/article/addArticleEditor'),
    // Icon: () => import(/* webpackChunkName: "index" */ '@/views/icon/index'),
    // Transfer: () => import(/* webpackChunkName: "index" */ '@/views/transfer/transfer'),
    // DataTable: () => import(/* webpackChunkName: "index" */ '@/views/table/dataTables'),
    // FilterTable: () => import(/* webpackChunkName: "index" */ '@/views/table/filterTable'),
    // DragTable: () => import(/* webpackChunkName: "index" */ '@/views/table/dragTabe')
    // AddArticle: import('@/views/article/addArticle'),
    // AddArticleEditor: import('@/views/article/addArticleEditor'),
    // Icon: import('@/views/icon/index'),
    // Transfer: import('@/views/transfer/transfer'),
    // DataTable: import('@/views/table/dataTables'),
    // FilterTable: import('@/views/table/filterTable'),
    // DragTable: import('@/views/table/dragTabe')
  }
}
