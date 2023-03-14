<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <p class="h3 text-success fw-bold">Importar Pacientes</p>
      </div>
    </div>
    <form @submit.prevent="submitImport()" enctype="multipart/form-data">
    <div class="row">
      <div class="col-md-12">
        <div class="mb-3">
          <label for="formFileSm" class="form-label">Selecione o arquivo no formato CSV com os Pacientes que deseja importar.</label>
          <input class="form-control form-control-sm" id="file" type="file" ref="file" @change="uploadFile" required>
        </div>
      </div>
      <div v-if="enviado" class="alert alert-success"> A importação continuará em segundo plano! </div>
      <div class="col-md-12">
        <input type="submit" class="btn btn-success" value="Enviar">
      </div>


    </div>
    </form>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        arquivo: null,
        enviado: false
      };
    },
    methods: {
      uploadFile() {
        this.arquivo = this.$refs.file.files[0];
      },
      submitImport : async function () {
        const formData = new FormData();
        formData.append('file', this.arquivo);
        const headers = {
          'Content-Type':'multipart/form-data',
          'Accept' : 'application/json'
        };
        try {
          this.$http.post('/import', formData, { headers } ).then( (response) =>{
            if(response.status == 200) {
              this.enviado = true
              setTimeout(() =>{
                this.$router.push('/');
              },1000)
            }
          } )
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
</script>
