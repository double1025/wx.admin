import router from './router'
import store from './store'
import common from '@/utils/common'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({
	showSpinner: false
}) // NProgress configuration

const whiteList = ['/login', '/404', '/test_app/list', '/test_app/edit'] // 不重定向白名单
router.beforeEach((to, from, next) => {
	console.log('router-BEGIN')
	NProgress.start()
	//
	console.log('from:' + from.path)
	console.log('to:' + to.path)
	//
	// if (whiteList.indexOf(to.path) !== -1) {
	if (true) {
		//白名单页面，不需判断
		next()
	} else {
		//判断是否登陆
		if (common.func_get_token()) {
			//有token，获取用户权限
			if (store.getters.page_role.length == 0) {
				//获取权限
				store.dispatch('funcGetPageRole').then(res => {
					next()
					console.log(store.getters.page_role)
					//
				}).catch((err) => {
					console.log(err)
					store.dispatch('funcLogout');
					//todo 跳转类似404错误页面，比较好
					common.func_alert(err.message, 'error')
					next(`/login?redirect=${to.path}`)
				})
				//
			}
			//
			next()
		} else {
			//没有token，返回登录页
			next(`/login?redirect=${to.path}`)
			NProgress.done()
		}
		//
	}
	//	
	console.log('router-END')
})

router.afterEach(() => {
	NProgress.done() // 结束Progress
})
