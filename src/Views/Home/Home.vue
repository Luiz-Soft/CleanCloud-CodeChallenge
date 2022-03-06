<template>
	<div class="container">
		<div class="formView">
			<p>Pesquisar endereço</p>
			<b-form-input v-model="cep" placeholder="Digite o CEP" :formatter="formatCep" />
			<b-button @click.prevent="getAddress" >Pesquisar</b-button>
			<p> {{message}} </p>
		</div>
        
		<div>
		<hr>

<b-table hover head-variant="dark"
		id="pages-table"
           :items="items"
           :fields="fields">
    <template v-slot:cell(Ações)="data" >
        <b-button @click.prevent="removeItem(data.item, data.index)">
          Deletar {{data.index}}
        </b-button>
      </template>
  </b-table>

	</div>

<Undo v-if="isUndoVisible" :item="selectedItem" :index="selectedItemIndex" @undo="undoRemotion" />
	</div>

</template>

<script>
import Undo from './components/Undo';
import CepService from '../../services/CepService'

	export default {
		name: 'Home',
		components: {Undo},
		data() {
			return {
				cep: '',
				items: [
					{ Rua: 40, CEP: 'Larsen', Cidade: 'Macdonald',Estado: 'Larsen',Complemento: 'Macdonald',  },
					{ Rua: 21, CEP: 'Larsen', Cidade: 'Shaw' ,Estado: 'Larsen',Complemento: 'Macdonald', },
					{ Rua: 89, CEP: 'Geneva', Cidade: 'Wilson',Estado: 'Larsen',Complemento: 'Macdonald', },
					{ Rua: 38, CEP: 'Jami', Cidade: 'Carney',Estado: 'Larsen',Complemento: 'Macdonald', },
				],
				fields:['Rua','CEP','Cidade','Estado', 'Complemento', 'Ações'],
				message: '',
				selectedItem: '',
				selectedItemIndex: '',
				isUndoVisible: false,
			};
		},
		methods: {


			removeItem(selectedItem, index){
				
				this.items.splice(index,1)
					
				this.selectedItem = selectedItem
				this.selectedItemIndex = index		
				this.showUndo()	
				localStorage.setItem('ceps', JSON.stringify(this.items) )
			},

			showUndo(){
				this.isUndoVisible= true
				setTimeout(() => {
					this.isUndoVisible= false
				}, 5000);
			},
			undoRemotion({item, index}){
				this.items.splice(index, 0, item)
				this.isUndoVisible=false
				localStorage.setItem('ceps', JSON.stringify(this.items) )
			},
			getAddress(){
			let tempCep = ''
			if(this.$route.params.cep){
			tempCep= this.$route.params.cep
			this.$route.params.cep=null
			}else {
				tempCep = this.cep
			}
			
				CepService.getAddress(tempCep).then((response)=>{
					if(!response.data.erro){
					let tempAdress = { Rua: response.data.logradouro, CEP: response.data.cep, Cidade: response.data.localidade ,Estado: response.data.uf, Complemento: response.data.complemento, }
					this.items.push(tempAdress)
					localStorage.setItem('ceps', JSON.stringify(this.items) )
					this._sucessMessage()
					}	

				}).catch(error=>console.log(error))
			},
			
           _sucessMessage(){
			this.message ="Endereço adicionado com sucesso"
			setTimeout(() => {
					this.message= ''
				}, 5000);},

			//essa parte da validacao teve que ser assim pois o componente de input do bootstrap formater obriga que o metodo de formatar seja funcional
			formatCep(value){
				return this._removeLettersFromCep(value)
			},
			_removeLettersFromCep(value){
				return this._addDashToCep(value.replace(/[^\d]+/g, ''))
			},
			_addDashToCep(value){
			let tempValue = value	
			return this._trimCep(tempValue.replace(/(\d{5})(\d{3})/, '$1-$2'));
			},
			_trimCep(value){
				return value.substring(0,9)
			},

		},
		beforeMount(){
			if(this.$route.params.cep){
				this.getAddress()
			}
			if(localStorage.getItem('ceps')){
				this.items = JSON.parse(localStorage.getItem('ceps'))
			}
		}

		
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
