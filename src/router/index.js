import { createRouter, createWebHashHistory } from 'vue-router'
import PasajeroView from '@/views/PasajeroView.vue';
import LoginView from '@/views/LoginView.vue';
import AvionView from '@/views/AvionView.vue'
import ReservaView from '@/views/ReservaView.vue'
const routes = [
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/pasajero',
    name: 'pasajero',
    component: PasajeroView,
    meta: {
      requiereAutorizacion: true
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
      requiereAutorizacion: false
    }
  },
  {
    path: "/reserva",
    name: "reserva",
    component: ReservaView,
    meta: {
      requiereAutorizacion: false
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const estaAutenticado = localStorage.getItem('estaAutorizado');
  if (to.name === 'login' && estaAutenticado) {
    next({ name: 'pasajero' });
    return;
  }

  if (to.meta.requiereAutorizacion && !estaAutenticado) {
    next({ name: 'login' });
    return;
  }

  next();

})

export default router
