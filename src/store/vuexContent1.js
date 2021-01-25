const vuexContent1 = {
  namespaced: true,
  state: {
    // 地图图层开关切换
    switches: {
      switch2_1: true, // 设备雷达
      switch2_2: false, // 设备电场
      switch2_3: false, // 设备闪电
      switch3_1: false, // 组合反射率拼图
      switch4_1: true, // 雷电散点
      switch4_2: false, // 雷电密度
      switch4_3: false, // 雷电强度
      switch4_4: false, // 雷电聚类
      switch5_1: false // 电场色斑图
    }
  },
  mutations: {
    setSwitches (state, data) {
      const propName = `switch${data[0]}_${data[1]}`
      state.switches[propName] = !state.switches[propName]
    }
  },
  actions: {
    switchesAction ({ commit }, data) {
      commit('setSwitches', data)
    }
  }
}

export default vuexContent1
