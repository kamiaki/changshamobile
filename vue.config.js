module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  lintOnSave: false,
  // devServer: {
  //   proxy: {
  //     '/changsha': {
  //       target: 'http://hydftestweb.natapp1.cc',
  //       changeOrigin: true,
  //       ws: true, // 代理websockets
  //       pathRewrite: {
  //         '^/changsha': '/changsha'
  //       }
  //     }
  //   }
  // }
}
