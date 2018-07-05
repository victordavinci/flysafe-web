import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import Home from "./views/Home.vue";
import Stats from "./views/Stats.vue";
import Reports from "./views/Reports.vue";
import SafetyRecommendations from "./views/SafetyRecommendations.vue";
import NewReport from "./views/NewReport.vue";
import ReportsSearch from "./views/ReportsSearch.vue";
import AdministrationPage from "./views/AdministrationPage.vue";

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
      path: "/stats",
      name: "stats",
      component: Stats
    },
    {
      path: "/reports",
      name: "reports",
      component: Reports,
      meta: { requiresAuth: true }
    },
    {
      path: "/notifications",
      name: "notifications",
      component: SafetyRecommendations,
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
    },
    {
      path: "/administration",
      name: "administration",
      component: AdministrationPage,
      meta: { requiresAuth: true }
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
          localStorage.setItem("location", to.path);
          next();
        })
        .catch(error => {
          console.log(error);
          localStorage.setItem("location", from.path);
          next({ path: from.fullPath, replace: true });
        });
    } else {
      localStorage.setItem("location", to.path);
      next();
    }
  } else {
    localStorage.setItem("location", to.path);
    next();
  }
});

export default router;
