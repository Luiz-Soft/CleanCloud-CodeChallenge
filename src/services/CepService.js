import axios from "axios";

export default {
    path: "https://viacep.com.br/ws/",
  
    async getAddress(cep) {
      return axios.get(this.path + `${cep}/json`);
    },
   
  };