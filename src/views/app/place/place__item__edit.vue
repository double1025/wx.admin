<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="链接">
							<el-input :disabled="true" class="x-input-60" v-model="page_info.oauth_url"></el-input>
							<a target="_blank" :href="page_info.qr_url">生成二维码</a>
						</el-form-item>
						<el-form-item label="分类" prop="pitem_type">
							<el-select class="x-input-60" filterable v-model="form.pitem_type">
								<el-option
									v-for="(val,key) in page_info.type"
									:key="key"
									:value="key"
									:label="val">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="名称" prop="tpio_name">
							<el-input class="x-input-60" v-model="form.pitem_name"></el-input>
						</el-form-item>
						<el-form-item label="副标题" prop="pitem_title_sub">
							<el-input class="x-input-60" v-model="form.pitem_title_sub"></el-input>
							<div class="x-alert">
								<span>多个逗号分隔</span>
							</div>
						</el-form-item>
						<el-form-item label="联系电话" prop="phone">
							<el-input class="x-input-60" v-model="page_info.json.phone"></el-input>
						</el-form-item>
						<!--						<el-form-item label="开放时间" prop="open_date">-->
						<!--							<el-input class="x-input-60" v-model="page_info.json.open_date"></el-input>-->
						<!--						</el-form-item>-->
						<el-form-item label="图片" prop="pitem_pic">
							<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="6"
										   :img_root="page_info.static_file_root"
										   v-bind:value.sync="form.pitem_pic"
										   :remote-fuc="g_page.funcUpdateImg"
										   :before-upload="g_page.funcUpdateImgBefore"/>
						</el-form-item>
						<el-form-item label="省市区" prop="city">
							<CompSelectCity v-model="form.city"></CompSelectCity>
						</el-form-item>
						<el-form-item label="地址" prop="pitem_address">
							<el-input class="x-input-60" type="textarea" v-model="form.pitem_address"></el-input>
						</el-form-item>
						<!--						<el-form-item label="攻略" prop="method">-->
						<!--							<el-input class="x-input-60" type="textarea" v-model="page_info.json.method"></el-input>-->
						<!--						</el-form-item>-->
						<el-form-item label="详情" prop="desc">
							<Tinymce menubar="" v-model="page_info.json.desc" :height="500" ref="desc"></Tinymce>
						</el-form-item>
						<el-form-item label="介绍" prop="info">
							<Tinymce menubar="" v-model="page_info.json.info" :height="500" ref="info"></Tinymce>
						</el-form-item>
						<el-form-item label="坐标" prop="pitem_qq_lng">
							lat:
							<el-input style="width: 20%;" v-model="form.pitem_qq_lat"></el-input>
							lng:
							<el-input style="width: 20%;" v-model="form.pitem_qq_lng"></el-input>
							<div class="x-alert">
								<span>坐标说明，小的lat，大lng</span><br/>
								<!--								<span>坐标获取<a target="_blank" href="https://lbs.qq.com/getPoint/">点击前往</a></span>-->
								<span>坐标获取<a target="_blank" href="https://lbs.amap.com/tools/picker">点击前往</a></span>
							</div>
						</el-form-item>
						<el-form-item label="状态" prop="pitem_hide">
							<el-switch v-model="form.pitem_hide"
									   active-color="#13ce66"
									   :active-value="0" active-text="显示"
									   :inactive-value="1" inactive-text="隐藏">
							</el-switch>
						</el-form-item>
						<el-form-item label="奖品" prop="set_prize">
							<div class="x-alert">
								<span>打卡成功会发放此奖品，库存为0不会再发放</span><br/>
							</div>
							<PrizeSetList ref="item_list" btn_txt="奖品配置"
										  :arr_hide="{pschou_win_rate:1}"
										  :funcSaveAfter="funcPrizeEdit_success"
										  :id_src="form.pitem_prize_id_src"
										  :pset_key="form.pitem_prize_id_src"
										  app_id="place">
							</PrizeSetList>
						</el-form-item>
						<el-form-item label="打卡数">
							<el-input-number v-model="form.pitem_good_count" :step="1"></el-input-number>
						</el-form-item>
						<!--						<el-form-item label="收藏数">-->
						<!--							<el-input-number v-model="form.pitem_collect_count" :step="1"></el-input-number>-->
						<!--						</el-form-item>-->
						<el-form-item label="排序">
							<el-input-number v-model="form.pitem_order" :step="1"></el-input-number>
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
	import Tinymce from '@/components/Tinymce'
	import PrizeSetList from '@/components/CompPrize/PrizeSetList'

	export default {
		components: {
			CompSelectCity,
			Tinymce,
			PrizeSetList
		},
		data() {
			let page_data = {}
			//
			page_data = this.g_cc.funcGetInitData(page_data)
			page_data.page_info.json = {}
			//
			return page_data
		},
		mounted() {
			console.log('mounted')
			console.log(this.$route.query)

			this.g_page.funcSetVue(this)
			//
			this.g_page.funcSetApiUrlEdit('/xadmin/place/place__item__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/place/place__item__edit/save')
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
			funcPrizeEdit_success(res) {

			},
			funcShowDialogAfter() {
				console.log('funcShowDialogAfter')

				this.$nextTick(() => {
					this.$refs['desc'].setContent(this.page_info.json.desc)
					this.$refs['info'].setContent(this.page_info.json.info)

					this.$refs['item_list'].funcInit()
				})
			},
			//保存之前
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)

				this.page_info.json.desc = this.$refs['desc'].getContent()
				this.page_info.json.info = this.$refs['info'].getContent()
				data.json = JSON.stringify(this.page_info.json)

				return data
			}
		}
	}
</script>
