<template>
    <div id="rso">
        <div class="rso" v-for="r in reversed" :key="r['.key']">
            <div class="header">
                <div class="date">{{ r.date }}</div>
                <div class="category">{{ r.category }}</div>
            </div>
            <div class="body">{{ r.text }}</div>
        </div>
    </div>
</template>

<script>
export default {
  name: "SafetyRecommendations",
  firebase: function() {
    return {
      recommendations: this.$store.state.db
        .ref("recommendations")
        .orderByChild("date")
        .limitToLast(20)
    };
  },
  computed: {
    reversed: function() {
      return Array.from(this.recommendations).sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    }
  }
};
</script>

<style scoped>
.rso {
  margin: 20px 0;
  border: 1px solid #cfdfdf;
  padding: 8px;
  border-radius: 3px;
}

.rso .header {
  border-bottom: 1px solid #cfdfdf;
  overflow: hidden;
  margin-bottom: 8px;
  padding-bottom: 8px;
}

.rso .header .category {
  font-weight: bold;
}

.rso .header .date {
  color: gray;
  font-size: smaller;
  float: right;
}

.rso .body {
  white-space: pre-line;
  word-wrap: break-word;
  font-size: smaller;
}
</style>