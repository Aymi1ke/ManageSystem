import Vue from 'vue'
import Vuex from 'vuex'
import conModules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:conModules,
    state:{
      options: [],
      activeIndex: '',
    },
  mutations : {
    // 添加tabs
    add_tabs(state, data) {
      state.options.push(data)
      console.log(state.options)
    },
    // 删除tabs
    delete_tabs(state, route) {
      let index = 0;
      for (let option of state.options) {
        if (option.route === route) {
          break;
        }
        index++;
      }
      state.options.splice(index, 1);
    },
    // 设置当前激活的tab
    set_active_index(state, index) {
      state.activeIndex = index;
    },

  }
})












