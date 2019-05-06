<template>
  <div class="dashboard-container">
    <div class="dashboard-text"><svg-icon icon-class="user"/>x:{{ OA__x }}</div>
    <div class="dashboard-text">acc_id:{{ OA__acc_id }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'OA__acc_id',
      'OA__x'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
