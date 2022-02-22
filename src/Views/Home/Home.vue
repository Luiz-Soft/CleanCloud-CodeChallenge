<template>
	<div class="flex-container">
		<div class="">
			<h1 class="title">Dale!!</h1>
			<div class="phrase">
				
					<h2 >Me recomende um</h2>
					
						<select class="input" type="select" v-model="typeSelected">
							<option v-for="type in types" :value="type" :key="type">
								{{ type }}
							</option>
						</select>
						<h2>de</h2>
						<select class="input" type="select" v-model="genderSelected">
							<option v-for="gender in genders" :value="gender" :key="gender">
								{{ gender }}
							</option>
						</select>
						<select class="input" type="select" v-model="nacionalitySelected">
							<option
								v-for="nacionality in nacionalities"
								:value="nacionality"
								:key="nacionality"
							>
								{{ nacionality }}
							</option>
						</select>
					
				
			</div>
     
     
     <div class="agora">
			<button  @click.prevent="enviar()" class="button-3d" >AGORA!!</button>
      <img class="fond-button" src="../../assets/images/fond-please.jpg">
      </div>
     
		</div>
	</div>
  
</template>

<script>


	export default {
		name: 'Home',
		data() {
			return {
				types: ['Filme', 'Seriado', 'Anime', 'Pornô'],
				genders: ['Comédia', 'Terror', 'Aventura'],
				nacionalities: [
					'Francês',
					'Inglês',
					'Estadunidense',
					'Argentino',
					'Brasileiro',
					'Japonês',
				],

				typeSelected: 'Filme',
				genderSelected: 'Comédia',
				nacionalitySelected: 'Francês',
			};
		},
		methods: {

      enviar(){
       window.location.replace("https://api.whatsapp.com/send?phone=5581998921993&text=Dale!!,%20me%20recomenda%20um%20"+this.typeSelected+"%20de%20"+this.genderSelected+"%20"+this.nacionalitySelected+".%20AGORA!!");
      }
    },
		computed: {}
	};
  
</script>

<style lang="scss" >

.agora{
  display: flex;
flex-direction: row;
justify-content: center;
position: relative
}
.agora .fond-button{
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  z-index: -1;
}

h2{
  font-size: 2em;
}

.input{
  font-size: 2em;
}
.title{
display: flex;
flex-direction: row;
justify-content: center;
}
html, body {
	height: 100%;
  min-height: 100%;
  width: 100%;
  background-color: rgb(255,121,24);
  position:fixed
}

.flex-container{
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
//border: 20px solid black;
height: calc(100vh)
}

.phrase{
  display: flex;
  flex-direction: row;
  align-items: baseline;
}

.title{
  font-family: indie;
  font-size: 10em;
  font-style: italic;
}

.fond-button{
z-index: 0;
display: block;
position: absolute;
margin-top: 60vh;
  animation-name: spin;
  animation-duration: 50000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear; 
@keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    } }

}


	@font-face {
		font-family: 'indie';
		src: local('../../assets/fonts/Indie.otf');
	}


@import url('https://fonts.googleapis.com/css?family=Rubik:700&display=swap');

$bg: pink;
$text: #382b22;
$light-pink: #fff0f0;
$pink: #ffe9e9;
$dark-pink: #f9c4d2;
$pink-border: #b18597;
$pink-shadow: #ffe3e2;

* {
  box-sizing: border-box;
  &::before, &::after {
    box-sizing: border-box;
  }
}



button {
  font-size: 1.5rem;
  font-family: indie;
  min-height: 50px;
  min-width: 135px;
  max-height: 100px;
  max-width: 270px;
  margin: 50px;
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  font-style: bolder;
  &.button-3d {
    font-weight: 600;
    color: $text;
    text-transform: uppercase;
    padding: 1.25em 2em;
    background: $light-pink;
    border: 2px solid $pink-border;
    border-radius: 0.75em;
    transform-style: preserve-3d;
    transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1);
    &::before {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: $dark-pink;
      border-radius: inherit;
      box-shadow: 0 0 0 2px $pink-border, 0 0.625em 0 0 $pink-shadow;
      transform: translate3d(0, 0.75em, -1em);
      transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
    }
    &:hover {
      background: $pink;
      transform: translate(0, 0.25em);
      &::before {
        box-shadow: 0 0 0 2px $pink-border, 0 0.5em 0 0 $pink-shadow;
        transform: translate3d(0, 0.5em, -1em);
      }
    }
    &:active {
      background: $pink;
      transform: translate(0em, 0.75em);
      &::before {
        box-shadow: 0 0 0 2px $pink-border, 0 0 $pink-shadow;
        transform: translate3d(0, 0, -1em);
      }
    }
  }
}

/*	@media only screen and (max-device-width: 480px) {
		h1 {
			font-size: 30vw;
		}
    .button-3d {
    margin-top: 15vh;
    max-height: 3vh;
    max-width: 2vh;
    font-size: 3vh;
    }

    .phrase{
    flex-wrap: wrap;
    margin-bottom: 15vh;
    
    }
    
    h2{
    text-align: center;
    font-size: 3vh;
    justify-content: center;
    }
    .flex-container{
       margin-bottom: 12vh;
       margin-top: 10vh;
    }
    .recomend{
      margin-top: 10vh;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-left: 6vh;
    }
	}*/



</style>
