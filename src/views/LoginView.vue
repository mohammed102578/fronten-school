<script setup>
import { useRouter } from 'vue-router'
import { mdiAccount, mdiAsterisk , mdiEmail} from '@mdi/js'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadio from '@/components/FormCheckRadio.vue'
import logo from '@/components/Logo.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'

const router = useRouter()


</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="login">
        <div style="display: flex;justify-content: center;margin-bottom: 20px;"> <logo/></div>

        <FormField label="Email" >
          <FormControl
            v-model="user_email"
            :icon="mdiEmail"
            name="email"
            placeholder="Please enter your email"
            autocomplete="email"
          />
          <br>
          <span  class="error"  v-if="v$.user_email.$error">
            {{ this.v$.user_email.$errors[0].$message }}</span>

        </FormField>

        <FormField label="Password">

          <FormControl
            v-model="password"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            placeholder="Please enter your password"
            autocomplete="current-password"
            inputElClass="p-4"
          />
          <br>
          <span  class="error" v-if="v$.password.$error">
            {{ this.v$.password.$errors[0].$message  }}</span>


        </FormField>

        <FormCheckRadio
          v-model="rememper"
          name="remember"
          label="Remember"
          :input-value="true"
        />
        <br>
        <span  class="error" >{{ this.erro_message }}</span>

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Login" />
            <BaseButton to="/register" color="info" outline label="Register" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>

<script>
import axios from 'axios';
import useVuelidate from '@vuelidate/core';
import { required , email } from '@vuelidate/validators';
export default {
  data() {
    return {
      v$: useVuelidate(),
      user_email: '',
      password: '',
      rememper:true,
      user_info:localStorage.getItem('user_info') || '',
      erro_message:'',

    };
  },
 validations(){
 return {
  user_email: {required,email},
  password: {required},
 }
 },
 mounted() {
  if (this.user_info) {
    // Token exists in localStorage, redirect to dashboard

    this.$router.push('/dashboard')

  }
},
  methods: {
    async login() {

      this.v$.$validate();
      if(!this.v$.$error){
        try {
                  const response = await axios.post('http://localhost:8000/Api/login', {
                    email: this.user_email,
                    password: this.password,
                  },{
                  headers: {
                      api_password: "ase1iXcLAxanvXLZcgh6tk",

                    }

            });


                  if(response.data.succNum==200 && response.data.status==true){
                    localStorage.setItem('user_info', JSON.stringify(response.data))
                    this.$router.push('/dashboard')
                  }else{
                    this.erro_message=response.data.msg
                    console.log(response.data.msg)
                  }
                  // handle success
                } catch (error) {
                  console.error(error);
                  // handle error
                }
          }


    },
  },
};
</script>

<style lang="css" scoped>

.error{
  margin-top: -20px; color:red;
 font-size:13px;
}
  </style>
