<template>
    <div id="funcionalidades">
        <h1>{{ $t("message.features") }}</h1>
        <div class="w75">
            <h2>FlySafe Web</h2>
            <ul>
                <li>{{ $t("message.flysafe_info") }}</li>
                <li>{{ $t("message.apk_download") }}</li>
                <li>{{ $t("message.online_report_form") }}</li>
                <li>{{ $t("message.images_for_reports") }}</li>
                <li>{{ $t("message.latest_reports") }}</li>
                <li>{{ $t("message.exclusive_access") }}</li>
                <li>{{ $t("message.my_reports_status") }}</li>
                <li>{{ $t("message.safety_recommendations") }}</li>
                <li>{{ $t("message.stats") }}</li>
                <li>{{ $t("message.user_manual") }}</li>
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
                <li>{{ $t("message.language_es_en") }}</li>
                <li>{{ $t("message.latest_reports") }}</li>
                <li>{{ $t("message.user_registration") }}</li>
                <li>{{ $t("message.online_report_form_2") }}</li>
                <li>{{ $t("message.georeferencing") }}</li>
                <li>{{ $t("message.my_reports_status") }}</li>
                <li>{{ $t("message.news") }}</li>
                <li>{{ $t("message.in_case_of_accident_1") }}</li>
                <li>{{ $t("message.in_case_of_accident_2") }}</li>
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