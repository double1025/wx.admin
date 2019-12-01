<template>
  <el-container>
    <el-header class='x-header'>
      <div class="title">
        <b>
          {{ page_info.title }}
        </b>
        <el-button size="mini" icon="el-icon-s-tools" type="primary" plain @click="g_page.funcRedirectAppEdit()"></el-button>
      </div>
      <el-button size="mini" type="primary" icon="el-icon-download" @click="g_page.funcExport('/cashbook/admin/cashbook/export')">导出</el-button>
      <el-button size="mini" type="danger" icon="el-icon-delete"@click="g_page.funcDel()">删除</el-button>
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
          <el-table-column label="日期">
            <template slot-scope="data">
              {{ data.row.date }}
            </template>
          </el-table-column>
          <el-table-column label="用户">
            <template slot-scope="data">
              <div>{{ data.row.wxuser_nickname }}</div>
              <div>{{ data.row.wxuser_openid }}</div>
            </template>
          </el-table-column>
          <el-table-column label="金额">
            <template slot-scope="data">
              {{ data.row.cashrec_num_r }}
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="data">
              {{ data.row.cashrec_create_date }}
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
            console.log('page_data', page_data);
            return page_data;
        },
        mounted()
        {
            console.log('mounted')
            //
            this.g_page.funcSetVue(this);
            // 应用ID
            this.g_page.funcSetApiUrlList('/cashbook/admin/cashbook');
            this.g_page.funcSetApiUrlEdit('/cashbook/admin/cashbook/edit')
            this.g_page.funcSetApiUrlDel('/cashbook/admin/cashbook/del');
            //页码
            this.g_page.funcSetPageSize(10);
            //搜索
            this.form_q = {
                'compKw': '',
            }
            this.g_page.funcGetList();
            //验证
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
            ////////////////////
            ////////////////////
        }
    }
</script>
