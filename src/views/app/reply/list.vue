<template>
  <el-container>
    <el-header class='x-header'>
      <b class="title">回复列表</b>
      <el-button size="mini" type="success" icon="el-icon-edit" @click="g_page.funcEdit">添加</el-button>
      <el-button size="mini" type="danger" icon="el-icon-delete"
                 @click="g_page.funcDel()">删除
      </el-button>
      <el-button size="mini" icon="el-icon-refresh" @click="g_cc.func_reload()">刷新</el-button>
    </el-header>
    <el-main class='x-main'>
      <el-form :inline="true" :model="form_q" size="mini">
        <el-form-item label="名称">
          <el-input name="compKw" v-model="form_q.compKw" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="g_page.funcGetList">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="table-wrap">
        <el-table stripe ref="multipleTable" tooltip-effect="dark" @selection-change="g_page.funcTableSelectionChange"
                  :data="list_data">
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="KEY">
            <template slot-scope="data">
              {{ data.row.reply_key }}
            </template>
          </el-table-column>
          <el-table-column label="名称">
            <template slot-scope="data">
              {{ data.row.reply_name }}
            </template>
          </el-table-column>
          <el-table-column label="类型">
            <template slot-scope="data">
              {{ data.row.type }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="data">
              <el-button type="primary" size="mini" @click="g_page.funcEdit(data.row)">编辑</el-button>
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
        <el-form-item label="KEY" prop="reply_key">
          <el-input :disabled="!g_page.funcIsAdminAdd()" v-model="form.reply_key"/>
        </el-form-item>
        <el-form-item label="名称" prop="reply_name">
          <el-input v-model="form.reply_name"/>
        </el-form-item>
        <el-form-item label="类型" prop="reply_type">
          <el-radio v-model="form.reply_type" label="text">文本回复</el-radio>
          <el-radio v-model="form.reply_type" label="msg">图文回复</el-radio>
        </el-form-item>
        <el-form-item v-show="isMsg()" label="图文-标题" prop="reply_title">
          <el-input v-model="form.reply_title"/>
        </el-form-item>
        <el-form-item v-show="isMsg()" label="图文-图片" prop="reply_pic">
          <upload-imgs ref="uploadEle" :sortable="true" :max-num="8" :value="form.reply_pic"
                       :remote-fuc="funcUpdateImg"/>
        </el-form-item>
        <el-form-item :label="isMsg()?'图文-描述':'回复内容'" prop="reply_desc">
          <el-input type="textarea" :rows="5" v-model="form.reply_desc"/>
        </el-form-item>
        <el-form-item v-show="isMsg()" label="跳转方式" prop="reply_redirect_type">
          <el-radio v-model="form.reply_redirect_type" label="">键跳转</el-radio>
          <el-radio v-model="form.reply_redirect_type" label="url">链接跳转</el-radio>
        </el-form-item>
        <el-form-item v-show="isMsg()" label="跳转-内容" prop="reply_redirect">
          <el-input v-model="form.reply_redirect"/>
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
    import UploadImgs from "@/components/upload-imgs";

    export default {
        components: {
            UploadImgs
        },
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
            this.g_page.funcSetApiUrlList('/reply/admin/reply');
            this.g_page.funcSetApiUrlEdit('/reply/admin/reply/edit')
            this.g_page.funcSetApiUrlSave('/reply/admin/reply/save');
            this.g_page.funcSetApiUrlDel('/reply/admin/reply/del');
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
            isMsg()
            {
                return this.form.reply_type == 'msg';
            },
            funcUpdateImg(file, func)
            {
                console.log('funcUpdateImg');
                console.log(file);

                let img = {
                    id: '123',
                    url: 'http://img0.test.xiao-bo.com/_upload/_site/xiaoqin/201910/5da95d7c7900b-38c4-9836-100ef2ff8357.jpg',
                };
                return func(img);
                //
            },
            ////////////////////
        }
    }
</script>
