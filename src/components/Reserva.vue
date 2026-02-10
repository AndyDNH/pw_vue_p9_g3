<template>
  <div>
    <h2>RESERVAS</h2>

    <button @click="consumirTodos">Consultar Todos</button>

    <button @click="consumirPorId">Consultar por ID</button>
    <input v-model.number="idConsulta" type="number" min="1" placeholder="ID" />

    <hr />

    <h3>{{ modoEdicion ? "Actualizar Reserva" : "Registrar Reserva" }}</h3>

    <input v-if="modoEdicion" v-model.number="idEdicion" type="number" disabled />

    <input v-model="reserva.fecha" type="date" />
    <input v-model="reserva.hora" type="time" />
    <input v-model="reserva.origen" placeholder="Origen" type="text" />
    <input v-model="reserva.destino" placeholder="Destino" type="text" />
    <input v-model.number="reserva.precio" placeholder="Precio" type="number" step="0.01" min="0" />
    <input v-model="reserva.estado" placeholder="Estado" type="text" />
    <input v-model.number="reserva.asiento" placeholder="Asiento" type="number" min="1" />
    <input v-model.number="reserva.idAvion" placeholder="ID Avión" type="number" min="1" />
    <input v-model.number="reserva.idPasajero" placeholder="ID Pasajero" type="number" min="1" />

    <br /><br />
    <button v-if="!modoEdicion" @click="guardar">Guardar</button>
    <button v-else @click="actualizar">Actualizar</button>
    <button @click="limpiar">Limpiar</button>

    <hr />

    <h3>Borrar Reserva</h3>
    <input v-model.number="idBorrar" type="number" min="1" placeholder="ID a borrar" />
    <br /><br />
    <button @click="borrar">Borrar</button>

    <hr />

    <table v-if="reservas && reservas.length" border="1" style="margin:auto">
      <tr>
        <th>ID</th><th>Fecha</th><th>Hora</th><th>Origen</th><th>Destino</th>
        <th>Precio</th><th>Estado</th><th>Asiento</th><th>ID Avión</th><th>ID Pasajero</th>
        <th>Acción</th>
      </tr>

      <tr v-for="r in reservas" :key="r.id">
        <td>{{ r.id }}</td>
        <td>{{ r.fecha }}</td>
        <td>{{ r.hora }}</td>
        <td>{{ r.origen }}</td>
        <td>{{ r.destino }}</td>
        <td>{{ r.precio }}</td>
        <td>{{ r.estado }}</td>
        <td>{{ r.asiento }}</td>
        <td>{{ r.idAvion }}</td>
        <td>{{ r.idPasajero }}</td>
        <td>
          <button @click="cargarEdicion(r)">Editar</button>
        </td>
      </tr>
    </table>

    <table v-if="reservaUnica" border="1" style="margin:auto">
      <tr><th>ID</th><td>{{ reservaUnica.id }}</td></tr>
      <tr><th>Fecha</th><td>{{ reservaUnica.fecha }}</td></tr>
      <tr><th>Hora</th><td>{{ reservaUnica.hora }}</td></tr>
      <tr><th>Origen</th><td>{{ reservaUnica.origen }}</td></tr>
      <tr><th>Destino</th><td>{{ reservaUnica.destino }}</td></tr>
      <tr><th>Precio</th><td>{{ reservaUnica.precio }}</td></tr>
      <tr><th>Estado</th><td>{{ reservaUnica.estado }}</td></tr>
      <tr><th>Asiento</th><td>{{ reservaUnica.asiento }}</td></tr>
      <tr><th>ID Avión</th><td>{{ reservaUnica.idAvion }}</td></tr>
      <tr><th>ID Pasajero</th><td>{{ reservaUnica.idPasajero }}</td></tr>
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
} from "../clients/ReservaClient.js";

export default {
  data() {
    return {
      reservas: null,
      reservaUnica: null,

      idConsulta: null,

      modoEdicion: false,
      idEdicion: null,

      reserva: {
        fecha: "",
        hora: "",
        origen: "",
        destino: "",
        precio: null,
        estado: "",
        asiento: null,
        idAvion: null,
        idPasajero: null,
      },

      idBorrar: null,
    };
  },
  methods: {
    async consumirTodos() {
      this.reservas = null;
      this.reservaUnica = null;
      try {
        this.reservas = await consultarTodosFachada();
      } catch (_) {
        this.reservas = null;
      }
    },

    async consumirPorId() {
      this.reservaUnica = null;
      this.reservas = null;
      try {
        this.reservaUnica = await consultarPorIdFachada(this.idConsulta);
      } catch (_) {}
    },

    async guardar() {
      const body = { ...this.reserva };
      await guardarFachada(body);
      this.limpiar();
      await this.consumirTodos();
    },

    cargarEdicion(r) {
      this.modoEdicion = true;
      this.idEdicion = r.id;

      this.reserva = {
        fecha: r.fecha,
        hora: r.hora,
        origen: r.origen,
        destino: r.destino,
        precio: r.precio,
        estado: r.estado,
        asiento: r.asiento,
        idAvion: r.idAvion,
        idPasajero: r.idPasajero,
      };
    },

    async actualizar() {
      const body = { ...this.reserva };
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

      this.reserva = {
        fecha: "",
        hora: "",
        origen: "",
        destino: "",
        precio: null,
        estado: "",
        asiento: null,
        idAvion: null,
        idPasajero: null,
      };
    },
  },
};
</script>

<style>
button {
  margin-right: 10px;
  padding: 6px 10px;
}
input {
  margin-right: 10px;
  padding: 6px 10px;
}
th, td {
  padding: 8px 12px;
}
</style>
