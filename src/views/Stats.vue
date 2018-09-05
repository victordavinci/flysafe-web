<template>
  <div class="stats">
    <bar-chart :chartTitle="'Reportes'" :chartLabels="chartLabels" :chartData="chartData" :options="{responsive: true, maintainAspectRatio: false}" />
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
</template>

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
    },
    chartData: function() {
      var data = [];
      this.reports.forEach(r => {
        data.push(r[".value"]);
      });
      return data;
    }
  }
};
</script>
