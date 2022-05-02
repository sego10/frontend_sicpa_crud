<template>
<br />
  <div>
    <h1 class="display-4 text-center">Listado de Empleados por departamento</h1>
    <hr />
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="card mt-4">
          <div class="card-body">
            <div class="input-group">
              <input
                type="text"
                v-model="DepartamentoId"
                class="form-control form-control-lg"
                placeholder="DepartamentoId"
              />
              <input
                type="text"
                v-model="EmpleadoId"
                class="form-control form-control-lg"
                placeholder="EmpleadoId"
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
            <h5 v-if="listEmpleado.length == 0">No hay datos</h5>
            <ul v-if="!loading" class="list-group">
              <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                <tr>
                  <th scope="col">Departamento</th>
                  <th scope="col">Empleado</th>
                  <th scope="col">Estado</th>
            
                  <th scope="col">Creacion</th>
                  <th scope="col">Modificacion</th>
                  <th scope="col">UsuarioModificacion</th>
                  <th scope="col">UsuarioCreacion</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(empleado, index) of listEmpleado"
                :key="index"
                >
                  
                  <td>{{ empleado.id_department }}</td>
                  <td>{{ empleado.id_employee }}</td>
                  <td>{{ empleado.DepEmpStatus }}</td>
                  <td>{{ empleado.DepEmpCreated_date }}</td>
                  <td>{{ empleado.DepEmpModified_date }}</td>
                  <td>{{ empleado.DepEmpModified_by }}</td>
                  <td>{{ empleado.DepEmpCreated_by }}</td>
              
            
                  <td> <span class="cursor"
                        v-on:click="editar(empleado,empleado.DepEmpId)"
                        >
                          <i class="fa-solid fa-pen"></i>
                        </span></td>
                  <td><span
                      class="text-danger cursor"
                      v-on:click="eliminar(empleado.DepEmpId)"
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

const URL = "http://localhost:7387/api/DepartamentoEmpleado/";
export default {
  name: "DepartmentEmployeeComponent",
  data() {
    return {
      DepartamentoId: "",
      EmpleadoId: "",
    
      listEmpleado: [],
      loading: false,
    };
  },
  methods: {
    agregar() {
      const empleado = {
        DepEmpCreated_by: "",
        DepEmpCreated_date: "",
        DepEmpModified_by: "",
        DepEmpStatus:true,
        id_department: this.DepartamentoId,
        id_employee: this.EmpleadoId,
        DepEmpModified_date: "",

      };

      this.loading = true;
      axios
        .post(URL, empleado)
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
    editar(empleado,id) {
    
      empleado = {
        DepEmpId: id,
        DepEmpCreated_by: "",
        DepEmpCreated_date: "",
        DepEmpModified_by: "",
        DepEmpStatus:true,
        id_department: this.DepartamentoId,
        id_employee: this.EmpleadoId,
        DepEmpModified_date: "",

      };
     this.loading = true;
     axios.put(URL + id, empleado).then((response)=> {
        console.log(response);
       this.obtener();
       this.loading = false
     }).catch(() => this.loading = false);
    },
    obtener() {
      this.loading = true;
      axios.get(URL).then((response) => {
        console.log(response);
        this.listEmpleado = response.data;
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
