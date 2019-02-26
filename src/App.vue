<template>
	<div id="app">
		<div>
			{{selectedDate.inicio}} - {{selectedDate.fim}}
		</div>
		<lemaf-range-picker @selected="onDateSelected" v-bind="config"></lemaf-range-picker>
	</div>
</template>

<script>

import LemafRangePicker from './components/LemafRangePicker.vue'

export default {

	name: 'app',

	components: {

		LemafRangePicker

	},

	data() {

		return {

			config: {
				anoInicial: 2015,
				styles: {
					baseColor: '#FFA726',
					overColor: 'white'
				}
			},

			selectedDate: {
				inicio: '',
				fim: ''
			},

			periodo: ''
		}

	},

	methods: {

		onDateSelected: function(daterange) {

			this.selectedDate = daterange

		}

	}

}

</script>
