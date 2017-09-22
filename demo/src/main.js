import Vue from 'vue'
import App from './App.vue'

import VueProgress from '../../'

Vue.use(VueProgress)

// eslint-disable-next-line no-new
new Vue({
	el: '#app',
	render: h => h(App),
})
