<template>
	<router-view />
</template>

<style rel="stylesheet/scss" lang="scss">
	.x-header {
		background-color: #f2f2f2;
		height: 40px !important;
		font-size: 14px;
		color: #666;
		border-top: solid 1px #e6e6e6;
		border-bottom: solid 1px #e6e6e6;
		text-align: right;
		padding: 5px 20px 0px 20px;
	}

	.x-header .title {
		float: left;
		padding-top: 5px;
	}

	.x-header .el-button {
		margin-left: 0px;
	}

	.x-main {
		padding: 15px 0px;
	}

	.x-main .el-form {
		padding: 0px 20px;
	}

	.x-main .table-wrap {
		border-top: 1px solid #ebebeb;
		// border-bottom: 1px solid #ebebeb;
	}
</style>
