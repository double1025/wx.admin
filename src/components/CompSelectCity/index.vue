<template>
	<!---->
	<!---->
	<!---->
	<el-cascader style="width: 300px;"
				 clearable separator=" "
				 v-model="val"
				 :options="list" @change="funcChange">
	</el-cascader>
	<!---->
	<!---->
	<!---->
</template>

<script>
	export default {
		props: {
			//省 市 区（注意空格隔开）
			id: {
				type: String,
				default: null
			},
			//获取市，0表示不获取
			get_city: {
				type: Number,
				default: 1
			},
			//获取区，0表示不获取
			get_area: {
				type: Number,
				default: 1
			},
			//保存成功后，会执行
			funcSaveAfter: {
				type: Function,
				default: undefined
			}
		},
		model: {
			prop: 'id',
			event: 'setID'
		},
		data() {
			return {
				val: [],
				list: []
			}
		},
		watch: {
			id(newVal, oldVal) {//普通的watch监听
				console.log(`watch:val=${newVal}`)
				//作用初始化赋值
				this.val = newVal.split(' ')
			}
		},
		mounted() {
			console.log('mounted:CompSelectCity')
			this.funcCompReply()
		},
		methods: {
			funcChange(val) {
				console.log('funcChange', val)
				if (val) {
					this.$emit('setID', val.join(' '))
				}
				//
				if (typeof (this.funcSaveAfter) != 'undefined') {
					this.funcSaveAfter(val)
				}
			},
			//接口
			funcCompReply() {
				this.loading = true
				let page = this
				page.g_cc.func_axios({
					url: '/view/_template/city.json',
					loading: false,
					success: (res) => {
						//
						let list = res.data
						this.list = page.funcToList(list)
						// this.list = res.data
					}
					//
				})
			},
			//json格式转了element-ui使用的格式
			funcToList(list) {
				console.log('funcToList')
				// debugger
				let list_new = []
				for (let i = 0; i < list.length; i++) {
					let p = {}
					p.value = list[i].name
					p.label = list[i].name
					p.children = []
					//市
					for (let j = 0; j < list[i].sub.length; j++) {
						let city_data = list[i].sub[j]
						let c = {}
						c.value = city_data.name
						c.label = city_data.name
						c.children = []
						//区
						if (!city_data.sub) {
							continue
						}
						for (let k = 0; k < city_data.sub.length; k++) {
							let district_data = city_data.sub[k]
							let d = {}
							d.value = district_data.name
							d.label = district_data.name
							c.children.push(d)
						}
						p.children.push(c)
					}
					list_new.push(p)
				}

				console.log('funcToList', list_new)
				return list_new
			}
			//
		}
		////////////////////////////////
		////////////////////////////////
	}
</script>
