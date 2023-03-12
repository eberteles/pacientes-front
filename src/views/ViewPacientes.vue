<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">Paciente</p>
      </div>
    </div>
    <form>
      <div class="row" v-for="paciente in listagem" :key="paciente.id">
        <div class="col-md-3">
          <img :src="paciente.foto" class="contact-img-big">
        </div>
        <div class="col-md-4">
          <ul class="list-group">
            <li class="list-group-item">Cpf: <span class="fw-bolder"> {{ paciente.cpf }} </span></li>
            <li class="list-group-item">Nome: <span class="fw-bolder"> {{ paciente.nome }} </span></li>
            <li class="list-group-item">Mãe: <span class="fw-bolder"> {{ paciente.mae }} </span></li>
            <li class="list-group-item">Nascimento: <span class="fw-bolder"> {{ paciente.nascimento }} </span></li>
            <li class="list-group-item">CNS: <span class="fw-bolder"> {{ paciente.cns }} </span></li>
          </ul>
        </div>
        <div class="col-md-4">
          <ul class="list-group">
            <li class="list-group-item">CEP: <span class="fw-bolder"> {{ paciente.endereco.cep }} </span></li>
            <li class="list-group-item">Endereco: <span class="fw-bolder"> {{ paciente.endereco.endereco }} </span></li>
            <li class="list-group-item">Número: <span class="fw-bolder"> {{ paciente.endereco.numero }} </span></li>
            <li class="list-group-item">Complemento: <span class="fw-bolder"> {{ paciente.endereco.complemento }} </span></li>
            <li class="list-group-item">Bairro: <span class="fw-bolder"> {{ paciente.endereco.bairro }} </span></li>
            <li class="list-group-item">Cidade: <span class="fw-bolder"> {{ paciente.endereco.cidade }} </span></li>
            <li class="list-group-item">Estado: <span class="fw-bolder"> {{ paciente.endereco.estado }} </span></li>
          </ul>
        </div>
        <div v-if="excluido" class="alert alert-danger"> Paciente excluído! </div>
        <div class="col-md-8">
          <router-link to="/" class="btn btn-success"><i class="fa fa-arrow-alt-circle-left"></i> Voltar</router-link>
          &nbsp;
          <b-button @click="excluir" class="btn btn-danger my-1"><i class="fa fa-trash"></i> Excluir</b-button>
        </div>


      </div>
    </form>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        listagem: this.getListagem(),
        excluido: false
      };
    },
    methods: {
      getListagem() {
        this.$http.get('/pacientes/'+this.$route.params.pacienteId).then((response)=>{
          this.listagem = response.data;
        })
      },
      excluir() {
          this.$http.delete('/pacientes/'+this.$route.params.pacienteId).then((response)=>{
            if(response.status == 204) {
              this.excluido = true
              setTimeout(() =>{
                this.$router.push('/');
              },1000)
            }
          })
      }
    }
  };
</script>
