<template>
    <div class="aircraft">
        <div class="aircraft-registration"><b>Matr&iacute;cula:</b> {{ aircraft.registration }}</div>
        <div class="aircraft-type"><b>Tipo:</b> {{ aircraftType }}</div>
    </div>
</template>

<script>
import datatypes from "@/datatypes";

export default {
  name: "Aircraft",
  props: ["aircraft"],
  computed: {
    aircraftType: function() {
      return datatypes.getAircraftTypeName(this.aircraft.type);
    }
  }
};
</script>

<style scoped>
.aircraft {
  margin: 4px 0;
}
</style>