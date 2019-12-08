<template>
  <el-container>
    <el-header class='x-header'>
      <b class="title">{{ page_info.title }}</b>
      <el-button size="mini" type="primary" icon="el-icon-download" @click="g_page.funcExport('/wxapp_xk/admin/user/export')">导出</el-button>
      <el-button size="mini" icon="el-icon-refresh" @click="g_cc.func_reload()">刷新</el-button>
    </el-header>
    <el-main class='x-main'>
      <el-form :inline="true" :model="form_q" size="mini">
        <el-form-item label="姓名">
          <el-input v-model="form_q.compKw" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="form_q.compPhone" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="g_page.funcSearch">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="table-wrap">
        <el-table stripe ref="multipleTable" tooltip-effect="dark" @selection-change="g_page.funcTableSelectionChange"
                  :data="list_data">
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="姓名">
            <template slot-scope="data">
              <div v-html="data.row.wxuserxf_name"></div>
              <div style="color: blue;" v-html="data.row.wxuserxf_phone"></div>
            </template>
          </el-table-column>
          <el-table-column label="学校">
            <template slot-scope="data">
              <div v-html="data.row.wxuserxf_school"></div>
            </template>
          </el-table-column>
          <el-table-column label="科目">
            <template slot-scope="data">
              <div v-html="data.row.wxuserxf_subject"></div>
            </template>
          </el-table-column>
          <el-table-column label="教学年龄">
            <template slot-scope="data">
              <div v-html="data.row.wxuserxf_teacher_age"></div>
            </template>
          </el-table-column>
          <el-table-column label="开设房间数">
            <template slot-scope="data">
              <div v-html="data.row.wxuserxf_room_count"></div>
            </template>
          </el-table-column>
          <el-table-column label="评课数">
            <template slot-scope="data">
              <div v-html="data.row.wxuserxf_comment_count"></div>
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
    <el-dialog :title="form.app_idx+'配置'" :visible.sync="form_dialog_visible" width="70%">
      <el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
        <el-form-item label="入口链接" v-if="!g_page.funcIsAdminAdd()">
          <el-input :disabled="true" v-model="form.oauth_url"/>
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
            return page_data;
        },
        mounted()
        {
            console.log('mounted')
            //
            this.g_page.funcSetVue(this);
            // 应用ID
            this.g_page.funcSetApiUrlList('/wxapp_xk/admin/user');
            // this.g_page.funcSetApiUrlSave('/wxapp_xk/admin/app_admin/save');
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
            funcEdit(row)
            {
                this.g_cc.func_redirect('/app_admin/edit', {
                    id: row.id,
                    callback_url: '/app_admin/list',
                })
            },
            funcSaveBefore(data)
            {
                console.log('funcSaveBefore', data)

                data.reply_pic = this.g_page.funcImgArrToStr(data.reply_pic_imgs);

                return data;
            },
            ////////////////////
        }
    }
</script>
