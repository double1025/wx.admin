import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'

import oa_user from './modules/oa_user'

import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		app,
		user,
		oa_user
	},
	getters
})

export default store
