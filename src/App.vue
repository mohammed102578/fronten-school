<script setup>
import { RouterView } from 'vue-router'
import axios from 'axios';
import { reactive ,ref} from 'vue'
import { useMainStore } from '@/stores/main'


</script>

<template>
  <RouterView />
</template>

<script>
export default {
  name: "App",

  data(){
return {
  user_info:localStorage.getItem('user_info')

}
  },
  beforeMount() {
    window.addEventListener("load", this.check_api);
  },
  beforeDestroy() {
    window.removeEventListener("load", this.check_api);
  },
  mounted(){
    this.check_api()
    if (!this.user_info) {
    // Token exists in localStorage, redirect to dashboard
    this.$router.push('/login')
  }
  },
  methods: {

    async check_api() {

      const userData = JSON.parse(this.user_info);
      //console.log(userData.user.api_token)

    try {
            const response = await axios.post('http://localhost:8000/Api/get_profile', {
              id:userData.user.id,

            }, {
                    headers: {
                      'auth_token': userData.user.api_token,
                      api_password: "ase1iXcLAxanvXLZcgh6tk",

                    }
                  });


            if(response.data.status==false){
              localStorage.clear()
              this.$router.push('/login')
            }else{
              const mainStore = useMainStore()
              const userAvatar = reactive({
                userAvatar: mainStore.userAvatar,
              })
              userAvatar.userAvatar =  'http://localhost:8000/'+response.data.user.image
              mainStore.setUser(userAvatar)


            }
            // handle success
          } catch (error) {
            console.error(error);
            // handle error
          }


},
}

};
</script>
