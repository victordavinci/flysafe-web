const occurrenceTypes = [
  {
    value: 0,
    label: "message.unknown"
  },
  {
    value: 1,
    label: "message.accident"
  },
  {
    value: 2,
    label: "message.incident"
  }
];

const aircraftTypes = [
  {
    value: 0,
    label: "message.unknown"
  },
  {
    value: 1,
    label: "message.airplane"
  },
  {
    value: 2,
    label: "message.helicopter"
  },
  {
    value: 3,
    label: "message.experimental"
  },
  {
    value: 4,
    label: "message.drone"
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
