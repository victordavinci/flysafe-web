<template>
  <div id="app">
    <div id="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/reports" v-if="currentUser">Reports</router-link>
        <router-link to="/search" v-if="currentUser">Search</router-link>
        <router-link to="/about">About</router-link>
        <a href="#" @click.prevent="toggle" v-if="!currentUser">Login</a>
        <a href="#" @click.prevent="toggle" v-if="currentUser">Logout</a>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
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

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  margin-right: 6px;
}

#nav a:last-child {
  margin-right: 0;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
