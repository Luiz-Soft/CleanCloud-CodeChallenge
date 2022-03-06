<template>
	<div class="container">
		<div class="formView">
			<p>Pesquisar endereço</p>
			<b-form-input v-model="cep" placeholder="Digite o CEP" />
			<b-button>Pesquisar</b-button>
		</div>
        
		<div>
		<b-table striped hover :items="items"></b-table>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Home',
		data() {
			return {
				cep: '',
				items: [
					{ age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
					{ age: 21, first_name: 'Larsen', last_name: 'Shaw' },
					{ age: 89, first_name: 'Geneva', last_name: 'Wilson' },
					{ age: 38, first_name: 'Jami', last_name: 'Carney' },
				],
			};
		},
		methods: {},
		computed: {},
	};
</script>

<style lang="scss">
	.container {
		background-color: white;
		display: flex;
		flex-direction: column;
	}
	.formView {
		display: flex;
		flex-direction: row;
	}
</style>
