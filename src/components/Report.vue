<template>
    <div class="report">
        <div class="report-date"><b>Date:</b> {{ report.date }}</div>
        <div class="report-type"><b>Type:</b> {{ reportType }}</div>
        <div class="aircrafts">
            <h4>Aircrafts:</h4>
            <Aircraft v-for="aircraft in aircrafts" :key="aircraft.key" :aircraft="aircraft" />
        </div>
        <div class="narrative" v-if="report.narrative">
            <b>Narrative:</b> {{ report.narrative }}
        </div>
    </div>
</template>

<script>
import datatypes from '@/datatypes'
import Aircraft from '@/components/Aircraft.vue'

export default {
    name: 'Report',
    components: {
        Aircraft
    },
    props: ['report'],
    computed: {
        aircrafts: function () {
            var a = []
            for (var i in this.report.aircrafts) {
                a.push({
                    'registration': i,
                    'type': this.report.aircrafts[i].type
                })
            }
            return a
        },
        reportType: function () {
            return datatypes.getOccurrenceTypeName(this.report.type)
        }
    }
}
</script>

<style scoped>
.report {
    border: 1px solid gray;
    padding: 8px;
    border-radius: 4px;
    box-shadow: 1px 1px 3px gray;
}

.report > .aircrafts > h4 {
    margin: 0;
}

.report > .aircrafts > div {
    margin-left: 12px;
}
</style>