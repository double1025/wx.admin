<template>
	<div>
		{{ sel_val.reply_name }}
		<el-button type="text" size="mini" @click="form_dialog_visible=true">选择回复</el-button>
		<!---->
		<!---->
		<!-- 弹框 -->
		<el-dialog title="选择回复" :visible.sync="form_dialog_visible" width="70%">
			<el-form ref="form" size="mini" label-width="15%">
				<el-form-item label="回复">
					<el-select
						v-model="val"
						filterable
						remote
						clearable
						reserve-keyword
						placeholder="请输入名称或者KEY搜索"
						:remote-method="funcSearch"
						@change="funcChange"
						:loading="loading">
						<el-option
							v-for="item in list"
							:key="item.reply_id"
							:label="item.reply_name"
							:value="item.reply_id">
						</el-option>
					</el-select>
				</el-form-item>
				<div v-if="sel_val.reply_key">
					<el-form-item label="KEY">
						{{ sel_val.reply_key }}
					</el-form-item>
					<el-form-item label="名称">
						{{ sel_val.reply_name }}
					</el-form-item>
					<el-form-item label="类型">
						<span v-if="sel_val.reply_type=='text'">文本回复</span>
						<span v-if="sel_val.reply_type=='msg'">图文回复</span>
					</el-form-item>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="form_dialog_visible=false" size="mini">取消</el-button>
				<el-button type="success" @click="funcSave" size="mini">保存</el-button>
			</div>
		</el-dialog>
		<!---->
		<!---->
		<!---->
	</div>
</template>

<script>
	export default {
		props: {
			id: {
				type: Number,
				default: 0
			}
		},
		model: {
			prop: 'id',
			event: 'setID'
		},
		data() {
			return {
				val: this.id,
				sel_val: {},
				list: [],
				loading: false,
				form_dialog_visible: false
			}
		},
		mounted() {
			this.val = ''
		},
		// watch: {
		//   val(newVal) {
		//     this.$emit('setID', newVal)
		//   }
		// },
		methods: {
			funcChange(val) {
				console.log('funcChange', val)
				this.sel_val = {}
				//
				if (this.list[val]) {
					this.sel_val = this.list[val]
				}
			},
			funcSearch(query) {
				console.log('funcSearch', query)
				//
				if (query === '') {
					return
				}
				//
				this.funcCompReply(query)
			},
			//接口
			funcCompReply(query) {
				this.loading = true
				this.g_cc.func_axios({
					url: '/xadmin/z_common/comp/comp_reply',
					data: {
						compKw: query
					},
					loading: false,
					success: (res) => {
						//
						if (res.errcode == 0) {
							this.list = res.list
							// this.list = res.list.map(item => {
							//   return { value: `${item.reply_id}`, label: `${item.reply_name}` }
							// })
							//
						}
					},
					complete: (res) => {
						this.loading = false
					}
					//
				})
			},
			//保存
			funcSave() {
				if (this.val) {
					console.log('funcSave', this.val)
					this.$emit('setID', this.val)
				}
				this.form_dialog_visible = false
			}
			//
		}
		////////////////////////////////
		////////////////////////////////
	}
</script>
