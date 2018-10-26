<template>
  <div class="home">
    <h1>FlySafe</h1>
    <div class="bg-img"></div>
    <div class="bg">La visión general del proyecto FlySafe, es la de aportar una herramienta tecnológica y ágil en el marco del proyecto de integración de sistemas de la Escuela Da Vinci; a la gestión de la seguridad operacional aérea y establecer los lineamientos para el proceso de mejora continua de la misma; la seguridad va más allá del presente proyecto y abre una ventana a futuros sistemas autogestionados.</div>
    <div class="bg gray">
      <router-link v-if="loggedIn" class="rso-link" to="/rso"><img alt="Recomendaciones de seguridad" title="Recomendaciones de seguridad" src="/img/rso.png" /></router-link>
      <h2>Recomendaciones sobre seguridad operacional</h2>
      <p>Las RSO son la principal herramienta que tiene el sistema aeron&aacute;utico para evitar futuros accidentes</p>
    </div>
    <div class="bg icons">
      <h1>Novedades</h1>
      <router-link to="/datos-personales">
        <div class="icon"><font-awesome-icon :icon="['fas', 'lock']" size="5x" /></div>
        <div class="text">Datos personales</div>
      </router-link>
      <router-link to="/app">
        <div class="icon"><font-awesome-icon :icon="['fab', 'android']" size="5x" /></div>
        <div class="text">App Android</div>
      </router-link>
      <router-link to="/funcionalidades">
        <div class="icon"><font-awesome-icon :icon="['fas', 'clipboard-list']" size="5x" /></div>
        <div class="text">Funcionalidades</div>
      </router-link>
      <router-link to="/documentacion">
        <div class="icon"><font-awesome-icon :icon="['fas', 'file-alt']" size="5x" /></div>
        <div class="text">Documentación</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    loggedIn: function() {
      return this.$store.state.user !== null;
    }
  }
};
</script>

<style scoped>
.home {
  max-width: 1024px;
  margin: 0 auto;
}

.gray h2 {
  margin: 0;
}

.bg {
  padding: 30px;
  overflow: auto;
}

.gray {
  background: lightgray;
}

.icons {
  text-align: center;
}

.icons a {
  display: inline-block;
  text-decoration: none;
  margin: 0 1em;
  background: #006ca7;
  border-radius: 5px;
  box-shadow: 1px 1px 6px #ccc;
  overflow: hidden;
}

.icons .icon,
.icons .text {
  padding: 1em;
  width: 10em;
}

.icons .icon {
  color: #fff;
  width: 100%;
  height: 10em;
  padding: 2.5em 0;
}

.icons .text {
  color: #777;
  background: #fff;
  font-size: 1.2em;
  height: 4em;
  transition: 0.25s all;
}

.icons a:hover .text {
  color: #fff;
  background: #006ca7;
}

.bg-img {
  height: 300px;
  background: url(/img/portada.jpg);
  background-size: cover;
  background-position-y: 0%;
}

.rso-link {
  border: 1px solid #006ca7;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  padding: 5px;
  text-align: center;
  float: left;
  margin-right: 1em;
}

.rso-link img {
  width: 40px;
  height: 40px;
  vertical-align: middle;
}
</style>