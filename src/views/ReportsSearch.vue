<template>
    <div id="search">
        <input type="text" placeholder="Aircraft registration" v-model.trim="registration" @keyup.enter="onSearch" />
        <button @click="onSearch">Search</button>
        <hr />
        <div v-if="!reports.length">{{ searchMessage }}</div>
        <ReportsList v-if="reports.length" :reports="reports" />
    </div>
</template>

<script>
import ReportsList from '@/components/ReportsList.vue'

export default {
    name: 'ReportsSearch',
    components: {
        ReportsList
    },
    data: function () {
        return {
            registration: '',
            searchMessage: '',
            reports: []
        }
    },
    methods: {
        onSearch: function () {
            var vm = this
            var db = this.$store.state.db
            if (this.registration === '') {
                this.searchMessage = 'Aircraft registration is a required field'
                return
            }
            this.searchMessage = '...'
            vm.$set(vm, 'reports', [])
            db.ref('aircrafts')
                .orderByKey()
                .equalTo(this.registration)
                .limitToLast(20)
                .once('value')
                .then(s => {
                    var a = []
                    s.forEach(s => {
                        a = [...new Set(a.concat(Object.keys(s.val())))];
                    })
                    var rs = []
                    if (!a.length) {
                        this.searchMessage = 'There are no results for your search'
                    }
                    a.forEach(k => {
                        db.ref('reports/' + k)
                            .once('value')
                            .then(r => {
                                var val = r.val()
                                rs = rs.concat({
                                    '.key': k,
                                    'date': val.date,
                                    'type': val.type,
                                    'aircrafts': val.aircrafts
                                })
                                vm.$set(vm, 'reports', rs)
                            })
                    })
                })
        }
    }
}
</script>
