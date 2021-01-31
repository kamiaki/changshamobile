import Vue from 'vue'
import Vuex from 'vuex'
import vuexContent1 from './vuexContent1'
import vuexContent2 from './vuexContent2'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    vuexContent1,
    vuexContent2
  }
})
