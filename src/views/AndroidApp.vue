<template>
    <div id="app">
        <h1>{{ $t("message.android_app") }}</h1>
        <div class="bg-img"></div>
        <p>{{ $t("message.app_description_1") }}</p>
        <p>{{ $t("message.app_description_2") }}</p>
        <p><a href="/app/flysafe-1.0.apk" class="download"><font-awesome-icon :icon="['fas', 'download']" size="lg" /> {{ $t("message.download") }} flysafe-1.0.apk</a> (SHA256: 25509bf09c433636569f14141c1fb49b6cfc7a381113fcac3890ee5ee91e0800)</p>
        <p><a href="/app/flysafe-1.1.apk" class="download"><font-awesome-icon :icon="['fas', 'download']" size="lg" /> {{ $t("message.download") }} flysafe-1.1.apk</a> (SHA256: d33441b8bef5884f0a80e767db08d3761eb10ff541140ceedb9b0f9577c18b8c)</p>
        <p><a href="/app/flysafe-1.2.apk" class="download"><font-awesome-icon :icon="['fas', 'download']" size="lg" /> {{ $t("message.download") }} flysafe-1.2.apk</a> (SHA256: 2f51d59edeee4b9a67e75f0d58a6e14f2340aedbd8dcda4909586a305a4ae141)</p>
        <p><a href="/app/flysafe-1.3.apk" class="download"><font-awesome-icon :icon="['fas', 'download']" size="lg" /> {{ $t("message.download") }} flysafe-1.3.apk</a> (SHA256: 1a0467403b34ccfd065aa69b192b8f9a95315e56ab6d72d2f61708004d732763)</p>
        <p><a href="/app/flysafe-1.4.apk" class="download"><font-awesome-icon :icon="['fas', 'download']" size="lg" /> {{ $t("message.download") }} flysafe-1.4.apk</a> (SHA256: 96ce8a7b86cee25c6bb06a579991807d26207660da456e9c51b6048c77a47fd1)</p>
    </div>
</template>

<style scoped>
#app {
  max-width: 1024px;
  margin: 0 auto;
}

.download {
  text-decoration: none;
  border: 1px solid;
  border-radius: 10px;
  padding: 0.5em;
  display: inline-block;
}

.bg-img {
  height: 300px;
  background: url(/img/portada.jpg);
  background-size: cover;
  background-position-y: 0%;
}
</style>
