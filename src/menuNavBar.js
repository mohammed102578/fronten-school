import {
  mdiAccount,
  mdiCogOutline,
  mdiEmail,
  mdiLogout,
  mdiThemeLightDark,
  mdiTranslate,
  mdiBellRing
} from '@mdi/js'

export default [
  {
    icon: mdiBellRing,
    DropdownIcon:false,
    NotificationCount:true,
    menuSizeLage:true,
    menu: [
      {
        image:"img/flags/SA.png",
        alt:"AR",
        label: 'Update picture mohammed'
      },
      {
        image:"img/flags/US.png",
        alt:"En",
        label: 'Greate people like you'
      },

    ]
  },
  {
    icon: mdiTranslate,
    label: 'Language',
    DropdownIcon:true,
    NotificationCount:false,
    menuSizeLage:false,
    menu: [
      {
        image:"img/flags/SA.png",
        alt:"AR",
        label: 'Arabic',
        ArabicLanguage:true
      },
      {
        image:"img/flags/US.png",
        alt:"En",
        label: 'English',
        EnglishLanguage:true
      },

    ]
  },

  {
    isCurrentUser: true,
    menu: [
      {
        icon: mdiAccount,
        label: 'My Profile',
        to: '/profile'
      },
      {
        icon: mdiCogOutline,
        label: 'Settings'
      },
      {
        icon: mdiEmail,
        label: 'Messages'
      },
      {
        isDivider: true
      },
      {
        icon: mdiLogout,
        label: 'Log Out',
        isLogout: true
      }
    ]
  },
  {
    icon: mdiThemeLightDark,
    label: 'Light/Dark',
    isDesktopNoLabel: true,
    isToggleLightDark: true
  },
  {
    icon: mdiLogout,
    label: 'Log out',
    isDesktopNoLabel: true,
    isLogout: true
  }
]
