<template>
<br />
  <div>
    <h1 class="display-4 text-center">Listado de Empresas</h1>
    <hr />
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="card mt-4">
          <div class="card-body">
            <div class="input-group">
              <input
                type="text"
                v-model="enterprisesName"
                class="form-control form-control-lg"
                placeholder="Nombre "
              />
              <input
                type="text"
                v-model="enterprisesPhone"
                class="form-control form-control-lg"
                placeholder="Telefono"
              />
              <input
                type="text"
                v-model="enterprisesAddress"
                class="form-control form-control-lg"
                placeholder="Direccion "
              />             
              
              <div class="input-group-append">
                <button
                  v-on:click="agregarEmpresa()"
                  class="btn btn-success btn-lg"
                >
                  Agregar
                </button>
              </div>
            </div>
            <br />
            <div class="text-center">
              <div
                v-if="loading"
                class="spinner-border text-success"
                role="status"
              >
                <span class="sr-only">Loading...</span>
              </div>
            </div>

            <h5 v-if="listEmpresa.length == 0">No hay datos</h5>
            <ul v-if="!loading" class="list-group">
              <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Telefono</th>
                  <th scope="col">Direccion</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Modificacion</th>
                  <th scope="col">Creacion</th>
                  <th scope="col">UsuarioModificacion</th>
                  <th scope="col">UsuarioCreacion</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(empresa, index) of listEmpresa"
                :key="index"
                >
                  
                  <td>{{ empresa.enterprisesName }}</td>
                  <td>{{ empresa.enterprisesPhone }}</td>
                  <td>{{ empresa.enterprisesAddress }}</td>
                  <td>{{ empresa.enterprisesStatus }}</td>
                  <td>{{ empresa.enterpricesModified_date }}</td>
                  <td>{{ empresa.enterpricesCreated_date }}</td>
                  <td>{{ empresa.enterpricesModified_by }}</td>
                  <td>{{ empresa.enterprisesCreated_by }}</td>
                  <td> <span class="cursor"
                        v-on:click="editarEmpresa(empresa,empresa.enterprisesId)"
                        >
                          <i class="fa-solid fa-pen"></i>
                        </span></td>
                  <td><span
                      class="text-danger cursor"
                      v-on:click="eliminarEmpresa(empresa.enterprisesId)"
                      >
                        <i class="fas fa-trash-alt"></i>
                      </span></td>
                  
                </tr>
                </tbody>
              </table>
              </div> 
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const URL = "http://localhost:7387/api/Enterprises/";
export default {
  name: "EnterpriseComponent",
  data() {
    return {
      enterprisesName: "",
      enterprisesPhone:"",
      enterprisesAddress:"",
      enterprisesStatus:"",

      listEmpresa: [],
      loading: false,
    };
  },
  methods: {
    agregarEmpresa() {
      const empresa = {
        enterprisesCreated_by: "",
        enterpricesModified_by:"",
        enterprisesStatus: true,
        enterprisesAddress:this.enterprisesAddress,
        enterprisesName: this.enterprisesName,
        enterprisesPhone: this.enterprisesPhone,

      };

      this.loading = true;
      axios
        .post(URL, empresa)
        .then((response) => {
          console.log(response);
          this.loading = false;
          this.obtenerEmpresa();
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
      
    },
    eliminarEmpresa(id) {

      this.loading = true;
      axios
        .delete(URL + id)
        .then((response) => {
          console.log(response);
          this.obtenerEmpresa();
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    editarEmpresa(empresa,id) {

      empresa = {
        enterprisesId: id,
        enterprisesCreated_by: "",
        enterpricesModified_by:"",
        enterprisesStatus: true,
        enterprisesAddress:this.enterprisesAddress,
        enterprisesName: this.enterprisesName,
        enterprisesPhone: this.enterprisesPhone,

      };
     this.loading = true;
     axios.put(URL + id, empresa).then((response)=> {
        console.log(response);
       this.obtenerEmpresa();
       this.loading = false
     }).catch(() => this.loading = false);
    },
    obtenerEmpresa() {
      this.loading = true;
      axios.get(URL).then((response) => {
        console.log(response);
        this.listEmpresa = response.data;
        this.loading = false;
      }).catch(() => this.loading = false);
    },
  },
  created: function () {
    this.obtenerEmpresa();
  },
};
</script>

<style scoped>
.cursor {
  cursor: pointer;
}
</style>