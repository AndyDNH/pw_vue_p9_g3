<template>
  <div>
    <h2>Pasajeros</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Cedula</th>
          <th>Correo</th>
          <th>Teléfono</th>
          <th>Fecha de Nacimiento</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pasajero in pasajeroArr" :key="pasajero">
          <td>{{ pasajero.id }}</td>
          <td>{{ pasajero.nombre }}</td>
          <td>{{ pasajero.apellido }}</td>
          <td>{{ pasajero.cedula }}</td>
          <td>{{ pasajero.email }}</td>
          <td>{{ pasajero.telefono }}</td>
          <td>{{ pasajero.fechaNacimiento }}</td>
          <button>Actualizar</button>
          <button>Borrar</button>
        </tr>
      </tbody>
    </table>
    <button @click="listar">Buscar Todos</button>
  </div>
</template>

<script>
import { listarTodosFachada } from "../clients/PasajeroClient.js";
export default {
  data() {
    return {
      pasajeroArr: [],
    };
  },
  methods: {
    async listar() {
      this.pasajeroArr = await listarTodosFachada();
    },
  },
};
</script>

<style scoped>
table,
th,
td,
tr {
  border: 1px solid black;
  border-collapse: collapse;
  padding: auto;
  padding: 10px 10px;
}
</style>