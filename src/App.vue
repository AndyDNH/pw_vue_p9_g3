<template>
  <nav>
    <router-link to="/">Login</router-link>   |
    <router-link to="/pasajero">Pasajero</router-link> |
    <router-link to="/avion">Avion</router-link> |
    <router-link to="/reserva">Reserva</router-link> |
    <router-link to="/reporteV">Reporte Vuelos</router-link> |
    <router-link to="/reporteR">Reporte Reservas</router-link> |
  </nav>
  <router-view />
</template>

<style>
nav {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
