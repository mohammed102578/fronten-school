<script setup>
import AsideMenuLayer from '@/components/AsideMenuLayer.vue'
import OverlayLayer from '@/components/OverlayLayer.vue'
import { useMainStore } from '@/stores/main'

defineProps({
  menu: {
    type: Array,
    required: true
  },
  isAsideMobileExpanded: Boolean,
  isAsideLgActive: Boolean
})

const emit = defineEmits(['menu-click', 'aside-lg-close-click'])

const menuClick = (event, item) => {
  emit('menu-click', event, item)
}

const asideLgCloseClick = (event) => {
  emit('aside-lg-close-click', event)
}
</script>

<template>
  <AsideMenuLayer
    :menu="menu"
    :class="[
      isAsideMobileExpanded ? this.mobile : this.laptop,
      { 'lg:hidden xl:flex': !isAsideLgActive }
    ]"
    @menu-click="menuClick"
    @aside-lg-close-click="asideLgCloseClick"
  />
  <OverlayLayer v-show="isAsideLgActive" z-index="z-30" @overlay-click="asideLgCloseClick" />
</template>
<script>
export default {
  data(){
    return{
      mainStore : useMainStore(),
      mobile_size:'',
      laptop_size:'',

    }
  },
  computed: {

    mobile:function(){
if(this.mainStore.Language=='en'){
returnthis.mobile_size='left-0'
}else{
  this.mobile_size='right-0'
}
return this.mobile_size
    },


    laptop:function(){
      if(this.mainStore.Language=='en'){
this.laptop_size='-left-60 lg:left-0'
}else{
  this.laptop_size='-right-60 lg:right-0'
}
return this.laptop_size
    }

  }
}
</script>
