<template>
	<div class="wscn-err-container">
		{{ message }}
	</div>
</template>

<script>
	export default {
		computed: {
			message() {
				return '302'
			}
		},
		mounted() {
			let callback_url = this.$route.query.callback_url
			this.g_cc.func_redirect(callback_url)
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
