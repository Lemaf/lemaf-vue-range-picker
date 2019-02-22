import Vue from 'vue'
import App from './App.vue'
import 'vue-material-design-icons/styles.css'
import ChevronDownCircleOutline from 'vue-material-design-icons/ChevronDownCircleOutline.vue'
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue'
import Close from 'vue-material-design-icons/Close.vue'

Vue.component('chevron-down-circle-outline', ChevronDownCircleOutline)
Vue.component('chevron-down', ChevronDown)
Vue.component('close', Close)

Vue.config.productionTip = false

new Vue({
	render: h => h(App)
}).$mount('#app')
