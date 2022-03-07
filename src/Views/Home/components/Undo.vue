<template>
  <div class="flex-container" >

  <p> O CEP {{item.CEP}} foi removido com sucesso </p>
  <p v-on:click="undo" >Desfazer</p>

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
    justify-content: center;
    width: 100%;
    flex-direction:row;
    background-color:#fff4df;
    border: 1px solid #ffc961;
    border-radius: 5px;
    
}



</style>
