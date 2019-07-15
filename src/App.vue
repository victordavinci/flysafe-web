<template>
  <div id="app">
    <div id="header">
      <router-link to="/"><img class="logo" src="/img/icon.png" /></router-link>
      <div class="align-right">
        <span v-if="currentUser">{{ currentUser.email }}</span>
        <a href="#" @click.prevent="toggle" v-if="!currentUser"><span>Iniciar sesi&oacute;n</span></a>
        <a href="#" @click.prevent="toggle" v-if="currentUser"><span>Cerrar sesi&oacute;n</span></a>
      </div>
    </div>
    <div id="nav" v-if="currentUser !== null">
        <router-link to="/">Inicio</router-link>
        <router-link to="/reportes" v-if="currentUser">Reportes</router-link>
        <router-link to="/busqueda" v-if="currentUser">B&uacute;squeda</router-link>
        <router-link to="/estadisticas">Estad&iacute;sticas</router-link>
    </div>
    <div id="app-body">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
    <div id="footer">
      &copy; 2018 - 2019 - FlySafe v1.2
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";

export default {
  name: "App",
  computed: {
    currentUser: function() {
      return this.$store.state.user;
    }
  },
  methods: {
    toggle: function() {
      var vm = this;
      if (!this.currentUser) {
        vm.$router.replace("/iniciar-sesion");
      } else {
        firebase
          .auth()
          .signOut()
          .then(function() {
            vm.$store.commit("logout");
            vm.$router.replace("/");
          })
          .catch(error => console.log(error));
      }
    }
  }
};
</script>

<style>
html,
body {
  margin: 0;
}

.clearfix {
  clear: both;
}

hr {
  border: none;
  border-bottom: 1px solid lightgray;
}

* {
  box-sizing: border-box;
}

#header {
  background: rgb(3, 155, 229);
  height: 100px;
  color: #fff;
}

#header .logo,
#header .align-right {
  width: auto;
  height: 80px;
  margin-top: 10px;
  margin-left: 20px;
}

#header .align-right {
  float: right;
  display: table;
  margin-right: 20px;
}

#header .align-right > span {
  padding-right: 10px;
}

#header .align-right > span,
#header .align-right a {
  vertical-align: middle;
  display: table-cell;
  color: #fff;
  text-decoration: none;
}

#header .align-right a span {
  padding: 10px;
  border: 1px solid #fff;
  border-radius: 3px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #7c858d;
}

#app-body {
  margin: 0 100px;
  min-height: 400px;
}

@media all and (max-width: 600px) {
  #app-body {
    margin: 0 20px;
  }
}

#footer {
  background: lightgray;
  text-align: right;
  color: #444;
  font-size: small;
  padding: 16px;
}

#nav {
  text-align: center;
}

#nav a {
  color: #2c3e50;
  padding: 16px;
  text-decoration: none;
  display: inline-block;
}

#nav a:last-child {
  margin-right: 0;
}

#nav a:hover {
  background: #f5f5f5;
}

#nav a.router-link-exact-active {
  color: rgb(3, 155, 229);
}
</style>
