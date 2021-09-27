<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="名称" prop="memlv_name">
							<el-input v-model="form.memlv_name" class="x-input-60"></el-input>
						</el-form-item>
						<el-form-item label="图标" prop="memlv_logo">
							<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="1"
										   :rules="({ maxSize: 0.5})"
										   :img_root="page_info.static_file_root"
										   v-bind:value.sync="form.memlv_logo"
										   :remote-fuc="g_page.funcUpdateImg"
										   :before-upload="g_page.funcUpdateImgBefore"/>
						</el-form-item>
						<el-form-item label="大图" prop="memlv_pic">
							<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="1"
										   :rules="({ maxSize: 0.5})"
										   :img_root="page_info.static_file_root"
										   v-bind:value.sync="form.memlv_pic"
										   :remote-fuc="g_page.funcUpdateImg"
										   :before-upload="g_page.funcUpdateImgBefore"/>
						</el-form-item>
						<el-form-item label="升级条件" prop="memlv_lv_num" ref="memlv_lv_num">
							<el-input-number v-model="form.memlv_lv_num" :step="1" :min="1"></el-input-number>
							成长值
							<div class="x-alert">
								<span>升级所需要获取的积分数</span>
							</div>
						</el-form-item>
						<el-form-item label="奖励说明图" prop="memlv_pic_prize">
							<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="1"
										   :rules="({ maxSize: 0.5})"
										   :img_root="page_info.static_file_root"
										   v-bind:value.sync="form.memlv_pic_prize"
										   :remote-fuc="g_page.funcUpdateImg"
										   :before-upload="g_page.funcUpdateImgBefore"/>
						</el-form-item>
						<el-form-item label="升级奖励" prop="memlv_lv_prize" ref="memlv_lv_prize">
							<div class="prize-item">
								<el-checkbox v-model="lv_prize.fun.enble">
									送积分
								</el-checkbox>
								<span v-show="lv_prize.fun.enble">
									<el-input-number v-model="lv_prize.fun.num" :step="1" :min="1"></el-input-number>分
								</span>
							</div>
							<div class="prize-item">
								<el-checkbox v-model="lv_prize.prize.enble" @change="funcChangePrize">
									送奖品
								</el-checkbox>
								<span v-show="lv_prize.prize.enble">
									<PrizeSetList ref="item_list" btn_txt="奖品"
												  :add_count="3"
												  :arr_hide="{pschou_win_rate:1,stock:1}"
												  :funcSaveAfter="funcPrizeEdit_success"
												  :id_src="lv_prize.prize.id"
												  app_id="member">
							</PrizeSetList>
								</span>
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
				<el-checkbox v-if="page_info.is_admin_edit" style="margin-left: 10px;" label="保存后停留" v-model="checked"/>
			</div>
			<!---->
			<!---->
			<!---->
		</el-main>
	</el-container>
</template>

<script>
	import PrizeSetList from '@/components/CompPrize/PrizeSetList'

	export default {
		components: {
			PrizeSetList
		},
		data() {
			let page_data = {
				lv_prize: {
					fun: {
						enble: false,
						num: 0
					},
					prize: {
						enble: false,
						id: ''
					}
				}
			}
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
			this.g_page.funcSetApiUrlEdit('/xadmin/member/member__lv__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/member/member__lv__edit/save')
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
			funcChangePrize(e) {
				if (e) //启动送奖品
				{
					this.$refs['item_list'].funcInit()
				}
			},
			funcPrizeEdit_success(e) {
				this.g_page.funcGetList()
			},
			funcShowDialogAfter() {
				console.log('funcShowDialogAfter')
				//赋值升级奖励配置
				this.lv_prize = this.page_info.lv_prize

				if (this.lv_prize.prize.enble) {
					this.$nextTick(() => {
						this.$refs['item_list'].funcInit()
					})
				}
			},
			//保存之前
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)

				data.lv_prize = JSON.stringify(this.lv_prize)

				return data
			}
		}
	}
</script>
