module.exports = {
  publicPath: process.env.ASSETS_PUBLIC_PATH,
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
    disableHostCheck: true
  }
}
