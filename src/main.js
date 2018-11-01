import Vue from 'vue'
import App from './App.vue'
import 'vue-material-design-icons/styles.css'
import ChevronDownCircleOutline from 'vue-material-design-icons/ChevronDownCircleOutline.vue'
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue'

Vue.component('chevron-down-circle-outline', ChevronDownCircleOutline)
Vue.component('chevron-down', ChevronDown)
Vue.config.productionTip = false

new Vue({
	render: h => h(App)
}).$mount('#app')
