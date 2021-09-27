<template>
	<div class="navbar">
		<hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
		<breadcrumb/>
		<el-dropdown class="avatar-container" trigger="click">
			<div class="avatar-wrapper">
				<span style="margin-right: 10px;">ID:{{ acc.acc_x_id }}</span>
				<i class="el-icon-user-solid"/>
				<span>{{ acc.acc_name }}</span>
				<i class="el-icon-caret-bottom"/>
			</div>
			<el-dropdown-menu slot="dropdown" class="user-dropdown">
				<router-link class="inlineBlock" to="/dashboard">
					<el-dropdown-item>
						首页
					</el-dropdown-item>
				</router-link>
				<router-link v-if="acc.acc_role=='super_admin'" class="inlineBlock" to="/setting">
					<el-dropdown-item>
						基础设置
					</el-dropdown-item>
				</router-link>
				<router-link class="inlineBlock" to="/pwd__edit">
					<el-dropdown-item>
						帐号修改
					</el-dropdown-item>
				</router-link>
				<el-dropdown-item divided>
					<router-link class="inlineBlock" to="/sys_log__list">
						系统日志
					</router-link>
				</el-dropdown-item>
				<el-dropdown-item>
					<router-link class="inlineBlock" to="/sys_log__job__list">
						系统任务
					</router-link>
				</el-dropdown-item>
				<el-dropdown-item divided>
					<span style="display:block;" @click="logout">退出</span>
				</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import Breadcrumb from '@/components/Breadcrumb'
	import Hamburger from '@/components/Hamburger'

	export default {
		components: {
			Breadcrumb,
			Hamburger
		},
		computed: {
			...mapGetters([
				'sidebar',
				'avatar',
				'page_user'
			]),
			//登陆者，实体
			acc() {
				return this.page_user.acc
			}
		},
		methods: {
			toggleSideBar() {
				this.$store.dispatch('ToggleSideBar')
			},
			logout() {
				this.$store.dispatch('funcLogout').then(res => {
					setTimeout(function() {
						location.href = '/login' // 为了重新实例化vue-router对象 避免bug
					}, 100)
				})
				//
				// this.$router.push({
				//   path: '/login',
				// })
				// location.href = '/login' // 为了重新实例化vue-router对象 避免bug
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.navbar {
		height: 50px;
		line-height: 50px;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);

		.hamburger-container {
			line-height: 58px;
			height: 50px;
			float: left;
			padding: 0 10px;
		}

		.screenfull {
			position: absolute;
			right: 90px;
			top: 16px;
			color: red;
		}

		.avatar-container {
			height: 50px;
			display: inline-block;
			position: absolute;
			right: 35px;

			.avatar-wrapper {
				cursor: pointer;
				// margin-top: 5px;
				position: relative;

				// line-height: initial;
				.user-avatar {
					width: 40px;
					height: 40px;
					border-radius: 10px;
				}

				//       .el-icon-caret-bottom {
				//         position: absolute;
				//         right: -20px;
				//         top: 25px;
				//         font-size: 12px;
				//       }
			}
		}
	}
</style>
