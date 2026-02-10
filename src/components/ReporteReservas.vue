<template>
  <div class="container">
    <div class="formulario">
      <h2 class="titulo">Reporte de Reservas</h2>

      <div class="consultar">
        <button @click="consultarReservas">
          🔄 Recargar
        </button>
      </div>

      <!-- LOADING -->
      <p v-if="loading">Cargando reservas...</p>

      <!-- TABLA -->
      <table v-if="reservas.length" class="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Asiento</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="r in reservas" :key="r.id">

            <td>{{ r.id }}</td>

            <!-- FECHA -->
            <td v-if="editandoId !== r.id">{{ r.fecha }}</td>
            <td v-else>
              <input type="date" v-model="reservaEditada.fecha">
            </td>

            <!-- HORA -->
            <td v-if="editandoId !== r.id">{{ r.hora }}</td>
            <td v-else>
              <input type="time" v-model="reservaEditada.hora">
            </td>

            <!-- ORIGEN -->
            <td v-if="editandoId !== r.id">{{ r.origen }}</td>
            <td v-else>
              <input type="text" v-model="reservaEditada.origen">
            </td>

            <!-- DESTINO -->
            <td v-if="editandoId !== r.id">{{ r.destino }}</td>
            <td v-else>
              <input type="text" v-model="reservaEditada.destino">
            </td>

            <!-- PRECIO -->
            <td v-if="editandoId !== r.id">{{ r.precio }}</td>
            <td v-else>
              <input type="number" v-model="reservaEditada.precio">
            </td>

            <!-- ESTADO -->
            <td v-if="editandoId !== r.id">{{ r.estado }}</td>
            <td v-else>
              <input type="text" v-model="reservaEditada.estado">
            </td>

            <!-- ASIENTO -->
            <td v-if="editandoId !== r.id">{{ r.asiento }}</td>
            <td v-else>
              <input type="text" v-model="reservaEditada.asiento">
            </td>

            <td>

              <!-- MODO NORMAL -->
              <template v-if="editandoId !== r.id">
                <button @click="activarEdicion(r)">✏️ Editar</button>
                <button @click="eliminarReserva(r.id)">🗑️ Eliminar</button>
              </template>

              <!-- MODO EDICIÓN -->
              <template v-else>
                <button @click="guardarEdicion">💾 Guardar</button>
                <button @click="cancelarEdicion">❌ Cancelar</button>
              </template>

            </td>
          </tr>
        </tbody>

      </table>

      <!-- MENSAJE VACÍO -->
      <p v-if="!reservas.length && !loading">
        No existen reservas registradas
      </p>

      <!-- ERROR -->
      <p v-if="error" style="color:red;">
        {{ error }}
      </p>

    </div>
  </div>
</template>
<script>
import {
  consultarTodosFachada,
  borrarFachada,
  actualizarFachada
} from "@/clients/ReservasClient";

export default {
  data() {
    return {
      reservas: [],
      loading: false,
      error: null,

      editandoId: null,
      reservaEditada: {
        fecha: "",
        hora: "",
        origen: "",
        destino: "",
        precio: "",
        estado: "",
        asiento: ""
      }
    };
  },

  async mounted() {
    this.consultarReservas();
  },

  methods: {

    async consultarReservas() {
      try {
        this.loading = true;
        this.error = null;

        this.reservas = await consultarTodosFachada();

      } catch (err) {
        this.error = "Error al obtener las reservas";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    activarEdicion(reserva) {
      this.editandoId = reserva.id;
      this.reservaEditada = { ...reserva };
    },

    cancelarEdicion() {
      this.editandoId = null;
      this.reservaEditada = {
        fecha: "",
        hora: "",
        origen: "",
        destino: "",
        precio: "",
        estado: "",
        asiento: ""
      };
    },

    async guardarEdicion() {
      try {

        await actualizarFachada(
          this.editandoId,
          this.reservaEditada
        );

        const index = this.reservas.findIndex(
          r => r.id === this.editandoId
        );

        this.reservas[index] = { ...this.reservaEditada };

        this.cancelarEdicion();

      } catch (err) {
        this.error = "No se pudo actualizar";
        console.error(err);
      }
    },
    async eliminarReserva(id) {

      const confirmado = confirm(
        "¿Seguro que deseas eliminar esta reserva?"
      );

      if (!confirmado) return;

      try {

        await borrarFachada(id);

        // Recargar tabla automáticamente
        this.consultarReservas();

      } catch (err) {
        this.error = "No se pudo eliminar la reserva";
        console.error(err);
      }
    },

  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f3f4f6;
  font-family: 'Inter', sans-serif;
}

/* Card principal */
.formulario {
  display: flex;
  flex-direction: column;
  width: 900px;
  height: 550px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  padding: 10px;
}

/* Título */
.titulo {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 30px;
}

/* Consultar button container */
.consultar {
  margin-bottom: 20px;

}

input {
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  border-radius: 12px;
  padding: 6px 10px;
  font-size: 0.9rem;
  border: 1px solid #d1d5db;
}

/* Tabla moderna */
.tabla {
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  border-radius: 12px;
}

/* Header */
.tabla thead {
  background: linear-gradient(135deg, #4f46e5, #6366f1);
  color: white;
}

.tabla th {
  padding: 14px;
  text-align: left;
  font-weight: 600;
  font-size: 0.9rem;
}

/* Filas */
.tabla td {
  padding: 14px;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
  font-size: 0.95rem;
}

/* Hover elegante */
.tabla tbody tr:hover {
  background-color: #f9fafb;
  transition: background 0.2s;
}

/* Botones */
button {
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 8px 14px;
  margin-right: 8px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.2s;
}

button:hover {
  background-color: #4338ca;
  transform: translateY(-1px);
}

/* Botón eliminar más elegante */
button:last-child {
  background-color: #ef4444;
}

button:last-child:hover {
  background-color: #dc2626;
}

/* Mensaje vacío */
.mensaje {
  margin-top: 20px;
  color: #6b7280;
  font-weight: 500;
}
</style>