import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

plus.nativeUI.toast = ((str) => {
	if (str == '再按一次退出应用') {
		return false;
	}
});

const app = new Vue({
	...App
})
app.$mount()
