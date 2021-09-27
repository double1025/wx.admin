<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="名称" prop="tpio_name">
							<el-input class="x-input-60" v-model="form.tpio_name"></el-input>
						</el-form-item>
						<el-form-item label="店铺管理员" prop="tpio_tadmin_id">
							<el-select filterable
									   v-model="form.tpio_tadmin_id" placeholder="请选择">
								<el-option v-for="(item,index) in page_info.list_admin"
										   :label="item.tadmin_name" :key="item.tadmin_id" :value="item.tadmin_id">
								</el-option>
							</el-select>
							<div class="x-alert">
								<span>设为管理员，可登陆B端商家后台，管理门店和茶室相关内容</span>
							</div>
						</el-form-item>
						<el-form-item label="联系电话" prop="tpio_phone">
							<el-input class="x-input-60" v-model="form.tpio_phone"></el-input>
						</el-form-item>
						<el-form-item label="营业时间" prop="tpio_open_time">
							<el-input class="x-input-60" v-model="form.tpio_open_time"></el-input>
							<div class="x-alert">
								<span>作用：列表显示</span>
							</div>
						</el-form-item>
						<el-form-item label="营业日期" prop="tpio_open_date_end" ref="tpio_open_date_end">
							<el-date-picker
								style="width: 200px;"
								v-model="form.tpio_open_date_begin"
								type="date"
								placeholder="选择开始时间"
								:picker-options="g_cc.picker_options"
								value-format="yyyy-MM-dd">
							</el-date-picker>
							至
							<el-date-picker
								style="width: 200px;"
								v-model="form.tpio_open_date_end"
								type="date"
								placeholder="选择结束时间"
								:picker-options="{
									disabledDate(time) {
									return g_cc.picker_disabled_date_func(time,form.tpio_open_date_begin);
									},
								}"
								value-format="yyyy-MM-dd">
							</el-date-picker>
							<div class="x-alert">
								<span>可选择的日期区间</span>
							</div>
						</el-form-item>
						<el-form-item label="店铺图片" prop="tpio_pic">
							<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="1"
										   :img_root="page_info.static_file_root"
										   v-bind:value.sync="form.tpio_pic"
										   :remote-fuc="g_page.funcUpdateImg"
										   :before-upload="g_page.funcUpdateImgBefore"/>
						</el-form-item>
						<el-form-item label="省市区" prop="city">
							<CompSelectCity v-model="form.city"></CompSelectCity>
						</el-form-item>
						<el-form-item label="地址" prop="tpio_address">
							<el-input class="x-input-60" type="textarea" v-model="form.tpio_address"></el-input>
						</el-form-item>
						<el-form-item label="坐标" prop="tpio_qq_lng">
							lat:
							<el-input style="width: 20%;" v-model="form.tpio_qq_lat"></el-input>
							lng:
							<el-input style="width: 20%;" v-model="form.tpio_qq_lng"></el-input>
							<div class="x-alert">
								<span>坐标说明，小的lat，大lng</span><br/>
								<span>坐标获取<a target="_blank" href="https://lbs.qq.com/getPoint/">点击前往</a></span>
							</div>
						</el-form-item>
						<el-form-item label="设施（多选）" prop="tpio_func">
							<el-select
								v-model="form.tpio_func"
								class="x-input-60"
								multiple
								filterable
								default-first-option
								placeholder="选择设施">
								<el-option
									v-for="item in page_info.list_func"
									:key="item"
									:label="item"
									:value="item">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="自定义设施" prop="tpio_func_diy">
							<el-select
								v-model="form.tpio_func_diy"
								class="x-input-60"
								multiple
								filterable
								allow-create
								default-first-option
								placeholder="输入设施名称">
							</el-select>
							<div class="x-alert">
								<span>输入设施名称按<b>回车</b>进行添加</span>
							</div>
						</el-form-item>
						<el-form-item label="评分" prop="tpio_show_comment">
							<el-switch v-model="form.tpio_show_comment"
									   active-color="#13ce66"
									   :active-value="1" active-text="显示"
									   :inactive-value="0" inactive-text="隐藏">
							</el-switch>
						</el-form-item>
						<el-form-item label="状态" prop="tpio_close">
							<el-switch v-model="form.tpio_close"
									   active-color="#13ce66"
									   :active-value="0" active-text="营业中"
									   :inactive-value="1" inactive-text="关闭">
							</el-switch>
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
	import CompSelectCity from '@/components/CompSelectCity'

	export default {
		components: {
			CompSelectCity
		},
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_share_tea/app_share_tea__pio__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/app_share_tea/app_share_tea__pio__edit/save')
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
			funcShowDialogAfter() {
				console.log('funcShowDialogAfter')
			},
			//保存之前
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)

				return data
			}
		}
	}
</script>
