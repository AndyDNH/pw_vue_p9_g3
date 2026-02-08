<template>
  <div>
    <h2>AVIONES</h2>

    <!-- CONSULTAS -->
    <div style="margin-bottom: 20px;">
      <button @click="consumirTodos">Consultar Todos</button>

      <button @click="consumirPorId">Consultar por ID</button>
      <input v-model.number="idConsulta" type="number" min="1" placeholder="ID" />

      <button @click="consumirPorAerolinea">Buscar por Aerolínea</button>
      <input v-model="aerolineaConsulta" type="text" placeholder="Aerolínea" />
    </div>

    <!-- FORMULARIO -->
    <h3>{{ modoEdicion ? "Actualizar Avión" : "Registrar Avión" }}</h3>

    <input v-if="modoEdicion" v-model.number="idEdicion" type="number" placeholder="ID (edición)" disabled />

    <input v-model="avion.modelo" placeholder="Modelo" type="text" />
    <input v-model.number="avion.capacidad" placeholder="Capacidad" type="number" min="1" />
    <input v-model="avion.aerolinea" placeholder="Aerolínea" type="text" />
    <input v-model="avion.clase" placeholder="Clase" type="text" />
    <input v-model="avion.espacioEquipaje" placeholder="Espacio Equipaje" type="text" />

    <br/><br/>
    
    <button v-if="!modoEdicion" @click="guardar">Guardar</button>
    <button v-else @click="actualizar">Actualizar</button>
    <button @click="limpiar">Limpiar</button>

    <h3 style="margin-top: 25px;">Borrar Avión</h3>
    <input v-model.number="idBorrar" type="number" min="1" placeholder="ID a borrar" />
    <br /><br />
    <button @click="borrar">Borrar</button>

    <!-- TABLA -->
    <h3 style="margin-top: 25px;">Resultados</h3>

    <table v-if="aviones && aviones.length" border="1" style="margin:auto">
      <tr>
        <th>ID</th>
        <th>Modelo</th>
        <th>Capacidad</th>
        <th>Aerolínea</th>
        <th>Clase</th>
        <th>Espacio Equipaje</th>
        <th>Acción</th>
      </tr>

      <tr v-for="a in aviones" :key="a.id">
        <td>{{ a.id }}</td>
        <td>{{ a.modelo }}</td>
        <td>{{ a.capacidad }}</td>
        <td>{{ a.aerolinea }}</td>
        <td>{{ a.clase }}</td>
        <td>{{ a.espacioEquipaje }}</td>
        <td>
          <button @click="cargarEdicion(a)">Editar</button>
        </td>
      </tr>
    </table>

    <table v-if="avionUnico" border="1" style="margin:auto">
      <tr><th>ID</th><td>{{ avionUnico.id }}</td></tr>
      <tr><th>Modelo</th><td>{{ avionUnico.modelo }}</td></tr>
      <tr><th>Capacidad</th><td>{{ avionUnico.capacidad }}</td></tr>
      <tr><th>Aerolínea</th><td>{{ avionUnico.aerolinea }}</td></tr>
      <tr><th>Clase</th><td>{{ avionUnico.clase }}</td></tr>
      <tr><th>Espacio Equipaje</th><td>{{ avionUnico.espacioEquipaje }}</td></tr>
    </table>
  </div>
</template>

<script>
import {
  consultarTodosFachada,
  consultarPorIdFachada,
  guardarFachada,
  actualizarFachada,
  borrarFachada,
  buscarPorAerolineaFachada,
} from "../clients/AvionClient.js";

export default {
  data() {
    return {
      // consultas
      aviones: null,
      avionUnico: null,
      idConsulta: null,
      aerolineaConsulta: "",

      // form
      modoEdicion: false,
      idEdicion: null,
      avion: {
        modelo: "",
        capacidad: null,
        aerolinea: "",
        clase: "",
        espacioEquipaje: "",
      },

      // borrar
      idBorrar: null,
    };
  },

  methods: {
    async consumirTodos() {
      this.aviones = null;
      this.avionUnico = null;
      try {
        this.aviones = await consultarTodosFachada();
      } catch (_) {
        this.aviones = null;
      }
    },

    async consumirPorId() {
      this.avionUnico = null;
      this.aviones = null;
      try {
        this.avionUnico = await consultarPorIdFachada(this.idConsulta);
      } catch (_) {}
    },

    async consumirPorAerolinea() {
      this.avionUnico = null;
      this.aviones = null;
      try {
        this.aviones = await buscarPorAerolineaFachada(this.aerolineaConsulta);
      } catch (_) {
        this.aviones = null;
      }
    },

    async guardar() {
      const body = {
        modelo: this.avion.modelo,
        capacidad: this.avion.capacidad,
        aerolinea: this.avion.aerolinea,
        clase: this.avion.clase,
        espacioEquipaje: this.avion.espacioEquipaje,
      };

      await guardarFachada(body);
      this.limpiar();
      await this.consumirTodos();
    },

    cargarEdicion(a) {
      this.modoEdicion = true;
      this.idEdicion = a.id;

      this.avion = {
        modelo: a.modelo,
        capacidad: a.capacidad,
        aerolinea: a.aerolinea,
        clase: a.clase,
        espacioEquipaje: a.espacioEquipaje,
      };
    },

    async actualizar() {
      const body = {
        modelo: this.avion.modelo,
        capacidad: this.avion.capacidad,
        aerolinea: this.avion.aerolinea,
        clase: this.avion.clase,
        espacioEquipaje: this.avion.espacioEquipaje,
      };

      await actualizarFachada(this.idEdicion, body);
      this.limpiar();
      await this.consumirTodos();
    },

    async borrar() {
      await borrarFachada(this.idBorrar);
      this.idBorrar = null;
      await this.consumirTodos();
    },

    limpiar() {
      this.modoEdicion = false;
      this.idEdicion = null;
      this.avion = {
        modelo: "",
        capacidad: null,
        aerolinea: "",
        clase: "",
        espacioEquipaje: "",
      };
    },
  },
};
</script>

<style scoped>
button {
  margin-right: 10px;
  padding: 6px 10px;
}
input {
  display: block;
  margin: 8px auto;
  padding: 6px 10px;
  width: 260px;
}
th, td {
  padding: 8px 12px;
}
</style>
