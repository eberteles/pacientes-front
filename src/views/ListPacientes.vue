<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">Pacientes
          <router-link to="/add/" class="btn btn-success btn-sm"><i class="fa fa-plus-circle"></i> Novo</router-link>&nbsp;&nbsp;
          <router-link to="/import/" class="btn btn-success btn-sm"><i class="fa fa-arrow-circle-up"></i> Importar</router-link>
        </p>
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

    <div class="row">
      <div class="col-md-10">
        <nav v-if="paginacao" class="align-content-center">
          <ul class="pagination pagination justify-content-center">
            <li class="page-item"><a class="page-link" href="#" v-on:click="pagina($event)" :id="paginacao.first" v-if="paginacao.first">Início</a></li>
            <li class="page-item"><a class="page-link" href="#" v-on:click="pagina($event)" :id="paginacao.prev" v-if="paginacao.prev">Anterior</a></li>
            <li class="page-item"><a class="page-link" href="#" v-on:click="pagina($event)" :id="paginacao.next" v-if="paginacao.next">Próximo</a></li>
            <li class="page-item"><a class="page-link" href="#" v-on:click="pagina($event)" :id="paginacao.last" v-if="paginacao.last">Final</a></li>
          </ul>
        </nav>
      </div>
      <div class="col-md-2"><div class="fw-bolder" v-if="paginacao">{{ paginacao.from }} à {{ paginacao.to }} (total: {{ paginacao.total }})</div></div>
    </div>

  </div>

</template>

<script>
  export default {
    data() {
      return {
        listagem: this.getListagem(),
        paginacao: null,
      };
    },
    methods: {
      getListagem() {
        this.$http.get('/pacientes/').then((response)=>{
          this.setaDados(response);
        })
      },
      pagina(event) {
        this.$http.get('/pacientes?page='+event.currentTarget.id).then((response)=>{
          this.setaDados(response);
        })
      },
      setaDados(response) {
        this.paginacao =  {'first': null, 'last': null, 'prev': null, 'next': null, 'from':null, 'to': null, 'total': null};
        this.listagem = response.data.data;
        console.log(response.data.links.first);
        if(response.data.links.first) this.paginacao.first = response.data.links.first.substring(response.data.links.first.indexOf("=") + 1);
        if(response.data.links.last) this.paginacao.last = response.data.links.last.substring(response.data.links.last.indexOf("=") + 1);
        if(response.data.links.prev) this.paginacao.prev = response.data.links.prev.substring(response.data.links.prev.indexOf("=") + 1);
        if(response.data.links.next) this.paginacao.next = response.data.links.next.substring(response.data.links.next.indexOf("=") + 1);
        this.paginacao.from = response.data.meta.from;
        this.paginacao.to = response.data.meta.to;
        this.paginacao.total = response.data.meta.total;
      }
    }
  };
</script>
