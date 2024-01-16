import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiReact,
  mdiBadgeAccount
} from '@mdi/js'

export default [
  {
    to: '/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard'
  },
  {
    to: '/grades',
    label: 'Grades',
    icon: mdiBadgeAccount
  },
  {
    to: '/classroom',
    label: 'Classrooms',
    icon: mdiBadgeAccount
  },
  {
    to: '/sections',
    label: 'Sections',
    icon: mdiBadgeAccount
  },
  {
    to: '/specializations',
    label: 'Specializations',
    icon: mdiBadgeAccount
  },
  {
    to: '/guardians',
    label: 'Guardians',
    icon: mdiBadgeAccount
  },
  {
    to: '/teachers',
    label: 'Teachers',
    icon: mdiBadgeAccount
  },
  {
    label: '/students',
    label: 'Students',
    icon: mdiViewList,
    menu: [
      {
        label: 'All Students',
        to: '/students',
      },
      {
        label: 'Promotion Student'
      },
      {
        label: 'Gradute Student'
      }
    ]
  },
  {
    to: '/tables',
    label: 'Tables',
    icon: mdiTable
  },
  {
    to: '/forms',
    label: 'Forms',
    icon: mdiSquareEditOutline
  },
  {
    to: '/ui',
    label: 'UI',
    icon: mdiTelevisionGuide
  },
  {
    to: '/responsive',
    label: 'Responsive',
    icon: mdiResponsive
  },
  {
    to: '/',
    label: 'Styles',
    icon: mdiPalette
  },
  {
    to: '/profile',
    label: 'Profile',
    icon: mdiAccountCircle
  },
  {
    to: '/login',
    label: 'Login',
    icon: mdiLock
  },
  {
    to: '/register',
    label: 'Register',
    icon: mdiLock
  },
  {
    to: '/error',
    label: 'Error',
    icon: mdiAlertCircle
  },
  {
    label: 'Dropdown',
    icon: mdiViewList,
    menu: [
      {
        label: 'Item One'
      },
      {
        label: 'Item Two'
      }
    ]
  },
  {
    href: 'https://github.com/justboil/admin-one-vue-tailwind',
    label: 'GitHub',
    icon: mdiGithub,
    target: '_blank'
  },
  {
    href: 'https://github.com/justboil/admin-one-react-tailwind',
    label: 'React version',
    icon: mdiReact,
    target: '_blank'
  }
]
