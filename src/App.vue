<template>
  <nav>
    <button v-if="seAutentico" @click="logout" class="logout-btn">Cerrar Sesión</button>
    <!-- <router-link to="/">Login</router-link>   | -->
    <router-link to="/pasajero">Pasajero</router-link> |
    <router-link to="/avion">Avion</router-link> |
    <router-link to="/reserva">Reserva</router-link> |
    <router-link to="/reporteV">Reporte Vuelos</router-link> |
    <router-link to="/reporteR">Reporte Reservas</router-link> |
  </nav>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      seAutentico: false,
      valorAlmacenado: null,
    }
  },
  created() {
    this.checkAuth();
  },
  watch: {
    $route() {
      this.checkAuth();
    }
  },
  methods: {
    checkAuth() {
      this.valorAlmacenado = localStorage.getItem('estaAutenticado');
      if (this.valorAlmacenado === 'true') {
        this.seAutentico = true;
      }else{
        this.seAutentico = false;
      }
    },
    logout() {
      localStorage.removeItem('estaAutenticado');
      localStorage.removeItem('token');
      this.seAutentico = false;
      this.$router.push('/');
    }
  }
}
</script>

<style>
nav {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 30px;
  position: relative;
  /* Added for absolute positioning of logout button */
}

.logout-btn {
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #ef4444;
  /* Red color for logout */
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-family: inherit;
  transition: background-color 0.2s;
}

.logout-btn:hover {
  background-color: #dc2626;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
