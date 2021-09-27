<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card">
					<el-tab-pane label="基础配置">
						<el-form-item label="姓名">
							<div class="thumb-container-x">
								<div class="thumb-item">
									<span class="thumb-item-txt">名：青眼白龙</span>
									<span class="thumb-item-txt">类型：66666</span>
									<img class="thumb-item-img" src="http://img0.test.xiao-bo.com/_upload/_site/app.jmeii/202103/6061434f6fab5-326d-933e-037ea7b3b381.jpg">
									<span class="thumb-item-txt">库存：10 / 20</span>
									<div class="control">
										<i class="el-icon-close del" title="删除"></i>
										<div class="preview" title="编辑">
											<i class="el-icon-edit"></i>
										</div>
									</div>
								</div>
								<div class="thumb-item">
									<span class="thumb-item-txt">名：黑暗大法师</span>
									<img class="thumb-item-img" src="http://img0.test.xiao-bo.com/_upload/_site/app.jmeii/202103/6061438565fea-349a-befc-0d5a1bbd9d59.JPG">
									<span class="thumb-item-txt">库存：15 / 35</span>
									<div class="control">
										<i class="el-icon-close del" title="删除"></i>
										<div class="preview" title="编辑">
											<i class="el-icon-edit"></i>
										</div>
									</div>
								</div>
								<div class="thumb-item">
									<i class="el-icon-plus" style="font-size: 3em;"></i>
									<div style="margin-top: 1em;">添加</div>
								</div>
							</div>
						</el-form-item>
						<el-form-item label="性别">
							<el-select v-model="form.sex" placeholder="性别">
								<el-option label="男" :value="0"/>
								<el-option label="女" :value="1"/>
							</el-select>
						</el-form-item>
						<el-form-item label="选择日期-时间">
							<el-date-picker v-model="form.date1" type="date" placeholder="日期"/>
							-
							<el-time-picker v-model="form.date2" type="fixed-time" placeholder="时间"/>
						</el-form-item>
						<el-form-item label="排序">
							<el-input-number v-model="form.num" :step="2"></el-input-number>
						</el-form-item>
						<el-form-item label="123">
							<Tinymce v-model="txt" ref="x_editer"></Tinymce>
						</el-form-item>
					</el-tab-pane>
					<el-tab-pane label="其他配置">
						<el-form-item label="选择日期-时间">
							<el-date-picker v-model="form.date1" type="datetime" :picker-options="g_cc.picker_options" placeholder="选择日期时间">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="复选框">
							<el-checkbox-group v-model="form.type">
								<el-checkbox label="Online activities" name="type"/>
								<el-checkbox label="Promotion activities" name="type"/>
								<el-checkbox label="Offline activities" name="type"/>
								<el-checkbox label="Simple brand exposure" name="type"/>
							</el-checkbox-group>
						</el-form-item>
						<el-form-item label="单选框">
							<el-radio-group v-model="form.resource">
								<el-radio label="Sponsor"/>
								<el-radio label="Venue"/>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="文本框">
							<el-input v-model="form.desc" type="textarea"/>
						</el-form-item>
					</el-tab-pane>
				</el-tabs>
				<!-- 按钮部分 -->
				<div class="save_wrap">
					<el-button size="mini" type="success" @click="funcSave">保存</el-button>
					<el-button size="mini" @click="funcBack">返回</el-button>&nbsp;&nbsp;
					<el-checkbox label="保存后停留" v-model="form.checked"/>
				</div>
				<!---->
			</el-form>
		</el-main>
	</el-container>
</template>

<script>
	import '@/styles/comp.scss'
	import Tinymce from '@/components/Tinymce'

	export default {
		components: {
			Tinymce
		},
		data() {
			let page_data = {
				dialogVisible: false,
				txt: '<b>123123aaaaaaa</b>'
			}
			//
			page_data = this.g_cc.funcGetInitData(page_data)
			//
			return page_data
		},
		mounted() {
			this.g_page.funcSetVue(this)
			// debugger
			let page = this

		},
		methods: {
			funcSave() {
				console.log('funcSave')
				let txt = this.$refs['x_editer'].getContent()
				console.log('funcSave', txt)
			},
			funcBack() {
				console.log('funcBack')
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
