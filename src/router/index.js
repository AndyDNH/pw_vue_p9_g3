import { createRouter, createWebHashHistory } from 'vue-router'
import PasajeroView from '@/views/PasajeroView.vue';
import LoginView from '@/views/LoginView.vue';
import ReservaView from '@/views/ReservaView.vue';
import AvionView from  '@/views/AvionView.vue';
import ReporteVuelosView from '@/views/ReporteVuelosView.vue';
import ReporteReservasView from '@/views/ReporteReservasView.vue';

const routes = [
  {
    path: '/pasajero',
    name: 'pasajero',
    component: PasajeroView,
    meta: {
      requiereAutorizacion: true,
    }
  },
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: "/avion",
    name: "avion",
    component: AvionView,
    meta: {
      requiereAutorizacion: true
    }
  },
  {
    path: "/reserva",
    name: "reserva",
    component: ReservaView,
    meta: {
      requiereAutorizacion: true
    }
  },
  {
    path: "/reporteV",
    name: "reporteV",
    component: ReporteVuelosView,
    meta: {
      requiereAutorizacion: true
    }
  },
  {
    path: "/reporteR",
    name: "reporteR",
    component: ReporteReservasView,
    meta: {
      requiereAutorizacion: true
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  if (to.meta.requiereAutorizacion) {
    const estaAutenticado = localStorage.getItem("estaAutenticado");
    if (!estaAutenticado) {
      console.log("Ingresa el usuario y contraseña antes de seguir");
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      })
    } else {
      next();
    }
  }
  else {
    console.log("Acceso Libre");
    next();
  }
}
)

export default router
