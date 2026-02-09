import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import ReporteVuelos from '../components/ReporteVuelos.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  // {
  //   path: '/reporte-vuelos',
  //   name: 'reporte-vuelos',
  //   component: ReporteVuelos
  // },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
