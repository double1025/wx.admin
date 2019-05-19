<template>
	<div class="dashboard-container">
		<div class="dashboard-text">
			<svg-icon icon-class="user" />x:{{ OA__x }}</div>
		<div class="dashboard-text">acc_id:{{ OA__acc_id }}</div>
		<el-button @click="test">test</el-button>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'

	let page
	export default {
		name: 'Dashboard',
		computed: {
			...mapGetters([
				'OA__acc_id',
				'OA__x'
			])
		},
		mounted() {
			this.$cc.func_set_vue(this)
			page = this.$cc.func_get_vue()
		},
		methods: {
			test() {
				page.$cc.func_axios({
					page: page,
					url: '/oa/center/init',
					data: {},
					success: function(obj) {
						console.log(obj)
						if (obj.data.errcode == 0) {
							page.$cc.func_alert('成功')
							//
						} else {
							page.$cc.func_alert(obj.data.errmsg, 'error')
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
