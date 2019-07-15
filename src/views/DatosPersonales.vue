<template>
    <div id="datos-personales">
        <h1>Datos personales</h1>
        <p>FlySafe cumple con los requerimientos de la Ley 25.326 en cuanto a la protección de datos personales, los usuarios pueden solicitar en cualquier momento la información personal que recopila la aplicación, asimismo puede solicitar que la información sea eliminada.</p>
        <p><a href="https://drive.google.com/file/d/1XD4MlDiqAGX8pN4A95s5ev5TDnxbF4RS/view" target="_blank" rel="noopener noreferrer">Formulario de solicitud de información</a></p>
        <p><a href="http://servicios.infoleg.gob.ar/infolegInternet/anexos/60000-64999/64790/texact.htm" target="_blank" rel="noopener noreferrer"><small>Ley de protecci&oacute;n de datos personales 25.326</small></a></p>
        <p v-if="currentUser">Puede eliminar su cuenta haciendo click <a href="#" @click.prevent="onDelte">aquí</a>.</p>
    </div>
</template>

<script>
import firebase from "firebase/app";

export default {
    name: "DatosPersonales",
    computed: {
        currentUser: function() {
        return this.$store.state.user;
        }
    },
    methods: {
        onDelte: function() {
            var vm = this;
            if (confirm("¿Seguro que quiere eliminar su cuenta de usuario?")) {
                var user = vm.$store.state.user;
                user.delete().then(function() {
                    alert("Su cuenta de usuario ha sido eliminada");
                    firebase
                    .auth()
                    .signOut()
                    .then(function() {
                        vm.$store.commit("logout");
                        vm.$router.replace("/");
                    })
                    .catch(error => console.log(error));
                }).catch(function(err) {
                    alert("Ha habido un error al eliminar su cuenta de usuario.\n\n" + err.message);
                });
            }
        }
    }
}
</script>