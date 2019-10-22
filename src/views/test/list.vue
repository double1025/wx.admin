<template>
  <el-container>
    <el-header class='x-header'>
      <b class="title">列表</b>
      <el-button size="mini" icon="el-icon-back">返回</el-button>
      <el-button size="mini" type="success" icon="el-icon-edit" @click="g_page.funcShowDialog">添加</el-button>
      <el-button size="mini" type="primary" icon="el-icon-download">导出</el-button>
      <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
      <el-button size="mini" icon="el-icon-refresh">刷新</el-button>
    </el-header>
    <el-main class='x-main'>
      <el-form :inline="true" ref="form" :model="form_q" size="mini">
        <el-form-item label="关键词">
          <el-input name="compKw" v-model="form_q.compKw" placeholder="关键词"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" native-type="submit">搜索</el-button>
          <el-button type="success" @click="funcTest">test</el-button>
        </el-form-item>
      </el-form>
      <div class="table-wrap">
        <el-table stripe ref="multipleTable" tooltip-effect="dark" @selection-change="g_page.funcTableSelectionChange"
                  :data="list_data">
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="卡号">
            <template slot-scope="data">
              <div v-html="data.row.abc_id"></div>
            </template>
          </el-table-column>
          <el-table-column label="用户">
            <template slot-scope="data">
              <div v-html="data.row.abc_name"></div>
            </template>
          </el-table-column>
          <el-table-column label="是否领取">
            <template slot-scope="data">
              <div v-html="data.row.abc_yn"></div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="data">
              <el-button type="primary" size="mini" @click="g_page.funcShowDialog(data.row)">编辑</el-button>
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
      <el-form ref="form_dialog" :rules="form_rules" :model="form" size="mini" label-width="15%">
        <el-form-item label="卡号" prop="abc_id">
          <el-input v-model="form.abc_id"/>
        </el-form-item>
        <el-form-item label="用户" prop="abc_name">
          <el-input v-model="form.abc_name"/>
        </el-form-item>
        <el-form-item label="是否领取" prop="abc_yn">
          <el-input v-model="form.abc_yn"/>
        </el-form-item>
        <el-form-item label="test" prop="test">
          <upload-imgs ref="uploadEle" :sortable="true" :max-num="8" :value="imgs" :remote-fuc="funcUpdateImg"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="g_page.funcBack" size="mini">取消</el-button>
        <el-button type="primary" @click="g_page.funcSave" size="mini">保存</el-button>
      </div>
    </el-dialog>
    <!---->
    <!---->
    <!---->
  </el-container>
</template>

<script>
  import {asyncRouterMap} from '@/router/index';
  import UploadImgs from "@/components/upload-imgs";

  export default {
    components: {
      UploadImgs
    },
    data()
    {
      let page_data = {
        test: '',
        imgs: [
          {
            id: '12d3',
            display: 'http://img0.test.xiao-bo.com/_upload/_site/xiaoqin/201910/5da95d7c7900b-38c4-9836-100ef2ff8357.jpg',
            src: '/images/index/Lin_cms_%E5%B0%81%E9%9D%A2.png',
            imgId: '238287',
          },
          {
            id: '12d5',
            display: 'http://img0.test.xiao-bo.com/_upload/_site/xiaoqin/201910/5da95d7c7900b-38c4-9836-100ef2ff8357.jpg',
            src: '/images/index/Lin_cms_%E5%B0%81%E9%9D%A2.png',
            imgId: '238288',
          },
        ]
      };
      page_data = Object.assign(page_data, this.p_page_base.page_data);

      return page_data;
    },
    mounted()
    {
      this.g_page.funcSetVue(this);
      //
      this.list_data = [{
        'abc_id': '123',
        'abc_name': '张三',
        'abc_yn': 0,
      },
        {
          'abc_id': '456',
          'abc_name': '李四',
          'abc_yn': 1,
        },
      ]
      this.page_total = 2
      //
      this.form_rules = {
        abc_id: [{
          required: true,
          message: '必填',
          trigger: 'blur'
        },],
      }
      //
    },
    methods: {
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
      funcTest()
      {
        console.log(this.imgs);
      },
    }
  }
</script>
