import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    db: null,
    storage: null
  },
  mutations: {
    setDb(state, db) {
      state.db = db;
    },
    setStorage(state, storage) {
      state.storage = storage;
    },
    login(state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = null;
    }
  }
});
