<template>
  <div class="container">
    <div class="formulario">
      <h2 class="titulo">Reporte de Vuelos</h2>

      <div class="consultar">
        <button @click="consultarVuelos">
          🔄 Recargar
        </button>
      </div>

      <p v-if="loading">Cargando vuelos...</p>

      <table v-if="vuelos.length" class="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Modelo</th>
            <th>Capacidad</th>
            <th>Aerolínea</th>
            <th>Clase</th>
            <th>Espacio Equipaje</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="v in vuelos" :key="v.id">

            <td>{{ v.id }}</td>

            <!-- MODELO -->
            <td v-if="editandoId !== v.id">{{ v.modelo }}</td>
            <td v-else>
              <input v-model="vueloEditado.modelo">
            </td>

            <!-- CAPACIDAD -->
            <td v-if="editandoId !== v.id">{{ v.capacidad }}</td>
            <td v-else>
              <input type="number" v-model="vueloEditado.capacidad">
            </td>

            <!-- AEROLINEA -->
            <td v-if="editandoId !== v.id">{{ v.aerolinea }}</td>
            <td v-else>
              <input v-model="vueloEditado.aerolinea">
            </td>

            <!-- CLASE -->
            <td v-if="editandoId !== v.id">{{ v.clase }}</td>
            <td v-else>
              <input v-model="vueloEditado.clase">
            </td>

            <!-- EQUIPAJE -->
            <td v-if="editandoId !== v.id">{{ v.espacioEquipaje }}</td>
            <td v-else>
              <input type="number" v-model="vueloEditado.espacioEquipaje">
            </td>

            <td>

              <!-- NORMAL -->
              <template v-if="editandoId !== v.id">
                <button @click="activarEdicion(v)">✏️ Editar</button>
                <button @click="eliminarVuelo(v.id)">🗑️ Eliminar</button>
              </template>

              <!-- EDITANDO -->
              <template v-else>
                <button @click="guardarEdicion">💾 Guardar</button>
                <button @click="cancelarEdicion">❌ Cancelar</button>
              </template>

            </td>
          </tr>
        </tbody>
      </table>

      <p v-if="!vuelos.length && !loading">
        No existen vuelos registrados
      </p>

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
} from "@/clients/AvionClient";

export default {
  data() {
    return {
      vuelos: [],
      loading: false,
      error: null,

      editandoId: null,
      vueloEditado: {
        modelo: "",
        capacidad: "",
        aerolinea: "",
        clase: "",
        espacioEquipaje: ""
      }
    };
  },

  async mounted() {
    this.consultarVuelos();
  },

  methods: {

    async consultarVuelos() {
      try {
        this.loading = true;
        this.error = null;

        this.vuelos = await consultarTodosFachada();

      } catch (err) {
        this.error = "Error al obtener los vuelos";
      } finally {
        this.loading = false;
      }
    },

    activarEdicion(vuelo) {
      this.editandoId = vuelo.id;

      // CLONAR (MUY IMPORTANTE)
      this.vueloEditado = { ...vuelo };
    },

    cancelarEdicion() {
      this.editandoId = null;

      this.vueloEditado = {
        modelo: "",
        capacidad: "",
        aerolinea: "",
        clase: "",
        espacioEquipaje: ""
      };
    },

    async guardarEdicion() {
      try {

        await actualizarFachada(
          this.editandoId,
          this.vueloEditado
        );

        // actualizar sin recargar
        const index = this.vuelos.findIndex(
          v => v.id === this.editandoId
        );

        this.vuelos[index] = { ...this.vueloEditado };

        this.cancelarEdicion();

      } catch (err) {
        this.error = "No se pudo actualizar el vuelo";
      }
    },

    async eliminarVuelo(id) {

      if (!confirm("¿Eliminar este vuelo?")) return;

      try {

        await borrarFachada(id);

        this.vuelos = this.vuelos.filter(v => v.id !== id);

      } catch (err) {
        this.error = "No se pudo eliminar";
      }
    }

  },
};
</script>

<style scoped>
/* Fondo general */
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
