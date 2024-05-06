> [!NOTE]
>
> ⚠️ Vue CLI 现已处于维护模式!
>
> 现在官方推荐使用 [`create-vue`](https://github.com/vuejs/create-vue) 来创建基于 [Vite](https://cn.vitejs.dev) 的新项目。 另外请参考 [Vue 3 工具链指南](https://cn.vuejs.org/guide/scaling-up/tooling.html) 以了解最新的工具推荐。

`vue.config.js` 是一个可选的配置文件，如果项目的 (和 `package.json` 同级的) 根目录中存在这个文件，那么它会被 `@vue/cli-service` 自动加载。你也可以使用 `package.json` 中的 `vue` 字段，但是注意这种写法需要你严格遵照 JSON 的格式来写。

一般来讲，当我们使用 `vue` 技术栈的时候，就需要按照特定的语法进行业务需求的实现，但是技术栈的有些行为也是可以通过配置文件来进行个性化的，以`vue.config.js` 为例：

```js
// vue.config.js
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  // 选项
    baseUrl : "http://localhost:3000/base/", // 提供全局的基础根路径，用于拼装完整路径 // 从 Vue CLI 3.3 起已弃用，请使用publicPath
    publicPath : process.env.NODE_ENV === 'production'
    ? '/production-sub-path/'
    : '/', // 如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径
    outputDir : "dist", // 运行 vue-cli-service build 时生成的生产环境构建文件的目录
    assetsDir : "", // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    indexPath : "index.html", // 指定生成的 index.html 的输出路径 (相对于 outputDir), dist 文件下的 index.html
    filenameHashing : true, // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
    pages: {
        index: {
          // page 的入口
          entry: 'src/index/main.js',
          // 模板来源
          template: 'public/index.html',
          // 在 dist/index.html 的输出
          filename: 'index.html',
          // 当使用 title 选项时，
          // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
          title: 'Index Page',
          // 在这个页面中包含的块，默认情况下会包含
          // 提取出来的通用 chunk 和 vendor chunk。
          chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        // 当使用只有入口的字符串格式时，
        // 模板会被推导为 `public/subpage.html`
        // 并且如果找不到的话，就回退到 `public/index.html`。
        // 输出文件名会被推导为 `subpage.html`。
        subpage: 'src/subpage/main.js'
      }, // 在 multi-page 模式下构建应用。每个“page”应该有一个对应的 JavaScript 入口文件
    lintOnSave : "default", // lintOnSave: process.env.NODE_ENV !== 'production' 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
    runtimeCompiler : false, // 是否使用包含运行时编译器的 Vue 构建版本, 如果你需要在客户端编译模板 (比如传入一个字符串给 template 选项，或挂载到一个元素上并以其 DOM 内部的 HTML 作为模板)，就将需要加上编译器
    transpileDependencies : false, // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。你可以启用本选项，以避免构建后的代码中出现未转译的第三方依赖。默认情况下，Vue CLI 会自动处理 node_modules/vue 的转译，但对于其他依赖，尤其是那些使用了 Vue 特定功能的依赖，可能也需要 Babel 进行处理。
    productionSourceMap ： true, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。允许开发者查看和调试原始的、未经压缩的源代码，而不是打包和压缩后的版本
    crossorigin : undefined, // https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/crossorigin, 为了使 crossorigin 属性正常工作，服务器必须在其 HTTP 响应中包含适当的 CORS 头部，如 Access-Control-Allow-Origin 和 Access-Control-Allow-Credentials。1. anonymous：发起跨域请求时，浏览器不会发送任何身份凭证（如 cookies 或 HTTP 认证信息）。2. use-credentials：浏览器会使用身份凭证进行跨域请求，这要求服务器在 CORS 策略中明确允许这些凭证。3. 如果不设置 crossorigin 属性，或者将其设置为 false，则不会启用 CORS 请求。(如果是匿名访问跨域资源，如果凭证是同源的，那么就不带；如果使用凭证，那么需要在服务端配置 allow-origin, allow-credentials.)
    integrity : false,  // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。
    configureWebpack : {
        plugins: [
          new MyAwesomeWebpackPlugin()
        ]
      }, // 如果是个对象则会被合并到最终的配置， 如果是个函数，则会接受被解析的配置作为参数。https://cli.vuejs.org/zh/guide/webpack.html
    chainWebpack : () => {}, // 会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
    css.requireModuleExtension : true, // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。设置为 false 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块
    css.extract :  process.env.NODE_ENV === 'production' ? true : false, // 生产环境下是 true，开发环境下是 false。是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)
    css.sourceMap : false, // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。
    css.loaderOptions : {}, // css: {
        // 这里的选项会传递给 css-loader
      // },
        // postcss: {
        // 这里的选项会传递给 postcss-loader
      // }
    devServer : {}, // 所有 webpack-dev-server 的选项都支持, https://webpack.js.org/configuration/dev-server/ , {
        // static: {
        //  directory: path.join(__dirname, 'public'),
       //  },
      //  compress: true,
     //   port: 9000,
      // },
    devServer.proxy : 'http://localhost:4000', // 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。你想要更多的代理控制行为，也可以使用一个 path: options 成对的对象
    parallel : require('os').cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    pwa : {}, //向 PWA 插件传递选项。
    pluginOptions : {}, // 这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项
})


```

