<template>
    <div id="options">
        <ul>
            <li><router-link to="/datos-personales" class="button">{{ $t("message.account_data") }}</router-link></li>
            <li>
                <a href="#" @click.prevent="toggleLang" class="button">
                    <span v-if="lang=='en'">Cambiar a Español</span>
                    <span v-if="lang=='es'">Switch to English</span>
                </a>
            </li>
            <li><router-link to="/documentacion" class="button">{{ $t("message.help") }}</router-link></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Options",
    computed: {
        lang: function() {
            return this.$store.state.i18n.locale;
        },
    },
    methods: {
        toggleLang: function() {
            var lang = this.$store.state.i18n.locale;
            this.$store.state.i18n.locale = lang == "en" ? "es" : "en";
        }
    }
}
</script>

<style scoped>
ul {
    list-style: none;
    padding-left: 0;
}
li {
    padding: 0.25em 0;
    text-align: center;
}
</style>
