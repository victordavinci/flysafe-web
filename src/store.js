import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    db: null
  },
  mutations: {
    setDb(state, db) {
      state.db = db;
    },
    login(state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = null;
    }
  }
});
