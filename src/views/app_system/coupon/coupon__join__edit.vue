<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="店铺">
							<el-select class="x-input-60" multiple filterable v-model="form.pio_id" @change="funcChangePio">
								<el-option
									v-for="pio in page_info.list_pio"
									:key="pio.tpio_id"
									:value="pio.tpio_id"
									:label="pio.tpio_name">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="选择茶室">
							<div class="x_transfer">
								<el-transfer
									filterable
									filter-placeholder="请输入茶室名称"
									v-model="page_info.list_room_val"
									:titles="['未选择的茶室', '已选择的茶室']"
									:props="{
									  key: 'troom_id',
									label: 'troom_name'
									}"
									:data="page_info.list_room_s">
								</el-transfer>
							</div>
						</el-form-item>
					</el-tab-pane>
					<!---->
					<!---->
					<el-tab-pane v-if="false" label="模板" name="2">
						<el-form-item label="应用模板" prop="reply_app_file" ref="reply_app_file">
							<el-col :span="6">
								<el-input v-model="form.reply_app_file" placeholder="默认：t_001"/>
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
		data() {
			let page_data = {}
			//
			page_data = this.g_cc.funcGetInitData(page_data)
			//
			return page_data
		},
		mounted() {
			console.log('mounted')
			console.log(this.$route.query)

			this.g_page.funcSetVue(this)
			//
			this.g_page.funcSetApiUrlEdit('/xadmin/coupon/coupon__join__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/coupon/coupon__join__edit/save')
			let page = this
			//验证
			this.form_rules = {
				__test: [{
					required: true,
					message: '请输入原密码',
					trigger: 'blur'
				}]
			}

			let data = this.$route.query
			this.g_page.funcEdit(data)
		},
		methods: {
			funcChangePio(e) {
				this.g_cc.func_axios({
					method: 'POST',
					url: '/xadmin/coupon/coupon__join__edit/funcRoomList',
					data: {
						pio_id: e
					},
					success: (res) => {
						//
						if (res.data.errcode == 0) {
							for (const k in res.data.list) {
								let val = res.data.list[k]
								if (!this.page_info.list_room_s_id[val.troom_id]) {
									//源列表存在，不再添加
									this.page_info.list_room_s.push(val)
									this.page_info.list_room_s_id[val.troom_id] = 1
								}
							}
						} else {
							this.g_cc.func_alert(res.data.errmsg)
						}
					}
				})
			},
			funcShowDialogAfter() {
				console.log('funcShowDialogAfter')
			},
			//保存之前
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)

				data.list_room_val = this.page_info.list_room_val

				return data
			}
		}
	}
</script>
