<template>
  <el-container>
    <el-header class='x-header'>
      <b class="title">账号管理</b>
      <el-button size="mini" type="success" icon="el-icon-edit" @click="p_data.funcShowDialog">添加</el-button>
      <el-button size="mini" type="danger" icon="el-icon-delete"
                 @click="p_data.funcDel('/account/admin/account__list/del')">删除
      </el-button>
      <el-button size="mini" icon="el-icon-refresh" @click="g_cc.func_reload()">刷新</el-button>
    </el-header>
    <el-main class='x-main'>
      <el-form :inline="true" :model="pp.form" size="mini">
        <el-form-item label="名称">
          <el-input name="compKw" v-model="pp.form.compKw" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="p_data.funcGetList">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="table-wrap">
        <el-table stripe ref="multipleTable" tooltip-effect="dark" @selection-change="p_data.funcTableSelectionChange"
                  :data="pp.list_data">
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="账号">
            <template slot-scope="data">
              <div>{{data.row.acc_uid}}<span v-if="data.row.acc_lock==1" style="color: red;">[停用]</span></div>
            </template>
          </el-table-column>
          <el-table-column label="名称">
            <template slot-scope="data">
              <div v-html="data.row.acc_name"></div>
            </template>
          </el-table-column>
          <el-table-column label="身份">
            <template slot-scope="data">
              <div v-html="data.row.acc_role_str"></div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="data">
              <el-button type="primary" size="mini" @click="p_data.funcShowDialog(data.row)">编辑</el-button>
              <el-button type="warning" size="mini" @click="funcResetPwd(data.row)">重置密码</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
    <!---->
    <!---->
    <!-- 分页 -->
    <el-footer>
      <el-pagination class="paging" background layout="total, prev, pager, next, jumper"
                     @current-change="this.p_data.funcPageChange"
                     :current-page="pp.page_current" :page-size="pp.page_size" :total="pp.page_total">
      </el-pagination>
    </el-footer>
    <!---->
    <!---->
    <!-- 弹框 -->
    <el-dialog title="编辑" :visible.sync="pp.form_dialog_visible" width="70%">
      <el-form ref="form" :rules="pp.form_rules" :model="pp.form_dialog" size="mini" label-width="15%">
        <el-form-item label="账号" prop="acc_uid">
          <el-input :disabled="pp.form_dialog_index!=-1" v-model="pp.form_dialog.acc_uid"/>
        </el-form-item>
        <el-form-item label="名称" prop="acc_name">
          <el-input v-model="pp.form_dialog.acc_name"/>
        </el-form-item>
        <el-form-item label="身份" prop="acc_role">
          <el-radio :disabled="true" v-model="pp.form_dialog.acc_role" label="user">超级管理员</el-radio>
          <el-radio v-model="pp.form_dialog.acc_role" label="admin">管理员</el-radio>
        </el-form-item>
        <el-form-item label="停用" prop="acc_lock">
          <el-radio v-model="pp.form_dialog.acc_lock" :label="1">是</el-radio>
          <el-radio v-model="pp.form_dialog.acc_lock" :label="0">否</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="p_data.funcBack" size="mini">取消</el-button>
        <el-button type="success" @click="p_data.funcSave" size="mini">保存</el-button>
      </div>
    </el-dialog>
    <!---->
    <!---->
    <!---->
  </el-container>
</template>

<script>
    let page
    export default {
        data()
        {
            return {
                pp: this.p_data.data,
            }
        },
        mounted()
        {
            console.log('mounted')
            //
            this.g_cc.func_set_vue(this)
            page = this.g_cc.func_get_vue()
            //
            //应用ID
            page.pp.app_id = 'account'
            page.pp.api_func__list = '/account/admin/account__list'
            page.pp.api_func__save = '/account/admin/account__list/save'
            //页码
            // page.pp.page_size = 1
            //搜索
            page.pp.form = {
                'name': '123',
            }
            page.p_data.funcGetList()
            //
            page.pp.form_rules = {
                acc_uidX: [
                    {
                        required: true,
                        message: '必填',
                        trigger: 'blur'
                    },
                ],
            }
            //
        },
        methods: {
            funcSaveBefore(data)
            {
                console.log('funcSaveBefore')
                if (!page.p_data.funcIsAdminAdd())
                {
                    // delete data['acc_uid'];
                }

                return data
            },
            /**
             * 重置密码
             * @param row
             */
            funcResetPwd(row)
            {
                console.log('funcResetPwd')
                page.g_cc.func_confirm('重置密码为123456，确认吗', function ()
                {
                    page.g_cc.func_axios({
                        url: '/account/admin/account__list/resetPwd',
                        data: {
                            ids: row.id,
                        },
                        success: function (res)
                        {
                            if (res.data.errcode == 0)
                            {
                                page.g_cc.func_alert('密码重置成功');
                            }
                            else
                            {
                                page.g_cc.func_alert(res.data.errmsg, 'error');
                            }
                        }
                    })
                });
            }
        }
    }
</script>
