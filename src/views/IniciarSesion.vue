<template>
  <div id="firebaseui-auth-container"></div>
</template>

<script>
import firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default {
  name: "IniciarSesion",
  mounted: function() {
    var uiConfig = {
      signInSuccessUrl: window.location.origin,
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      tosUrl: "#/datos-personales",
      privacyPolicyUrl: "#/datos-personales"
    };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  }
};
</script>