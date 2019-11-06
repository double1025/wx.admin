<template>
  <el-container>
    <el-main class='x-main-edit'>
      <el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
        <el-tabs type="border-card">
          <!---->
          <!---->
          <el-tab-pane :label="page_info.title">
            <el-form-item label="微信公众平台" prop="aconfig_app_id">
              登陆微信MP后台获取信息
            </el-form-item>
            <el-form-item label="类型" prop="aconfig_type">
              <el-radio-group v-model="form.aconfig_type">
                <el-radio label="wx">微信公众号</el-radio>
                <el-radio label="wxapp">微信小程序</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="APP ID" prop="aconfig_app_id">
              <el-input v-model="form.aconfig_app_id"/>
            </el-form-item>
            <el-form-item label="APP SECRET" prop="aconfig_app_secret">
              <el-input v-model="form.aconfig_app_secret"/>
            </el-form-item>
            <el-form-item label="开启支付功能" prop="aconfig_pay_enable">
              <el-radio-group v-model="form.aconfig_pay_enable">
                <el-radio :label="0">关闭</el-radio>
                <el-radio :disabled="true" :label="1">开启[开发中]</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-show="pay_enable()" label="支付-APP ID" prop="aconfig_pay_app_id">
              <el-input v-model="form.aconfig_pay_app_id"/>
            </el-form-item>
            <el-form-item v-show="pay_enable()" label="支付-APP SECRET" prop="aconfig_pay_app_secret">
              <el-input v-model="form.aconfig_pay_app_secret"/>
            </el-form-item>
            <el-form-item v-show="pay_enable()" label="支付-商户号" prop="aconfig_partnerId">
              <el-input v-model="form.aconfig_partnerId"/>
            </el-form-item>
            <el-form-item v-show="pay_enable()" label="支付-密钥" prop="aconfig_partnerKey">
              <el-input v-model="form.aconfig_partnerKey"/>
            </el-form-item>
            <el-form-item v-show="pay_enable()" label="支付-子商户号" prop="aconfig_partnerId_sub">
              <el-input v-model="form.aconfig_partnerId_sub"/>
            </el-form-item>
          </el-tab-pane>
          <!---->
          <!---->
          <el-tab-pane label="微信接口配置信息">
            <el-form-item label="URL">
              <el-input :disabled="true" v-model="form.url"/>
            </el-form-item>
            <el-form-item label="Token">
              <el-input v-model="form.aconfig_token"/>
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
        <!--        <el-button @click="g_page.funcBack" size="mini">返回</el-button>-->
        <el-button type="success" @click="g_page.funcSave" size="mini">保存</el-button>
        <!--        <el-checkbox style="margin-left: 10px;" label="保存后停留" v-model="checked"/>-->
      </div>
      <!---->
      <!---->
      <!---->
    </el-main>
  </el-container>
</template>

<script>
    export default {
        data()
        {
            let page_data = {};
            page_data = Object.assign(page_data, this.p_page_base.page_data);
            return page_data;
        },
        mounted()
        {
            console.log(this.$route.query)

            this.g_page.funcSetVue(this);
            //
            this.g_page.funcSetApiUrlEdit('/setting/admin/setting/edit')
            this.g_page.funcSetApiUrlSave('/setting/admin/setting/save');
            let page = this;
            //验证
            this.form_rules = {
                __test: [{
                    required: true,
                    message: '请输入原密码',
                    trigger: 'blur'
                },],
            }

            let data = this.$route.query;
            this.g_page.funcEdit(data);
        },
        methods: {
            pay_enable()
            {
                return this.form.aconfig_pay_enable == 1;
            },
            funcBack()
            {
                let callback_url = this.$route.query.callback_url;
                this.g_cc.func_redirect(callback_url)
            },
        }
    }
</script>

<style>
</style>
