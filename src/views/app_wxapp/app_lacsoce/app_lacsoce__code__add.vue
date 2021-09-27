<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="选择商品" prop="goods_id">
							<el-select filterable v-model="form.goods_id">
								<el-option
									v-for="item in page_info.list_goods"
									:value="item.lgoods_id"
									:key="item.lgoods_id"
									:label="item.lgoods_name">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="生成箱数" prop="box_count">
							<el-input class="x-input-30" v-model="form.box_count"></el-input>
						</el-form-item>
						<el-form-item label="每箱数量" prop="box_1_x">
							<el-input class="x-input-30" v-model="form.box_1_x"></el-input>
						</el-form-item>
						<el-form-item label="批次标记" prop="lcode_tag">
							<el-input class="x-input-30" v-model="form.lcode_tag" placeholder="可空"></el-input>
							<div class="x-alert">
								<span>用于找回生成的整批码，标记不能重复</span>
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
				<el-button type="success" @click="g_page.funcSave" size="mini">批量生成</el-button>
				<el-checkbox style="margin-left: 10px;" label="生成后停留" v-model="checked"/>
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_lacsoce/app_lacsoce__code__add')
			this.g_page.funcSetApiUrlSave('/xadmin/app_lacsoce/app_lacsoce__code__add/save')
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
		methods: {}
	}
</script>
