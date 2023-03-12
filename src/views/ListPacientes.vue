<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">Pacientes
          <router-link to="/add/" class="btn btn-success btn-sm"><i class="fa fa-plus-circle"></i> Novo</router-link>
        </p>

        <form>
          <div class="row">
            <div class="col-md-6">
              <div class="row">
                <div class="col">
                  <input type="text" class="form-control" placeholder="Pesquisar">
                </div>
                <div class="col">
                  <input type="submit" class="btn btn-outline-dark">
                </div>

              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

      <div class="row">
        <div class="col-md-6" v-for="paciente in listagem" :key="paciente.id">
          <div class="card my-2 list-group-item-success">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-3">
                  <img :src="paciente.foto" class="contact-img">
                  <div class="btn-group">
                    <router-link :to="{ name:'ViewPacientes', params:{ pacienteId: paciente.id } }" class="btn btn-warning my-1"><i class="fa fa-eye"></i></router-link>
                    &nbsp;&nbsp;
                    <router-link :to="{ name:'EditPacientes', params:{ pacienteId: paciente.id } }" class="btn btn-primary my-1"><i class="fa fa-pen"></i></router-link>
                  </div>
                </div>
                <div class="col-sm-9">
                  <ul class="list-group">
                    <li class="list-group-item">Cpf: <span class="fw-bolder"> {{ paciente.cpf }} </span></li>
                    <li class="list-group-item">Nome: <span class="fw-bolder"> {{ paciente.nome }} </span></li>
                    <li class="list-group-item">Mãe: <span class="fw-bolder"> {{ paciente.mae }} </span></li>
                    <li class="list-group-item">Nascimento: <span class="fw-bolder"> {{ paciente.nascimento }} </span></li>
                    <li class="list-group-item">CNS: <span class="fw-bolder"> {{ paciente.cns }} </span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  </div>

</template>

<script>
  export default {
    data() {
      return {
        listagem: this.getListagem(),
      };
    },
    methods: {
      getListagem() {
        this.$http.get('/pacientes/').then((response)=>{
          this.listagem = response.data.data;
        })
      }
    }
  };
</script>
