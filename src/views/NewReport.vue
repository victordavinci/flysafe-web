<template>
    <div id="new-report">
        <h3>New Report</h3>
        <div class="text-center error" v-if="reportError">{{ reportError }}</div>
        <form autocomplete="off" @submit.prevent="onSubmit">
            <div class="row">
                <label for="date"><b>Date: </b></label>
                <input type="date" v-model.trim="date" required id="date" placeholder="yyyy-MM-dd" />
            </div>
            <div class="row">
                <label for="type"><b>Type: </b></label>
                <select required v-model="occurrenceType">
                    <option value="" disabled>Select an option</option>
                    <option v-for="ot in occurrenceTypes" :key="ot.value" :value="ot.value">{{ ot.label }}</option>
                </select>
            </div>
            <div class="row">
                <label for="narrative"><b>Narrative: </b></label>
                <textarea id="narrative" v-model.trim="narrative" placeholder="Describe the occurrence..."></textarea>
            </div>
            <div class="row">
                <div><b>Aircrafts: </b></div>
                <div>
                    <div class="new-aircraft" v-for="aircraft in aircrafts" :key="aircraft.key">
                        <button title="Remove aircraft" @click.prevent="removeAircraft(aircraft)">&#x274c;</button>
                        <Aircraft :aircraft="aircraft" />
                    </div>
                    <div class="add-aircraft" @click.prevent><button @click="showModal = true">Add aircraft</button></div>
                </div>
            </div>
            <div class="row">
                <div></div>
                <div class="button-right"><button>Submit Report</button></div>
            </div>
        </form>
        <Modal v-if="showModal">
            <h3 slot="header">New Aircraft</h3>
            <form autocomplete="off" @submit.prevent="onAircraftSubmit" ref="aircraftForm">
                <div class="row">
                    <label for="registration"><b>Registration: </b></label>
                    <input id="registration" type="text" placeholder="LV-ABC..." v-model.trim="registration" required />
                </div>
                <div class="row">
                    <label for="aircraft-type"><b>Type: </b></label>
                    <select required v-model="aircraftType">
                        <option value="" disabled>Select an option</option>
                        <option v-for="at in aircraftTypes" :key="at.value" :value="at.value">{{ at.label }}</option>
                    </select>
                </div>
                <div class="row">
                    <span></span>
                    <div class="button-right">
                        <button @click.prevent="showModal = false">Cancel</button>
                        <button>Add Aircraft</button>
                    </div>
                </div>
            </form>
            <div slot="footer">
                <span v-if="aircraftError" class="error">{{ aircraftError }}</span>
            </div>
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
      reportError: ""
    };
  },
  methods: {
    onSubmit: function() {
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
        stats = db.ref("stats"),
        inc = function(cv) {
          return (cv || 0) + 1;
        },
        date = new Date(this.date),
        year = date.getFullYear();
      Promise.all([
        stats.child("report-count").transaction(inc),
        stats
          .child("occurrence-type-count-" + vm.occurrenceType)
          .transaction(inc),
        stats
          .child("reports-count")
          .child(year)
          .transaction(inc),
        stats
          .child("occurrences-type-count-" + vm.occurrenceType)
          .child(year)
          .transaction(inc)
      ]).then(() => {
        var ref = db.ref("reports").push().key,
          data = {},
          aircrafts = [],
          a;
        for (a of vm.aircrafts) {
          aircrafts[a.registration] = a.type;
        }
        data["/reports/" + ref] = {
          date: vm.date,
          type: vm.occurrenceType,
          aircrafts: aircrafts,
          narrative: vm.narrative,
          user: user.uid
        };
        for (a of vm.aircrafts) {
          data["/aircrafts/" + a.registration + "/" + ref] = true;
        }
        db.ref().update(data);

        this.aircraftType = "";
        this.registration = "";
        this.occurrenceType = "";
        this.date = "";
        this.narrative = "";
        this.aircrafts = [];
        vm.$router.replace("/reports");
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
        registration: this.registration
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