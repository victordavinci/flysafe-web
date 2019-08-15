<template>
    <div id="options">
        <ul>
            <li><router-link to="/datos-personales">{{ $t("message.account_data") }}</router-link></li>
            <li>
                <a href="#" @click.prevent="toggleLang">
                    <span v-if="lang=='en'">Cambiar a Español</span>
                    <span v-if="lang=='es'">Switch to English</span>
                </a>
            </li>
            <li><router-link to="/documentacion">{{ $t("message.help") }}</router-link></li>
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
li a {
    color: #222;
    text-decoration: none;
    display: inline-block;
    width: 15em;
    border: 1px solid #f5f5f5;
    border-radius: 0.25em;
    padding: 0.5em 0;
    background: #f5f5f5;
    background: linear-gradient(#f5f5f5, #e5e5e5);
    transition: border-color 0.5s;
}
li a:hover {
    border: 1px solid #d5d5d5;
}
li a:active {
    background: linear-gradient(#e5e5e5, #f5f5f5);
}
</style>
