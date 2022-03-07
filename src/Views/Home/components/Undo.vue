<template>
  <div class="flex-container" >

  <p class="warn"> O CEP {{item.CEP}} foi removido com sucesso </p>
  <p class="undo" v-on:click="undo" >Desfazer</p>

  </div>
</template>

<script>
export default {
  name: "Undo",
  props: {
    item: {
      type: Object,
      required: true,
    },
    index:{
      type: Number,
      required:true
    }
  },
  methods:{
    undo(){
      this.$emit('undo', { item: this.item, index:this.index} )
    }
  }

};

</script>

<style scoped>
.flex-container{
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-direction:row;
    background-color:#fff4df;
    border: 1px solid #FF835C;
    border-radius: 5px;
    max-width: 40vw;
    align-self: center;
    padding: 20px 10px 10px 10px;
    max-height: 7vh;
    position: absolute;
    top: 80vh;
}

.warn{
  color:#FF835C;
}

.undo{
   color:#FF835C;
   font-size: 85%;
   cursor: pointer;
}

	@media only screen and (max-device-width: 480px) {

    .flex-container {
    margin-top: 15vh;
    min-height: 3vh;
    min-width: 40vh;
    font-size: 80%;
    top: 65vh;
    }
  }
</style>
