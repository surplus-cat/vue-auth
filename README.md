## 1. vue-xuAdmin 后台模板简介
> 这个权限管理就是为了方便,跟系统安全真的不沾边，只是根据后台返回的角色信息来生成他可以看见的菜单和按钮，显示菜单的方法是根据权限删除掉路由表里没有权限的路由，然后再动态添加，原本包含没有访问权限的原路由表只要打开页面运行代码就已经不存在了，并且404页面除了过滤掉项目没有的路由外，同时每次的路由跳转都会鉴权。如果你知道了没有权限的路由试着强行跳转会因为没有权限直接会跳转404。
**就算通过查看代码或者其他方法获取全部路由，并且绕过404，花了这么大精力，，那你也看不到新世界的大门，因为所有数据都是通过后台请求返回来的，你没权限后台不会给你数据的，也不会让你去操作，，除非后台不验证权限，只要有人请求我就给你所有数据，，，，**

vue-xuAdmin是基于vue2.0全家桶 + element-ui 开发的一个后台模板，实现了无限级菜单，页面、按钮级别的权限管理，为了减少前后端的沟通成本，页面、按钮级别的权限验证和动态路由表的存储校验，也都由前端完成，这样前端新建页面或者删除页面都不需要告诉后台去增加删除路由表

## 2. 准备工作
-开发环境
- node.js v8.0+
- webpack v3
- git

-技术栈
- ES6+
- vue v2.5+
- vue-router
- vuex
- axios
- scss
- element-ui v2.4+

## 3. 实现功能
```
- 登录、退出
+ 基于token
	- 状态拦截、404页面
	- 动态加载路由
	- 页面、按钮指令权限管理
	- 无限级菜单
- 封装vue-i18n@8.x国际化组件
- 系统全屏化
- 菜单收缩
- icon 图标
+ tab标签导航
	- 右击快捷功能
- 表格拖拽排序
- 编辑器
	- markdown（编辑器目前只封装了这一个组件，重写了markdown编辑和预览的皮肤，实时获取：markdown，html，json 三种格式文本）
- Echarts 组件封装

封装了一些element-ui没有但是常用的组件，正常需要的功能element-ui里面都有，可以直接复制

```
## 4.开发使用
### 4.1开发
```

# 安装依赖 (如果安装失败就多安装几次，实在不行就换淘宝镜像)
npm install

# 启动项目 (已经配置好启动服务自动打开浏览器，如果没自动打开按照控制台输出的地址自己打开)
npm run dev

# 启动单元测试
npm run unit

# 启动端到端测试
 npm run e2e

# 启动编译打包生产环境
 npm run build
```

## 5. 项目结构说明
```
|------------build          构建脚本目录
    |---------build.js             生产环境构建脚本
    |---------check-version.js 检查node、npm等版本
    |---------dev-client.js     开发服务器热重载脚本，主要用来实现开发阶段的页面自动刷新
    |---------dev-server.js     运行本地开发服务器
    |---------utils.js               构建相关工具方法
    |---------vebpack.base.conf.js     webpack基本配置
    |---------vebpack.dev.conf.js       webpack开发环境配置
    |---------vebpack.prod.conf.js     webpack生产环境配置   
|------------config           项目配置
    |---------dev.env.js           开发环境变量
    |---------index.js              项目配置文件
    |---------prod.env.js         生产环境变量
|------------dist             使用生产环境配置构建项目，构建好的目录放到该目录
|------------node_modules         node的依赖包
|------------src
    |---------assets                 资源目录，这里的资源会被webpack构建
    |---------components        		组件目录
    |---------i18n					        多语言国际化
    |---------router
    |-----------index.js               前端路由
    |---------views					页面文件
    |---------vuex					全局状态管理目录
    |--------App.vue                	根组件
    |--------main.js                 入口js文件
|------------static             纯静态资源，不会被webpack构建
|------------index.html         入口页面
|------------test        		单元测试
|------------.babelrc            ES6语法编译配置
|-----------.editorconfig      	定义代码格式
|-----------.gitignore         	git 上传需要忽略的文件
|-----------package.json       项目基本信息
---------------------
```


期间有一个问题是懒加载引入组件导致组件无法加载，最后解决方案是发现 下面几个component: () => import ... 写成 components: () => import ...，
同时补充一下，我猜是vue-loader升级到了13.0导致的
vue-loader13.0有一个变更就是默认启用了esModule
require('./components/ExampleComponent.vue').default


后台路由返回示例:
{
  "data": {
    "userMenu": [
      {
        "path": "/",
        "redirect": "/index",
        "hidden": true,
        "children": []
      },
      {
        "path": "/index",
        "iconCls": "fa fa-dashboard",
        "name": "首页",
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
            "display": true
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
            "display": true,
            "meta": {
              "handleAuth": {
                "add": true,
                "edit": true,
                "del": true
              }
            }
          },
          {
            "path": "/filterTable",
            "iconCls": "fa fa-sort-amount-asc",
            "name": "筛选表格",
            "components": "func.FilterTable",
            "children": [],
            "display": false,
            "meta": {
              "handleAuth": {
                "add": false,
                "edit": false,
                "del": false
              }
            }
          },
          {
            "path": "/dragTabe",
            "iconCls": "fa fa-hand-stop-o",
            "name": "拖拽排序",
            "components": "func.DragTable",
            "children": [],
            "display": false,
            "meta": {
              "handleAuth": {
                "add": true,
                "edit": false,
                "del": true
              }
            }
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
  }
}