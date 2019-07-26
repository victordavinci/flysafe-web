<template>
    <div id="search">
        <h1>{{ $t("message.search") }}</h1>
        <p>{{ $t("message.search_description") }}</p>
        <input type="text" :placeholder='$t("message.registration")' v-model.trim="registration" @keyup.enter="onSearch" />
        <button @click="onSearch">{{ $t("message.search_v") }}</button>
        <hr />
        <div v-if="!reports.length">{{ searchMessage }}</div>
        <ReportsList v-if="reports.length" :reports="reports" />
    </div>
</template>

<script>
import ReportsList from "@/components/ReportsList.vue";

export default {
  name: "ReportsSearch",
  components: {
    ReportsList
  },
  data: function() {
    return {
      registration: "",
      searchMessage: "",
      reports: []
    };
  },
  methods: {
    onSearch: function() {
      var vm = this;
      var db = this.$store.state.db;
      if (this.registration === "") {
        this.searchMessage = this.$t("message.registration_required");
        return;
      }
      this.searchMessage = this.$t("message.searching");
      vm.$set(vm, "reports", []);
      db.ref("aircrafts")
        .orderByKey()
        .equalTo(this.registration)
        .limitToLast(20)
        .once("value")
        .then(s => {
          var a = [];
          s.forEach(s => {
            a = [...new Set(a.concat(Object.keys(s.val())))];
          });
          var rs = [];
          if (!a.length) {
            this.searchMessage = this.$t("message.no_reports_found");
          }
          a.forEach(k => {
            db.ref("reports/" + k)
              .once("value")
              .then(r => {
                var val = r.val();
                rs = rs.concat({
                  ".key": k,
                  date: val.date,
                  type: val.type,
                  aircrafts: val.aircrafts
                });
                vm.$set(vm, "reports", rs);
              });
          });
        });
    }
  }
};
</script>
