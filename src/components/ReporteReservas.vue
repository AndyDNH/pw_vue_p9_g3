<template>
  <div class="container">
    <div class="formulario">
      <h2 class="titulo">Reporte de Vuelos</h2>

      <!-- <button @click="consultarTodos">Consultar todos</button> -->

      <table  class="tabla">
        <!-- v-if="vuelos.length" -->
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
          <!-- <tr v-for="v in vuelos" :key="v.id"> -->
            <!-- <td>{{ v.id }}</td>
            <td>{{ v.fecha }}</td>
            <td>{{ v.hora }}</td>
            <td>{{ v.origen }}</td>
            <td>{{ v.destino }}</td>
            <td>{{ v.precio }}</td>
            <td>{{ v.estado }}</td>
            <td>{{ v.asiento }}</td> -->
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>
            <button @click="editar(v.id)">Editar</button>
            <button @click="eliminar(v.id)">Eliminar</button>
            </td>
          </tbody>
      </table>

      <!-- <p v-if="!reservas.length && cargado" class="mensaje">
        No existen reservas registradas
      </p> -->
    </div>
  </div>
</template>
<script>
 import { consultarReservas } from "@/clients/ReservasClient";
//import { obtenerTokenFachada } from "@/clients/AuthClient";
export default {
  data() {
    return {
      reservas: [],
      cargado: false,
      token: null,
    };
  },
  async mounted() {
    //this.token = await obtenerTokenFachada();
  },
  methods: {
    async consultarTodos() {
      //this.reservas = await consultarReservas(this.token);
      this.cargado = true;
    },
  },
};
</script>
<style scoped>
/* Fondo general */
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f4f6;
  font-family: 'Inter', sans-serif;
}

/* Card principal */
.formulario {
  width: 1000px;
  background: white;
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
}

/* Título */
.titulo {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 30px;
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
