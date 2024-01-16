<script setup>
import { mdiLogout, mdiClose } from '@mdi/js'
import { computed } from 'vue'
import AsideMenuList from '@/components/AsideMenuList.vue'
import AsideMenuItem from '@/components/AsideMenuItem.vue'
import BaseIcon from '@/components/BaseIcon.vue'

defineProps({
  menu: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['menu-click', 'aside-lg-close-click'])

const logoutItem = computed(() => ({
  label: 'Logout',
  icon: mdiLogout,
  color: 'info',
  isLogout: true
}))

const menuClick = (event, item) => {
  emit('menu-click', event, item)
}

const asideLgCloseClick = (event) => {
  emit('aside-lg-close-click', event)
}
</script>

<template>
  <aside
    id="aside" class="lg:py-2 lg:pl-2 w-60 fixed flex z-40 top-0 h-screen transition-position overflow-hidden"

  >
    <div class="aside lg:rounded-2xl flex-1 flex flex-col overflow-hidden dark:bg-slate-900">
      <div class="aside-brand flex flex-row h-14 items-center justify-between dark:bg-slate-900">
        <div class="text-center flex-1 lg:text-left lg:pl-6 xl:text-center xl:pl-0">
          <b class="font-black">ZID School</b>
        </div>
        <button class="hidden lg:inline-block xl:hidden p-3" @click.prevent="asideLgCloseClick">
          <BaseIcon :path="mdiClose" />
        </button>
      </div>
      <div
        class="flex-1 overflow-y-auto overflow-x-hidden aside-scrollbars dark:aside-scrollbars-[slate]"
      >
        <AsideMenuList :menu="menu" @menu-click="menuClick" />

      </div>

      <ul>
        <AsideMenuItem :item="logoutItem" @menu-click="logout" />
      </ul>
    </div>
  </aside>
</template>
<script>

import axios from 'axios';
export default {
  data() {
    return {
      user_info:localStorage.getItem('user_info')

    };
  },
  mounted() {
//if not login return login page
if (!this.user_info) {
    // Token exists in localStorage, redirect to dashboard
    this.$router.push('/login')
  }else{
    const userData = JSON.parse(this.user_info);

  }

},
  methods: {
    async logout() {

          try {
                  const userData = JSON.parse(this.user_info);

                  const response = await axios.get('http://localhost:8000/Api/logout', {
                    headers: {
                      'auth_token': userData.user.api_token,
                      'api_password': "ase1iXcLAxanvXLZcgh6tk",

                    }
                  });



                  if(response.data.succNum==200 && response.data.status==true){
                    localStorage.clear()
                    this.$router.push('/login')
                  }else{
                    this.erro_message=response.data.msg

                  }
                  // handle success
                } catch (error) {
                  // handle error
                }



    },
  },
};


</script>
