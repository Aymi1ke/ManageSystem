export default {
  state: {
    pId:'',
    name:'',
    rDesc:''
  },
  mutations: {
    set_pId (state, pId) {
      state.pId = pId
      sessionStorage.setItem('pId',pId)
    },
    set_Name(state,name){
      state.name = name
      sessionStorage.setItem('name',name)
    },
    showRDesc(state,rDesc){
      state.rDesc = rDesc
      sessionStorage.setItem('rDesc',rDesc)
    },
    LOGOUT(state){
      sessionStorage.clear();
      state.pId="";
      state.name="";
      state.rDesc=""
    }
  },
  actions: {
    set_pId ({commit}, pId) {
     commit('set_pId', pId)
    },
    set_Name({commit},name){
      commit('set_Name', name)
    },
    showRDesc({commit},rDesc){
      commit('showRDesc', rDesc)
    },
  },
  getters: {
    pId: state => state.pId,
    name: state => state.name,
    rDesc:state => state.rDesc
  },

}
