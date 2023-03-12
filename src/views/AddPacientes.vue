<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">Novo Paciente</p>
      </div>
    </div>
    <form @submit.prevent="submitCreate()">
    <div class="row">
      <div class="col-md-4">
        <div class="mb-2">
          <input v-model="paciente.cpf" type="text" class="form-control" placeholder="CPF" v-mask="'###.###.###-##'" required>
        </div>
        <div class="mb-2">
          <input v-model="paciente.nome" type="text" class="form-control" placeholder="Nome" required>
        </div>
        <div class="mb-2">
          <input v-model="paciente.mae" type="text" class="form-control" placeholder="Mãe" required>
        </div>
        <div class="mb-2">
          <input v-model="paciente.nascimento" type="text" class="form-control" placeholder="Nascimento" v-mask="'####-##-##'" required>
        </div>
        <div class="mb-2">
          <input v-model="paciente.cns" type="text" class="form-control" placeholder="CNS" maxlength="15" v-mask="'###############'" required>
        </div>
        <div class="mb-2">
          <input v-model="paciente.foto" type="text" class="form-control" placeholder="Foto Link" required>
        </div>
      </div>
      <div class="col-md-4">
        <div class="mb-2">
          <input v-model="paciente.endereco.cep" type="text" class="form-control" placeholder="CEP" v-mask="'########'" v-on:blur="consultaCep" required>
        </div>
        <div class="mb-2">
          <input v-model="paciente.endereco.endereco" type="text" class="form-control" placeholder="Endereco" readonly>
        </div>
        <div class="mb-2">
          <input v-model="paciente.endereco.numero" type="text" class="form-control" placeholder="Número" required>
        </div>
        <div class="mb-2">
          <input v-model="paciente.endereco.complemento" type="text" class="form-control" placeholder="Complemento" required>
        </div>
        <div class="mb-2">
          <input v-model="paciente.endereco.bairro" type="text" class="form-control" placeholder="Bairro" readonly>
        </div>
        <div class="mb-2">
          <input v-model="paciente.endereco.cidade" type="text" class="form-control" placeholder="Cidade" readonly>
        </div>
        <div class="mb-2">
          <input v-model="paciente.endereco.estado" type="text" class="form-control" placeholder="Estado" readonly>
        </div>
      </div>
      <div class="col-md-4">
        <img :src="paciente.foto" class="contact-img">
      </div>
      <div class="col-md-8">
        <input type="submit" class="btn btn-success" value="Criar">
      </div>


    </div>
    </form>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        paciente: {
          cpf : '',
          nome : '',
          mae : '',
          nascimento : '',
          cns : '',
          foto : '',
          endereco : {
            cep: '',
            endereco: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            estado: ''
          }
        }
      };
    },
    methods: {
      adicionar() {

      },
      consultaCep(event) {
        this.$http.get('/cep/' + event.target.value).then((response) => {
          this.paciente.endereco.endereco = response.data.logradouro;
          this.paciente.endereco.complemento = response.data.complemento;
          this.paciente.endereco.bairro = response.data.bairro;
          this.paciente.endereco.cidade = response.data.localidade;
          this.paciente.endereco.estado = response.data.uf;
        })
      },
      submitCreate : async function () {
        console.log(this.paciente);
        try {
          this.$http.post('/pacientes', this.paciente).then( (response) =>{
            console.log(response);
            if(response) {
              return this.$router.push('/');
            } else {
              return this.$router.push('/add');
            }
          } )
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
</script>
