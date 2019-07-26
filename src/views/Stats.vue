<template>
  <div class="stats">
    <h1>{{ $t("message.stats") }}</h1>
    <p>{{ $t("message.stats_description") }}</p>
    <bar-chart :chartTitle='$t("message.reports")' :chartLabels="chartLabels" :chartData="[reports, reportsUndef, reportsRed, reportsGreen]" :options="{responsive: true, maintainAspectRatio: false}" />
    <h1>{{ $t("message.reports_map") }}</h1>
    <div class="row">
      <div class="col-6">
        <div id="map">
          <GmapMap
            :center="{lat:-38, lng:-61}"
            :zoom="4"
            map-type-id="terrain"
            style="width: 500px; height: 600px"
          >
              <GmapMarker
                :key="index"
                v-for="(m, index) in locations"
                :position="{lat: m.lat, lng: m.lng}"
              />
          </GmapMap>
        </div>
      </div>
      <div class="col-6">
        <p>{{ $t("message.reports_map_1") }}</p>
        <p>{{ $t("message.reports_map_2") }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media all and (min-width: 1300px) {
  .row {
    overflow: hidden;
    margin-bottom: 12px;
  }
  .col-6 {
    width: 50%;
    float: left;
  }
}
</style>

<script>
import BarChart from "@/components/BarChart.js";

export default {
  name: "Stats",
  components: {
    BarChart
  },
  firebase: function() {
    return {
      reports: this.$store.state.db
        .ref("stats/reports-count")
        .orderByKey()
        .limitToLast(5),
      reportsUndef: this.$store.state.db
        .ref("stats/reports-count-undef")
        .orderByKey()
        .limitToLast(5),
      reportsRed: this.$store.state.db
        .ref("stats/reports-count-red")
        .orderByKey()
        .limitToLast(5),
      reportsGreen: this.$store.state.db
        .ref("stats/reports-count-green")
        .orderByKey()
        .limitToLast(5),
      locations: this.$store.state.db
        .ref("locations")
        .orderByChild("date")
        .limitToLast(100)
    };
  },
  computed: {
    chartLabels: function() {
      var labels = [];
      this.reports.forEach(r => {
        labels.push(r[".key"]);
      });
      return labels;
    }
  }
};
</script>
