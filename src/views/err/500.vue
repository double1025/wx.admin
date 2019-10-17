<template>
  <div class="wscn-err-container">
    <div>{{ title }}</div>
    <div>{{ desc }}</div>
  </div>
</template>

<script>
    export default {
        name: 'Page500',
        computed: {
            title()
            {
                return this.$route.query.title
            },
            desc()
            {
                return this.$route.query.desc
            }
        },
        mounted()
        {
            console.log(this.$route.query);
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .wscn-err-container {
    transform: translate(-50%, -50%);
    position: absolute;
    top: 40%;
    left: 50%;
  }
</style>
