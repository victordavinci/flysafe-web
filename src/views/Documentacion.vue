<template>
    <div id="documentacion">
        <div class="bg-img"></div>
        <img src="/img/documentacion.jpg">
        <h1>{{ $t("message.documentation") }}</h1>
        <p>{{ $t("message.documentation_description") }}</p>
        <h2>{{ $t("message.supporting_documentation") }}</h2>
        <p>{{ $t("message.gdrive_access") }}:
            <a href="https://goo.gl/HCgwd1">{{ $t("message.documentation") }}</a>
        </p>
        <h2>{{ $t("message.source_code") }}</h2>
        <p>{{ $t("message.github_access") }}:
            <ul>
                <li><a href="https://github.com/victordavinci/flysafe-web">WebApp</a></li>
                <li><a href="https://github.com/victordavinci/flysafe-android">{{ $t("message.android_app") }}</a></li>
                <li><a href="https://github.com/victordavinci/flysafe-cloud-functions">{{ $t("message.firebase_functions") }}</a></li>
            </ul>
        </p>
    </div>
</template>

<style scoped>
#documentacion {
  max-width: 1024px;
  margin: 0 auto;
}

img {
  width: 100%;
  height: auto;
}
</style>