<template>
  <div class="login">
    <h2>Login</h2>
    <input v-model="usuario" type="text" placeholder="Usuario" />
    <input v-model="password" type="password" placeholder="Contraseña" />
    <button @click="login">Entrar</button>
  </div>
</template>

<script>
import { obtenertokenFachada } from "../clients/AutorizationClient.js";
export default {
  data() {
    return {
      usuario: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const token = await obtenertokenFachada(this.usuario, this.password);
      localStorage.setItem("token", token);
      localStorage.setItem("estaAutorizado", true);
    },
  },
};
</script>

<style>
</style>