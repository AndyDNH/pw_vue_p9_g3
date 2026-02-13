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
        <button :class="['tab', { active: activeTab === 'lista' }]" @click="activeTab = 'lista'">
          Reporte de Aviones
        </button>
        <button :class="['tab', { active: activeTab === 'crear' }]" @click="activeTab = 'crear'">
          Crear Avión
        </button>
        <button :class="['tab', { active: activeTab === 'editar' }]" @click="activeTab = 'editar'">
          Editar Avión
        </button>
        <button :class="['tab', { active: activeTab === 'eliminar' }]" @click="activeTab = 'eliminar'">
          Eliminar Avión
        </button>
      </div>

      <!-- Mensaje -->
      <div v-if="mostrarMensaje" class="mensaje-container" style="margin-bottom: 20px; display: flex; justify-content: center">
        <span class="mensaje" :class="{ 'mensaje-error': tipoMensaje === 'error' }">
          {{ mensaje }}
        </span>
      </div>

      <!-- Tab: Lista -->
      <div v-if="activeTab === 'lista'" class="tab-content">
        <div class="seccion-buscar">
          <button @click="listar" class="btn-general">Ver Todos</button>

          <div class="dd" ref="ddFiltro" @keydown.esc.prevent="cerrarDropdown('filtro')" tabindex="0">
            <div class="dd-control input-buscar" @click="toggleDropdown('filtro')" role="button" aria-haspopup="listbox">
              <span class="dd-value" :class="{ 'dd-placeholder': !aerolineaFiltro }">
                {{ aerolineaFiltro || "(Opcional) Filtrar por aerolínea" }}
              </span>
              <span class="dd-arrow" :class="{ open: ddOpen.filtro }">▾</span>
            </div>

            <div v-if="ddOpen.filtro" class="dd-menu" role="listbox">
              <div class="dd-item dd-item--muted" @click="seleccionarAerolineaFiltro('')">
                (Sin filtro)
              </div>

              <div v-for="al in aerolineas" :key="'f-' + al" class="dd-item" @click="seleccionarAerolineaFiltro(al)">
                {{ al }}
              </div>
            </div>
          </div>

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

      <!-- Tab: Crear -->
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

                <div class="dd" ref="ddCrear" @keydown.esc.prevent="cerrarDropdown('crear')" tabindex="0">
                  <div class="dd-control" @click="toggleDropdown('crear')" role="button" aria-haspopup="listbox">
                    <span class="dd-value" :class="{ 'dd-placeholder': !aerolinea }">
                      {{ aerolinea || "Selecciona una aerolínea" }}
                    </span>
                    <span class="dd-arrow" :class="{ open: ddOpen.crear }">▾</span>
                  </div>

                  <div v-if="ddOpen.crear" class="dd-menu" role="listbox">
                    <div v-for="al in aerolineas" :key="'c-' + al" class="dd-item" @click="seleccionarAerolineaCrear(al)">
                      {{ al }}
                    </div>
                  </div>
                </div>
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

      <!-- Tab: Editar -->
      <div v-if="activeTab === 'editar'" class="tab-content">
        <div class="form-card">
          <h3 class="form-title">Editar Avión</h3>

          <div class="seccion-buscar">
            <input v-model.number="idBuscar" type="number" placeholder="ID del avión a editar" class="input-buscar" />
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

      <!-- Tab: Eliminar -->
      <div v-if="activeTab === 'eliminar'" class="tab-content">
        <div class="form-card">
          <h3 class="form-title">Eliminar Avión</h3>

          <div class="seccion-buscar">
            <input v-model.number="idEliminar" type="number" placeholder="ID del avión a eliminar" class="input-buscar" />
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
              <button @click="confirmarEliminacion" class="btn-eliminar">Eliminar Permanentemente</button>
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
} from "../clients/AvionClient.js";

export default {
  data() {
    return {
      activeTab: "lista",
      avionArr: [],

      mensaje: "",
      mostrarMensaje: false,
      tipoMensaje: "ok",

      ddOpen: {
        crear: false,
        filtro: false,
      },

      aerolineas: [
        "Avianca",
        "LATAM",
        "American Airlines",
        "Delta Air Lines",
        "United Airlines",
        "Air Canada",
        "Copa Airlines",
        "Aeroméxico",
        "Iberia",
        "Air France",
        "KLM",
        "Lufthansa",
        "Turkish Airlines",
        "Emirates",
        "Qatar Airways",
      ],

      modelo: "",
      capacidad: null,
      aerolinea: "",
      clase: "",
      espacioEquipaje: "",

      aerolineaFiltro: "",

      idBuscar: null,
      idEditar: null,
      modeloEditar: "",
      capacidadEditar: null,
      aerolineaEditar: "",
      claseEditar: "",
      espacioEquipajeEditar: "",

      idEliminar: null,
      modeloEliminar: "",
      capacidadEliminar: null,
      aerolineaEliminar: "",
      claseEliminar: "",
      espacioEquipajeEliminar: "",
    };
  },

  methods: {
    mostrarAlertaOk(texto) {
      this.mensaje = texto;
      this.tipoMensaje = "ok";
      this.mostrarMensaje = true;
      setTimeout(() => (this.mostrarMensaje = false), 3000);
    },
    mostrarAlertaError(texto) {
      this.mensaje = texto;
      this.tipoMensaje = "error";
      this.mostrarMensaje = true;
      setTimeout(() => (this.mostrarMensaje = false), 3000);
    },

    toggleDropdown(tipo) {
      Object.keys(this.ddOpen).forEach((k) => {
        if (k !== tipo) this.ddOpen[k] = false;
      });
      this.ddOpen[tipo] = !this.ddOpen[tipo];
    },
    cerrarDropdown(tipo) {
      this.ddOpen[tipo] = false;
    },
    cerrarTodosDropdowns() {
      this.ddOpen.crear = false;
      this.ddOpen.filtro = false;
    },

    seleccionarAerolineaCrear(valor) {
      this.aerolinea = valor;
      this.cerrarDropdown("crear");
    },
    seleccionarAerolineaFiltro(valor) {
      this.aerolineaFiltro = valor;
      this.cerrarDropdown("filtro");
    },

    normalizarTexto(t) {
      return String(t || "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");
    },

    async crear() {
      if (!this.modelo || !this.capacidad || !this.aerolinea || !this.clase || !this.espacioEquipaje) {
        this.mostrarAlertaError("No se pudo guardar");
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
        this.mostrarAlertaOk("Guardado con éxito");
        this.limpiarFormulario();
        await this.listarSilencioso();
      } catch (error) {
        this.mostrarAlertaError("No se pudo guardar");
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
        this.avionArr = [];
      }
    },

    async listarSilencioso() {
      try {
        this.avionArr = await consultarTodosFachada();
      } catch (_) {}
    },

    async buscarPorAerolinea() {
      if (!this.aerolineaFiltro) {
        await this.listar();
        return;
      }

      try {
        const todos = await consultarTodosFachada();
        const filtro = this.normalizarTexto(this.aerolineaFiltro);

        const filtrados = (Array.isArray(todos) ? todos : []).filter((a) => {
          return this.normalizarTexto(a.aerolinea) === filtro;
        });

        this.avionArr = filtrados;

        if (this.avionArr.length === 0) {
          this.mostrarAlertaError("No existe un avión de esta aerolínea");
        }
      } catch (error) {
        this.avionArr = [];
        this.mostrarAlertaError("No existe un avión de esta aerolínea");
      }
    },

    async buscarParaEditar() {
      if (!this.idBuscar) {
        this.mostrarAlertaError("Ingresa primero el ID");
        return;
      }

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
          this.mostrarAlertaError("El ID no existe");
          this.cancelarEdicion();
        }
      } catch (error) {
        this.mostrarAlertaError("El ID no existe");
        this.cancelarEdicion();
      }
    },

    async actualizar() {
      if (!this.idEditar) {
        this.mostrarAlertaError("No se pudo actualizar");
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
        this.mostrarAlertaOk("Actualizado con éxito");
        this.cancelarEdicion();
        await this.listarSilencioso();
      } catch (error) {
        this.mostrarAlertaError("No se pudo actualizar");
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
      if (!this.idEliminar) {
        this.mostrarAlertaError("Ingresa primero el ID");
        return;
      }

      try {
        const avion = await consultarPorIdFachada(this.idEliminar);

        if (avion) {
          this.modeloEliminar = avion.modelo;
          this.capacidadEliminar = avion.capacidad;
          this.aerolineaEliminar = avion.aerolinea;
          this.claseEliminar = avion.clase;
          this.espacioEquipajeEliminar = avion.espacioEquipaje;
        } else {
          this.mostrarAlertaError("El ID no existe");
          this.cancelarEliminacion();
        }
      } catch (error) {
        this.mostrarAlertaError("El ID no existe");
        this.cancelarEliminacion();
      }
    },

    async confirmarEliminacion() {
      if (!this.idEliminar) {
        this.mostrarAlertaError("No se pudo eliminar");
        return;
      }

      try {
        await borrarFachada(this.idEliminar);
        this.mostrarAlertaOk("Eliminado con éxito");
        this.cancelarEliminacion();
        await this.listarSilencioso();
      } catch (error) {
        this.mostrarAlertaError("No se pudo eliminar");
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
    this.listarSilencioso();

    this.__onDocClick = (e) => {
      const crear = this.$refs.ddCrear;
      const filtro = this.$refs.ddFiltro;

      const clickDentroCrear = crear && crear.contains(e.target);
      const clickDentroFiltro = filtro && filtro.contains(e.target);

      if (!clickDentroCrear && !clickDentroFiltro) {
        this.cerrarTodosDropdowns();
      }
    };

    document.addEventListener("click", this.__onDocClick);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.__onDocClick);
  },
};
</script>

<style scoped>
.main-wrapper {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: #f3f4f6;
  font-family: "Inter", sans-serif;
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

.mensaje-container {
  margin-top: 1rem;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mensaje {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  background-color: #eef2ff;
  color: #4f46e5;
  border: 1px solid rgba(79, 70, 229, 0.2);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.1);
  animation: fadeIn 0.3s ease-in-out;
}

.mensaje-error {
  background-color: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
  box-shadow: 0 4px 12px rgba(153, 27, 27, 0.12);
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
  align-items: center;
}

.input-buscar {
  flex: 1;
  min-width: 250px;
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

.dd {
  position: relative;
  width: 100%;
  max-width: 520px;
  min-width: 250px;
}

.dd-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background: #fff;
  cursor: pointer;
  user-select: none;
}

.dd-control:focus,
.dd:focus .dd-control {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.dd-value {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #111827;
}

.dd-placeholder {
  color: #6b7280;
}

.dd-arrow {
  transition: transform 0.15s ease;
  color: #6b7280;
}

.dd-arrow.open {
  transform: rotate(180deg);
}

.dd-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  z-index: 50;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.14);
  padding: 8px;
  max-height: 240px;
  overflow-y: auto;
}

.dd-item {
  padding: 10px 10px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  color: #111827;
}

.dd-item:hover {
  background: #eef2ff;
}

.dd-item--muted {
  color: #374151;
  font-weight: 600;
}
</style>
