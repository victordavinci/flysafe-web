<template>
  <div class="home">
    <div class="bg">FlySafe es un proyecto de notificación de sucesos de aviación civil</div>
    <div class="bg gray">
      <router-link v-if="loggedIn" class="rso-link" to="/notifications"><img alt="Safety Recommendations" title="Safety Recommendations" src="/img/rso.png" /></router-link>
    </div>
    <div class="bg">Aplicación</div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    loggedIn: function () {
      return this.$store.state.user !== null
    }
  }
}
</script>

<style scoped>
.bg {
  padding: 30px;
}

.gray {
  background: lightgray;
}

.rso-link {
  border: 1px solid #006ca7;
  display: inline-block;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  padding: 5px;
  text-align: center;
}

.rso-link img {
  width: 40px;
  height: 40px;
  vertical-align: middle;
}
</style>