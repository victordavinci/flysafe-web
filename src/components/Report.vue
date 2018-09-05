<template>
    <div :class="reportStyle">
        <div>
          <div class="report-date"><b>Fecha:</b> {{ report.date }}</div>
          <div class="report-type"><b>Tipo:</b> {{ reportType }}</div>
          <div class="aircrafts">
              <h4>Aeronaves:</h4>
              <Aircraft v-for="aircraft in aircrafts" :key="aircraft.key" :aircraft="aircraft" />
          </div>
          <div class="narrative" v-if="report.narrative">
              <b>Narrativa:</b> {{ report.narrative }}
          </div>
        </div>
        <div>
          <div class="photo" v-if="photo">
            <img :src="photo" alt="Foto" />
          </div>
        </div>
    </div>
</template>

<script>
import datatypes from "@/datatypes";
import Aircraft from "@/components/Aircraft.vue";

export default {
  name: "Report",
  components: {
    Aircraft
  },
  props: ["report"],
  data: function() {
    return { photo: null };
  },
  created: function() {
    var report = this.report;
    if (report.photoExt) {
      var vm = this;
      this.$store.state.storage
        .ref()
        .child("photos/" + report[".key"] + "." + report.photoExt)
        .getDownloadURL()
        .then(function(url) {
          vm.photo = url;
        });
    }
  },
  computed: {
    aircrafts: function() {
      var a = [];
      for (var i in this.report.aircrafts) {
        a.push({
          registration: i,
          type: this.report.aircrafts[i].type
        });
      }
      return a;
    },
    reportType: function() {
      return datatypes.getOccurrenceTypeName(this.report.type);
    },
    reportStyle: function() {
      var validated = this.report.validated,
        color =
          validated !== undefined
            ? ["gray", "red", "green", "blue"][validated]
            : "gray",
        style = { report: true };
      style[color] = true;
      return style;
    }
  }
};
</script>

<style scoped>
.report {
  border: 1px solid gray;
  padding: 8px;
  border-radius: 4px;
  overflow: hidden;
}

.report > div {
  display: inline-block;
  vertical-align: top;
}

.report > div:not(:first-child) {
  margin-left: 50px;
}

.report.green::before,
.report.blue::before {
  content: "✓";
  float: right;
}

.report.green {
  color: #007b00;
}

.report.blue {
  color: #00007b;
}

.report.red::before {
  content: "✗";
  float: right;
}

.report.red {
  color: #ab0000;
}

.report .photo img {
  max-width: 100px;
  max-height: 100px;
}

.report .aircrafts > h4 {
  margin: 0;
}

.report .aircrafts > div {
  margin-left: 12px;
}
</style>