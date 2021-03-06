<template>
    <div :class="reportStyle">
        <div>
          <div class="report-date"><b>{{ $t("message.date") }}:</b> {{ report.date }}</div>
          <div class="report-type"><b>{{ $t("message.type") }}:</b> {{ $t(reportType) }}</div>
          <div class="aircrafts">
              <h4>{{ $t("message.aircraft_s") }}:</h4>
              <Aircraft v-for="aircraft in aircrafts" :key="aircraft.key" :aircraft="aircraft" />
          </div>
          <div class="narrative" v-if="report.narrative">
              <b>{{ $t("message.narrative") }}:</b> {{ report.narrative }}
          </div>
        </div>
        <div>
          <div class="photo" v-if="photo">
            <img :src="photo" alt="Foto" />
          </div>
        </div>
        <div v-if="admin" class="right">
          <select v-model.number="validated" @change="onChangeValidated">
            <option value="0">{{ $t("message.rep_not_validated") }}</option>
            <option value="1">{{ $t("message.rep_invalid") }}</option>
            <option value="2">{{ $t("message.rep_valid") }}</option>
            <option value="3">{{ $t("message.rep_solved") }}</option>
          </select>
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
    return {
      photo: null,
      validated: 0
    };
  },
  created: function() {
    var report = this.report;
    var vm = this;
    vm.validated = this.report.validated || 0;
    if (report.photoExt) {
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
    admin: function() {
      return this.$store.state.admin;
    },
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
  },
  methods: {
    onChangeValidated: function() {
      var db = this.$store.state.db;
      db.ref("reports/" + this.report[".key"])
        .update({ "validated": this.validated || null }, function(error) {
          if (error) {
            this.validated = this.report.validated || 0;
            alert("Ocurrió un error al actualizar el estado");
          }
        });
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

.report > div.right {
  float: right;
}

.report > div:not(:first-child) {
  margin-left: 50px;
}

.report::before {
  content: "●";
  float: right;
  margin-left: 0.5em;
}

.report.green::before,
.report.blue::before {
  content: "✓";
}

.report.green {
  color: #007b00;
}

.report.blue {
  color: #00007b;
}

.report.red::before {
  content: "✗";
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