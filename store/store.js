import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		isLogin: uni.getStorageSync('isLogin') ? true : false,
		obj:{},
		houseId: '',
		identityNumber: '',
		id: ''
	},
	mutations: {
		update(state, [key, value]) {
			state[key] = value;
		},
		login(state, provider) {
			state.obj = provider;
			state.houseId = provider.houseId;
			state.identityNumber = provider.identityNumber;
			state.id = provider.id;
		},
		logout(state) {
			state.isLogin = false;
			state.identityNumber = '';
			state.id = '';
			state.tenant = '';
		}
	}
})

export default store
