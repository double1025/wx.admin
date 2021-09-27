<template>
	<div :class="{fullscreen:fullscreen}" class="tinymce-container" :style="{width:containerWidth}">
		<textarea :id="tinymceId" class="tinymce-textarea"/>
		<div v-if="false" class="editor-custom-btn-container">
			<editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK"/>
		</div>
	</div>
</template>

<script>
	/**
	 * docs:
	 * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
	 */
	import editorImage from './components/EditorImage'
	import plugins from './plugins'
	import toolbar from './toolbar'
	import load from './dynamicLoadScript'

	// why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
	// const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'
	const tinymceCDN = 'https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/tinymce/5.7.0/tinymce.min.js'
	// const tinymceCDN = 'http://php.x.siyoumi.com/view/_x_res_common/tinymce/tinymce.min.js'

	export default {
		name: 'Tinymce',
		components: { editorImage },
		props: {
			id: {
				type: String,
				default: function() {
					return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
				}
			},
			value: {
				type: String,
				default: ''
			},
			toolbar: {
				type: Array,
				required: false,
				default() {
					return []
				}
			},
			menubar: {
				type: String,
				default: 'file edit insert view format table'
			},
			height: {
				type: [Number, String],
				required: false,
				default: 360
			},
			width: {
				type: [Number, String],
				required: false,
				default: '60%'
			}
		},
		data() {
			return {
				hasChange: false,
				hasInit: false,
				tinymceId: this.id,
				fullscreen: false,
				languageTypeList: {
					'en': 'en',
					'zh': 'zh_CN',
					'es': 'es_MX',
					'ja': 'ja'
				}
			}
		},
		computed: {
			containerWidth() {
				const width = this.width
				if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
					return `${width}px`
				}
				return width
			}
		},
		watch: {
			value(val) {
				if (!this.hasChange && this.hasInit) {
					this.$nextTick(() =>
						window.tinymce.get(this.tinymceId).setContent(val || ''))
				}
			}
		},
		mounted() {
			this.init()
		},
		activated() {
			if (window.tinymce) {
				this.initTinymce()
			}
		},
		deactivated() {
			this.destroyTinymce()
		},
		destroyed() {
			this.destroyTinymce()
		},
		methods: {
			init() {
				// dynamic load tinymce from cdn
				load(tinymceCDN, (err) => {
					if (err) {
						this.$message.error(err.message)
						return
					}
					this.initTinymce()
				})
			},
			initTinymce() {
				const _this = this
				window.tinymce.init({
					selector: `#${this.tinymceId}`,
					font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
					// images_upload_url: `${BASE_API}/xadmin/z_common/file/uploadImg?token=${_this.g_cc.func_get_token()}`,
					images_upload_handler: function(blobInfo, succFun, failFun) {
						var xhr, formData
						var file = blobInfo.blob()//转化为易于理解的file对象
						xhr = new XMLHttpRequest()
						xhr.withCredentials = false
						xhr.open('POST', `${BASE_API}/xadmin/z_common/file/uploadImg?token=${_this.g_cc.func_get_token()}`)
						//上传接口调用完成处理
						xhr.onload = function() {
							if (xhr.status != 200) {
								failFun('HTTP Error: ' + xhr.status)
								return
							}
							let res = JSON.parse(xhr.responseText)
							if (res.errcode == 0) {
								succFun(res.img.url)
							} else {
								failFun(res.errmsg)
							}
						}
						formData = new FormData()
						formData.append('file0', file, file.name)//此处与源文档不一样
						xhr.send(formData)
					},
					language: this.languageTypeList['zh'],
					// language: 'zh_CN',
					language_url: `${BASE_API}/view/_x_res_common/tinymce/langs/zh_CN.js`,
					height: this.height,
					max_height: this.height,
					body_class: 'panel-body ',
					object_resizing: false,
					toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
					menubar: this.menubar,
					plugins: plugins,
					end_container_on_empty_block: true,
					powerpaste_word_import: 'clean',
					code_dialog_height: 450,
					code_dialog_width: 1000,
					advlist_bullet_styles: 'square',
					advlist_number_styles: 'default',
					imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
					default_link_target: '_blank',
					link_title: false,
					nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
					init_instance_callback: editor => {
						if (_this.value) {
							editor.setContent(_this.value)
						}
						_this.hasInit = true
						editor.on('NodeChange Change KeyUp SetContent', () => {
							this.hasChange = true
							this.$emit('input', editor.getContent())
						})
					},
					setup(editor) {
						editor.on('FullscreenStateChanged', (e) => {
							_this.fullscreen = e.state
						})
					},
					convert_urls: false
				})
			},
			destroyTinymce() {
				const tinymce = window.tinymce.get(this.tinymceId)
				if (this.fullscreen) {
					tinymce.execCommand('mceFullScreen')
				}

				if (tinymce) {
					tinymce.destroy()
				}
			},
			setContent(value) {
				if (!value || value == '') {
					value = ''
				}
				window.tinymce.get(this.tinymceId).setContent(value)
			},
			getContent() {
				return window.tinymce.get(this.tinymceId).getContent()
			},
			imageSuccessCBK(arr) {
				arr.forEach(v => window.tinymce.get(this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`))
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tinymce-container {
		position: relative;
		line-height: normal;
	}

	.tinymce-container {
		::v-deep {
			.mce-fullscreen {
				z-index: 10000;
			}
		}
	}

	.tinymce-textarea {
		visibility: hidden;
		z-index: -1;
	}

	.editor-custom-btn-container {
		position: absolute;
		right: 4px;
		top: 4px;
		/*z-index: 2005;*/
	}

	.fullscreen .editor-custom-btn-container {
		z-index: 10000;
		position: fixed;
	}

	.editor-upload-btn {
		display: inline-block;
	}
</style>
