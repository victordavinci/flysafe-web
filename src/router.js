import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Reports from "./views/Reports.vue";
import NewReport from "./views/NewReport.vue";
import ReportsSearch from "./views/ReportsSearch.vue";

import firebase from "firebase/app";
require("firebase/auth");
require("firebase/database");

Vue.use(Router);

var router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/reports",
      name: "reports",
      component: Reports,
      meta: { requiresAuth: true }
    },
    {
      path: "/reports/new-report",
      name: "new-report",
      component: NewReport,
      meta: { requiresAuth: true }
    },
    {
      path: "/search",
      name: "search",
      component: ReportsSearch,
      metha: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then(function(result) {
          store.commit("login", result.user);
          next();
        })
        .catch(error => {
          console.log(error);
          next({ path: from.fullPath, replace: true });
        });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
