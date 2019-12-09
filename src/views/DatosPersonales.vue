<template>
    <div id="datos-personales">
        <h1>{{ $t("message.personal_information") }}</h1>
        <p>{{ $t("message.personal_information_description") }}</p>
        <p><a href="https://drive.google.com/file/d/1XD4MlDiqAGX8pN4A95s5ev5TDnxbF4RS/view" target="_blank" rel="noopener noreferrer">{{ $t("message.information_request_form") }}</a></p>
        <p><a href="http://servicios.infoleg.gob.ar/infolegInternet/anexos/60000-64999/64790/texact.htm" target="_blank" rel="noopener noreferrer"><small>{{ $t("message.pii_law") }}</small></a></p>
        <p v-if="currentUser">
            <i18n path="message.delete_account_link" tag="span">
                <a href="#" @click.prevent="onDelte">{{ $t("message.here") }}</a>
            </i18n>
        </p>
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
            if (confirm(vm.$t("message.delete_account_q"))) {
                var user = vm.$store.state.user;
                user.delete().then(function() {
                    alert(vm.$t("message.account_deleted"));
                    firebase
                    .auth()
                    .signOut()
                    .then(function() {
                        vm.$store.commit("logout");
                        vm.$router.replace("/");
                    })
                    .catch(error => console.log(error));
                }).catch(function(err) {
                    alert(vm.$t("message.account_deleted_error") + "\n\n" + err.message);
                });
            }
        }
    }
}
</script>
