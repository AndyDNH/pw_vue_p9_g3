import { createRouter, createWebHashHistory } from 'vue-router'
import PasajeroView from '@/views/PasajeroView.vue';
import LoginView from '@/views/LoginView.vue';
import Formulario from '@/components/Formulario.vue';
import ReservaView from '@/views/ReservaView.vue';
import AvionView from  '@/views/AvionView.vue';


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
  }, {
    path: '/formulario',
    name: 'formulario',
    component: Formulario
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
  if (to.meta.requiereAuth) {
    if (!estaAutenticado) {
      console.log("Ingresa el usuario y contraseña antes de seguir");
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      })
    }
    else {
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
