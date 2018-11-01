const occurrenceTypes = [
  {
    value: 0,
    label: "Se desconoce"
  },
  {
    value: 1,
    label: "Accidente"
  },
  {
    value: 2,
    label: "Incidente"
  }
];

const aircraftTypes = [
  {
    value: 0,
    label: "Se desconoce"
  },
  {
    value: 1,
    label: "Avión"
  },
  {
    value: 2,
    label: "Helicoptero"
  },
  {
    value: 3,
    label: "Experimental"
  },
  {
    value: 4,
    label: "Drone"
  }
];

function getOccurrenceTypeName(type) {
  for (var o of occurrenceTypes) {
    if (o.value === type) {
      return o.label;
    }
  }
}

function getAircraftTypeName(type) {
  for (var a of aircraftTypes) {
    if (a.value === type) {
      return a.label;
    }
  }
}

export default {
  occurrenceTypes,
  aircraftTypes,
  getOccurrenceTypeName,
  getAircraftTypeName
};
