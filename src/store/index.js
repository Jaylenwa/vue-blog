import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //全局配置token和userInfo
    token: localStorage.getItem("token"),
    userInfo: JSON.parse(sessionStorage.getItem("userInfo")) //反序列化成对象
  },
  mutations: { //理解为java的set
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem("token",token) //存入localStorage
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      //存入sessionStorage中 一次会话 浏览器关闭就会丢失
      sessionStorage.setItem("userInfo",JSON.stringify(userInfo))       //sessionStorage不能存对象 要进行序列化
    },
    REMOVE_INFO: (state) => {
      state.token = ''
      state.userInfo = {}
      localStorage.setItem("token",'')
      sessionStorage.setItem("userInfo",JSON.stringify(""))
    }
  },
  getters: { //理解为java的get
    getUser: state => {
      return state.userInfo
    }
  },
  actions: {
  },
  modules: {
  }
})
