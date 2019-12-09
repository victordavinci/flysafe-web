import Vue from "vue";
import { rtdbPlugin as VueFire } from 'vuefire'
import VueI18n from "vue-i18n";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faLock,
  faClipboardList,
  faDownload,
  faFileAlt
} from "@fortawesome/free-solid-svg-icons";
import { faAndroid } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import * as VueGoogleMaps from "vue2-google-maps";
import messages from "./langs";

import firebase from "firebase/app";
require("firebase/auth");
require("firebase/database");
require("firebase/storage");

library.add(faLock, faAndroid, faClipboardList, faDownload, faFileAlt);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(VueFire)
Vue.use(VueI18n);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAIfcF4g2UdZcrgsKAxxJ1odUoFL_o7LdQ"
  }
});

var app;
var config = {
  apiKey: "AIzaSyAIfcF4g2UdZcrgsKAxxJ1odUoFL_o7LdQ",
  authDomain: "webapp-0.firebaseapp.com",
  databaseURL: "https://webapp-0.firebaseio.com",
  projectId: "webapp-0",
  storageBucket: "webapp-0.appspot.com",
  messagingSenderId: "174913995232"
};
var firebaseApp = firebase.initializeApp(config);
store.commit("setDb", firebaseApp.database());
store.commit("setStorage", firebase.storage());

const navLang = navigator.language.split("-")[0];
const i18n = new VueI18n({
  locale: navLang == "es" ? "es" : "en",
  messages,
});
store.commit("setI18n", i18n);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if (!user.emailVerified) {
      if (store.state.pending.indexOf(user.email) < 0) {
        user
          .sendEmailVerification()
          .then(function() {
            store.commit("addPendingVerification", user.email);
            alert(i18n.t("message.email_sent"));
            firebase.auth().signOut();
          })
          .catch(function() {
            alert(i18n.t("message.email_failure"));
            firebase.auth().signOut();
          });
      }
    } else {
      store.commit("login", user);
      if ((localStorage.getItem("location") || "/") === "/") {
        router.push("/reportes");
      }
    }
  } else {
    store.commit("logout");
  }
  if (!app) {
    app = new Vue({
      router,
      store,
      i18n,
      render: h => h(App)
    }).$mount("#app");
  }
});
