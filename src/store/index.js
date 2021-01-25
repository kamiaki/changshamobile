import Vue from 'vue'
import Vuex from 'vuex'
import vuexContent1 from './vuexContent1'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    vuexContent1
  }
})
