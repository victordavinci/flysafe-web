import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: ["chartTitle", "chartLabels", "chartData"],
  watch: {
    chartTitle: {
      handler: function() {
        this.$data._chart.destroy();
        this.renderChart2();
      },
      deep: true
    },
    chartLabels: {
      handler: function() {
        this.$data._chart.destroy();
        this.renderChart2();
      },
      deep: true
    },
    chartData: {
      handler: function() {
        this.$data._chart.destroy();
        this.renderChart2();
      },
      deep: true
    }
  },
  methods: {
    renderChart2: function() {
      this.renderChart(
        {
          labels: this.chartLabels,
          datasets: [
            {
              label: this.chartTitle,
              backgroundColor: "#f97979",
              data: this.chartData
            }
          ]
        },
        {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      );
    }
  },
  mounted() {
    this.renderChart2();
  }
};
