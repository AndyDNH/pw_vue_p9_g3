<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const handleLogin = () => {
  console.log('Ingresando con:', email.value, password.value)
}
</script>

<template>
  <div class="login-wrapper">
    <div class="card">
      
      <div class="left-panel">
        <div class="logo-white">*</div>
        <div class="left-content">
          <p class="subtitle-small">You can easily</p>
          <h2>Haz silencio lucho</h2>
        </div>
      </div>

      <div class="right-panel">
        <div class="logo-color">*</div>
        <h1>Ingresa a tu cuenta</h1>
        <p class="description">
          Access your tasks, notes, and projects anytime, anywhere.
        </p>

        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <label for="email">Your email</label>
            <input 
              id="email" 
              type="email" 
              v-model="email" 
              placeholder="nombre@ejemplo.com"
            >
          </div>

          <div class="input-group">
            <label for="password">Password</label>
            <div class="password-wrapper">
              <input 
                id="password" 
                type="password" 
                v-model="password" 
                placeholder="••••••••••••"
              >
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

<style scoped>
/* Contenedor General para centrar en pantalla */
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;    
  background-color: #f3f4f6;
  font-family: 'Inter', sans-serif;
}

/* Tarjeta Principal */
.card {
  display: flex;
  width: 900px;
  height: 550px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  padding: 10px; /* Pequeño padding interno como en el diseño */
}

/* --- Panel Izquierdo (Gradiente) --- */
.left-panel {
  flex: 1;
  border-radius: 20px;
  /* El truco del degradado estilo "blur" */
  background: 
    radial-gradient(circle at top left, #a5f3fc, transparent 50%),
    radial-gradient(circle at bottom right, #7e22ce, transparent 50%),
    linear-gradient(135deg, #3b82f6, #60a5fa);
  background-size: 150% 150%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  position: relative;
}

.logo-white {
  font-size: 3rem;
  font-weight: bold;
  opacity: 0.9;
}

.subtitle-small {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 10px;
}

.left-content h2 {
  font-size: 1.8rem;
  line-height: 1.3;
  font-weight: 600;
  margin: 0;
}

/* --- Panel Derecho (Formulario) --- */
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
  margin: 0 0 10px 0;
  font-weight: 700;
}

.description {
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 30px;
}

/* Inputs */
.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #1f2937;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box; /* Importante para que el padding no rompa el width */
}

input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

/* Wrapper para el icono de ojo en password */
.password-wrapper {
  position: relative;
}

.eye-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #9ca3af;
  font-size: 0.9rem;
}

/* Botón Principal */
.btn-primary {
  width: 100%;
  background-color: #4f46e5; /* Color índigo similar a la imagen */
  color: white;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  box-shadow: 0 4px 14px rgba(79, 70, 229, 0.4); /* Sombra suave de color */
  transition: transform 0.1s, box-shadow 0.2s;
}

.btn-primary:hover {
  background-color: #4338ca;
  box-shadow: 0 6px 20px rgba(79, 70, 229, 0.6);
}

.btn-primary:active {
  transform: scale(0.98);
}
</style>