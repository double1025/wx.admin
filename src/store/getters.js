const getters = {
	sidebar: state => state.app.sidebar,
	device: state => state.app.device,
	OA__x: state => state.oa_user.OA__x,
	OA__acc_id: state => state.oa_user.OA__acc_id,
	OA__nonce_str: state => state.oa_user.OA__nonce_str,
	OA__ENC_CODE: state => state.oa_user.OA__ENC_CODE,
	v_error_422: state => state.oa_user.v_error_422,
}
export default getters
