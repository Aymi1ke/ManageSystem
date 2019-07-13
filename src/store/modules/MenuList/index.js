export default {
  state:{
    MenuList:[],
  },
  getters:{
    MenuList:state =>state.MenuList
  },
  mutations:{
    SET_MENU(state,MenuList){
      state.MenuList = MenuList;
    },

  },
  actions:{
    SET_MENU({commit},MenuList){
      commit('SET_MENU',MenuList)
    }
  }
}
