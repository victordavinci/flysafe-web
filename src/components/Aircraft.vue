<template>
    <div class="aircraft">
        <div class="aircraft-registration"><b>{{ $t("message.registration") }}:</b> {{ aircraftRegistrationDecoded }}</div>
        <div class="aircraft-type"><b>{{ $t("message.type") }}:</b> {{ $t(aircraftType) }}</div>
    </div>
</template>

<script>
import datatypes from "@/datatypes";

export default {
  name: "Aircraft",
  props: ["aircraft"],
  computed: {
    aircraftRegistrationDecoded: function() {
      return decodeURIComponent(this.aircraft.registration);
    },
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