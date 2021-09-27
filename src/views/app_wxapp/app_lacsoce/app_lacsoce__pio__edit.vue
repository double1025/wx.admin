<template>
	<el-container>
		<el-main class='x-main-edit'>
			<el-form ref="form" :rules="form_rules" :model="form" size="mini" label-width="15%">
				<el-tabs type="border-card" v-model="page_tag">
					<!---->
					<!---->
					<el-tab-pane :label="page_info.title" name="1">
						<el-form-item label="名称" prop="lpio_name">
							<el-input class="x-input-60" v-model="form.lpio_name"></el-input>
						</el-form-item>
						<el-form-item label="经销商编号" prop="lpio_user_num">
							<el-input class="x-input-60" v-model="form.lpio_user_num"></el-input>
						</el-form-item>
						<el-form-item label="开店时间" prop="lpio_opend_date">
							<el-date-picker
								style="width: 200px;"
								v-model="form.lpio_opend_date"
								type="date"
								placeholder="选择结束时间"
								value-format="yyyy-MM-dd">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="店长名称" prop="lpio_master_name">
							<el-input class="x-input-60" v-model="form.lpio_master_name"></el-input>
						</el-form-item>
						<el-form-item label="标签" prop="lpio_tag">
							<el-input class="x-input-60" v-model="form.lpio_tag"></el-input>
						</el-form-item>
						<el-form-item label="门店类型" prop="lpio_type">
							<el-input class="x-input-60" v-model="form.lpio_type"></el-input>
						</el-form-item>
						<el-form-item label="门店面积" prop="lpio_area">
							<el-input class="x-input-60" v-model="form.lpio_area"></el-input>
						</el-form-item>
						<el-form-item label="轮播图" prop="lclass_pic">
							<x-upload-imgs ref="uploadEle" :sortable="true" :max-num="3"
										   v-bind:value.sync="form.lpio_pic_imgs"
										   :remote-fuc="g_page.funcUpdateImg"
										   :before-upload="g_page.funcUpdateImgBefore"/>
						</el-form-item>
						<el-form-item label="省市区" prop="city">
							<CompSelectCity v-model="form.city"></CompSelectCity>
						</el-form-item>
						<el-form-item label="地址" prop="lpio_address">
							<el-input type="textarea" :rows="5" v-model="form.lpio_address"></el-input>
						</el-form-item>
						<el-form-item label="坐标" prop="lpio_baidu_lng">
							lng:
							<el-input style="width: 20%;" v-model="form.lpio_baidu_lng"></el-input>
							lat:
							<el-input style="width: 20%;" v-model="form.lpio_baidu_lat"></el-input>
						</el-form-item>
						<el-form-item label="地图">
							<baidu-map class="bm-view" ak="eCOHqvb6cSpYgOMKXpNiEZgW"
									   :center="mapCenter" :zoom="mapZoom"
									   @ready="funcMapHandler"
									   @click="funcMapClick">
								<bm-marker :position="mapMarker" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
							</baidu-map>
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
	import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
	import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue'

	export default {
		components: {
			CompSelectCity,
			BaiduMap,
			BmMarker
		},
		data() {
			let page_data = {
				mapCenter: { lng: 0, lat: 0 },
				mapZoom: 15,
				mapMarker:{ lng: 0, lat: 0 },
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
			this.g_page.funcSetApiUrlEdit('/xadmin/app_lacsoce/app_lacsoce__pio__edit')
			this.g_page.funcSetApiUrlSave('/xadmin/app_lacsoce/app_lacsoce__pio__edit/save')
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
			funcMapHandler(e) {
				console.log('funcMapHandler', e)
				// this.mapCenter.lng = 113.271429
				// this.mapCenter.lat = 23.134273
				// this.mapZoom = 15
				// //点的坐标
				// this.mapMarker.lng = this.mapCenter.lng
				// this.mapMarker.lat = this.mapCenter.lat
			},
			funcMapClick(e) {
				console.log('funcMapClick', e)
				//移动地图点
				this.mapMarker.lng = e.point.lng
				this.mapMarker.lat = e.point.lat
				//
				this.form.lpio_baidu_lng = this.mapMarker.lng;
				this.form.lpio_baidu_lat = this.mapMarker.lat;
			},
			funcShowDialogAfter() {
				console.log('funcShowDialogAfter')
				// debugger
				this.mapCenter.lng = parseFloat(this.form.lpio_baidu_lng)
				this.mapCenter.lat = parseFloat(this.form.lpio_baidu_lat)
				//点的坐标
				this.mapMarker.lng = this.mapCenter.lng
				this.mapMarker.lat = this.mapCenter.lat
			},
			funcBack() {
				let callback_url = this.$route.query.callback_url
				this.g_cc.func_redirect(callback_url)
			},
			funcChange(e) {
				console.log('func_change')

				this.tmpl = this.list_tmpl[e]
				// if (this.tmpl) {
				//   this.tmpl.content_list
				// }
				console.log(this.tmpl)
			},
			//保存之前
			funcSaveBefore(data) {
				console.log('funcSaveBefore', data)

				data.lpio_pic = this.g_page.funcImgArrToStr(data.lpio_pic_imgs)

				return data
			},
		}
	}
</script>

<style>
	.bm-view {
		width: 100%;
		height: 300px;
	}
</style>
