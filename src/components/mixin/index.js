export default {
  methods: {
    // 地图标记点图标
    getIconUrl (type) {
      let url
      switch (type) {
        case 'leida':
          url = require('@/assets/img/mapMark/leida/leida.png')
          break
        case 'dianchang':
          url = require('@/assets/img/mapMark/dianchang/dianchang.gif')
          break
        case 'shandian':
          url = require('@/assets/img/mapMark/shandian/shandian.png')
          break
        case 'leidiansandian':
          url = require('@/assets/img/mapMark/leidiansandian/leidiansandian.png')
          break
        case 'leidian_zs':
          url = require('@/assets/img/mapMark/leidian/zs.png')
          break
        case 'leidian_fs':
          url = require('@/assets/img/mapMark/leidian/fs.png')
          break
        case 'leidian_ys':
          url = require('@/assets/img/mapMark/leidian/ys.png')
          break
        default:
          url = require('@/assets/img/mapMark/leidiansandian/leidiansandian.png')
          break
      }
      return url
    }
  }
}
