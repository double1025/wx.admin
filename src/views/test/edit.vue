<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :model="form" :rules="form_rules" size="mini" label-width="15%">
				<el-tabs type="border-card">
					<el-tab-pane label="基础配置">
						<el-form-item label="姓名">
							<el-input v-model="form.name" />
						</el-form-item>
						<el-form-item label="性别">
							<el-select v-model="form.sex" placeholder="性别">
								<el-option label="男" :value="0" />
								<el-option label="女" :value="1" />
							</el-select>
						</el-form-item>
						<el-form-item label="选择日期-时间">
							<el-date-picker v-model="form.date1" type="date" placeholder="日期" /> -
							<el-time-picker v-model="form.date2" type="fixed-time" placeholder="时间" />
						</el-form-item>
						<el-form-item label="排序">
							<el-input-number v-model="form.num" :step="2"></el-input-number>
						</el-form-item>
					</el-tab-pane>
					<el-tab-pane label="其他配置">
						<el-form-item label="选择日期-时间">
							<el-date-picker v-model="form.date1" type="datetime" :picker-options="pickerOptions" placeholder="选择日期时间">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="复选框">
							<el-checkbox-group v-model="form.type">
								<el-checkbox label="Online activities" name="type" />
								<el-checkbox label="Promotion activities" name="type" />
								<el-checkbox label="Offline activities" name="type" />
								<el-checkbox label="Simple brand exposure" name="type" />
							</el-checkbox-group>
						</el-form-item>
						<el-form-item label="单选框">
							<el-radio-group v-model="form.resource">
								<el-radio label="Sponsor" />
								<el-radio label="Venue" />
							</el-radio-group>
						</el-form-item>
						<el-form-item label="文本框">
							<el-input v-model="form.desc" type="textarea" />
						</el-form-item>
					</el-tab-pane>
				</el-tabs>
				<!-- 按钮部分 -->
				<div class="save_wrap">
					<el-button size="mini" type="success" @click="funcSave">保存</el-button>
					<el-button size="mini" @click="funcBack">返回</el-button>&nbsp;&nbsp;
					<el-checkbox label="保存后停留" name="xxx" />
				</div>
				<!---->
			</el-form>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				test: this.cc.isMobile,
				form: {
					name: '',
					sex: 0,
					name: '',
					name: '',
					desc: '',
					type: [],
					num: 0,
				},
				form_rules: {},
				form_rules_422: [],
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				},
			}
		},
		mounted() {
			console.log(this.test)
		},
		methods: {
			funcSave() {
				console.log('funcSave')
			},
			funcBack() {
				console.log('funcBack')
			},
		}
	}
</script>

<style>
</style>
