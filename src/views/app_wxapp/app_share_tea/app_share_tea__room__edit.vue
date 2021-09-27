<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="设备号" prop="troom_gate_num">
							<el-input class="x-input-60" v-model="form.troom_gate_num"></el-input>
							<el-button type="primary" @click="funcLockQuantity" size="mini">查看门锁电量</el-button>
						</el-form-item>
						<el-form-item label="名称" prop="troom_name">
							<el-input class="x-input-60" v-model="form.troom_name"></el-input>
						</el-form-item>
						<el-form-item label="副标题" prop="troom_title_sub">
							<el-input class="x-input-60" v-model="form.troom_title_sub" placeholder="如：推荐3-6人"></el-input>
						</el-form-item>
						<el-form-item label="加盟商" prop="troom_tadmin_id">
							<el-select filterable
									   v-model="form.troom_tadmin_id" placeholder="请选择">
								<el-option v-for="(item,index) in page_info.list_admin"
										   :label="item.tadmin_name" :key="item.tadmin_id" :value="item.tadmin_id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="加盟商-分成比例" prop="troom_profit_rate">
							<el-input-number v-model="form.troom_profit_rate" :precision="3" :step="0.01" :min="0.01" :max="1"></el-input-number>
							<div class="x-alert">
								<span>加盟商获取茶室每笔订单的分成比例</span>
							</div>
						</el-form-item>
						<el-form-item label="茶室价格" prop="troom_time_price">
							<el-input-number v-model="form.troom_time_price" :precision="2" :min="0.01"></el-input-number>
							元 / 半小时
							<div class="x-alert">
								<span>茶室每块时间点的通用价格</span><br/>
								<span>如有特殊要求请前往<b style="color:blue;">茶室特殊时间点</b>配置</span>
							</div>
						</el-form-item>
						<el-form-item label="茶室图片" prop="troom_pic">
							<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="6"
										   :img_root="page_info.static_file_root"
										   v-bind:value.sync="form.troom_pic"
										   :remote-fuc="g_page.funcUpdateImg"
										   :before-upload="g_page.funcUpdateImgBefore"/>
						</el-form-item>
						<el-form-item label="wifi说明" prop="troom_desc">
							<el-input class="x-input-60" v-model="form.troom_desc"></el-input>
						</el-form-item>
						<el-form-item label="使用说明" prop="troom_desc_use">
							<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="1"
										   :img_root="page_info.static_file_root"
										   v-bind:value.sync="form.troom_desc_use"
										   :remote-fuc="g_page.funcUpdateImg"
										   :before-upload="g_page.funcUpdateImgBefore"/>
						</el-form-item>
						<el-form-item label="状态" prop="troom_valid">
							<el-switch v-model="form.troom_valid"
									   active-color="#13ce66"
									   :active-value="1" active-text="营业中"
									   :inactive-value="0" inactive-text="停业">
							</el-switch>
						</el-form-item>
					</el-tab-pane>
					<!---->
					<!---->
					<el-tab-pane label="智能家具" name="2">
						<el-form-item label="状态">
							<div v-if="form.troom_gate_scene_state>0">
								<div>开启</div>
								<div>关闭时间：{{ form.troom_gate_scene_close_date }}</div>
							</div>
							<div v-if="form.troom_gate_scene_state==0">
								<div>关闭</div>
							</div>
						</el-form-item>
						<el-form-item label="查看场景ID">
							<el-button type="primary" @click="funcPositionQuery" size="mini">查看</el-button>
						</el-form-item>
						<el-form-item label="智能家具场景ID（开）" prop="troom_gate_scene_open" ref="troom_gate_scene_open">
							<el-input class="x-input-60" v-model="form.troom_gate_scene_open"></el-input>
							<el-button type="primary" @click="funcSceneRun(form.troom_gate_scene_open)" size="mini">
								执行场景
							</el-button>
						</el-form-item>
						<el-form-item label="智能家具场景ID（关）" prop="troom_gate_scene_close" ref="troom_gate_scene_close">
							<el-input class="x-input-60" v-model="form.troom_gate_scene_close"></el-input>
							<el-button type="primary" @click="funcSceneRun(form.troom_gate_scene_close)" size="mini">
								执行场景
							</el-button>
						</el-form-item>
					</el-tab-pane>
					<!---->
					<!---->
					<!---->
					<!---->
					<!-- 弹框 -->
					<el-dialog title="查看场景ID" :visible.sync="position_dialog_visible" width="70%">
						<el-form ref="form_q" :model="form_q" size="mini" label-width="15%">
							<el-form-item label="选择位置">
								<el-select v-model="position_id" filterable placeholder="请选择" @change="funcPositionChange">
									<el-option v-for="(v, k) in list_position"
											   :label="v.positionName"
											   :key="v.positionId"
											   :value="v.positionId">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="场景列表">
								<el-table stripe ref="multipleTable" tooltip-effect="dark"
										  :data="list_scene">
									<el-table-column label="场景ID">
										<template slot-scope="data">
											{{ data.row.sceneId }}
										</template>
									</el-table-column>
									<el-table-column label="场景名称">
										<template slot-scope="data">
											{{ data.row.name }}
										</template>
									</el-table-column>
								</el-table>
							</el-form-item>
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button @click="position_dialog_visible = false" size="mini">取消</el-button>
						</div>
					</el-dialog>
					<!---->
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

	export default {
		components: {},
		data() {
			let page_data = {
				form_q: {},
				position_id: '',
				position_dialog_visible: false,
				list_position: [],
				list_scene: []
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_share_tea/app_share_tea__room__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/app_share_tea/app_share_tea__room__edit/save')
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
			funcLockQuantity() {
				this.g_cc.func_axios({
					url: '/xadmin/app_share_tea/app_share_tea__room__edit/funcLockQuantity',
					data: {
						lock_id: this.form.troom_gate_num
					},
					success: (res) => {
						//
						if (res.data.errcode == 0) {
							this.g_cc.func_alert(`电量：${res.data.electricQuantity}%`)
						} else {
							this.g_cc.func_alert(res.data.errmsg, 'error')
						}
					}
				})
			},
			funcPositionQuery() {
				this.g_cc.func_axios({
					url: '/xadmin/app_share_tea/app_share_tea__room__edit/funcPositionQuery',
					data: {},
					success: (res) => {
						//
						if (res.data.errcode == 0) {
							this.list_position = res.data.result.data
							this.position_dialog_visible = true
						} else {
							this.g_cc.func_alert(res.data.errmsg, 'error')
						}
					}
				})
			},
			funcSceneQuery(position_id) {
				this.g_cc.func_axios({
					url: '/xadmin/app_share_tea/app_share_tea__room__edit/funcSceneQuery',
					data: {
						position_id: position_id
					},
					success: (res) => {
						//
						if (res.data.errcode == 0) {
							this.list_scene = res.data.result.data
						} else {
							this.g_cc.func_alert(res.data.errmsg, 'error')
						}
					}
				})
			},
			funcSceneRun(scene_id) {
				this.g_cc.func_confirm('确定？', () => {
					this.g_cc.func_axios({
						url: '/xadmin/app_share_tea/app_share_tea__room__edit/funcSceneRun',
						data: {
							scene_id: scene_id
						},
						success: (res) => {
							//
							if (res.data.errcode == 0) {
								this.g_cc.func_alert('成功')
							} else {
								this.g_cc.func_alert(res.data.errmsg, 'error')
							}
						}
					})
				})
			},
			//选择位置
			funcPositionChange(e) {
				console.log('funcPositionChange', e)
				this.funcSceneQuery(e)
			},
			funcShowDialogAfter() {
				console.log('funcShowDialogAfter')
				// this.$refs['troom_desc'].setContent(this.form.troom_desc)
				// this.$refs['troom_desc_use'].setContent(this.form.troom_desc_use)
			},
			//保存之前
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)
				// data.troom_desc = this.$refs['troom_desc'].getContent()
				// data.troom_desc_use = this.$refs['troom_desc_use'].getContent()

				return data
			}
		}
	}
</script>
