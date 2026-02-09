<template>
  <div class="main-wrapper">
    <div class="card">
      
      <div class="card-header">
        <div class="title-group">
          <div class="logo-color">*</div>
          <h2>Listado de Pasajeros</h2>
          <p class="subtitle">Gestiona la información de tus clientes en un solo lugar.</p>
        </div>
        <button @click="listar" class="btn-primary">
          Buscar Todos
        </button>
      </div>

      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Cédula</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Nacimiento</th>
              <th class="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pasajero in pasajeroArr" :key="pasajero.id">
              <td class="font-bold">{{ pasajero.id }}</td>
              <td>{{ pasajero.nombre }}</td>
              <td>{{ pasajero.apellido }}</td>
              <td>{{ pasajero.cedula }}</td>
              <td>{{ pasajero.email }}</td>
              <td>{{ pasajero.telefono }}</td>
              <td>{{ pasajero.fechaNacimiento }}</td>
              <td class="actions-cell">
                <button class="btn-icon edit">Actualizar</button>
                <button class="btn-icon delete">Borrar</button>
              </td>
            </tr>
            <tr v-if="pasajeroArr.length === 0">
              <td colspan="8" class="empty-state">
                No hay pasajeros para mostrar. Haz clic en "Buscar Todos".
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script>
// Asegúrate de que la ruta de importación sea correcta en tu proyecto
import { listarTodosFachada } from "../clients/PasajeroClient.js";

export default {
  data() {
    return {
      pasajeroArr: [],
    };
  },
  methods: {
    async listar() {
      // Simulamos la carga o llamamos a tu servicio real
      try {
        this.pasajeroArr = await listarTodosFachada();
      } catch (error) {
        console.error("Error al listar:", error);
      }
    },
  },
};
</script>

<style scoped>
/* --- Layout General (Fondo gris) --- */
.main-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Alineado arriba con margen */
  min-height: 100vh;
  background-color: #f3f4f6;
  font-family: 'Inter', sans-serif;
  padding: 40px 20px;
}

/* --- Tarjeta Principal (Blanca) --- */
.card {
  width: 100%;
  max-width: 1200px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  padding: 40px;
  overflow: hidden;
}

/* --- Encabezado --- */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

.logo-color {
  color: #4f46e5;
  font-size: 2rem;
  font-weight: bold;
  line-height: 1;
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

/* --- Botón Principal (Estilo Login) --- */
.btn-primary {
  background-color: #4f46e5;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(79, 70, 229, 0.4);
  transition: transform 0.1s, box-shadow 0.2s, background-color 0.2s;
}

.btn-primary:hover {
  background-color: #4338ca;
  box-shadow: 0 6px 20px rgba(79, 70, 229, 0.6);
}

.btn-primary:active {
  transform: scale(0.98);
}

/* --- Tabla --- */
.table-responsive {
  overflow-x: auto; /* Scroll horizontal en móviles */
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

/* Estilos específicos de celda */
.font-bold {
  font-weight: 600;
  color: #111827;
}

tr:last-child td {
  border-bottom: none;
}

tr:hover td {
  background-color: #f9fafb; /* Hover suave en filas */
}

/* --- Botones de Acción (Pequeños) --- */
.actions-cell {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.btn-icon {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid transparent;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.edit {
  background-color: #eef2ff;
  color: #4f46e5;
}
.edit:hover {
  background-color: #e0e7ff;
}

.delete {
  background-color: #fef2f2;
  color: #ef4444;
}
.delete:hover {
  background-color: #fee2e2;
}

.text-center {
  text-align: center;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #9ca3af;
  font-style: italic;
}
</style>