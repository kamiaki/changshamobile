module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  lintOnSave: false,
  devServer: {
    proxy: {
      '/changsha': {
        // target: 'http://hydftestweb.natapp1.cc',
        target: 'http://192.168.80.128:80',
        changeOrigin: true,
        ws: true, // 代理websockets
        pathRewrite: {
          '^/changsha': '/changsha'
        }
      }
    },
    // 生产环境build用
    build: {
      assetsPublicPath: '/mobile'
    },
    disableHostCheck: true
  }
}
