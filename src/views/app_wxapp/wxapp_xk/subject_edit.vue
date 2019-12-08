<template>
  <el-container>
    <el-main class='x-main-edit'>
      <el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
        <el-tabs type="border-card" v-model="page_tag">
          <!---->
          <!---->
          <el-tab-pane :label="page_info.title" name="1">
            <el-form-item label="图文-标题" prop="reply_title" ref="reply_title">
              <el-input v-model="form.reply_title"/>
            </el-form-item>
            <el-form-item label="图文-图片" prop="reply_pic" ref="reply_pic">
              <x-upload-imgs ref="uploadEle" :sortable="true" :max-num="1"
                             v-bind:value.sync="form.reply_pic_imgs"
                             :remote-fuc="g_page.funcUpdateImg"
                             :before-upload="g_page.funcUpdateImgBefore"/>
            </el-form-item>
            <el-form-item label="图文-描述" prop="reply_desc">
              <el-input type="textarea" :rows="5" v-model="form.reply_desc"/>
            </el-form-item>
            <el-form-item label="开启分享" prop="reply_do_share">
              <el-radio-group v-model="form.reply_do_share">
                <el-radio :label="0">关闭</el-radio>
                <el-radio :label="1">开启</el-radio>
              </el-radio-group>
              <div>
                <el-tag type="info" size="small">开启：应用可以分享好友或者朋友圈</el-tag>
              </div>
            </el-form-item>
            <el-form-item v-show="do_share()" label="分享-标题" prop="reply_share_title">
              <el-input v-model="form.reply_share_title"/>
            </el-form-item>
            <el-form-item v-show="do_share()" label="分享-图片" prop="reply_share_pic">
              <x-upload-imgs ref="uploadEle" :sortable="true" :max-num="1"
                             v-bind:value.sync="form.reply_share_pic_imgs"
                             :remote-fuc="g_page.funcUpdateImg"
                             :before-upload="g_page.funcUpdateImgBefore"/>
            </el-form-item>
            <el-form-item v-show="do_share()" label="分享-描述" prop="reply_share_desc">
              <el-input type="textarea" :rows="5" v-model="form.reply_share_desc"/>
            </el-form-item>
            <el-form-item label="授权链接-显示" v-if="form.__oauth_url_x">
              {{form.__oauth_url_x}}
            </el-form-item>
            <el-form-item label="授权链接-隐式" v-if="form.__oauth_url" style="color:lightgray;">
              {{form.__oauth_url}}
            </el-form-item>
            <el-form-item label="全键" v-if="form.__oauth_url">
              <el-col :span="6">
                <el-input v-model="form.__word"/>
              </el-col>
              <el-col :span="5">
                <el-button type="primary" @click="funcGenOauthUrl">生成授权链接</el-button>
              </el-col>
            </el-form-item>
          </el-tab-pane>
          <!---->
          <!---->
          <el-tab-pane label="模板" name="2">
            <el-form-item label="应用模板" prop="reply_app_file" ref="reply_app_file">
              <el-col :span="6">
                <el-input v-model="form.reply_app_file"/>
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
        <el-button type="success" @click="g_page.funcSave" size="mini">保存</el-button>
        <el-checkbox style="margin-left: 10px;" label="保存后停留" v-model="checked"/>
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
            console.log('mounted');
            console.log(this.$route.query);

            this.g_page.funcSetVue(this);
            //
            this.g_page.funcSetApiUrlEdit('/app_admin/admin/app_admin/edit')
            this.g_page.funcSetApiUrlSave('/app_admin/admin/app_admin/save');
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

            // debugger
            // console.log('tag=', this.$refs.reply_app_file.$parent.name);
        },
        methods: {
            funcGenOauthUrl()
            {
                let word = this.form.__word;
                let word_encode = escape(word);

                console.log(word);
                console.log(word_encode);


                this.form.__oauth_url = this.form.__oauth_base.replace('__word__', word_encode);
                this.form.__oauth_url_x = this.form.__oauth_base.replace('__word__', word_encode) + '&scope=snsapi_userinfo';
            },
            do_share()
            {
                return this.form.reply_do_share == 1;
            },
            funcBack()
            {
                let callback_url = this.$route.query.callback_url;
                this.g_cc.func_redirect(callback_url)
            },
            funcSaveBefore(data)
            {
                console.log('funcSaveBefore', data)

                data.reply_pic = this.g_page.funcImgArrToStr(data.reply_pic_imgs);
                data.reply_share_pic = this.g_page.funcImgArrToStr(data.reply_share_pic_imgs);

                return data;
            },
        }
    }
</script>

<style>
</style>
