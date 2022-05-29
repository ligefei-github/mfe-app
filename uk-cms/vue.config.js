const port = 9002;
const assetsPath = process.env.NODE_ENV === 'production' ? '/uk-cms/' : `http://localhost:${port}/uk-cms/`;
module.exports = {
  publicPath: '/uk-cms/',
  outputDir: 'dist',
  productionSourceMap: false, // 生产环境的 source map
  lintOnSave: false,// eslint-loader 是否在保存的时候检查 安装@vue/cli-plugin-eslint有效
  devServer: {
    port, // 端口号
    open: false, //配置自动启动浏览器
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // strat
    proxy: {
      '/api': {
        target: 'https://noahark-dev.aicat.me',
        // target: 'https://webtool-bkcf-qa.aicat.me',
        changeOrigin: true,
        pathRewrite: {
          // 重写请求路径上匹配到的字段，如果不需要在请求路径上，重写为""
          '^/api': '/api'
        }
      },
    },
  },
  css: {
    extract: {
      ignoreOrder: true
    },
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
  },
  configureWebpack: {
    output: {
      //资源打包路径
      library: "uk-cms",
      libraryTarget: "umd"
    }
  },
  chainWebpack: (config) => {
    config.module
      .rule('fonts')
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 4096, // 小于4kb将会被打包成 base64
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[hash:8].[ext]',
            publicPath: assetsPath,
          },
        },
      })
      .end();
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 4096, // 小于4kb将会被打包成 base64
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[hash:8].[ext]',
            publicPath: assetsPath,
          },
        },
      });
  }
}