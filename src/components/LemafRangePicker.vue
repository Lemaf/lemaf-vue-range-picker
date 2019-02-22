<template>
	<div class="calendar-root">
		<div class="select-style normal-select-style text-secundario" @click="toggleCalendar()">
			<span> {{rangeInterval}} </span>
			<span class="chevron-select"> <chevron-down-circle-outline v-bind:style="getStyleFontColor()"/> </span>
		</div>
		<div class="calendar" v-if="isOpen">
			<div class="calendar-head">
				<close class="close"  @click="toggleCalendar()" v-bind:style="getStyleFontColor()"/>
				<div class="container-head">
					<div class="title">Período</div>
					<div class="select-periodo">
						<div class="select-style normal-select-style" @click="toggleSelectPeriodo()">
							<span> {{periodoSelecionado}} </span>
							<span class="chevron-select"><chevron-down-circle-outline v-bind:style="getStyleFontColor()"/></span>
						</div>
						<div class="options" v-if="isSelectPeriodoOpen">
							<div class="option" v-for="periodo in periodos" :key="periodo" v-bind:style="getStyleIfSelected(periodo)" @click="setPeriodo(periodo)">
								{{periodo}}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="calendar-body" v-if="periodoSelecionado === periodos.anual">
				<div class="title-body" v-bind:style="getStyleFontColor()">
					Ano / Anos
				</div>
				<div class="content-body">
					<div class="item item-ano"
						v-for="ano in yearsArray"
						:key="ano"
						v-bind:class="{
							'primeiro-item': inicioSelecao(periodos.anual, ano) ||  yearsArray.indexOf(ano) % 7 === 0 ,
							'ultimo-item': fimSelecao(periodos.anual, ano) ||(yearsArray.indexOf(ano) + 1) % 7 === 0}"
						@click="setPeriodoAnual(ano)"
						v-bind:style="getStyleIfInterval(periodos.anual, ano)">
						{{ano}}
					</div>
				</div>
			</div>
			<div class="calendar-body" v-if="periodoSelecionado === periodos.mensal">
				<div class="title-body" v-bind:style="getStyleFontColor()">
					Ano de referência
				</div>
				<div class="select-style small-select-style text-secundario" @click="toggleAnoReferencia()">
					<span> {{anoReferencia}} </span>
					<span class="chevron-select"> <chevron-down-circle-outline v-bind:style="getStyleFontColor()"/> </span>
				</div>

				<div class="options" v-if="isSelectAnoReferenciaOpen">
					<div
						class="option"
						v-bind:class="{'selected-option': isAnoReferencia(ano)}"
						v-for="ano in yearsArrayReverse"
						:key="ano"
						v-bind:style="getStyleIfSelected(ano)"
						@click="setAnoReferencia(ano)">
						{{ano}}
					</div>
				</div>

				<div class="title-body" v-bind:style="getStyleFontColor()">
					Mês / Meses
				</div>
				<div class="content-body">
					<div class="item item-mes"
						v-for="mes in meses"
						v-bind:class="{
							'primeiro-item': inicioSelecao(periodos.mensal, mes) || mes === meses[6],
							'ultimo-item': fimSelecao(periodos.mensal, mes) || mes === meses[5]}"
						:key="mes"
						@click="setPeriodoMensal(mes)"
						v-bind:style="getStyleIfInterval(periodos.mensal, mes)">
						{{mes}}
					</div>
				</div>
			</div>
			<div class="calendar-footer">
				<div @click="clear()">Limpar</div>
				<div v-bind:style="getStyleFontColor()" @click="setRangeInterval()">Aplicar</div>
			</div>
		</div>
	</div>
</template>

<script src="./js/rangedate-picker.js"></script>

<style lang="sass" scoped>

@import url('https://fonts.googleapis.com/css?family=Open+Sans');

$cinza-padrao: #E0E0E0
$border-padrao: 1px solid $cinza-padrao

.select-style
	font-size: 14px
	cursor: pointer
	border: $border-padrao
	background: white;
	font-family: 'Open Sans', sans-serif
	border-radius: 20px

.normal-select-style
	padding: 10px 0
	width: 131px

.small-select-style
	padding: 5px 0
	width: 98px

.text-secundario
	color: #9E9E9E

.calendar
	display: block
	font-size: 14px
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.24)
	background: #fff
	position: absolute
	z-index: 9
	border: 1px solid #424242
	border-radius: 30px
	width: 474px
	height: 399px
	margin-top: 5px

.calendar-root
	font-family: 'Open Sans', sans-serif

.chevron-select
	position: relative
	float: right
	margin-right: 10px

.close
	font-size: 24px
	position: absolute
	right: 20px
	top: 20px
	cursor: pointer

.calendar-head
	border-bottom: $border-padrao

	.options
		position: absolute
		z-index: 99
		width: 131px
		border-radius: 20px
		border: $border-padrao
		text-align: center
		background: white

	.option
		cursor: pointer
		padding: 11px 0
		text-align: center
		border-bottom: $border-padrao

	.option:first-child
		border-radius: 20px 20px 0 0

	.option:last-child
		border-bottom: none
		border-radius: 0 0 20px 20px

	.container-head
		display: flex
		padding: 34px 0
		justify-content: center

		.title
			font-size: 24px
			font-weight: bold
			padding: 0 20px

.calendar-body
	height: 194px
	margin-left: 20px
	margin-right: 20px
	font-size: 16px

	.title-body
		margin-top: 20px
		text-align: left
		margin-bottom: 5px

	.content-body
		display: flex
		flex-wrap: wrap
		justify-content: flex-start
		overflow: auto

		.item
			cursor: pointer

		.item-ano
			padding: 9px
			width: 10%

		.item-mes
			width: 16%
			padding: 10px 0

		.primeiro-item
			border-top-left-radius: 20px
			border-bottom-left-radius: 20px

		.ultimo-item
			border-top-right-radius: 20px
			border-bottom-right-radius: 20px

	.options
		position: absolute
		z-index: 99
		width: 98px
		border-radius: 20px
		border: $border-padrao
		text-align: center
		background: white
		margin-top: 2px
		max-height: 200px
		overflow: auto

	.option
		cursor: pointer
		padding: 5px 0
		text-align: center

	.selected-option
		border-radius: 20px

.calendar-footer
	border-top: $border-padrao
	display: flex
	flex-flow: row nowrap
	justify-content: space-between
	height: 72px

	div
		margin-top: 20px
		font-size: 16px
		cursor: pointer

	div:first-child
		margin-left: 20px

	div:last-child
		margin-right: 20px

::-webkit-scrollbar
	width: 5px

::-webkit-scrollbar-thumb
	background: #bbb
	background-clip: padding-box;
	border-radius: 20px

::-webkit-scrollbar-track
	margin: 10px 0

</style>
