<template>
    <div id="search">
        <h1>B&uacute;squeda</h1>
        <p>
          Las b&uacute;squedas de reportes de sucesos, est&aacute;n asociadas a la matr&iacute;cula de las aeronaves ya que es el dato mas relevante en un suceso.
          La matr&iacute;cula es la identificacion de la aeronave, por lo que si una aeronave tiene mas de un suceso mediante este formulario se podran ver todos
          los eventos relacionados con la aeronave.
        </p>
        <input type="text" placeholder="Matrícula" v-model.trim="registration" @keyup.enter="onSearch" />
        <button @click="onSearch">Buscar</button>
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
        this.searchMessage = "Se debe especificar la matrícula";
        return;
      }
      this.searchMessage = "Buscando ...";
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
            this.searchMessage = "No se han encontrado reportes";
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
