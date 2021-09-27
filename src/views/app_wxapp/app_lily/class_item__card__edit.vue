<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="类型" prop="lclass_type" ref="lclass_type">
							<el-radio-group v-model="form.lclass_type" :disabled="form.disabled_type">
								<el-radio v-for="item in page_info.list_type" :label="item.key" :key="item.key">{{item.val}}</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="套餐卡标题" prop="lcitem_title" ref="lcitem_title">
							<el-input class="x-input-60" v-model="form.lcitem_title"/>
						</el-form-item>
						<el-form-item label="套餐卡副标题" prop="lcitem_title_sub" ref="lcitem_title_sub">
							<el-input class="x-input-60" v-model="form.lcitem_title_sub"/>
						</el-form-item>
						<el-form-item label="套餐卡价格" prop="lcitem_price_now" ref="lcitem_price_now">
							<el-col :span="5">
								<el-input v-model="form.lcitem_price_now"/>
							</el-col>
							元
						</el-form-item>
						<el-form-item label="预约设置" prop="lcitem_use_total" ref="lcitem_use_total">
							<el-col :span="24">
								总课
								<el-input class="x-input-30" v-model="form.lcitem_use_total"/>
								节
							</el-col>
							<div class="x-alert">
								<span>套餐卡一共可预约{{form.lcitem_use_total}}节课</span>
							</div>
						</el-form-item>
						<el-form-item label="出售库存">
							<div>
								<b style="color: blue;">余{{ form.stcnt_count_left }}</b>
								/ 总{{ form.stcnt_count_total }}
							</div>
						</el-form-item>
						<el-form-item label="增加库存" prop="__set_count_total" ref="__set_count_total">
							<el-input-number v-model="form.__stcnt_count_total" :step="5"></el-input-number>
						</el-form-item>
						<el-form-item label="有效期" prop="lcitem_end_time" ref="lcitem_end_time">
							<el-col :span="5">
								<el-date-picker
									style="width: 100%"
									v-model="form.lcitem_begin_time"
									type="datetime"
									placeholder="选择开始时间"
									value-format="yyyy-MM-dd HH:mm:ss">
								</el-date-picker>
							</el-col>
							<el-col :span="1" style="text-align: center;">至</el-col>
							<el-col :span="5">
								<el-date-picker
									style="width: 100%"
									v-model="form.lcitem_end_time"
									type="datetime"
									placeholder="选择过期时间"
									value-format="yyyy-MM-dd HH:mm:ss">
								</el-date-picker>
							</el-col>
						</el-form-item>
						<el-form-item label="初次体验卡" prop="lclass_hide">
							<el-radio-group v-model="form.lcitem_first">
								<el-radio :label="1">是</el-radio>
								<el-radio :label="0">否</el-radio>
							</el-radio-group>
							<div class="x-alert">
								<span>初次体验卡，下过订单不能再购买</span>
							</div>
						</el-form-item>
						<el-form-item label="状态" prop="lcitem_hide">
							<el-radio-group v-model="form.lcitem_hide">
								<el-radio v-for="(item,index) in page_info.list_hide" :label="index" :key="index">
									{{ item }}
								</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="排序" prop="lcitem_order" ref="lcitem_order">
							<el-input-number v-model="form.lcitem_order" :step="10"></el-input-number>
						</el-form-item>
					</el-tab-pane>
					<!---->
					<!---->
					<el-tab-pane label="内容配置" name="2">
						<el-form-item label="课程名称" prop="lclass_name" ref="lclass_name">
							<el-input v-model="form.lclass_name"/>
						</el-form-item>
						<el-form-item label="选择导师" prop="tea_ids">
							<el-checkbox-group v-model="form.tea_ids" @change="funcTeaChange">
								<el-checkbox v-for="item in page_info.list_tea" :label="item.lteacher_id" :key="item.lteacher_id">
									{{item.lteacher_name}}
								</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
						<el-form-item label="轮播图" prop="lclass_pic">
							<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="5"
										   v-bind:value.sync="form.lclass_pic_imgs"
										   :remote-fuc="g_page.funcUpdateImg"
										   :before-upload="g_page.funcUpdateImgBefore"/>
						</el-form-item>
						<el-form-item label="课程介绍-适合人群" prop="lclass_desc_00" ref="lclass_desc_00">
							<el-input type="textarea" :rows="5" v-model="form.lclass_desc_00"/>
						</el-form-item>
						<el-form-item label="课程介绍-内容介绍" prop="lclass_desc_01" ref="lclass_desc_01">
							<el-input type="textarea" :rows="5" v-model="form.lclass_desc_01"/>
						</el-form-item>
						<el-form-item label="活动规则" prop="lclass_desc_02" ref="lclass_desc_02">
							<el-input type="textarea" :rows="5" v-model="form.lclass_desc_02"/>
						</el-form-item>
					</el-tab-pane>
					<!---->
					<!---->
					<el-tab-pane label="限制" name="3">
						<el-form-item label="用户购买上限" prop="lcitem_user_buy_max" ref="lcitem_user_buy_max">
							<el-col :span="24">
								<el-input class="x-input-30" v-model="form.lcitem_user_buy_max"/>
							</el-col>
							<div class="x-alert">
								<span>单个用户能购买数量，0：表示不作限制</span>
							</div>
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_lily/app_lily__class_item__card__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/app_lily/app_lily__class_item__card__edit/save')
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

			// debugger
		},
		methods: {
			funcBack() {
				let callback_url = this.$route.query.callback_url
				this.g_cc.func_redirect(callback_url)
			},
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)

				data.lclass_pic = this.g_page.funcImgArrToStr(data.lclass_pic_imgs)

				return data
			},
			funcTeaChange(e) {
				console.log('funcTeaChange', e)
				this.form.do_update_tea = 1
			}
		}
	}
</script>

<style>
</style>
