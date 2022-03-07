<template>
  <div class="flex-container" >
    <b-navbar  class="navbar-background-color flex-container" toggleable="lg" type="light" variant="light">
      
      <img src="../assets/images/logo.cleancloud.svg" alt="CleanCloud logo"  width="500" height="50"> <img/>

    </b-navbar>
  </div>
</template>

<script>

export default {
  name: "Navbar",

};
</script>

<style scoped>
.flex-container{
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-grow: 1;
}
 .navbar-background-color{
    background-color: #ffff !important;
    padding: 3vh
}


</style>
