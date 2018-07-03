const occurrenceTypes = [
  {
    value: 0,
    label: "Unknown"
  },
  {
    value: 1,
    label: "Accident"
  },
  {
    value: 2,
    label: "Incident"
  }
];

const aircraftTypes = [
  {
    value: 0,
    label: "Unknown"
  },
  {
    value: 1,
    label: "Airplane"
  },
  {
    value: 2,
    label: "Helicopter"
  },
  {
    value: 3,
    label: "Experimental"
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
