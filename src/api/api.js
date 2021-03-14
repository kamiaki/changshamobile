import request from '@/utils/request'

// //////////////////////////////////////设备//////////////////////////////////////
export function axiosGetElectricFieldStations (data) { // 设备-电场
  return request({ url: '/mainPage/map/axiosGetElectricFieldStations', method: 'post', data })
}
export function axiosGetThunderStations (data) { // 设备-闪电
  return request({ url: '/mainPage/map/axiosGetThunderStations', method: 'post', data })
}

// //////////////////////////////////////雷电//////////////////////////////////////
export function axiosGetLightningScatter (data) { // 散点
  return request({ url: '/mainPage/map/axiosGetLightningScatter', method: 'post', data })
}

// //////////////////////////////////////电场//////////////////////////////////////
export function axiosGetElectricFieldPattern (data) { // 色斑图
  return request({ url: '/mainPage/map/axiosGetElectricFieldPattern', method: 'post', data })
}

// //////////////////////////////////////统计//////////////////////////////////////
export function axiosGetElectricChartData (data) { // 电场曲线和散点图
  return request({ url: '/mainPage/map/axiosGetElectricChartData', method: 'post', data })
}
export function axiosGetLightningFrequencyChartTable (data) { // 雷电数量
  return request({ url: '/mainPage/detail2/axiosGetLightningFrequencyChartTable', method: 'post', data })
}

// //////////////////////////////////////雷达预警//////////////////////////////////////
export function axiosGetWarningProduct (data) { // 预警色斑图
  return request({ url: '/warning/map/axiosGetWarningProduct', method: 'post', data })
}
