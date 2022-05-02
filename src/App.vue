<template>

  <br />
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid">
    
    <router-link to="/enterprise">Empresa</router-link>
    <router-link to="/employee">Empleado</router-link>
    <router-link to="/department">Departamento</router-link>
    <router-link to="/departmentemployee">Empleado por Departamento</router-link>
    <div class="navbar-header">
    </div>
     <div class="navbar-header">
    </div>
    </div>
    
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #180d47;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #f7f7f7;
}

nav a.router-link-exact-active {
  color: #63fc0b;
}
</style>
