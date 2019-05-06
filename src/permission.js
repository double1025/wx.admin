import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({
	showSpinner: false
}) // NProgress configuration

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
	console.log('router-BEGIN')
	NProgress.start()
	//
	console.log('from:' + from.path)
	console.log('to:' + to.path)
	//
	next()
	//	
	console.log('router-END')
})

router.afterEach(() => {
	NProgress.done() // 结束Progress
})
