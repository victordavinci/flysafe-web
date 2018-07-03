<template>
    <ul>
        <li v-for="report in reports" v-bind:key="report['.key']">
            <Report :report="report" />
        </li>
    </ul>
</template>

<script>
import Report from '@/components/Report.vue'

export default {
    name: 'ReportsList',
    components: {
        Report
    },
    props: ['reports']
}
</script>

<style scoped>
ul {
    padding: 0;
}

li {
    list-style: none;
    margin: 12px 0;
}
</style>