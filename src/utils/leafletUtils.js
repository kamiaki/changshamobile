export const getToken = () => {
  return '65361667bd325ff9c9aa9283a0a19efd'
}

export const getTilesUrl = number => {
  let url
  const token = getToken()
  switch (number) {
    case 1:
      // 地形图：
      url = 'http://t4.tianditu.gov.cn/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk='
      break
    case 2:
      // 街道图：
      url = 'http://t4.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk='
      break
    case 3:
      // 影像图：
      url = 'http://t4.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk='
      break
    case 4:
      // 影像标注：
      url = 'http://t4.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk='
      break
    case 5:
      // 地形标注：
      url = 'http://t4.tianditu.gov.cn/DataServer?T=cta_w&x={x}&y={y}&l={z}&tk='
      break
    case 6:
      // 矢量标注：
      url = 'http://t4.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk='
      break
    default:
      break
  }
  return url + token
}
