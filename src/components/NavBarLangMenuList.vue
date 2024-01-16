<script setup>
import NavBarItem from '@/components/NavBarItem.vue'
import { useMainStore } from '@/stores/main'

defineProps({
  menu: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['menu-click'])

const menuClick = (event, item) => {
  emit('menu-click', event, item)
}
</script>

<template>
  <NavBarItem v-for="(item, index) in menu" :key="index" :item="item" @menu-click="toggleLanguage(item.alt)" />
</template>
<script>
export default {
  data(){
    return{
      htmlMain:document.querySelector('html'),
      mainStore : useMainStore()


    }
  },
  methods: {
    toggleLanguage(item){
if(item =='AR'){
  this.$i18n.locale='ar'
  this.htmlMain.setAttribute('dir','rtl')
  this.htmlMain.setAttribute('lang','ar')
  this.mainStore.setLanguage('ar')

}else{
  this.$i18n.locale='en'
  this.htmlMain.setAttribute('dir','ltr')
  this.htmlMain.setAttribute('lang','en')
  this.mainStore.setLanguage('en')

}
    },

  }
}
</script>
