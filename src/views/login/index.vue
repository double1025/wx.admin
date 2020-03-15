<template>
  <div class="login-container">
    <el-form ref="form" :model="form" :rules="form_rules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">{{ title }}</h3>
      <el-form-item prop="username">
				<span class="svg-container">
					<svg-icon icon-class="user"/>
				</span>
        <el-input v-model="form.username" name="username" type="text" auto-complete="on" placeholder="帐号"/>
      </el-form-item>
      <el-form-item prop="password">
				<span class="svg-container">
					<svg-icon icon-class="password"/>
				</span>
        <el-input :type="pwdType" v-model="form.password" name="password" auto-complete="on" placeholder="密码"
                  @keyup.enter.native="func_login"/>
        <span class="show-pwd" @click="showPwd">
					<svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'"/>
				</span>
      </el-form-item>
      <el-form-item prop="code" v-if="show_code">
        <el-input v-model="form.code" placeholder="验证码" style="width: 50%;"/>
        <div style="float:left;" @click="funcReloadVcode">
          <img style="height: 40px;padding-top: 12px;" :src='vcode'/>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="func_login">
          登陆
        </el-button>
      </el-form-item>
      <el-form-item v-show='false'>
        <el-button :loading="loading" type="primary" style="width:100%;" @click='test'>
          test
        </el-button>
      </el-form-item>
    </el-form>
    <div class="footer">
      <a href="http://admin.siyoumi.com">粤ICP备15103984号-2</a> COPYRIGHT © overtrue.
    </div>
  </div>
</template>

<script>
    import Base64 from '@/utils/base64'
    import Cookies from 'js-cookie'

    let page
    export default {
        name: 'Login',
        data()
        {
            return {
                form: {
                    username: '',
                    password: '',
                    code: '',
                },
                form_rules: {
                    username: [{
                        required: true,
                        message: '账号不能为空',
                        trigger: 'blur'
                    },],
                    password: [{
                        required: true,
                        message: '请输入6-20位密码',
                        trigger: 'blur'
                    },]
                },
                form_rules_422: [],
                loading: false,
                pwdType: 'password',
                redirect: undefined,
                show_code: false,
                vcode: '',
            }
        },
        watch: {
            $route: {
                handler: function (route)
                {
                    this.redirect = route.query && route.query.redirect
                },
                immediate: true
            }
        },
        computed: {
            title()
            {
                return process.env.TITLE;
            },
        },
        mounted()
        {
            this.g_cc.func_set_vue(this)
            page = this.g_cc.func_get_vue()
        },
        methods: {
            test()
            {
                // setToken('token')
                // 				console.log(this.redirect)
                // 				console.log(this.$route)
                // 				console.log(asyncRouterMap)
                // 				this.$router.addRoutes(asyncRouterMap)
                // 				this.$router.options.routes = asyncRouterMap
                // 				//
                // 				console.log(this.$router)
                //
                console.log(this.$store)
            },
            showPwd()
            {
                if (this.pwdType === 'password')
                {
                    this.pwdType = ''
                }
                else
                {
                    this.pwdType = 'password'
                }
            },
            func_login()
            {
                //
                page.$refs.form.validate(valid =>
                {
                    if (valid)
                    {
                        console.log('ok')
                        page.__func_login()
                    }
                    else
                    {
                        console.log('error submit!!')
                        return false
                    }
                })
                //
            },
            __func_login()
            {
                //
                let app_base64 = new Base64();
                let pwd = app_base64.encode(page.form.password);
                //
                page.g_cc.func_axios({
                    url: '/oa/login',
                    data: {
                        'username': page.form.username,
                        'password': pwd,
                        'code': page.form.code,
                    },
                    success: function (obj)
                    {
                        if (obj.errcode == 0)
                        {
                            //
                            // debugger
                            let token = obj.token;
                            if (!token)
                            {
                                page.g_cc.func_alert('参数异常', 'error')
                                return
                            }
                            //记录cookie
                            Cookies.set('token', token)
                            //
                            page.g_cc.func_alert('登陆成功', 'success', function ()
                            {
                                //跳转
                                page.g_cc.func_redirect('/dashboard', {
                                    __d: new Date().valueOf()
                                })
                            })
                        }
                        else
                        {
                            if (obj && obj.show_code)
                            {
                                page.show_code = obj.show_code;
                                if (page.show_code)
                                {
                                    page.funcReloadVcode();
                                }
                            }
                            page.g_cc.func_alert(obj.errmsg, 'error')
                        }
                    }
                })
                //
            },
            //刷新验证码
            funcReloadVcode()
            {
                // process.env.BASE_API
                console.log('func_reload_vcode')
                page.vcode = ''
                page.vcode = process.env.BASE_API + '/oa/login/vcode?v=' + (new Date()).valueOf()
                //
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg: #2d3a4b;
  $light_gray: #eee;

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;

        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .footer {
    color: #d9d9d9;
    font-size: 13px;
    height: 20px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
  }

  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;

    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 520px;
      max-width: 100%;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
