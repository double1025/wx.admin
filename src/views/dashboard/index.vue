<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      {{ page_user.acc.acc_name }}[{{ page_user.acc.acc_role }}]
    </div>
    <div class="dashboard-text">acc_id:{{ page_user.acc.acc_id }}</div>
    <el-button @click="test">test</el-button>
    <el-button @click="testAddRoute">添加路由</el-button>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    let page
    export default {
        name: 'Dashboard',
        computed: {
            ...mapGetters([
                'page_user',
            ])
        },
        mounted()
        {
            this.g_cc.func_set_vue(this)
            page = this.g_cc.func_get_vue()
        },
        methods: {
            testAddRoute()
            {
                console.log(this.$route);
            },
            test()
            {
                page.g_cc.func_axios({
                    page: page,
                    url: '/oa/center/init',
                    data: {},
                    success: function (obj)
                    {
                        console.log(obj)
                        if (obj.data.errcode == 0)
                        {
                            page.g_cc.func_alert('成功')
                            //
                        }
                        else
                        {
                            page.g_cc.func_alert(obj.data.errmsg, 'error')
                        }
                    }
                })
            }
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
