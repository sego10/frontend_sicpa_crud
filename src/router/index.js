import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/enterprise',
    name: 'enterprise',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/EnterpriseView.vue')
  },
  {
    path: '/employee',
    name: 'employee',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/EmployeeView.vue')
  },
  {
    path: '/department',
    name: 'department',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DepartmentView.vue')
  },
  {
    path: '/departmentemployee',
    name: 'departmentemployee',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DepartmentEmployeeView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router