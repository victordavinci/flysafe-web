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
      let data;
      if (!Array.isArray(this.chartData)) {
        data = [
          {
            label: this.chartTitle,
            backgroundColor: "#f97979",
            data: this.chartData
          }
        ];
      } else {
        data = [
          { label: "Total Reports", backgroundColor: "#7979f9", data: [] },
          { label: "Not validated", backgroundColor: "#797979", data: [] },
          { label: "Rejected", backgroundColor: "#f97979", data: [] },
          { label: "Accepted", backgroundColor: "#79f979", data: [] }
        ];
        this.chartData[0].forEach(r => {
          data[0].data.push(r[".value"]);
        });
        this.chartData[1].forEach(r => {
          data[1].data.push(r[".value"]);
        });
        this.chartData[2].forEach(r => {
          data[2].data.push(r[".value"]);
        });
        this.chartData[3].forEach(r => {
          data[3].data.push(r[".value"]);
        });
      }
      this.renderChart(
        {
          labels: this.chartLabels,
          datasets: data
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
