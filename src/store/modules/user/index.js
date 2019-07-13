export default {
  state:{
    targetUser:''
  },
  getters:{
    targetUser:state =>state.targetUser
  },
  mutations:{
    SaveUserId(state,id){
      state.targetUser = id;
      sessionStorage.setItem('targetUser',id);
    }
  },
  actions:{
    SaveUserId({commit},id){
      commit('SaveUserId',id)
    }
  }
}
