<template>
  <nav>
    <button v-if="seAutentico" @click="logout" class="logout-btn">Cerrar Sesión</button>
    <!-- <router-link to="/">Login</router-link>   | -->
    <router-link to="/pasajero">Pasajero</router-link> |
    <router-link to="/avion">Avion</router-link> |
    <router-link to="/reserva">Reserva</router-link> |
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;

  padding: 18px 40px;

  background: linear-gradient(135deg, #4338ca, #4f46e5);
  color: white;

  box-shadow: 0 10px 30px rgba(67, 56, 202, 0.35);

  position: relative;
  overflow: hidden;
}

/* brillo sutil premium */
nav::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    rgba(255,255,255,0.18),
    rgba(255,255,255,0.05),
    transparent
  );
  pointer-events: none;
}

/* LINKS */
nav a {
  font-weight: 600;
  color: rgba(255,255,255,0.85);
  text-decoration: none;
  position: relative;
  padding: 6px 4px;
  transition: all 0.25s ease;
}

/* underline elegante */
nav a::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -6px;
  width: 0%;
  height: 2.5px;
  border-radius: 2px;
  background-color: #ffffff;
  transform: translateX(-50%);
  transition: width 0.25s ease;
}

nav a:hover::after {
  width: 100%;
}

nav a:hover {
  color: #ffffff;
}

/* LINK ACTIVO */
nav a.router-link-exact-active {
  color: #ffffff;
}

nav a.router-link-exact-active::after {
  width: 100%;
}

/* BOTÓN LOGOUT — estilo glass */
.logout-btn {
  position: absolute;
  right: 40px;

  border: none;
  cursor: pointer;

  padding: 10px 18px;
  border-radius: 10px;

  font-weight: 600;
  letter-spacing: 0.4px;

  color: white;

  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(6px);

  border: 1px solid rgba(255,255,255,0.25);

  transition: all 0.25s ease;
}

/* hover MUY moderno */
.logout-btn:hover {
  background: white;
  color: #4338ca;

  transform: translateY(-3px);
  box-shadow: 0 12px 25px rgba(0,0,0,0.18);
}

/* click */
.logout-btn:active {
  transform: translateY(-1px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

/* Responsive */
@media (max-width: 768px) {
  nav {
    gap: 18px;
    padding: 16px 20px;
  }

  .logout-btn {
    right: 20px;
    padding: 8px 14px;
  }
}
</style>
