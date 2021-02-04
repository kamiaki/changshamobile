const vuexContent2 = {
  namespaced: true,
  state: {
    // 地图图层开关切换
    switches: {
      switch6_1: false, // 雷达
      switch6_2: false, // 电场
      switch6_3: false // 闪电
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

export default vuexContent2
