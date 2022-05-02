<template>
<br />
  <div>
    <h1 class="display-4 text-center">Listado de Empleados</h1>
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
                v-model="Surname"
                class="form-control form-control-lg"
                placeholder="Apellido"
              />
              <input
                type="text"
                v-model="Email"
                class="form-control form-control-lg"
                placeholder="Email"
              />
              <input
                type="number"
                v-model="Age"
                class="form-control form-control-lg"
                placeholder="Edad "
              />             
              <input
                type="text"
                v-model="Position"
                class="form-control form-control-lg"
                placeholder="Cargo"
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
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Email</th>
                  <th scope="col">Edad</th>
                  <th scope="col">Cargo</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Creacion</th>
                  <th scope="col">Modificacion</th>
                  <th scope="col">UsuarioModificacion</th>
                  <th scope="col">UsuarioCreacion</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(empleado, index) of listEmpleado"
                :key="index"
                >
                  
                  <td>{{ empleado.employeeName }}</td>
                  <td>{{ empleado.employeeSurname }}</td>
                  <td>{{ empleado.employeeEmail }}</td>
                  <td>{{ empleado.employeeAge }}</td>
                  <td>{{ empleado.employeePosition }}</td>
                  <td>{{ empleado.employeeStatus }}</td>
                  <td>{{ empleado.employeeCreated_date }}</td>
                  <td>{{ empleado.employeeModified_date }}</td>
                  <td>{{ empleado.employeedModified_by }}</td>
                  <td>{{ empleado.employeesCreated_by }}</td>
            
                  <td> <span class="cursor"
                        v-on:click="editar(empleado,empleado.employeesId)"
                        >
                          <i class="fa-solid fa-pen"></i>
                        </span></td>
                  <td><span
                      class="text-danger cursor"
                      v-on:click="eliminar(empleado.employeesId)"
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

const URL = "http://localhost:7387/api/Employee/";
export default {
  name: "EmployeeComponent",
  data() {
    return {
      Name: "",
      Surname:"",
      Email:"",
      Age:"",
      Position:"",

      listEmpleado: [],
      loading: false,
    };
  },
  methods: {
    agregar() {
      const empleado = {
        employeeName: this.Name,
        employeeSurname:this.Surname,
        employeeEmail: this.Email,
        employeeAge:this.Age,
        employeePosition: this.Position,
        employeeStatus: true,
        employeeCreated_date: "",
        employeeModified_date: "",
        employeedModified_by: "",
        employeesCreated_by: "",

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
        employeesId: id,
        employeeName: this.Name,
        employeeSurname:this.Surname,
        employeeEmail: this.Email,
        employeeAge:this.Age,
        employeePosition: this.Position,
        employeeStatus: true,
        employeeCreated_date: "",
        employeeModified_date: "",
        employeedModified_by: "",
        employeesCreated_by: "",

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