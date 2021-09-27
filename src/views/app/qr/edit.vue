<template>
  <el-container>
    <el-main class='x-main-edit'>
      <el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
        <el-tabs type="border-card" v-model="page_tag">
          <!---->
          <!---->
          <el-tab-pane :label="page_info.title" name="1">
            <el-form-item label="名称" prop="wxqr_name" ref="wxqr_name">
              <el-input v-model="form.wxqr_name"/>
            </el-form-item>
            <el-form-item label="回复" prop="wxqr_reply_id" ref="wxqr_reply_id">
              <CompReplyEdit v-model="form.wxqr_reply_id" btnType="text" btnTxt="设置"></CompReplyEdit>
            </el-form-item>
            <el-form-item label="二维码">
              <img :src="form.qr_url" style="width: 30%;">
            </el-form-item>
          </el-tab-pane>
          <!---->
          <!---->
          <el-tab-pane v-if="false" label="模板" name="2">
            <el-form-item label="应用模板" prop="reply_app_file" ref="reply_app_file">
              <el-col :span="6">
                <el-input v-model="form.reply_app_file" placeholder="默认：t_001"/>
              </el-col>
            </el-form-item>
          </el-tab-pane>
          <!---->
          <!---->
        </el-tabs>
      </el-form>
      <!---->
      <!---->
      <!-- 按钮部分 -->
      <div class="save_wrap">
        <el-button @click="g_page.funcBack" size="mini">返回</el-button>
        <el-button v-if="!page_info.is_admin_edit" type="success" @click="g_page.funcSave" size="mini">保存</el-button>
        <el-checkbox v-if="page_info.is_admin_edit" style="margin-left: 10px;" label="保存后停留" v-model="checked"/>
      </div>
      <!---->
      <!---->
      <!---->
    </el-main>
  </el-container>
</template>

<script>
  export default {
    data() {
      let page_data = { super_uid: '' }
      //
      page_data = this.g_cc.funcGetInitData(page_data)
      //
      return page_data
    },
    mounted() {
      console.log('mounted')
      console.log(this.$route.query)

      this.g_page.funcSetVue(this)
      //
      this.g_page.funcSetApiUrlEdit('/xadmin/qr/qr__edit')
      this.g_page.funcSetApiUrlSave('/xadmin/qr/qr__edit/save')
      let page = this
      //验证
      this.form_rules = {
        __test: [{
          required: true,
          message: '请输入原密码',
          trigger: 'blur'
        }]
      }

      let data = this.$route.query
      this.g_page.funcEdit(data)

      // debugger
    },
    methods: {
      funcBack() {
        let callback_url = this.$route.query.callback_url
        this.g_cc.func_redirect(callback_url)
      }
    }
  }
</script>

<style>
</style>
