<template>
  <div class="login-wrapper">
    <div class="card">
      <div class="left-panel">
        <div class="logo-white">*</div>
        <div class="left-content">
          <p class="subtitle-small">Viaja Seguro</p>
          <h2>Agenda tu cita hoy mismo</h2>
        </div>
      </div>

      <div class="right-panel">
        <div class="logo-color">*</div>
        <h1>Ingresa a tu cuenta</h1>
        <p class="description">
          Viajes en todo momento y en cualquier lugar.
        </p>

        <div v-if="mostrarMensaje" class="mensaje-container">
          <span :class="['mensaje', { 'mensaje-error': esError }]">
            {{ mensaje }}
          </span>
        </div>

        <form @submit.prevent="login">
          <div class="input-group">
            <label for="usuario">Usuario</label>
            <input id="usuario" type="text" v-model="usuario" placeholder="Andres">
          </div>

          <div class="input-group">
            <label for="password">Contraseña</label>
            <div class="password-wrapper">
              <input id="password" type="password" v-model="password" placeholder="••••••••••••">
              <span class="eye-icon">👁️</span>
            </div>
          </div>

          <button type="submit" class="btn-primary">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { obtenertokenFachada } from "../clients/AutorizationClient.js";

export default {
  data() {
    return {
      usuario: "",
      password: "",
      // Estado para mensajes
      mensaje: "",
      mostrarMensaje: false,
      esError: false
    };
  },
  methods: {
    mostrarAlerta(texto, error = false) {
      this.mensaje = texto;
      this.esError = error;
      this.mostrarMensaje = true;
      
      // Si es error, lo quitamos a los 3 segundos
      if (error) {
        setTimeout(() => {
          this.mostrarMensaje = false;
        }, 3000);
      }
    },

    async login() {
      try {
        await obtenertokenFachada(this.usuario, this.password);
        const token = localStorage.getItem("token");

        if (token && token !== "undefined" && token !== "null") {
          localStorage.setItem("estaAutenticado", true);
          this.mostrarAlerta("Usuario Autenticado", false);

          setTimeout(() => {
            const redirectPath = this.$route.query.redirect || { name: 'pasajero' };
            this.$router.push(redirectPath);
          }, 2000);

        } else {
          this.mostrarAlerta("Credenciales Incorrectas, Vuelva a intentarlo", true);
        }
      } catch (error) {
        this.mostrarAlerta("Error de conexión con el servidor", true);
        console.error('Error Login:', error);
      }
    },
  },
};
</script>

<style scoped>
/* --- ESTILOS DE MENSAJES (Basados en GestionPasajeros) --- */
.mensaje-container {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  animation: slideDown 0.3s ease-out;
}

.mensaje {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.85rem;
  background-color: #eef2ff; /* Azul para éxito */
  color: #4f46e5;
  border: 1px solid rgba(79, 70, 229, 0.2);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.1);
  text-align: center;
}

.mensaje-error {
  background-color: #fef2f2; /* Rojo para error */
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.1);
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* --- TUS ESTILOS EXISTENTES --- */
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f3f4f6;
  font-family: 'Inter', sans-serif;
}

.card {
  display: flex;
  width: 900px;
  height: 550px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  padding: 10px;
}

.left-panel {
  flex: 1;
  border-radius: 20px;
  background: radial-gradient(circle at top left, #a5f3fc, transparent 50%),
              radial-gradient(circle at bottom right, #7e22ce, transparent 50%),
              linear-gradient(135deg, #3b82f6, #60a5fa);
  background-size: 150% 150%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
}

.right-panel {
  flex: 1;
  padding: 40px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.logo-color {
  color: #4f46e5;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
}

h1 {
  font-size: 2rem;
  color: #111827;
  margin-bottom: 10px;
  font-weight: 700;
}

.description {
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  box-sizing: border-box;
}

.btn-primary {
  width: 100%;
  background-color: #4f46e5;
  color: white;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(79, 70, 229, 0.4);
}
</style>