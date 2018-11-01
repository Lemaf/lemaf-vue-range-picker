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
				anoInicial: 1992,
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

			console.log(daterange)

		}

	}

}

</script>

<style>

#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}

</style>
