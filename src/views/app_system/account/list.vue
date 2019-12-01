<template>
  <el-container>
    <el-header class='x-header'>
      <b class="title">账号管理</b>
      <el-button size="mini" type="success" icon="el-icon-edit" @click="g_page.funcShowDialog">添加</el-button>
      <el-button size="mini" type="danger" icon="el-icon-delete"
                 @click="g_page.funcDel('/account/admin/account__list/del')">删除
      </el-button>
      <el-button size="mini" icon="el-icon-refresh" @click="g_cc.func_reload()">刷新</el-button>
    </el-header>
    <el-main class='x-main'>
      <el-form :inline="true" :model="form_q" size="mini">
        <el-form-item label="名称">
          <el-input name="compKw" v-model="form_q.compKw" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="g_page.funcSearch">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="table-wrap">
        <el-table stripe ref="multipleTable" tooltip-effect="dark" @selection-change="g_page.funcTableSelectionChange"
                  :data="list_data">
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="账号">
            <template slot-scope="data">
              <div>{{ super_uid }}@{{data.row.acc_uid}}<span v-if="data.row.acc_lock==1" style="color: red;">[停用]</span></div>
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
              <el-button type="primary" size="mini" @click="g_page.funcShowDialog(data.row)">编辑</el-button>
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
                     @current-change="g_page.funcPageChange"
                     :current-page="page_index" :page-size="page_size" :total="page_total">
      </el-pagination>
    </el-footer>
    <!---->
    <!---->
    <!-- 弹框 -->
    <el-dialog title="编辑" :visible.sync="form_dialog_visible" width="70%">
      <el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
        <el-form-item label="账号" prop="acc_uid" :disabled="g_page.funcIsAdminAdd()">
          <el-input placeholder="请输入内容" v-model="form.acc_uid">
            <template slot="prepend">{{ super_uid }}@</template>
          </el-input>
          <!--          <el-input :disabled="g_page.funcIsAdminAdd()" v-model="form.acc_uid"/>-->
        </el-form-item>
        <el-form-item label="名称" prop="acc_name">
          <el-input v-model="form.acc_name"/>
        </el-form-item>
        <el-form-item label="身份" prop="acc_role">
          <el-radio :disabled="true" v-model="form.acc_role" label="user">超级管理员</el-radio>
          <el-radio v-model="form.acc_role" label="admin">管理员</el-radio>
        </el-form-item>
        <el-form-item label="停用" prop="acc_lock">
          <el-radio v-model="form.acc_lock" :label="1">是</el-radio>
          <el-radio v-model="form.acc_lock" :label="0">否</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="g_page.funcBack" size="mini">取消</el-button>
        <el-button type="success" @click="g_page.funcSave" size="mini">保存</el-button>
      </div>
    </el-dialog>
    <!---->
    <!---->
    <!---->
  </el-container>
</template>


<script>
    export default {
        data()
        {
            let page_data = {super_uid: ''};
            page_data = Object.assign(page_data, this.p_page_base.page_data);
            console.log('page_data');
            console.log(page_data);
            return page_data;
        },
        mounted()
        {
            console.log('mounted')
            //
            this.g_page.funcSetVue(this);
            // 应用ID
            this.g_page.funcSetApiUrlList('/account/admin/account__list');
            this.g_page.funcSetApiUrlSave('/account/admin/account__list/save');
            //页码
            this.g_page.funcSetPageSize(10);
            //搜索
            this.form_q = {
                'compKw': '',
            }
            this.g_page.funcGetList();
            //
            this.form_rules = {
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
            funcGetListCommonSuccessAfter(res)
            {
                console.log('funcGetListCommonSuccessAfter');
                this.super_uid = res.data.return_data['super_uid'];
            },
            funcSaveBefore(data)
            {
                console.log('funcSaveBefore')
                if (!this.g_page.funcIsAdminAdd())
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
                console.log('funcResetPwd');
                let page = this;
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
            ////////////////////
        }
    }
</script>
