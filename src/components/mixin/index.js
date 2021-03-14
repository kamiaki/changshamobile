export default {
  methods: {
    // 地图标记点图标
    getIconUrl (type, isActive) {
      let url
      switch (type) {
        case 'leida':
          url = isActive ? require('@/assets/img/mapMark/leida/leida.png') : require('@/assets/img/mapMark/leida/leida2.png')
          break
        case 'dianchang':
          url = isActive ? require('@/assets/img/mapMark/dianchang/dianchang.gif') : require('@/assets/img/mapMark/dianchang/dianchang2.gif')
          break
        case 'shandian':
          url = isActive ? require('@/assets/img/mapMark/shandian/shandian.png') : require('@/assets/img/mapMark/shandian/shandian2.png')
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
