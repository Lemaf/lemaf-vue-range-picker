
import Vue from 'vue'
import LemafRangePicker from './LemafRangePicker.vue'

const Components = {
	LemafRangePicker
}

Object.keys(Components).forEach(name => {

	Vue.component(name, Components[name])

})

export default Components
