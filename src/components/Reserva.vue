<template>
  <div class="main-wrapper">
    <div class="card">

      <div class="card-header">
        <div class="header-title">
          <div class="logo-color">*</div>
          <h2>Gestión de Reservas</h2>
          <p class="subtitle">Administra itinerarios, precios y asignación de asientos.</p>
        </div>
      </div>

      <div class="section-container search-section">
        <h3 class="section-title">Consultas Rápidas</h3>
        <div class="search-bar">
          <button @click="consumirTodos" class="btn-primary">
            Ver Todas las Reservas
          </button>

          <div class="separator"></div>

          <div class="input-group-inline">
            <input v-model.number="idConsulta" type="number" min="1" placeholder="Buscar por ID..."
              class="input-small" />
            <button @click="consumirPorId" class="btn-secondary">
              Consultar
            </button>
          </div>
        </div>
      </div>

      <hr class="divider">

      <div class="workspace-grid">

        <div class="form-container">
          <h3 class="section-title">
            {{ modoEdicion ? "Editar Reserva Existente" : "Nueva Reserva" }}
          </h3>

          <div class="form-grid">
            <div v-if="modoEdicion" class="form-group full-width">
              <label>ID Reserva</label>
              <input v-model.number="idEdicion" type="number" disabled class="input-disabled" />
            </div>

            <div class="form-group">
              <label>Fecha</label>
              <input v-model="reserva.fecha" type="date" />
            </div>
            <div class="form-group">
              <label>Hora</label>
              <input v-model="reserva.hora" type="time" />
            </div>

            <div class="form-group">
              <label>Origen</label>
              <input v-model="reserva.origen" placeholder="Ej. UIO" type="text" />
            </div>
            <div class="form-group">
              <label>Destino</label>
              <input v-model="reserva.destino" placeholder="Ej. MIA" type="text" />
            </div>

            <div class="form-group">
              <label>Precio ($)</label>
              <input v-model.number="reserva.precio" placeholder="0.00" type="number" step="0.01" min="0" />
            </div>
            <div class="form-group">
              <label>Estado</label>
              <input v-model="reserva.estado" placeholder="Ej. Confirmado" type="text" />
            </div>

            <div class="form-group">
              <label>N° Asiento</label>
              <input v-model.number="reserva.asiento" placeholder="Ej. 12" type="number" min="1" />
            </div>
            <div class="form-group">
              <label>ID Avión</label>
              <input v-model.number="reserva.idAvion" placeholder="ID Avión" type="number" min="1" />
            </div>
            <div class="form-group full-width">
              <label>ID Pasajero</label>
              <input v-model.number="reserva.idPasajero" placeholder="ID del cliente" type="number" min="1" />
            </div>
          </div>

          <div class="form-actions">
            <button v-if="!modoEdicion" @click="guardar" class="btn-primary full-btn">
              Guardar Reserva
            </button>
            <button v-else @click="actualizar" class="btn-primary full-btn">
              Actualizar Datos
            </button>
            <button @click="limpiar" class="btn-text">
              Cancelar / Limpiar
            </button>
          </div>
        </div>

        <div class="delete-container">
          <h3 class="section-title text-danger">Eliminar Reserva</h3>
          <p class="desc-text">Acción irreversible. Ingresa el ID para borrar el registro.</p>
          <div class="delete-box">
            <input v-model.number="idBorrar" type="number" min="1" placeholder="ID Reserva" />
            <button @click="borrar" class="btn-danger">
              Eliminar
            </button>
          </div>
        </div>
      </div>

      <div v-if="(reservas && reservas.length) || reservaUnica" class="results-section">
        <h3 class="section-title">Listado de Reservas</h3>

        <div v-if="reservas && reservas.length" class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha / Hora</th>
                <th>Ruta (Origen → Destino)</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Asiento</th>
                <th>Avión / Pasajero</th>
                <th class="text-center">Editar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in reservas" :key="r.id">
                <td class="font-bold">#{{ r.id }}</td>
                <td>
                  <div class="date-cell">{{ r.fecha }}</div>
                  <div class="time-cell">{{ r.hora }}</div>
                </td>
                <td>
                  <span class="route-tag">{{ r.origen }}</span>
                  <span class="arrow">➝</span>
                  <span class="route-tag">{{ r.destino }}</span>
                </td>
                <td class="font-mono">${{ r.precio }}</td>
                <td>
                  <span class="status-badge">{{ r.estado }}</span>
                </td>
                <td class="text-center">{{ r.asiento }}</td>
                <td class="ids-cell">
                  <div>✈️ Av: {{ r.idAvion }}</div>
                  <div>👤 Pas: {{ r.idPasajero }}</div>
                </td>
                <td class="text-center">
                  <button @click="cargarEdicion(r)" class="btn-icon edit">
                    Editar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="reservaUnica" class="single-result-card">
          <div class="detail-header">Reserva #{{ reservaUnica.id }}</div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">Fecha:</span> {{ reservaUnica.fecha }} {{ reservaUnica.hora }}
            </div>
            <div class="detail-item">
              <span class="label">Ruta:</span> {{ reservaUnica.origen }} ➝ {{ reservaUnica.destino }}
            </div>
            <div class="detail-item">
              <span class="label">Precio:</span> ${{ reservaUnica.precio }}
            </div>
            <div class="detail-item">
              <span class="label">Estado:</span> {{ reservaUnica.estado }}
            </div>
            <div class="detail-item">
              <span class="label">Avión ID:</span> {{ reservaUnica.idAvion }}
            </div>
            <div class="detail-item">
              <span class="label">Pasajero ID:</span> {{ reservaUnica.idPasajero }}
            </div>
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
} from "../clients/ReservasClient.js";

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
      } catch (_) { }
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
      // Scroll hacia el formulario
      document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
    },
    async actualizar() {
      const body = { ...this.reserva };
      await actualizarFachada(this.idEdicion, body);
      this.limpiar();
      await this.consumirTodos();
    },
    async borrar() {
      if (!this.idBorrar) return;
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
      this.reservaUnica = null;
    },
  },
};
</script>

<style scoped>
/* --- Layout General --- */
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
  max-width: 1100px;
  /* Un poco más ancho por las columnas extra */
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* --- Headers --- */
.logo-color {
  color: #4f46e5;
  font-size: 2rem;
  font-weight: bold;
  line-height: 1;
}

h2 {
  font-size: 1.8rem;
  color: #111827;
  margin: 5px 0;
  font-weight: 700;
}

.subtitle {
  color: #6b7280;
  margin: 0;
  font-size: 0.95rem;
}

.section-title {
  font-size: 1.1rem;
  color: #374151;
  margin-bottom: 15px;
  font-weight: 600;
  border-left: 4px solid #4f46e5;
  padding-left: 10px;
}

.text-danger {
  border-color: #ef4444;
  color: #991b1b;
}

/* --- Search Bar --- */
.search-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
  background-color: #f9fafb;
  padding: 20px;
  border-radius: 12px;
}

.separator {
  width: 1px;
  height: 30px;
  background: #d1d5db;
  margin: 0 10px;
}

.input-group-inline {
  display: flex;
  gap: 5px;
}

.input-small {
  width: 150px;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  outline: none;
}

.divider {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 10px 0;
}

/* --- Grid de Trabajo (Form + Borrar) --- */
.workspace-grid {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 30px;
}

@media (max-width: 850px) {
  .workspace-grid {
    grid-template-columns: 1fr;
  }
}

/* Formulario con Grid Interno */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.full-width {
  grid-column: span 2;
}

label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #1f2937;
  outline: none;
  box-sizing: border-box;
}

input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.input-disabled {
  background-color: #f3f4f6;
  color: #9ca3af;
  cursor: not-allowed;
}

.form-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
}

/* Delete Box */
.delete-container {
  background-color: #fef2f2;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #fee2e2;
  height: fit-content;
}

.desc-text {
  font-size: 0.85rem;
  color: #7f1d1d;
  margin-bottom: 15px;
}

.delete-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* --- Botones --- */
.btn-primary {
  background-color: #4f46e5;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background-color: #4338ca;
}

.btn-secondary {
  background-color: #e5e7eb;
  color: #374151;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.btn-danger {
  background-color: #ef4444;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
}

.btn-danger:hover {
  background-color: #dc2626;
}

.btn-text {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  text-decoration: underline;
}

.full-btn {
  flex: 1;
}

/* --- Tabla --- */
.results-section {
  margin-top: 20px;
}

.table-responsive {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  min-width: 800px;
}

/* Min width para evitar colapso feo */
th {
  background-color: #f9fafb;
  color: #374151;
  font-size: 0.8rem;
  text-transform: uppercase;
  padding: 12px;
  border-bottom: 2px solid #e5e7eb;
  letter-spacing: 0.05em;
}

td {
  padding: 12px;
  border-bottom: 1px solid #f3f4f6;
  color: #4b5563;
  font-size: 0.9rem;
  vertical-align: middle;
}

/* Detalles visuales de celdas */
.font-bold {
  font-weight: 700;
  color: #111827;
}

.font-mono {
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: #111827;
}

.date-cell {
  font-weight: 600;
  color: #1f2937;
}

.time-cell {
  font-size: 0.8rem;
  color: #6b7280;
}

.arrow {
  color: #9ca3af;
  margin: 0 4px;
  font-weight: bold;
}

.route-tag {
  font-weight: 500;
  color: #4338ca;
}

.ids-cell {
  font-size: 0.8rem;
  color: #6b7280;
  line-height: 1.4;
}

.status-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: #d1fae5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.btn-icon.edit {
  background-color: #eff6ff;
  color: #3b82f6;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.8rem;
}

/* Single Result Card */
.single-result-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
}

.detail-header {
  font-size: 1.2rem;
  font-weight: 700;
  color: #334155;
  margin-bottom: 15px;
  border-bottom: 2px solid #cbd5e1;
  padding-bottom: 5px;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.detail-item {
  font-size: 0.95rem;
  color: #475569;
}

.detail-item .label {
  font-weight: 600;
  color: #64748b;
  margin-right: 5px;
}

.text-center {
  text-align: center;
}
</style>