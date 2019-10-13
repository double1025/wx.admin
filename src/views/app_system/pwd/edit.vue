<template>
  <el-container>
    <el-main class='x-main-edit'>
      <el-form ref="form" :model="form" :rules="form_rules" size="mini" label-width="15%">
        <el-tabs type="border-card">
          <el-tab-pane label="修改密码">
            <el-form-item label="原密码" prop="old_pwd">
              <el-col :span="6">
                <el-input v-model="form.old_pwd" type='password'/>
              </el-col>
            </el-form-item>
            <el-form-item label="新密码" prop="new_pwd">
              <el-col :span="6">
                <el-input v-model="form.new_pwd" type='password'/>
              </el-col>
            </el-form-item>
            <el-form-item label="新密码确认" prop="__new_pwd">
              <el-col :span="6">
                <el-input v-model="form.__new_pwd" type='password'/>
              </el-col>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
        <!-- 按钮部分 -->
        <div class="save_wrap">
          <el-button type="success" @click="g_page.funcSave" size="mini">保存</el-button>
        </div>
        <!---->
      </el-form>
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
            this.g_page.funcSetVue(this);
            //
            this.g_page.funcSetApiUrlSave('/pwd/admin/pwd__edit');
            let page = this;
            //验证
            this.form_rules = {
                old_pwd: [{
                    required: true,
                    message: '请输入原密码',
                    trigger: 'blur'
                },],
                new_pwd: [{
                    required: true,
                    message: '请输入新密码',
                    trigger: 'blur'
                },],
                __new_pwd: [{
                    validator: function (rule, value, callback)
                    {
                        if (value !== page.form.new_pwd)
                        {
                            callback(new Error('两次输入密码不一致!'));
                        }
                        else
                        {
                            callback();
                        }
                    },
                    trigger: 'blur'
                },]
            }
        },
        methods: {
            funcSave__success(res)
            {
                if (res.data.errcode == 0)
                {
                    this.g_cc.func_alert('修改成功')
                }
                else
                {
                    this.g_cc.func_alert(res.data.errmsg, 'error')
                }
            }
        }
    }
</script>

<style>
</style>
