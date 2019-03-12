import 'vue-material-design-icons/styles.css'
import ChevronDownCircleOutline from 'vue-material-design-icons/ChevronDownCircleOutline.vue'
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue'
import Close from 'vue-material-design-icons/Close.vue'
import Vue from 'vue'

Vue.component('chevron-down-circle-outline', ChevronDownCircleOutline)
Vue.component('chevron-down', ChevronDown)
Vue.component('close', Close)

const periodos = {
	mensal: 'Mensal',
	anual: 'Anual'

}

const defaultStyles = {
	baseColor: 'green',
	overColor: 'white'
}

export default {

	name: 'vue-rangedate-picker',

	props: {
		styles: {
			type: Object,
			default: () => defaultStyles
		},
		anoInicial: {
			type: Number,
			default: 2000
		},
		anoFinal: {
			type: Number,
			default: new Date().getFullYear()
		},
		periodoMaximo: {
			type: String,
			default: '30'
		},
		periodoDefault: {
			type: String,
			default: periodos.anual
		},
		periodos: {
			type: Object,
			default: () => periodos
		}

	},

	data() {

		return {
			periodoSelecionado: null,
			isOpen: false,
			isSelectPeriodoOpen: false,
			isSelectAnoReferenciaOpen: false,
			anoReferencia: null,
			yearsArray: [],
			yearsArrayReverse:[],
			meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
			rangeAnual: {
				inicio: null,
				fim: null
			},
			rangeMensal: {
				inicio: null,
				fim: null
			},
			rangeInterval: 'Selecione',
			rangeFinal: {
				inicio: null,
				fim: null
			}
		}

	},

	created() {

		this.yearsArray = this.getYearInterval()
		this.yearsArrayReverse = Object.assign([], this.yearsArray)
		this.yearsArrayReverse.reverse()
		this.periodoSelecionado = this.periodoDefault
		this.anoReferencia = this.anoFinal

	},

	methods: {

		toggleCalendar: function() {

			this.isOpen = !this.isOpen
			this.isSelectPeriodoOpen = false
			this.isSelectAnoReferenciaOpen = false

			return

		},

		toggleSelectPeriodo: function() {

			this.isSelectPeriodoOpen = !this.isSelectPeriodoOpen
			this.isSelectAnoReferenciaOpen = false

			return

		},

		toggleAnoReferencia: function() {

			this.isSelectAnoReferenciaOpen = !this.isSelectAnoReferenciaOpen
			this.isSelectPeriodoOpen = false

			return

		},

		getStyleFontColor: function() {

			return 'color: ' + this.styles.baseColor

		},

		getStyleIfSelected: function(selected) {

			if(selected === this.periodoSelecionado || selected === this.anoReferencia.toString()) {

				return 'background-color: ' + this.styles.baseColor + '; color: ' + this.styles.overColor

			}

			return '';

		},

		getStyleIfInterval: function(tipoPeriodo, valor) {

			if(this.noIntervalo(tipoPeriodo, valor)) {

				return 'background-color: ' + this.styles.baseColor + '; color: ' + this.styles.overColor

			}

			return ''

		},

		getYearInterval: function() {

			const interval = []

			for(let i = this.anoInicial; i <= this.anoFinal; i++) {

				interval.push(i.toString())

			}

			return interval

		},

		setPeriodo: function(periodo) {

			this.periodoSelecionado = periodo

			this.toggleSelectPeriodo()

		},

		setAnoReferencia: function(ano) {

			this.anoReferencia = ano

			this.toggleAnoReferencia()

		},

		setPeriodoAnual: function(ano) {

			if(this.rangeAnual.fim !== null && this.rangeAnual.inicio < ano && this.rangeAnual.fim !== ano) {

				this.rangeAnual.fim = ano

			} else if(this.rangeAnual.fim === ano && this.rangeAnual.inicio === ano) {

				this.rangeAnual.inicio = null
				this.rangeAnual.fim = null

			} else {

				this.rangeAnual.inicio = ano
				this.rangeAnual.fim = ano

			}

		},

		setPeriodoMensal: function(nomeMes) {

			let mes = this.meses.indexOf(nomeMes)

			if(this.rangeMensal.fim !== null && this.rangeMensal.fim < mes && this.rangeMensal.fim !== mes) {

				this.rangeMensal.fim = mes

			} else if(this.rangeMensal.fim === mes && this.rangeMensal.inicio === mes) {

				this.rangeMensal.inicio = null
				this.rangeMensal.fim = null

			} else {

				this.rangeMensal.inicio = mes
				this.rangeMensal.fim = mes

			}

		},

		clear: function() {

			this.rangeAnual.inicio = null
			this.rangeAnual.fim = null
			this.rangeMensal.inicio = null
			this.rangeMensal.fim = null
			this.anoReferencia = this.anoFinal
			this.rangeInterval = 'Selecione'
			this.rangeFinal.inicio = null
			this.rangeFinal.fim = null

			this.$emit('selected', this.rangeInterval)

		},

		setRangeInterval: function() {

			if(this.periodoSelecionado === periodos.mensal && this.rangeMensal.inicio !== null) {

				let range = this.rangeMensal

				this.rangeFinal.inicio = new Date(this.anoReferencia, range.inicio, 1)
				this.rangeFinal.fim = new Date(this.anoReferencia, range.fim + 1, 0)

				this.rangeInterval = (range.inicio === range.fim) ? this.meses[range.inicio] : this.meses[range.inicio] + ' - ' + this.meses[range.fim]

			}

			if(this.periodoSelecionado === periodos.anual && this.rangeAnual.inicio !== null) {

				let range = this.rangeAnual

				this.rangeFinal.inicio = new Date(range.inicio, 0, 1)
				this.rangeFinal.fim = new Date(range.fim, 11, 31)

				this.rangeInterval = (range.inicio === range.fim) ? range.inicio : range.inicio + ' - ' + range.fim

			}

			if(this.rangeInterval.inicio !== null) {

				this.$emit('selected', this.rangeFinal)

			}

			this.toggleCalendar()

		},

		noIntervalo: function(tipoPeriodo, valor) {

			if(tipoPeriodo === periodos.anual) {

				return valor >= this.rangeAnual.inicio && valor <= this.rangeAnual.fim

			}

			if(tipoPeriodo === periodos.mensal) {

				let mes = this.meses.indexOf(valor)

				if(this.rangeMensal.inicio === null) {

					return false

				}

				return mes >= this.rangeMensal.inicio && mes <= this.rangeMensal.fim

			}

		},

		isAnoReferencia: function(ano) {

			return ano.toString() === this.anoReferencia.toString()

		},

		inicioSelecao: function(tipoPeriodo, valor) {

			if(tipoPeriodo === periodos.anual) {

				return (this.rangeAnual.inicio !== null) && valor.toString() === this.rangeAnual.inicio.toString()

			}

			if(tipoPeriodo === periodos.mensal) {

				let mes = this.meses.indexOf(valor)

				return mes === this.rangeMensal.inicio

			}

		},

		fimSelecao: function(tipoPeriodo, valor) {

			if(tipoPeriodo === periodos.anual) {

				return (this.rangeAnual.fim !== null) && valor.toString() === this.rangeAnual.fim.toString()

			}

			if(tipoPeriodo === periodos.mensal) {

				let mes = this.meses.indexOf(valor)

				return mes === this.rangeMensal.fim

			}

		},

		isMonthDisabled: function(mes) {

			return new Date() < new Date(this.anoReferencia, mes, 1)

		}

	}

}
