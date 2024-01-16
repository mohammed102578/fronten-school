<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { mdiAccount, mdiAsterisk  ,mdiEmail} from '@mdi/js'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadio from '@/components/FormCheckRadio.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import logo from '@/components/Logo.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'



const router = useRouter()

const submit = () => {
  router.push('/dashboard')
}
</script>

<template>
  <LayoutGuest>

    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="register">
       <div style="display: flex;justify-content: center;margin-bottom: 10px;"> <logo/></div>
        <FormField label="Name" help="Please enter your name">
          <FormControl
            v-model="name"
            :icon="mdiAccount"
            name="name"
            autocomplete="name"
          />
          <br>
          <span  class="error" v-if="v$.name.$error">
            {{ this.v$.name.$errors[0].$message  }}</span>

        </FormField >

        <FormField label="Email" >
          <FormControl
            v-model="user_email"
            :icon="mdiEmail"
            name="email"
            autocomplete="email"
          />
          <br>
          <span  class="error" v-if="v$.user_email.$error">
            {{ this.v$.user_email.$errors[0].$message  }}</span>

        </FormField>

        <FormField label="Password">
          <FormControl
            v-model="password"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
          />
          <br>
          <span  class="error" v-if="v$.password.$error">
            {{ this.v$.password.$errors[0].$message  }}</span>

        </FormField>

        <FormField label="Confirmation Password">
          <FormControl
            v-model="confirm_password"
            :icon="mdiAsterisk"
            type="password"
            name="confirm_password"
            autocomplete="current-password"
          />
          <br>
          <span  class="error" v-if="v$.confirm_password.$error">
            {{ this.v$.confirm_password.$errors[0].$message  }}</span>

        </FormField>


        <span  class="error">{{ this.erro_message }}</span>

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Register" />
            <BaseButton to="/login" color="info" outline label="Login" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>

</template>

<script>

import axios from 'axios';
import useVuelidate from '@vuelidate/core';
import { helpers, required, email, minLength, maxLength, sameAs } from '@vuelidate/validators'




export default {
  data() {
    return {
      v$: useVuelidate(),
      user_email:'',
      password:'',
      name:'',
      confirm_password:'',
      user_info:localStorage.getItem('user_info') || '',
      erro_message:'',
    };
  },validations () {
    return {
      name: { required, minLength: minLength(6), maxLength: maxLength(40), },
      user_email: { required, email, },
      password: {
        required,
        minLength: minLength(6),
        containspasswordrequirement: helpers.withMessage(
          () => `the password requires an uppercase, lowercase, number and special character`,
          (value) => /(?=.*[a-z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(value)
        ),
      },
      confirm_password: { required, sameaspassword: sameAs(this.password) }
    }
  },
  mounted() {
  if (this.user_info) {
    // Token exists in localStorage, redirect to dashboard
    this.$router.push('/dashboard')
  }
},
  methods: {
    async register() {

      this.v$.$validate();
      if(!this.v$.$error){
          try {
                  const response = await axios.post('http://localhost:8000/Api/register', {
                    email: this.user_email,
                    name: this.name,
                    password: this.password,
                    confirm_password:this.confirm_password
                  },
                  {
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

