<template>
  <div class="stats">
    <bar-chart :chartTitle="'Reports'" :chartLabels="chartLabels" :chartData="chartData" :options="{responsive: true, maintainAspectRatio: false}" />
  </div>
</template>

<script>
import BarChart from '@/components/BarChart.js'

export default {
  name: 'Stats',
  components: {
    BarChart
  },
  firebase: function() {
    return {
      reports: this.$store.state.db.ref("stats/reports-count").orderByKey().limitToLast(5)
    };
  },
  computed: {
    chartLabels: function () {
      var labels = [];
      this.reports.forEach((r) => {
        labels.push(r['.key'])
      })
      return labels
    },
    chartData: function () {
      var data = [];
      this.reports.forEach((r) => {
        data.push(r['.value'])
      })
      return data
    }
  }
}
</script>
