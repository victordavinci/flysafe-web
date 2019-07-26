import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    db: null,
    i18n: null,
    storage: null,
    pending: []
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
    },
    setI18n(state, i18n) {
      state.i18n = i18n;
    },
    addPendingVerification(state, email) {
      state.pending.push(email);
    }
  }
});
