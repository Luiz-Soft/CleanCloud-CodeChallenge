<template>
	<div class="container">
		<div class="formView">
			<h5 class="formView">Pesquisar Endereço</h5>

			<div>
				<b-form-input
					class="input"
					v-model="cep"
					placeholder="Digite o CEP"
					:formatter="formatCep"
					label-for="input-sm"
				/>
			</div>

			<div>
				<b-button :disabled="isCepValid" class="formView input" @click.prevent="getAddress" size="sm"
					>Pesquisar</b-button
				>
			</div>

			<p class="formView sucess">{{ message }}</p>
		</div>

		<div>
			<hr />

			<b-table
				borderless
				sticky-header="60vh"
				hover
				head-variant="dark"
				id="pages-table"
				:items="items"
				:fields="fields"
			>
				<template v-slot:cell(Ações)="data">
					<b-button
						class="button"
						@click.prevent="removeItem(data.item, data.index)"
					>
						Deletar
					</b-button>
				</template>
			</b-table>
		</div>

		<Undo
			v-if="isUndoVisible"
			:item="selectedItem"
			:index="selectedItemIndex"
			@undo="undoRemotion"
		/>
	</div>
</template>

<script>
	import Undo from './components/Undo';
	import CepService from '../../services/CepService';

	export default {
		name: 'Home',
		components: { Undo },
		data() {
			return {
				cep: '',
				items: [
					{
						Rua: 'Avenida Engenheiro Luiz Carlos Berrini',
						CEP: '04571-010',
						Cidade: 'São Paulo',
						Estado: 'SP',
						Complemento: 'Até 1405 - lado ímpar',
					},
					{
						Rua: 'Rua Simão Mendes',
						CEP: '52050-145',
						Cidade: 'Recife',
						Estado: 'PE',
						Complemento: 'lado par',
					},
					{
						Rua: 'Rua do Bom Pastor',
						CEP: '50670-260',
						Cidade: 'Recife',
						Estado: 'PE',
						Complemento: 'lado impar',
					},
					{
						Rua: 'Rua José Bonifácio',
						CEP: '50710-001',
						Cidade: 'Recife',
						Estado: 'PE',
						Complemento: 'de 436/437 ao fim',
					},
				],
				fields: ['Rua', 'CEP', 'Cidade', 'Estado', 'Complemento', 'Ações'],
				message: '',
				selectedItem: '',
				selectedItemIndex: '',
				isUndoVisible: false,
			};
		},
		computed:{
			isCepValid(){
				return this.cep.length<9
			}
		},
		methods: {
			removeItem(selectedItem, index) {
				this.items.splice(index, 1);

				this.selectedItem = selectedItem;
				this.selectedItemIndex = index;
				this.showUndo();
				localStorage.setItem('ceps', JSON.stringify(this.items));
			},

			showUndo() {
				this.isUndoVisible = true;
				setTimeout(() => {
					this.isUndoVisible = false;
				}, 5000);
			},
			undoRemotion({ item, index }) {
				this.items.splice(index, 0, item);
				this.isUndoVisible = false;
				localStorage.setItem('ceps', JSON.stringify(this.items));
			},
			getAddress() {
				let tempCep = '';
				if (this.$route.params.cep) {
					tempCep = this.$route.params.cep;
					this.$route.params.cep = null;
				} else {
					tempCep = this.cep;
				}

				CepService.getAddress(tempCep)
					.then((response) => {
						if (!response.data.erro) {
							let tempAdress = {
								Rua: response.data.logradouro,
								CEP: response.data.cep,
								Cidade: response.data.localidade,
								Estado: response.data.uf,
								Complemento: response.data.complemento,
							};
							this.items.push(tempAdress);
							localStorage.setItem('ceps', JSON.stringify(this.items));
							this._sucessMessage();
						}else{
							this._notFoundMessage()
						}
					})
					.catch((error) => console.log(error));
			},

			_sucessMessage() {
				this.message = 'Endereço adicionado com sucesso.';
				setTimeout(() => {
					this.message = '';
				}, 5000);
			},
           _notFoundMessage() {
				this.message = 'Endereço não encontrado.';
				setTimeout(() => {
					this.message = '';
				}, 5000);
			},
			//essa parte da validacao teve que ser assim pois o componente de input do bootstrap formater obriga que o metodo de formatar seja funcional
			formatCep(value) {
				return this._removeLettersFromCep(value);
			},
			_removeLettersFromCep(value) {
				return this._addDashToCep(value.replace(/[^\d]+/g, ''));
			},
			_addDashToCep(value) {
				let tempValue = value;
				return this._trimCep(tempValue.replace(/(\d{5})(\d{3})/, '$1-$2'));
			},
			_trimCep(value) {
				return value.substring(0, 9);
			},
		},
		beforeMount() {
			if (this.$route.params.cep) {
				this.getAddress();
			}
			if (localStorage.getItem('ceps')) {
				this.items = JSON.parse(localStorage.getItem('ceps'));
			}
		},
	};
</script>

<style>
	.container {
		background-color: white;
		display: flex;
		flex-direction: column;
		border: 1px solid #cdcfd7;
		border-radius: 5px;
		margin-top: 3vh;
		min-height: 75vh;
	}
	.formView {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 1em;
	}
	.table > :not(caption) > * > * {
		background-color: white;
	}
	h5 {
		color: #4b5563;
	}
	td {
		color: #999fb9;
	}
	th {
		font-weight: 400;
	}
	.sucess {
		color: #999fb9;
	}
	.button {
		max-height: 35px;
		background-color: #f0f0f0;
		border: none;
		color: #4b5563;
		font-weight: 400;
	}
	.btn:focus {
		outline: none;
		box-shadow: none;
		background-color: #f0f0f0;
		color: #4b5563;
	}

	.input {
		max-height: 30px;
	}

	@media only screen and (max-device-width: 480px) {
		.input {
			min-width: 100px;
		}
		.sucess {
			position: absolute;
			top: 27vh;
		}
	}
</style>
