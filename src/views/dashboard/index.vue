<template>
	<div class="dashboard-container">
		<!--		访问量：0-->
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { asyncRouterMap } from '@/router/index'

	let page
	export default {
		name: 'Dashboard',
		computed: {
			...mapGetters([
				'page_user'
			]),
			//登陆者，实体
			acc() {
				return this.page_user.acc
			}
		},
		mounted() {
			this.g_cc.func_set_vue(this)
			page = this.g_cc.func_get_vue()
			//
			// this.testAddRoute()
		},
		methods: {
			testAddRoute() {
				console.log(asyncRouterMap)
				// this.$router.addRoutes(asyncRouterMap);
				// this.$router.options.routes = asyncRouterMap
				// let r = asyncRouterMap
				// //json
				// let list_r = []
				// for (let i = 0; i < r.length; i++) {
				// 	let r_v = r[i]
				// 	let data_r = {
				// 		'path': r_v.path,
				// 		'hidden': false,
				// 		'meta': {},
				// 		'children': [],
				// 		'name': ''
				// 	}
				// 	if (r_v.meta) {
				// 		data_r['meta'] = r_v.meta
				// 	}
				// 	if (r_v.hidden) {
				// 		data_r['hidden'] = r_v.hidden
				// 	}
				// 	//
				// 	if (r_v.children) {
				// 		for (let j = 0; j < r_v.children.length; j++) {
				// 			let rc_v = r_v.children[j]
				// 			let data_rc = {
				// 				'path': rc_v.path,
				// 				'hidden': false,
				// 				'meta': {},
				// 				'name': rc_v.name
				// 			}
				// 			if (rc_v.meta) {
				// 				data_rc['meta'] = rc_v.meta
				// 			}
				// 			if (rc_v.hidden) {
				// 				data_rc['hidden'] = rc_v.hidden
				// 			}
				// 			data_r['name'] = rc_v.name
				// 			data_r['children'].push(data_rc)
				// 		}
				// 	}
				// 	list_r.push(data_r)
				// }
				// // console.log(list_r)
				// console.log(JSON.stringify(list_r))
			},
			test() {
				page.g_cc.func_axios({
					page: page,
					url: '/test/web_0/test',
					data: {},
					success: function(obj) {
						console.log(obj)
						if (obj.data.errcode == 0) {
							page.g_cc.func_alert('成功')
							//
						} else {
							page.g_cc.func_alert(obj.data.errmsg, 'error')
						}
					}
				})
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.dashboard {
		&-container {
			margin: 30px;
		}

		&-text {
			font-size: 30px;
			line-height: 46px;
		}
	}
</style>
