<template>
  <div class="wscn-err-container">
    {{ message }}
  </div>
</template>

<script>
    export default {
        name: 'Page404',
        computed: {
            message()
            {
                return '404'
            },
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
