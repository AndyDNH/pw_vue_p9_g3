<template>
  <div class="main-wrapper">
    <div class="card">
      <div class="card-header">
        <div class="title-group">
          <div class="logo-color">*</div>
          <h2>Gestión de Reservas</h2>
          <p class="subtitle">Administra reservas, edita su información y elimina registros.</p>
        </div>
      </div>

      <!-- Tabs -->
      <div class="tabs">
        <button :class="['tab', { active: activeTab === 'crear' }]" @click="activeTab = 'crear'">
          Crear Reserva
        </button>
        <button :class="['tab', { active: activeTab === 'lista' }]" @click="activeTab = 'lista'">
          Reporte de Reservas
        </button>
        <button :class="['tab', { active: activeTab === 'editar' }]" @click="activeTab = 'editar'">
          Editar Reserva
        </button>
        <button :class="['tab', { active: activeTab === 'eliminar' }]" @click="activeTab = 'eliminar'">
          Eliminar Reserva
        </button>
      </div>

      <!-- TAB 1: CREAR -->
      <div v-if="activeTab === 'crear'" class="tab-content">
        <div class="form-card">
          <h3 class="form-title">Crear Nueva Reserva</h3>

          <!-- PRIMER PASO -->
          <div v-if="!reservaValidada" class="form-grid">

            <div class="form-group">
              <label>Cédula:</label>
              <input v-model="cedula" type="text" placeholder="0102030405" />
            </div>

            <div class="form-group">
              <label>Aerolínea:</label>
              <!-- usar select para no ingresar manualmente -->
              <select v-model="aerolinea">
                <option disabled value="">Seleccione</option>
                <option>LATAM</option>
                <option>Avianca</option>
              </select>

            </div>

            <div class="form-actions">
              <button @click="comprobarReserva" class="btn-general">
                Comprobar
              </button>
            </div>

          </div>


          <!-- SEGUNDO PASO -->
          <div v-else class="pasajero-form">

            <div class="form-grid">
              <div class="form-group">
                <label>Fecha:</label>
                <input v-model="fecha" type="date" />
              </div>

              <div class="form-group">
                <label>Hora:</label>
                <input v-model="hora" type="time" />
              </div>

              <div class="form-group">
                <label>Origen:</label>
                <input v-model="origen" type="text" placeholder="Quito" />
              </div>

              <div class="form-group">
                <label>Destino:</label>
                <input v-model="destino" type="text" placeholder="Guayaquil" />
              </div>

              <div class="form-group">
                <label>Precio:</label>
                <input v-model.number="precio" type="number" step="0.01" min="0" />
              </div>

              <div class="form-group">
                <label>Estado:</label>
                <input v-model="estado" type="text" placeholder="CONFIRMADA" />
              </div>

              <div class="form-group">
                <label>Asiento:</label>
                <input v-model.number="asiento" type="number" min="1" />
              </div>

              <div class="form-group">
                <label>ID Avión:</label>
                <input v-model.number="idAvion" type="number" min="1" />
              </div>

              <div class="form-group full-width">
                <label>ID Pasajero:</label>
                <input v-model.number="idPasajero" type="number" min="1" />
              </div>
            </div>

            <div class="form-actions">
              <button @click="limpiarFormulario" class="btn-limpiar">
                Limpiar
              </button>

              <button @click="crear" class="btn-general">
                Guardar
              </button>
            </div>

          </div>
        </div>
      </div>

      <!-- TAB 2: LISTA -->
      <div v-if="activeTab === 'lista'" class="tab-content">
        <div class="seccion-buscar">
          <button @click="listar" class="btn-general">Ver Todos</button>
        </div>

        <div class="table-todos">
          <table>
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
                <th>ID Avión</th>
                <th>ID Pasajero</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in reservaArr" :key="r.id">
                <td class="font-bold">{{ r.id }}</td>
                <td>{{ r.fecha }}</td>
                <td>{{ r.hora }}</td>
                <td>{{ r.origen }}</td>
                <td>{{ r.destino }}</td>
                <td>{{ r.precio }}</td>
                <td>{{ r.estado }}</td>
                <td>{{ r.asiento }}</td>
                <td>{{ r.idAvion }}</td>
                <td>{{ r.idPasajero }}</td>
              </tr>

              <tr v-if="reservaArr.length === 0">
                <td colspan="10" class="estado-vacio">
                  No hay reservas. Haz clic en "Ver Todos".
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- TAB 3: EDITAR -->
      <div v-if="activeTab === 'editar'" class="tab-content">
        <div class="form-card">
          <h3 class="form-title">Editar Reserva</h3>

          <div class="seccion-buscar">
            <input v-model.number="idBuscar" type="number" placeholder="ID de la reserva a editar"
              class="input-buscar" />
            <button @click="buscarParaEditar" class="btn-buscar">Buscar</button>
          </div>

          <div v-if="idEditar" class="pasajero-form">
            <div class="form-grid">
              <div class="form-group">
                <label>ID</label>
                <input v-model="idEditar" type="text" disabled />
              </div>

              <div class="form-group">
                <label>Fecha:</label>
                <input v-model="fechaEditar" type="date" />
              </div>

              <div class="form-group">
                <label>Hora:</label>
                <input v-model="horaEditar" type="time" />
              </div>

              <div class="form-group">
                <label>Origen:</label>
                <input v-model="origenEditar" type="text" />
              </div>

              <div class="form-group">
                <label>Destino:</label>
                <input v-model="destinoEditar" type="text" />
              </div>

              <div class="form-group">
                <label>Precio:</label>
                <input v-model.number="precioEditar" type="number" step="0.01" min="0" />
              </div>

              <div class="form-group">
                <label>Estado:</label>
                <input v-model="estadoEditar" type="text" />
              </div>

              <div class="form-group">
                <label>Asiento:</label>
                <input v-model.number="asientoEditar" type="number" min="1" />
              </div>

              <div class="form-group">
                <label>ID Avión:</label>
                <input v-model.number="idAvionEditar" type="number" min="1" />
              </div>

              <div class="form-group full-width">
                <label>ID Pasajero:</label>
                <input v-model.number="idPasajeroEditar" type="number" min="1" />
              </div>
            </div>

            <div class="form-actions">
              <button @click="cancelarEdicion" class="btn-limpiar">Cancelar</button>
              <button @click="actualizar" class="btn-general">Actualizar</button>
            </div>
          </div>

          <div v-else class="estado-vacio" style="padding: 40px">
            Ingresa un ID y haz clic en "Buscar" para editar una reserva.
          </div>
        </div>
      </div>

      <!-- TAB 4: ELIMINAR -->
      <div v-if="activeTab === 'eliminar'" class="tab-content">
        <div class="form-card">
          <h3 class="form-title">Eliminar Reserva</h3>

          <div class="seccion-buscar">
            <input v-model.number="idEliminar" type="number" placeholder="ID de la reserva a eliminar"
              class="input-buscar" />
            <button @click="buscarParaEliminar" class="btn-buscar">Buscar</button>
          </div>

          <div v-if="origenEliminar" class="delete-preview">
            <h4>¿Eliminar esta reserva?</h4>

            <div class="info-grid">
              <div><strong>ID:</strong> {{ idEliminar }}</div>
              <div><strong>Fecha:</strong> {{ fechaEliminar }}</div>
              <div><strong>Hora:</strong> {{ horaEliminar }}</div>
              <div><strong>Ruta:</strong> {{ origenEliminar }} → {{ destinoEliminar }}</div>
              <div><strong>Precio:</strong> {{ precioEliminar }}</div>
              <div><strong>Estado:</strong> {{ estadoEliminar }}</div>
              <div><strong>Asiento:</strong> {{ asientoEliminar }}</div>
              <div><strong>ID Avión:</strong> {{ idAvionEliminar }}</div>
              <div><strong>ID Pasajero:</strong> {{ idPasajeroEliminar }}</div>
            </div>

            <div class="form-actions">
              <button @click="cancelarEliminacion" class="btn-limpiar">Cancelar</button>
              <button @click="confirmarEliminacion" class="btn-eliminar">
                Eliminar Permanentemente
              </button>
            </div>
          </div>

          <div v-else class="estado-vacio" style="padding: 40px">
            Ingresa un ID y haz clic en "Buscar" para eliminar una reserva.
          </div>
        </div>
      </div>
    </div>
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
//importar por aerolinea y por cedula para buscar en editar y eliminar
import { buscarPorAerolineaFachada } from "../clients/AvionClient.js";
import { buscarPorCedulaFachada } from "../clients/PasajeroClient.js";

export default {
  data() {
    return {
      activeTab: "crear",
      reservaArr: [],

      reservaValidada: false,

      //Consultar cedula para crear
      cedula: "",
      //Consultar aerolinea para crear
      aerolinea: "",

      // CREAR
      fecha: "",
      hora: "",
      origen: "",
      destino: "",
      precio: null,
      estado: "",
      asiento: null,
      idAvion: null,
      idPasajero: null,

      // EDITAR
      idBuscar: null,
      idEditar: null,
      fechaEditar: "",
      horaEditar: "",
      origenEditar: "",
      destinoEditar: "",
      precioEditar: null,
      estadoEditar: "",
      asientoEditar: null,
      idAvionEditar: null,
      idPasajeroEditar: null,

      // ELIMINAR
      idEliminar: null,
      fechaEliminar: "",
      horaEliminar: "",
      origenEliminar: "",
      destinoEliminar: "",
      precioEliminar: null,
      estadoEliminar: "",
      asientoEliminar: null,
      idAvionEliminar: null,
      idPasajeroEliminar: null,
    };
  },

  methods: {

    //metodo para consultar por cedula y aerolinea
    async comprobarReserva() {

      if (!this.cedula || !this.aerolinea) {
        console.log("Ingrese la cédula y la aerolínea");
        return;
      }

      try {

        const pasajero = await buscarPorCedulaFachada(this.cedula);
        const avion = await buscarPorAerolineaFachada(this.aerolinea);

        if (!pasajero) {
          console.log("pasajero no encontrado");
          
          return;
        }

        if (!avion) {
          console.log("aerolinea no encontrada");
          return;
        }

        // MUY IMPORTANTE
        this.idPasajero = pasajero.id;
        this.idAvion = avion.id;

        // DESBLOQUEA EL FORMULARIO
        this.reservaValidada = true;

      } catch (error) {
        console.error(error);
      }
    },

    nuevaReserva() {

      this.reservaValidada = false;

      this.cedula = "";
      this.aerolinea = "";

      this.limpiarFormulario();
    },


    async crear() {
      if (!this.fecha || !this.hora || !this.origen || !this.destino || this.precio == null || !this.estado || this.asiento == null || !this.idAvion || !this.idPasajero) {
        return;
      }

      try {
        const reserva = {
          fecha: this.fecha,
          hora: this.hora,
          origen: this.origen,
          destino: this.destino,
          precio: this.precio,
          estado: this.estado,
          asiento: this.asiento,
          idAvion: this.idAvion,
          idPasajero: this.idPasajero,
        };

        await guardarFachada(reserva);
        this.nuevaReserva();
      } catch (error) {
        console.error("Error:", error);
      }
    },

    limpiarFormulario() {
      this.fecha = "";
      this.hora = "";
      this.origen = "";
      this.destino = "";
      this.precio = null;
      this.estado = "";
      this.asiento = null;
      this.idAvion = null;
      this.idPasajero = null;
    },

    async listar() {
      try {
        this.reservaArr = await consultarTodosFachada();
      } catch (error) {
        console.error("Error:", error);
      }
    },

    async buscarParaEditar() {
      if (!this.idBuscar) return;

      try {
        const r = await consultarPorIdFachada(this.idBuscar);

        if (r) {
          this.idEditar = r.id;
          this.fechaEditar = r.fecha || "";
          this.horaEditar = r.hora || "";
          this.origenEditar = r.origen || "";
          this.destinoEditar = r.destino || "";
          this.precioEditar = r.precio;
          this.estadoEditar = r.estado || "";
          this.asientoEditar = r.asiento;
          this.idAvionEditar = r.idAvion;
          this.idPasajeroEditar = r.idPasajero;
        } else {
          return null;
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },

    async actualizar() {
      if (!this.idEditar || !this.fechaEditar || !this.horaEditar || !this.origenEditar || !this.destinoEditar || this.precioEditar == null || !this.estadoEditar || this.asientoEditar == null || !this.idAvionEditar || !this.idPasajeroEditar) {
        return;
      }

      try {
        const reserva = {
          id: this.idEditar,
          fecha: this.fechaEditar,
          hora: this.horaEditar,
          origen: this.origenEditar,
          destino: this.destinoEditar,
          precio: this.precioEditar,
          estado: this.estadoEditar,
          asiento: this.asientoEditar,
          idAvion: this.idAvionEditar,
          idPasajero: this.idPasajeroEditar,
        };

        await actualizarFachada(this.idEditar, reserva);
        this.cancelarEdicion();
      } catch (error) {
        console.error("Error:", error);
      }
    },

    cancelarEdicion() {
      this.idBuscar = null;
      this.idEditar = null;

      this.fechaEditar = "";
      this.horaEditar = "";
      this.origenEditar = "";
      this.destinoEditar = "";
      this.precioEditar = null;
      this.estadoEditar = "";
      this.asientoEditar = null;
      this.idAvionEditar = null;
      this.idPasajeroEditar = null;
    },

    async buscarParaEliminar() {
      if (!this.idEliminar) return;

      try {
        const r = await consultarPorIdFachada(this.idEliminar);

        if (r) {
          this.fechaEliminar = r.fecha;
          this.horaEliminar = r.hora;
          this.origenEliminar = r.origen;
          this.destinoEliminar = r.destino;
          this.precioEliminar = r.precio;
          this.estadoEliminar = r.estado;
          this.asientoEliminar = r.asiento;
          this.idAvionEliminar = r.idAvion;
          this.idPasajeroEliminar = r.idPasajero;
        } else {
          return null;
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },

    async confirmarEliminacion() {
      try {
        await borrarFachada(this.idEliminar);
        this.cancelarEliminacion();
      } catch (error) {
        console.error("Error:", error);
      }
    },

    cancelarEliminacion() {
      this.idEliminar = null;
      this.fechaEliminar = "";
      this.horaEliminar = "";
      this.origenEliminar = "";
      this.destinoEliminar = "";
      this.precioEliminar = null;
      this.estadoEliminar = "";
      this.asientoEliminar = null;
      this.idAvionEliminar = null;
      this.idPasajeroEliminar = null;
    },
  },

  mounted() {
    this.listar();
  },
};
</script>

<style scoped>
/* Reutilizo EXACTO el CSS base de Pasajero */
.main-wrapper {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: #f3f4f6;
  font-family: 'Inter', sans-serif;
  padding: 40px 20px;
}

.card {
  width: 100%;
  max-width: 1400px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  padding: 40px;
}

.logo-color {
  color: #4f46e5;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 5px;
}

h2 {
  font-size: 1.8rem;
  color: #111827;
  margin: 0;
  font-weight: 700;
}

.subtitle {
  color: #6b7280;
  margin: 5px 0 0 0;
  font-size: 0.95rem;
}

.card-header {
  margin-bottom: 30px;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e5e7eb;
  flex-wrap: wrap;
}

.tab {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-weight: 500;
  color: #6b7280;
  transition: all 0.2s;
}

.tab:hover {
  color: #4f46e5;
  background-color: #f9fafb;
}

.tab.active {
  color: #4f46e5;
  border-bottom-color: #4f46e5;
  font-weight: 600;
}

.tab-content {
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.seccion-buscar {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.input-buscar {
  flex: 1;
  min-width: 250px;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
}

.input-buscar:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.btn-general,
.btn-buscar {
  padding: 12px 24px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(79, 70, 229, 0.4);
  transition: all 0.2s;
}

.btn-general:hover,
.btn-buscar:hover {
  background-color: #4338ca;
  transform: translateY(-2px);
}

.btn-limpiar {
  padding: 12px 24px;
  background-color: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-limpiar:hover {
  background-color: #e5e7eb;
}

.btn-eliminar {
  padding: 12px 24px;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.btn-eliminar:hover {
  background-color: #dc2626;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th {
  background-color: #f9fafb;
  color: #374151;
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 16px;
  border-bottom: 2px solid #e5e7eb;
}

td {
  padding: 16px;
  border-bottom: 1px solid #f3f4f6;
  color: #4b5563;
  font-size: 0.95rem;
  vertical-align: middle;
}

.font-bold {
  font-weight: 600;
  color: #111827;
}

tr:hover td {
  background-color: #f9fafb;
}

.estado-vacio {
  text-align: center;
  padding: 40px;
  color: #9ca3af;
}

.form-card {
  background: #f9fafb;
  padding: 2rem;
  border-radius: 16px;
}

.form-title {
  font-size: 1.5rem;
  color: #111827;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.full-width {
  grid-column: span 2;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 500;
  color: #374151;
  font-size: 0.95rem;
}

input {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
}

select {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
}
select:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

input:disabled {
  background-color: #f3f4f6;
  color: #6b7280;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #e5e7eb;
}

.delete-preview {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  margin-top: 1rem;
}

.delete-preview h4 {
  color: #ef4444;
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #fef2f2;
  border-radius: 8px;
}

.info-grid div {
  color: #4b5563;
}

.info-grid strong {
  color: #111827;
}
</style>
