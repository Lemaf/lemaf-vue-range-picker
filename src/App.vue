<template>
  <div id="app">
    <div>
      {{selectedDate.start}} - {{selectedDate.end}}
    </div>
    <LemafRangePicker @selected="onDateSelected" @periodo="periodoSelecionado" ano-inicial="2015" periodo-maximo="5"></LemafRangePicker>
  </div>
</template>

<script>
import LemafRangePicker from './components/LemafRangePicker.vue'

export default {
  name: 'app',
  components: {
    LemafRangePicker
  },
  data () {
    return {
      selectedDate: {
        start: '',
        end: ''
      },
      periodo: ''
    }
  },
  methods: {
    onDateSelected: function (daterange) {
      this.selectedDate = daterange
    },
    periodoSelecionado: function (periodo) {
      this.periodo = periodo
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
