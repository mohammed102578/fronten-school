import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useMainStore } from '@/stores/main.js'
import enMessage from'./locales/en.json'
import arMessage from './locales/ar.json'
import { createI18n } from 'vue-i18n';
import './css/main_en.css'
// Init Pinia
const pinia = createPinia()


const i18n = createI18n({
  legacy: false,
  locale: 'en', // default locale
  messages: {
    en: enMessage,
    ar: arMessage,

  },
});


// Create Vue app
createApp(App).use(router).use(pinia).use(i18n).mount('#app')

// Init main store
const mainStore = useMainStore(pinia)

// Fetch sample data
mainStore.fetchSampleClients()
mainStore.fetchSampleHistory()

// Dark mode
// Uncomment, if you'd like to restore persisted darkMode setting, or use `prefers-color-scheme: dark`. Make sure to uncomment localStorage block in src/stores/darkMode.js
// import { useDarkModeStore } from './stores/darkMode'

// const darkModeStore = useDarkModeStore(pinia)

// if (
//   (!localStorage['darkMode'] && window.matchMedia('(prefers-color-scheme: dark)').matches) ||
//   localStorage['darkMode'] === '1'
// ) {
//   darkModeStore.set(true)
// }

// Default title tag
const defaultDocumentTitle = 'Zid school'

// Set document title from route meta
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle
})

export default {
  data(){
    return{
      mainStore : useMainStore(),
      mainccs_import:''
    }
  },mounted() {
    this.maincss
  },
  computed: {

    maincss:function(){
if(this.mainStore.Language=='en'){
  this.mainccs_import= './css/main_en.css'

}else{
  this.mainccs_import= './css/main_ar.css'

}
return this.mainccs_import
    },
  }
}
