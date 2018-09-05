<template>
    <div id="funcionalidades">
        <h1>Funcionalidades</h1>
        <div class="w75">
            <h2>FlySafe Web</h2>
            <ul>
                <li>Información sobre FlySafe</li>
                <li>Descarga de APK</li>
                <li>Formulario de denuncia online usuarios registrados</li>
                <li>Últimos reportes denunciados</li>
                <li>Acceso exclusivo para usuarios registrados</li>
                <li>Estado actual de mis reportes</li>
                <li>Recomendaciones de seguridad</li>
                <li>Estadísticas</li>
                <li>Manual de usuario / reglamentación vigente</li>
            </ul>
        </div>
        <div class="w25 r img">
            <img src="/img/screenshots/web.png" />
        </div>
        <div class="clearfix"></div>
        <hr />
        <div class="w75 r">
            <h2>FlySafe App</h2>
            <ul>
                <li>Idioma Español / inglés</li>
                <li>Últimas reportes</li>
                <li>Registro de usuarios</li>
                <li>Formulario de reportes para usuarios registrados</li>
                <li>Imágenes para reportes</li>
                <li>Georeferenciación</li>
                <li>Estado actual de mis reportes</li>
                <li>Novedades</li>
                <li>Información para actuar en caso de accidente aéreo (Personal aeronáutico)</li>
                <li>Información para tener en cuenta ante un accidente aéreo (Público en Gral.)</li>
            </ul>
        </div>
        <div class="w25 img">
            <img src="/img/screenshots/android.png" />
        </div>
    </div>
</template>

<style scoped>
#funcionalidades {
  overflow: hidden;
  max-width: 800px;
  margin: 0 auto;
}
.clearfix {
  clear: both;
}
.w25,
.w50,
.w75 {
  float: left;
}
.w25 {
  width: 30%;
}
.w50 {
  width: 50%;
}
.w75 {
  width: 70%;
}
.w25 img,
.w50 img {
  max-width: 100%;
  max-height: 300px;
}
.r {
  float: right;
}
.img {
  text-align: left;
}
.img.r {
  text-align: right;
}
</style>