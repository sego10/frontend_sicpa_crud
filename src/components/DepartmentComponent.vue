<template>
<br />
  <div>
    <h3 class="display-4 text-center">Listado de Departamentos</h3>
    <hr />
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="card mt-4">
          <div class="card-body">
            <div class="input-group">
              <input
                type="text"
                v-model="Name"
                class="form-control form-control-lg"
                placeholder="Nombre "
              />
              <input
                type="text"
                v-model="Telefono"
                class="form-control form-control-lg"
                placeholder="Telefono"
              />
              <input
                type="text"
                v-model="Descripcion"
                class="form-control form-control-lg"
                placeholder="Descripcion"
              />                    
              <input
                type="text"
                v-model="EmpresaId"
                class="form-control form-control-lg"
                placeholder="EmpresaId"
              />
              <div class="input-group-append">
                <button
                  v-on:click="agregar()"
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

            <h5 v-if="listDepartamento.length == 0">No hay datos</h5>
            <ul v-if="!loading" class="list-group">
              <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Teléfono</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Empresa</th>         
                  <th scope="col">Estado</th>
                  <th scope="col">Creacion</th>
                  <th scope="col">Modificacion</th>
                  <th scope="col">UsuarioModificacion</th>
                  <th scope="col">UsuarioCreacion</th>                 
                </tr>
                </thead>
                <tbody>
                <tr v-for="(departamento, index) of listDepartamento"
                :key="index"
                >
                  
                  <td>{{ departamento.departmentsName }}</td>
                  <td>{{ departamento.departmentsPhone }}</td>
                  <td>{{ departamento.departmentsDescription }}</td>
                  <td>{{ departamento.id_enterprises }}</td>
                  <td>{{ departamento.departmentsStatus }}</td>
                  <td>{{ departamento.departmentsCreated_date }}</td>
                  <td>{{ departamento.departmentsModified_date }}</td>
                  <td>{{ departamento.departmentsModified_by }}</td>
                  <td>{{ departamento.departmentsCreated_by }}</td>          
            
                  <td> <span class="cursor"
                        v-on:click="editar(departamento,departamento.departmentsId)"
                        >
                          <i class="fa-solid fa-pen"></i>
                        </span></td>
                  <td><span
                      class="text-danger cursor"
                      v-on:click="eliminar(departamento.departmentsId)"
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

const URL = "http://localhost:7387/api/Department/";
export default {
  name: "DepartmentComponent",
  data() {
    return {
      Name: "",
      Telefono:"",
      Descripcion:"",
      EmpresaId:"",

      listDepartamento: [],
      loading: false,
    };
  },
  methods: {
    agregar() {
      const departamento = {
        departmentsName: this.Name,
        departmentsPhone:this.Telefono,
        departmentsCreated_date: "",
        departmentsModified_by:"",
        departmentsCreated_by: "",
        departmentsModified_date: "",
        departmentsStatus: true,
        departmentsDescription: this.Descripcion,
        id_enterprises: this.EmpresaId
      
      };

      this.loading = true;
      axios
        .post(URL, departamento)
        .then((response) => {
          console.log(response);
          this.loading = false;
          this.obtener();
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
    eliminar(id) {

      this.loading = true;
      axios
        .delete(URL + id)
        .then((response) => {
          console.log(response);
          this.obtener();
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    editar(departamento,id) {
    
      departamento = {
        departmentsId: id,
        departmentsName: this.Name,
        departmentsPhone:this.Telefono,
        departmentsCreated_date: "",
        departmentsModified_by:"",
        departmentsCreated_by: "",
        departmentsModified_date: "",
        departmentsStatus: "",
        departmentsDescription: this.Descripcion,
        id_enterprises: this.EmpresaId

      };
     this.loading = true;
     axios.put(URL + id, departamento).then((response)=> {
        console.log(response);
       this.obtener();
       this.loading = false
     }).catch(() => this.loading = false);
    },
    obtener() {
      this.loading = true;
      axios.get(URL).then((response) => {
        console.log(response);
        this.listDepartamento = response.data;
        this.loading = false;
      }).catch(() => this.loading = false);
    },
  },
  created: function () {
    this.obtener();
  },
};
</script>

<style scoped>
.cursor {
  cursor: pointer;
}
</style>