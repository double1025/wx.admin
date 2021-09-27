<template>
	<div v-if="imgs.length>0" class="x-img" :style="`--size:${size}`">
		<a v-for="img in imgs" class="x-img-item" @click="funcShowImg(img)">
			<img :src="img"/>
			<div class="x-img-item-txt" v-if="img_size!=''">
				{{ img_size }}
			</div>
		</a>
	</div>
</template>

<script>
	export default {
		props: {
			//图片值
			img_val: {
				type: String
			},
			//图片域名
			img_root: {
				type: String
			},
			//是否显示图片尺寸
			show_size: {
				type: Boolean,
				default: false
			},
			//图片大小
			size: {
				type: String,
				default: '50px'
			}
		},
		data() {
			let page_data = {
				imgs: [],
				img_size: ''
			}
			//
			return page_data
		},
		watch: {
			img_val(new_val, old_val) {
				// console.log('old', old_val)
				// console.log('new', new_val)
				this.funcInit(new_val)
			}
		},
		created() {
			this.funcInit(this.img_val)
		},
		methods: {
			//预览图片
			funcPreviewImg(e) {
				this.$confirm(`<a href="${e}" target="_blank"><img src="${e}" style="width: 90%;" /></a>`, '预览', {
					dangerouslyUseHTMLString: true,
					showCancelButton: false,
					showConfirmButton: false,
					showClose: true
				}).catch(() => {

				})
			},
			//图片初始化
			funcInit(img_val) {
				if (img_val.length > 0) {
					this.imgs = []
					let arr = img_val.split(',')
					for (let key in arr) {
						let val = arr[key]
						let img_src = this.g_cc.funcGetImgUrl(val, this.img_root)
						this.imgs.push(img_src)
					}

					if (this.show_size) {
						this.funcGetImgInfo(this.imgs[0])
					}
				}
				// console.log(this.imgs)
			},
			//获取图片信息
			funcGetImgInfo(url) {
				var img = new Image()
				img.src = url
				// 如果图片被缓存，则直接返回缓存数据
				if (img.complete) {
					this.img_size = img.width + ' x ' + img.height
				} else {
					img.onload = () => {
						this.img_size = img.width + ' x ' + img.height
					}
				}
			},
			//放大
			funcShowImg(url) {
				// console.log('funcShowImg', url)
				this.$confirm(`<a href="${url}" target="_blank"><img src="${url}" style="width: 100%;" /></a>`, '预览', {
					dangerouslyUseHTMLString: true,
					showCancelButton: false,
					showConfirmButton: false,
					showClose: true
				}).catch(() => {
				})
			}
			////////////////////////////////////
			////////////////////////////////////
			////////////////////////////////////
		}
	}
</script>

<style scoped>
	.x-img {
	}

	.x-img-item {
		float: left;;
		display: inline-flex;
		align-items: center;
		margin: 0 8px 8px 0;
		border: 1px dashed #c0ccda;
		border-radius: 6px;
		flex-direction: column;
	}

	.x-img-item img {
		width: var(--size);
		height: var(--size);
		display: flex;
		object-fit: contain;
	}

	.x-img-item-txt {
		font-size: 11px;
		color: #909399;
		text-align: center;
	}
</style>
