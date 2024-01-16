import { createRouter, createWebHashHistory } from 'vue-router'
import Style from '@/views/StyleView.vue'
import Home from '@/views/HomeView.vue'

const routes = [
  {
    meta: {
      title: 'Select style'
    },
    path: '/',
    name: 'style',
    component: Style
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard'
    },
    path: '/dashboard',
    name: 'dashboard',
    component: Home
  },
  {
    meta: {
      title: 'Grades'
    },
    path: '/grades',
    name: 'grades',
    component: () => import('@/views/Grades/GradesView.vue')
  },
  {
    meta: {
      title: 'Specializations'
    },
    path: '/specializations',
    name: 'specializations',
    component: () => import('@/views/Specializations/SpecializationsView.vue')
  },
  {
    meta: {
      title: 'Sections'
    },
    path: '/sections',
    name: 'sections',
    component: () => import('@/views/Sections/SectionsView.vue')
  },
  {
    meta: {
      title: 'ClassRoom'
    },
    path: '/classroom',
    name: 'classroom',
    component: () => import('@/views/ClassRoom/ClassRoomView.vue')
  },
  {
    meta: {
      title: 'Guardians'
    },
    path: '/guardians',
    name: 'guardians',
    component: () => import('@/views/Guardians/GuardiansView.vue')
  },
  {
    meta: {
      title: 'GuardiansCreate'
    },
    path: '/guardians_create',
    name: 'guardians_create',
    component: () => import('@/views/Guardians/GuardiansCreateView.vue')
  },
  {
    meta: {
      title: 'GuardiansEdit'
    },
    path: '/guardians_edit/:id',
    name: 'guardians_edit',
    component: () => import('@/views/Guardians/GuardiansEditView.vue')
  },

  {
    meta: {
      title: 'Teachers'
    },
    path: '/teachers',
    name: 'teachers',
    component: () => import('@/views/Teachers/TeachersView.vue')
  },
  {
    meta: {
      title: 'TeachersCreate'
    },
    path: '/teachers_create',
    name: 'teachers_create',
    component: () => import('@/views/Teachers/TeachersCreateView.vue')
  },
  {
    meta: {
      title: 'TeachersEdit'
    },
    path: '/teachers_edit/:id',
    name: 'teachers_edit',
    component: () => import('@/views/Teachers/TeachersEditView.vue')
  },
  {
    meta: {
      title: 'Students'
    },
    path: '/students',
    name: 'students',
    component: () => import('@/views/Students/StudentsView.vue')
  },
  {
    meta: {
      title: 'StudentsCreate'
    },
    path: '/students_create',
    name: 'students_create',
    component: () => import('@/views/Students/StudentsCreateView.vue')
  },
  {
    meta: {
      title: 'StudentsEdit'
    },
    path: '/students_edit/:id',
    name: 'students_edit',
    component: () => import('@/views/Students/StudentsEditView.vue')
  },
  {
    meta: {
      title: 'Tables'
    },
    path: '/tables',
    name: 'tables',
    component: () => import('@/views/TablesView.vue')
  },
  {
    meta: {
      title: 'Forms'
    },
    path: '/forms',
    name: 'forms',
    component: () => import('@/views/FormsView.vue')
  },
  {
    meta: {
      title: 'Profile'
    },
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue')
  },
  {
    meta: {
      title: 'Ui'
    },
    path: '/ui',
    name: 'ui',
    component: () => import('@/views/UiView.vue')
  },
  {
    meta: {
      title: 'Responsive layout'
    },
    path: '/responsive',
    name: 'responsive',
    component: () => import('@/views/ResponsiveView.vue')
  },
  {
    meta: {
      title: 'Login'
    },
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    meta: {
      title: 'Register'
    },
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue')
  },
  {
    meta: {
      title: 'Error'
    },
    path: '/:catchAll(.*)',
    name: 'error',
    component: () => import('@/views/ErrorView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

export default router
