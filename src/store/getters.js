const getters = {
	sidebar: state => state.app.sidebar,
	device: state => state.app.device,
	//oa_user
	token: state => state.oa_user.token,
	page_vue: state => state.oa_user.page_vue,
	page_user: state => state.oa_user.page_user,
}
export default getters
