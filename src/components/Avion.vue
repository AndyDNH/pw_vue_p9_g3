<template>
  <div class="main-wrapper">
    <div class="card">
      
      <div class="card-header">
        <div class="header-title">
          <div class="logo-color">*</div>
          <h2>Gestión de Aviones</h2>
          <p class="subtitle">Administra la flota, busca registros y actualiza datos.</p>
        </div>
      </div>

      <div class="section-container search-section">
        <h3 class="section-title">Consultas</h3>
        <div class="search-bar">
          <button @click="consumirTodos" class="btn-primary">
            Ver Todos
          </button>

          <div class="input-group-inline">
            <input 
              v-model.number="idConsulta" 
              type="number" 
              min="1" 
              placeholder="ID..." 
              class="input-small"
            />
            <button @click="consumirPorId" class="btn-secondary">
              Buscar ID
            </button>
          </div>

          <div class="input-group-inline">
            <input 
              v-model="aerolineaConsulta" 
              type="text" 
              placeholder="Nombre Aerolínea..." 
              class="input-small"
            />
            <button @click="consumirPorAerolinea" class="btn-secondary">
              Buscar Aerolínea
            </button>
          </div>
        </div>
      </div>

      <hr class="divider">

      <div class="workspace-grid">
        
        <div class="form-container">
          <h3 class="section-title">
            {{ modoEdicion ? "Actualizar Avión" : "Registrar Nuevo Avión" }}
          </h3>
          
          <div class="form-grid">
            <div v-if="modoEdicion" class="form-group full-width">
              <label>ID (Lectura)</label>
              <input v-model.number="idEdicion" type="number" disabled class="input-disabled" />
            </div>

            <div class="form-group">
              <label>Modelo</label>
              <input v-model="avion.modelo" placeholder="Ej. Boeing 737" type="text" />
            </div>
            
            <div class="form-group">
              <label>Capacidad</label>
              <input v-model.number="avion.capacidad" placeholder="Ej. 180" type="number" min="1" />
            </div>
            
            <div class="form-group">
              <label>Aerolínea</label>
              <input v-model="avion.aerolinea" placeholder="Ej. Avianca" type="text" />
            </div>
            
            <div class="form-group">
              <label>Clase</label>
              <input v-model="avion.clase" placeholder="Ej. Comercial" type="text" />
            </div>
            
            <div class="form-group full-width">
              <label>Espacio Equipaje</label>
              <input v-model="avion.espacioEquipaje" placeholder="Ej. 20kg" type="text" />
            </div>
          </div>

          <div class="form-actions">
            <button v-if="!modoEdicion" @click="guardar" class="btn-primary full-btn">
              Guardar Avión
            </button>
            <button v-else @click="actualizar" class="btn-primary full-btn">
              Actualizar Cambios
            </button>
            
            <button @click="limpiar" class="btn-text">
              Limpiar / Cancelar
            </button>
          </div>
        </div>

        <div class="delete-container">
          <h3 class="section-title text-danger">Eliminar Registro</h3>
          <p class="desc-text">Introduce el ID del avión que deseas eliminar permanentemente.</p>
          
          <div class="delete-box">
            <input v-model.number="idBorrar" type="number" min="1" placeholder="ID del avión" />
            <button @click="borrar" class="btn-danger">
              Borrar
            </button>
          </div>
        </div>

      </div>

      <div v-if="(aviones && aviones.length) || avionUnico" class="results-section">
        <h3 class="section-title">Resultados de la Búsqueda</h3>
        
        <div v-if="aviones && aviones.length" class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Modelo</th>
                <th>Capacidad</th>
                <th>Aerolínea</th>
                <th>Clase</th>
                <th>Equipaje</th>
                <th class="text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="a in aviones" :key="a.id">
                <td class="font-bold">#{{ a.id }}</td>
                <td>{{ a.modelo }}</td>
                <td>{{ a.capacidad }} pax</td>
                <td>
                  <span class="badge">{{ a.aerolinea }}</span>
                </td>
                <td>{{ a.clase }}</td>
                <td>{{ a.espacioEquipaje }}</td>
                <td class="text-center">
                  <button @click="cargarEdicion(a)" class="btn-icon edit">
                    Editar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="avionUnico" class="single-result-card">
          <div class="detail-row">
            <span class="detail-label">ID:</span>
            <span class="detail-value">#{{ avionUnico.id }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Modelo:</span>
            <span class="detail-value">{{ avionUnico.modelo }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Capacidad:</span>
            <span class="detail-value">{{ avionUnico.capacidad }} pasajeros</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Aerolínea:</span>
            <span class="detail-value">{{ avionUnico.aerolinea }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Clase:</span>
            <span class="detail-value">{{ avionUnico.clase }}</span>
          </div>
           <div class="detail-row">
            <span class="detail-label">Equipaje:</span>
            <span class="detail-value">{{ avionUnico.espacioEquipaje }}</span>
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
  buscarPorAerolineaFachada,
} from "../clients/AvionClient.js";

export default {
  data() {
    return {
      aviones: null,
      avionUnico: null,
      idConsulta: null,
      aerolineaConsulta: "",
      modoEdicion: false,
      idEdicion: null,
      avion: {
        modelo: "",
        capacidad: null,
        aerolinea: "",
        clase: "",
        espacioEquipaje: "",
      },
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
      const body = { ...this.avion };
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
      // Scroll suave hacia el formulario
      document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
    },
    async actualizar() {
      const body = { ...this.avion };
      await actualizarFachada(this.idEdicion, body);
      this.limpiar();
      await this.consumirTodos();
    },
    async borrar() {
      if(!this.idBorrar) return;
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
      this.avionUnico = null;
      // this.aviones = null; // Opcional: si quieres limpiar la tabla también
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
  max-width: 1000px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  padding: 40px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* --- Encabezado --- */
.header-title {
  margin-bottom: 10px;
}
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

/* --- Títulos de Sección --- */
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

/* --- Sección 1: Barra de Búsqueda --- */
.search-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
  background-color: #f9fafb;
  padding: 20px;
  border-radius: 12px;
}
.input-group-inline {
  display: flex;
  gap: 5px;
}
.input-small {
  width: 160px;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  outline: none;
}

/* --- Divider --- */
.divider {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 10px 0;
}

/* --- Sección 2: Workspace Grid (Formulario + Borrar) --- */
.workspace-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
}

@media (max-width: 768px) {
  .workspace-grid {
    grid-template-columns: 1fr;
  }
}

/* Formulario */
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
  transition: border-color 0.2s;
}
input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}
.input-disabled {
  background-color: #f3f4f6;
  color: #9ca3af;
}

.form-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
}

/* Sección Borrar */
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
.btn-primary:hover { background-color: #4338ca; }

.btn-secondary {
  background-color: #e5e7eb;
  color: #374151;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
.btn-secondary:hover { background-color: #d1d5db; }

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
.btn-danger:hover { background-color: #dc2626; }

.btn-text {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  text-decoration: underline;
  font-size: 0.9rem;
}
.full-btn { flex: 1; }

/* --- Tabla --- */
.results-section {
  margin-top: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
th {
  background-color: #f9fafb;
  color: #374151;
  font-size: 0.85rem;
  text-transform: uppercase;
  padding: 12px;
  border-bottom: 2px solid #e5e7eb;
}
td {
  padding: 12px;
  border-bottom: 1px solid #f3f4f6;
  color: #4b5563;
  font-size: 0.95rem;
}
.badge {
  background-color: #e0e7ff;
  color: #4338ca;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}
.btn-icon.edit {
  background-color: #eff6ff;
  color: #3b82f6;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}
.btn-icon.edit:hover { background-color: #dbeafe; }

/* Estilo para Resultado Único */
.single-result-card {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
}
.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px dashed #cbd5e1;
}
.detail-row:last-child { border-bottom: none; }
.detail-label { font-weight: 600; color: #64748b; }
.detail-value { color: #334155; font-weight: 500; }

.text-center { text-align: center; }
.font-bold { font-weight: 700; color: #111827; }
</style>