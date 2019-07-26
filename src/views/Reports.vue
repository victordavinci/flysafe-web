<template>
    <div id="reports">
        <h1>{{ $t("message.reports") }}</h1>
        <div class="my-reports"><label><input type="checkbox" @change="myReports" v-model="propios" /> {{ $t("message.my_reports") }}</label></div>
        <div class="new-report"><router-link to="reportes/nuevo">{{ $t("message.new_report") }}</router-link></div>
        <hr class="clearfix" />
        <ReportsList :reports="reverse" />
    </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import ReportsList from "@/components/ReportsList.vue";

export default {
  name: "Reports",
  components: {
    Modal,
    ReportsList
  },
  data: function() {
    return {
      propios: false
    };
  },
  firebase: function() {
    return {
      reports: this.$store.state.db
        .ref("reports")
        .orderByChild("date")
        .limitToLast(20)
    };
  },
  methods: {
    myReports: function() {
      var reports,
        store = this.$store;
      if (!this.propios) {
        reports = store.state.db
          .ref("reports")
          .orderByChild("date")
          .limitToLast(20);
      } else {
        reports = store.state.db
          .ref("reports")
          .orderByChild("user")
          .equalTo(store.state.user.uid)
          .limitToLast(20);
      }
      this.$bindAsArray("reports", reports);
    }
  },
  computed: {
    reverse: function() {
      return Array.from(this.reports).sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    }
  }
};
</script>

<style scoped>
.my-reports {
  float: right;
}

.new-report a,
.new-report a:active {
  text-decoration: none;
  color: #2c3e50;
  border: 1px solid #c9c9c9;
  border-bottom-color: #a9a9a9;
  border-right-color: #a9a9a9;
  padding: 4px;
  border-radius: 2px;
  background: #e9e9e9;
}

.new-report a:active {
  border: 1px solid #c9c9c9;
  border-top-color: #a9a9a9;
  border-left-color: #a9a9a9;
}
</style>