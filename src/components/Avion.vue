<template>
  <div class="main-wrapper">
    <div class="card">
      <div class="card-header">
        <div class="title-group">
          <div class="logo-color">*</div>
          <h2>Gestión de Aviones</h2>
          <p class="subtitle">Administra los aviones disponibles y su información.</p>
        </div>
      </div>

      <!-- Tabs -->
      <div class="tabs">
        <button :class="['tab', { active: activeTab === 'crear' }]" @click="activeTab = 'crear'">
          Crear Avión
        </button>
        <button :class="['tab', { active: activeTab === 'lista' }]" @click="activeTab = 'lista'">
          Lista de Aviones
        </button>
        <button :class="['tab', { active: activeTab === 'editar' }]" @click="activeTab = 'editar'">
          Editar Avión
        </button>
        <button :class="['tab', { active: activeTab === 'eliminar' }]" @click="activeTab = 'eliminar'">
          Eliminar Avión
        </button>
      </div>

      <!-- TAB 1: CREAR -->
      <div v-if="activeTab === 'crear'" class="tab-content">
        <div class="form-card">
          <h3 class="form-title">Crear Nuevo Avión</h3>

          <div class="pasajero-form">
            <div class="form-grid">
              <div class="form-group">
                <label>Modelo:</label>
                <input v-model="modelo" type="text" placeholder="Boeing 737" />
              </div>

              <div class="form-group">
                <label>Capacidad:</label>
                <input v-model.number="capacidad" type="number" min="1" placeholder="180" />
              </div>

              <div class="form-group">
                <label>Aerolínea:</label>
                <input v-model="aerolinea" type="text" placeholder="LATAM" />
              </div>

              <div class="form-group">
                <label>Clase:</label>
                <input v-model="clase" type="text" placeholder="Económica" />
              </div>

              <div class="form-group full-width">
                <label>Espacio Equipaje:</label>
                <input v-model="espacioEquipaje" type="text" placeholder="20kg" />
              </div>
            </div>

            <div class="form-actions">
              <button @click="limpiarFormulario" class="btn-limpiar">Limpiar</button>
              <button @click="crear" class="btn-general">Guardar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 2: LISTA -->
      <div v-if="activeTab === 'lista'" class="tab-content">
        <div class="seccion-buscar">
          <button @click="listar" class="btn-general">Ver Todos</button>

          <input
            v-model="aerolineaFiltro"
            type="text"
            placeholder="Buscar por aerolínea (opcional)"
            class="input-buscar"
          />
          <button @click="buscarPorAerolinea" class="btn-buscar">Buscar</button>
        </div>

        <div class="table-todos">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Modelo</th>
                <th>Capacidad</th>
                <th>Aerolínea</th>
                <th>Clase</th>
                <th>Equipaje</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="a in avionArr" :key="a.id">
                <td class="font-bold">{{ a.id }}</td>
                <td>{{ a.modelo }}</td>
                <td>{{ a.capacidad }}</td>
                <td>{{ a.aerolinea }}</td>
                <td>{{ a.clase }}</td>
                <td>{{ a.espacioEquipaje }}</td>
              </tr>

              <tr v-if="avionArr.length === 0">
                <td colspan="6" class="estado-vacio">
                  No hay aviones. Haz clic en "Ver Todos".
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- TAB 3: EDITAR -->
      <div v-if="activeTab === 'editar'" class="tab-content">
        <div class="form-card">
          <h3 class="form-title">Editar Avión</h3>

          <div class="seccion-buscar">
            <input
              v-model.number="idBuscar"
              type="number"
              placeholder="ID del avión a editar"
              class="input-buscar"
            />
            <button @click="buscarParaEditar" class="btn-buscar">Buscar</button>
          </div>

          <div v-if="idEditar" class="pasajero-form">
            <div class="form-grid">
              <div class="form-group">
                <label>ID</label>
                <input v-model="idEditar" type="text" disabled />
              </div>

              <div class="form-group">
                <label>Modelo:</label>
                <input v-model="modeloEditar" type="text" />
              </div>

              <div class="form-group">
                <label>Capacidad:</label>
                <input v-model.number="capacidadEditar" type="number" min="1" />
              </div>

              <div class="form-group">
                <label>Aerolínea:</label>
                <input v-model="aerolineaEditar" type="text" />
              </div>

              <div class="form-group">
                <label>Clase:</label>
                <input v-model="claseEditar" type="text" />
              </div>

              <div class="form-group full-width">
                <label>Espacio Equipaje:</label>
                <input v-model="espacioEquipajeEditar" type="text" />
              </div>
            </div>

            <div class="form-actions">
              <button @click="cancelarEdicion" class="btn-limpiar">Cancelar</button>
              <button @click="actualizar" class="btn-general">Actualizar</button>
            </div>
          </div>

          <div v-else class="estado-vacio" style="padding: 40px">
            Ingresa un ID y haz clic en "Buscar" para editar un avión.
          </div>
        </div>
      </div>

      <!-- TAB 4: ELIMINAR -->
      <div v-if="activeTab === 'eliminar'" class="tab-content">
        <div class="form-card">
          <h3 class="form-title">Eliminar Avión</h3>

          <div class="seccion-buscar">
            <input
              v-model.number="idEliminar"
              type="number"
              placeholder="ID del avión a eliminar"
              class="input-buscar"
            />
            <button @click="buscarParaEliminar" class="btn-buscar">Buscar</button>
          </div>

          <div v-if="modeloEliminar" class="delete-preview">
            <h4>¿Eliminar este avión?</h4>

            <div class="info-grid">
              <div><strong>ID:</strong> {{ idEliminar }}</div>
              <div><strong>Modelo:</strong> {{ modeloEliminar }}</div>
              <div><strong>Capacidad:</strong> {{ capacidadEliminar }}</div>
              <div><strong>Aerolínea:</strong> {{ aerolineaEliminar }}</div>
              <div><strong>Clase:</strong> {{ claseEliminar }}</div>
              <div><strong>Equipaje:</strong> {{ espacioEquipajeEliminar }}</div>
            </div>

            <div class="form-actions">
              <button @click="cancelarEliminacion" class="btn-limpiar">Cancelar</button>
              <button @click="confirmarEliminacion" class="btn-eliminar">
                Eliminar Permanentemente
              </button>
            </div>
          </div>

          <div v-else class="estado-vacio" style="padding: 40px">
            Ingresa un ID y haz clic en "Buscar" para eliminar un avión.
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
      activeTab: "crear",
      avionArr: [],

      // CREAR
      modelo: "",
      capacidad: null,
      aerolinea: "",
      clase: "",
      espacioEquipaje: "",

      // LISTA (filtro)
      aerolineaFiltro: "",

      // EDITAR
      idBuscar: null,
      idEditar: null,
      modeloEditar: "",
      capacidadEditar: null,
      aerolineaEditar: "",
      claseEditar: "",
      espacioEquipajeEditar: "",

      // ELIMINAR
      idEliminar: null,
      modeloEliminar: "",
      capacidadEliminar: null,
      aerolineaEliminar: "",
      claseEliminar: "",
      espacioEquipajeEliminar: "",
    };
  },

  methods: {
    async crear() {
      if (!this.modelo || !this.capacidad || !this.aerolinea || !this.clase || !this.espacioEquipaje) {
        return;
      }

      try {
        const avion = {
          modelo: this.modelo,
          capacidad: this.capacidad,
          aerolinea: this.aerolinea,
          clase: this.clase,
          espacioEquipaje: this.espacioEquipaje,
        };

        await guardarFachada(avion);
        this.limpiarFormulario();
      } catch (error) {
        console.error("Error:", error);
      }
    },

    limpiarFormulario() {
      this.modelo = "";
      this.capacidad = null;
      this.aerolinea = "";
      this.clase = "";
      this.espacioEquipaje = "";
    },

    async listar() {
      try {
        this.avionArr = await consultarTodosFachada();
      } catch (error) {
        console.error("Error:", error);
      }
    },

    async buscarPorAerolinea() {
      if (!this.aerolineaFiltro) {
        // si está vacío, solo lista todo
        return await this.listar();
      }

      try {
        this.avionArr = await buscarPorAerolineaFachada(this.aerolineaFiltro);
      } catch (error) {
        console.error("Error:", error);
      }
    },

    async buscarParaEditar() {
      if (!this.idBuscar) return;

      try {
        const avion = await consultarPorIdFachada(this.idBuscar);

        if (avion) {
          this.idEditar = avion.id;
          this.modeloEditar = avion.modelo;
          this.capacidadEditar = avion.capacidad;
          this.aerolineaEditar = avion.aerolinea;
          this.claseEditar = avion.clase;
          this.espacioEquipajeEditar = avion.espacioEquipaje;
        } else {
          return null;
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },

    async actualizar() {
      if (!this.idEditar || !this.modeloEditar || !this.capacidadEditar || !this.aerolineaEditar || !this.claseEditar || !this.espacioEquipajeEditar) {
        return;
      }

      try {
        const avion = {
          id: this.idEditar,
          modelo: this.modeloEditar,
          capacidad: this.capacidadEditar,
          aerolinea: this.aerolineaEditar,
          clase: this.claseEditar,
          espacioEquipaje: this.espacioEquipajeEditar,
        };

        await actualizarFachada(this.idEditar, avion);
        this.cancelarEdicion();
      } catch (error) {
        console.error("Error:", error);
      }
    },

    cancelarEdicion() {
      this.idBuscar = null;
      this.idEditar = null;
      this.modeloEditar = "";
      this.capacidadEditar = null;
      this.aerolineaEditar = "";
      this.claseEditar = "";
      this.espacioEquipajeEditar = "";
    },

    async buscarParaEliminar() {
      if (!this.idEliminar) return;

      try {
        const avion = await consultarPorIdFachada(this.idEliminar);

        if (avion) {
          this.modeloEliminar = avion.modelo;
          this.capacidadEliminar = avion.capacidad;
          this.aerolineaEliminar = avion.aerolinea;
          this.claseEliminar = avion.clase;
          this.espacioEquipajeEliminar = avion.espacioEquipaje;
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
      this.modeloEliminar = "";
      this.capacidadEliminar = null;
      this.aerolineaEliminar = "";
      this.claseEliminar = "";
      this.espacioEquipajeEliminar = "";
    },
  },

  mounted() {
    this.listar();
  },
};
</script>

<style scoped>
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
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
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
