<template>
    <div id="documentacion">
        <h1>{{ $t("message.help") }}</h1>
        <p>{{ $t("message.help_intro")}}</p>
        <p>{{ $t("message.latest_version") }}</p>
        <ul>
            <li>App: 1.4.3 ({{ $t("message.app_month") }} 2019)</li>
            <li>Web: 1.5 ({{ $t("message.web_month") }} 2019)</li>
        </ul>
        <p>{{ $t("message.user_manual_h") }}: <a href="#">link</a></p>
        <p>{{ $t("message.installation_manual_h") }}: <a href="#">link</a></p>
        <h2>FAQ</h2>
        <ol>
            <li>
                {{ $t("message.faq1") }}<br>
                &bull; {{ $t("message.faq1a") }}
            </li>
            <li>
                {{ $t("message.faq2") }}<br>
                &bull; {{ $t("message.faq2a") }}
            </li>
            <li>
                {{ $t("message.faq3") }}<br>
                &bull; {{ $t("message.faq3a") }}
            </li>
            <li>
                {{ $t("message.faq4") }}<br>
                &bull; {{ $t("message.faq4a") }}
            </li>
        </ol>
        <div class="bg-img"></div>
        <img src="/img/documentacion.jpg">
        <h2>{{ $t("message.documentation") }}</h2>
        <p>{{ $t("message.documentation_description") }}</p>
        <p>{{ $t("message.gdrive_access") }}:
            <a href="https://goo.gl/HCgwd1">{{ $t("message.documentation") }}</a>
        </p>
        <h3>{{ $t("message.source_code") }}</h3>
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