<template>
    <div id="new-report">
        <h3>New Report</h3>
        <div class="text-center error" v-if="reportError">{{ reportError }}</div>
        <form autocomplete="off" @submit.prevent="onSubmit">
            <div class="row">
                <label for="date"><b><span title="Requerido">*</span>Fecha: </b></label>
                <input type="date" v-model.trim="date" required id="date" placeholder="yyyy-MM-dd" />
            </div>
            <div class="row">
                <label for="type"><b><span title="Requerido">*</span>Tipo: </b></label>
                <select required v-model="occurrenceType">
                    <option value="" disabled>Elija una opci&oacute;n</option>
                    <option v-for="ot in occurrenceTypes" :key="ot.value" :value="ot.value">{{ ot.label }}</option>
                </select>
            </div>
            <div class="row">
                <label for="narrative"><b><span title="Requerido">*</span>Narrativa: </b></label>
                <textarea id="narrative" v-model.trim="narrative" placeholder="Describa el suceso..."></textarea>
            </div>
            <div class="row">
                <div><b><span title="Requerido">*</span>Aeronaves: </b></div>
                <div>
                    <div class="new-aircraft" v-for="aircraft in aircrafts" :key="aircraft.key">
                        <button title="Remove aircraft" @click.prevent="removeAircraft(aircraft)">&#x274c;</button>
                        <Aircraft :aircraft="aircraft" />
                    </div>
                    <div class="add-aircraft" @click.prevent><button @click="showModal = true">Agregar Aeronave</button></div>
                </div>
            </div>
            <div class="row">
              <label for="photo"><b>Foto: </b></label>
              <div>
                <input type="file" @change="encodeImageFileAsURL" ref="fileInput" />
                <button v-if="photo" @click.prevent="removePhoto">X</button>
              </div>
            </div>
            <div class="row">
                <div></div>
                <div class="button-right"><button>Enviar Reporte{{ progress }}</button></div>
            </div>
        </form>
        <Modal v-if="showModal">
            <template v-slot:header>
              <h3>Nueva Aeronave</h3>
            </template>
            <form autocomplete="off" @submit.prevent="onAircraftSubmit" ref="aircraftForm">
                <div class="row">
                    <label for="registration"><b><span title="Requerido">*</span>Matr&iacute;cula: </b></label>
                    <input id="registration" type="text" placeholder="LV-ABC..." v-model.trim="registration" required />
                </div>
                <div class="row">
                    <label for="aircraft-type"><b><span title="Requerido">*</span>Tipo: </b></label>
                    <select required v-model="aircraftType">
                        <option value="" disabled>Elija una opci&oacute;n</option>
                        <option v-for="at in aircraftTypes" :key="at.value" :value="at.value">{{ at.label }}</option>
                    </select>
                </div>
                <div class="row">
                    <span></span>
                    <div class="button-right">
                        <button @click.prevent="showModal = false">Cancelar</button>
                        <button>Agregar Aeronave</button>
                    </div>
                </div>
            </form>
            <template v-slot:footer>
              <div slot="footer">
                  <span v-if="aircraftError" class="error">{{ aircraftError }}</span>
              </div>
            </template>
        </Modal>
    </div>
</template>

<script>
import datatypes from "@/datatypes";
import Aircraft from "@/components/Aircraft.vue";
import Modal from "@/components/Modal.vue";

export default {
  name: "NewReport",
  components: {
    Aircraft,
    Modal
  },
  data: function() {
    return {
      progress: "",

      showModal: false,
      aircraftTypes: datatypes.aircraftTypes,
      aircraftType: "",
      registration: "",
      aircraftError: "",

      occurrenceTypes: datatypes.occurrenceTypes,
      occurrenceType: "",
      date: "",
      narrative: "",
      aircrafts: [],
      reportError: "",

      photo: null
    };
  },
  methods: {
    encodeImageFileAsURL: function(event) {
      var vm = this;
      var file = event.currentTarget.files[0];
      var reader = new FileReader();
      reader.onloadend = function() {
        vm.photo = reader.result;
      };
      reader.readAsDataURL(file);
    },
    removePhoto: function() {
      const input = this.$refs.fileInput;
      input.value = "";
      input.type = "";
      input.type = "file";
      this.photo = null;
    },
    onSubmit: function() {
      this.reportError = "";
      if (this.date === "") {
        this.reportError = "The date field is required";
      } else if (this.occurrenceType === "") {
        this.reportError = "Occurrence type is required";
      } else if (this.aircrafts.length === 0) {
        this.reportError = "You have to add at least one aircraft";
      }
      if (this.reportError !== "") {
        return;
      }
      var vm = this,
        db = this.$store.state.db,
        user = this.$store.state.user,
        ext = vm.photo ? vm.photo.match(/^data:[^/]+\/([^;]+)/)[1] : null;
      vm.progress = "...";

      var ref = db.ref("reports").push().key,
        aircrafts = [],
        a;
      for (a of vm.aircrafts) {
        aircrafts[a.registration] = { type: a.type };
      }
      db.ref("reports/" + ref)
        .set({
          date: vm.date,
          type: vm.occurrenceType,
          aircrafts: aircrafts,
          narrative: vm.narrative,
          user: user.uid,
          photoExt: ext
        })
        .then(() => {
          var p = [];
          for (a of vm.aircrafts) {
            p.push(db.ref("aircrafts/" + a.registration + "/" + ref).set(true));
          }
          return Promise.all(p);
        })
        .then(() => {
          if (vm.photo !== null) {
            var fref = vm.$store.state.storage
              .ref()
              .child("photos/" + ref + "." + ext);
            return fref.put(this.$refs.fileInput.files[0]);
          } else {
            return Promise.resolve();
          }
        })
        .then(() => {
          vm.aircraftType = "";
          vm.registration = "";
          vm.occurrenceType = "";
          vm.date = "";
          vm.narrative = "";
          vm.aircrafts = [];
          vm.removePhoto();
          vm.progress = "";
          vm.$router.replace("/reportes");
        });
    },
    onAircraftSubmit: function() {
      this.aircraftError = "";
      if (this.registration === "" || this.aircraftType === "") {
        this.aircraftError = "All fields are required";
        return;
      }
      this.aircrafts.push({
        type: parseInt(this.aircraftType, 10),
        registration: encodeURIComponent(this.registration).replace(
          /\./g,
          "%2E"
        )
      });
      this.showModal = false;
      this.aircraftType = "";
      this.registration = "";
    },
    removeAircraft: function(aircraft) {
      this.aircrafts.splice(this.aircrafts.indexOf(aircraft), 1);
    }
  }
};
</script>

<style scoped>
h3,
.text-center {
  text-align: center;
}

.error {
  color: #7f0000;
}

form {
  max-width: 600px;
  margin: auto;
  display: table;
}

form .row {
  display: table-row;
}

form .row > label,
form .row > div {
  display: table-cell;
  vertical-align: top;
}

form .row > div:last-child,
form .row > input,
form .row > textarea,
form .row > button,
form .row > select {
  display: table-cell;
  vertical-align: top;
  min-width: 400px;
}

.new-aircraft {
  border-bottom: 1px solid lightgray;
  overflow: hidden;
  margin-bottom: 4px;
  padding-bottom: 4px;
}

.modal-body > form,
.modal-body > form input,
.modal-body > form select {
  min-width: 100%;
  max-width: 100%;
  width: 100%;
}

.new-aircraft > .aircraft {
  margin: 0;
}

.new-aircraft button {
  float: right;
}

.button-right,
.add-aircraft {
  text-align: right;
}

.button-right {
  padding-top: 12px;
}
</style>