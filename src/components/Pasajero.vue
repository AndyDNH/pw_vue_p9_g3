<template>
  <div class="main-wrapper">
    <div class="card">
      <div class="card-header">
        <div class="title-group">
          <div class="logo-color">*</div>
          <h2>Gestión de Pasajeros</h2>
          <p class="subtitle">
            Gestiona la información de tus clientes en un solo lugar.
          </p>
        </div>
      </div>

      <!-- Tabs -->
      <div class="tabs">
        <button :class="['tab', { active: activeTab === 'crear' }]" @click="activeTab = 'crear'">
          Crear Pasajero
        </button>
        <button :class="['tab', { active: activeTab === 'lista' }]" @click="activeTab = 'lista'">
          Lista de Pasajeros
        </button>
        <button :class="['tab', { active: activeTab === 'editar' }]" @click="activeTab = 'editar'">
          Editar Pasajero
        </button>
        <button :class="['tab', { active: activeTab === 'eliminar' }]" @click="activeTab = 'eliminar'">
          Eliminar Pasajero
        </button>
      </div>
      <!-- TAB 1: CREAR -->
      <div v-if="activeTab === 'crear'" class="tab-content">
        <div class="form-card">
          <h3 class="form-title">Crear Nuevo Pasajero</h3>

          <div class="pasajero-form">
            <div class="form-grid">
              <div class="form-group">
                <label>Nombre:</label>
                <input v-model="nombre" type="text" placeholder="Juan" />
              </div>

              <div class="form-group">
                <label>Apellido:</label>
                <input v-model="apellido" type="text" placeholder="Pérez" />
              </div>

              <div class="form-group">
                <label>Cédula:</label>
                <input v-model="cedula" type="text" maxlength="10" placeholder="17345...." />
              </div>

              <div class="form-group">
                <label>Correo:</label>
                <input v-model="email" type="email" placeholder="ejemplo@correo.com" />
              </div>

              <div class="form-group">
                <label>Teléfono:</label>
                <input v-model="telefono" type="tel" maxlength="10" placeholder="0987654321" />
              </div>

              <div class="form-group">
                <label>Fecha de Nacimiento:</label>
                <input v-model="fechaNacimiento" type="date" />
              </div>
            </div>

            <div class="form-actions">
              <button @click="limpiarFormulario" class="btn-limpiar">
                Limpiar
              </button>
              <button @click="crear" class="btn-general">Guardar</button>
            </div>
          </div>
        </div>
      </div>
      <!-- TAB 2: BUSCARTODOS -->
      <div v-if="activeTab === 'lista'" class="tab-content">
        <div class="seccion-buscar">
          <button @click="listar" class="btn-general">Ver Todos</button>
        </div>

        <div class="table-todos">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Fecha de Nacimiento</th>
                <th>Cédula</th>
                <th>Correo</th>
                <th>Teléfono</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="pasajero in pasajeroArr" :key="pasajero.id">
                <td class="font-bold">{{ pasajero.id }}</td>
                <td>{{ pasajero.nombre }}</td>
                <td>{{ pasajero.apellido }}</td>
                <td>{{ formatDate(pasajero.fechaNacimiento) }}</td>
                <td>{{ pasajero.cedula }}</td>
                <td>{{ pasajero.email }}</td>
                <td>{{ pasajero.telefono }}</td>
              </tr>
              <tr v-if="pasajeroArr.length === 0">
                <td colspan="7" class="estado-vacio">
                  No hay pasajeros. Haz clic en "Ver Todos".
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- TAB 3: EDITAR -->
      <div v-if="activeTab === 'editar'" class="tab-content">
        <div class="form-card">
          <h3 class="form-title">Editar Pasajero</h3>

          <div class="seccion-buscar">
            <input v-model.number="idBuscar" type="number" placeholder="ID del pasajero a editar"
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
                <label>Nombre:</label>
                <input v-model="nombreEditar" type="text" />
              </div>

              <div class="form-group">
                <label>Apellido:</label>
                <input v-model="apellidoEditar" type="text" />
              </div>

              <div class="form-group">
                <label>Cédula:</label>
                <input v-model="cedulaEditar" type="text" maxlength="10" />
              </div>

              <div class="form-group">
                <label>Correo:</label>
                <input v-model="emailEditar" type="email" />
              </div>

              <div class="form-group">
                <label>Teléfono:</label>
                <input v-model="telefonoEditar" type="tel" maxlength="10" />
              </div>

              <div class="form-group">
                <label>Fecha Nacimiento:</label>
                <input v-model="fechaNacimientoEditar" type="date" />
              </div>
            </div>

            <div class="form-actions">
              <button @click="cancelarEdicion" class="btn-limpiar">
                Cancelar
              </button>
              <button @click="actualizar" class="btn-general">Actualizar</button>
            </div>
          </div>

          <div v-else class="estado-vacio" style="padding: 40px">
            Ingresa un ID y haz clic en "Buscar" para editar un pasajero.
          </div>
        </div>
      </div>

      <!-- TAB 4: ELIMINAR -->
      <div v-if="activeTab === 'eliminar'" class="tab-content">
        <div class="form-card">
          <h3 class="form-title">Eliminar Pasajero</h3>

          <div class="seccion-buscar">
            <input v-model.number="idEliminar" type="number" placeholder="ID del pasajero a eliminar"
              class="input-buscar" />
            <button @click="buscarParaEliminar" class="btn-buscar">Buscar</button>
          </div>

          <div v-if="nombreEliminar" class="delete-preview">
            <h4>¿Eliminar este pasajero?</h4>
            <div class="info-grid">
              <div><strong>ID:</strong> {{ idEliminar }}</div>
              <div><strong>Nombre:</strong> {{ nombreEliminar }}</div>
              <div><strong>Apellido:</strong> {{ apellidoEliminar }}</div>
              <div><strong>Cédula:</strong> {{ cedulaEliminar }}</div>
              <div><strong>Email:</strong> {{ emailEliminar }}</div>
              <div><strong>Teléfono:</strong> {{ telefonoEliminar }}</div>
            </div>

            <div class="form-actions">
              <button @click="cancelarEliminacion" class="btn-limpiar">
                Cancelar
              </button>
              <button @click="confirmarEliminacion" class="btn-eliminar">
                Eliminar Permanentemente
              </button>
            </div>
          </div>

          <div v-else class="estado-vacio" style="padding: 40px">
            Ingresa un ID y haz clic en "Buscar" para eliminar un pasajero.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  listarTodosFachada,
  consultarPorIdFachada,
  guardarFachada,
  actualizarFachada,
  borrarFachada,
} from "../clients/PasajeroClient.js";

export default {
  data() {
    return {
      activeTab: "crear",
      pasajeroArr: [],

      // CREAR
      nombre: "",
      apellido: "",
      cedula: "",
      email: "",
      telefono: "",
      fechaNacimiento: "",

      // EDITAR
      idBuscar: null,
      idEditar: null,
      nombreEditar: "",
      apellidoEditar: "",
      cedulaEditar: "",
      emailEditar: "",
      telefonoEditar: "",
      fechaNacimientoEditar: "",

      // ELIMINAR
      idEliminar: null,
      nombreEliminar: "",
      apellidoEliminar: "",
      cedulaEliminar: "",
      emailEliminar: "",
      telefonoEliminar: "",
    };
  },

  methods: {
    async crear() {
      if (!this.nombre || !this.apellido || !this.cedula || !this.email || !this.telefono) {
      // if (!this.nombre || !this.apellido || !this.cedula || !this.email || !this.telefono || !this.fechaNacimiento) {
        return;
      }

      try {
        const pasajero = {
          nombre: this.nombre,
          apellido: this.apellido,
          cedula: this.cedula,
          email: this.email,
          telefono: this.telefono,
          // fechaNacimiento: this.fechaNacimiento,
        };

        await guardarFachada(pasajero);
        this.limpiarFormulario();
      } catch (error) {
        console.error("Error:", error);
      }
    },

    limpiarFormulario() {
      this.nombre = "";
      this.apellido = "";
      this.cedula = "";
      this.email = "";
      this.telefono = "";
      this.fechaNacimiento = "";
    },

    async listar() {
      try {
        this.pasajeroArr = await listarTodosFachada();
      } catch (error) {
        console.error("Error:", error);
      }
    },

    async buscarParaEditar() {
      if (!this.idBuscar) {
        return;
      }

      try {
        const pasajero = await consultarPorIdFachada(this.idBuscar);

        if (pasajero) {
          this.idEditar = pasajero.id;
          this.nombreEditar = pasajero.nombre;
          this.apellidoEditar = pasajero.apellido;
          this.cedulaEditar = pasajero.cedula;
          this.emailEditar = pasajero.email;
          this.telefonoEditar = pasajero.telefono;

          if (pasajero.fechaNacimiento) {
            this.fechaNacimientoEditar = pasajero.fechaNacimiento.split("T")[0];
          }
        } else {
          return null;
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },

    async actualizar() {
      if (!this.nombreEditar || !this.apellidoEditar || !this.cedulaEditar ||
        !this.emailEditar || !this.telefonoEditar || !this.fechaNacimientoEditar) {
        return;
      }

      try {
        const pasajero = {
          id: this.idEditar,
          nombre: this.nombreEditar,
          apellido: this.apellidoEditar,
          cedula: this.cedulaEditar,
          email: this.emailEditar,
          telefono: this.telefonoEditar,
          fechaNacimiento: this.fechaNacimientoEditar,
        };

        await actualizarFachada(this.idEditar, pasajero);
        this.cancelarEdicion();
      } catch (error) {
        console.error("Error:", error);
      }
    },

    cancelarEdicion() {
      this.idBuscar = null;
      this.idEditar = null;
      this.nombreEditar = "";
      this.apellidoEditar = "";
      this.cedulaEditar = "";
      this.emailEditar = "";
      this.telefonoEditar = "";
      this.fechaNacimientoEditar = "";
    },

    async buscarParaEliminar() {
      if (!this.idEliminar) {
        return;
      }

      try {
        const pasajero = await consultarPorIdFachada(this.idEliminar);

        if (pasajero) {
          this.nombreEliminar = pasajero.nombre;
          this.apellidoEliminar = pasajero.apellido;
          this.cedulaEliminar = pasajero.cedula;
          this.emailEliminar = pasajero.email;
          this.telefonoEliminar = pasajero.telefono;
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
      this.nombreEliminar = "";
      this.apellidoEliminar = "";
      this.cedulaEliminar = "";
      this.emailEliminar = "";
      this.telefonoEliminar = "";
    },

    formatDate(date) {
      if (!date) return "";
      const d = new Date(date);
      return d.toLocaleDateString("es-EC");
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