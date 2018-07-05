<template>
  <div id="app">
    <div id="header">
      <router-link to="/"><img class="logo" src="/img/icon.png" /></router-link>
      <div class="align-right">
        <a href="#" @click.prevent="toggle" v-if="!currentUser"><span>Login</span></a>
        <a href="#" @click.prevent="toggle" v-if="currentUser"><span>Logout</span></a>
      </div>
    </div>
    <div id="nav" v-if="currentUser !== null">
        <router-link to="/">Home</router-link>
        <router-link to="/reports" v-if="currentUser">Reports</router-link>
        <router-link to="/search" v-if="currentUser">Search</router-link>
        <router-link to="/stats">Stats</router-link>
    </div>
    <div id="app-body">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
    <div id="footer">
      &copy; 2018 - FlySafe v1.0
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'

export default {
  name: 'App',
  computed: {
    currentUser: function () {
      return this.$store.state.user
    }
  },
  methods: {
    toggle: function () {
      var vm = this
      if (!this.currentUser) {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithRedirect(provider).then(function (result) {
          vm.$store.commit('login', result.user)
        }).catch(error => console.log(error))
      } else {
        firebase.auth().signOut().then(function () {
          vm.$store.commit('logout')
          vm.$router.replace('/')
        }).catch(error => console.log(error))
      }
    }
  }
}
</script>

<style>
html, body {
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
}

#header .logo, #header .align-right {
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
  /*color: #42b983;*/
  color: rgb(3, 155, 229);
}
</style>
