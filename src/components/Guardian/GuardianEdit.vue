<script setup>
import { computed, ref } from 'vue'
import { useMainStore } from '@/stores/main'
import {  mdiContentSave, mdiSkipBackward,mdiSkipForward } from '@mdi/js'
import CardBox from '@/components/CardBox.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import axios from 'axios';
import useVuelidate from '@vuelidate/core';
import { helpers, required, email, minLength, maxLength, sameAs } from '@vuelidate/validators'


</script>

<template>

  <CardBox :class="cardClass" is-form @submit.prevent="update_parent">

    <div v-if="success_message == true"
        class="bg-green-500 border-green-500 text-white px-3 py-6 md:py-3 mb-6 last:mb-0 border rounded-lg transition-colors duration-150">
        {{$t('Updated Successfully')}}
      </div>

      <div v-if="error_message.length > 0"
        class=" bg-red-500  text-white px-3 py-6 md:py-3 mb-6 last:mb-0 border rounded-lg transition-colors duration-150">
         {{$t('Some thing went wrong')}}</div>
      <div v-if="step === 1">
        <h2><b style="color:crimson;margin:3px">{{ $t('First Step') }}</b> <i style="color:rgb(192, 65, 90)">{{$t('Guardian Info')}}</i></h2>

        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="Name_Father_ar"  label="Name_ar"/>
          <br>
          <span class="error" v-if="v$.Name_Father_ar.$error">
          {{ this.v$.Name_Father_ar.$errors[0].$message }}</span>
        </FormField>

        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="Name_Father_en"  label="Name_en"/>
          <br>
          <span class="error" v-if="v$.Name_Father_en.$error">
          {{ this.v$.Name_Father_en.$errors[0].$message }}</span>
        </FormField>

        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="email_Father" type="email"  label="Email"/>
          <br>
          <span class="error" v-if="v$.email_Father.$error">
          {{ this.v$.email_Father.$errors[0].$message }}</span>
        </FormField>



        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="National_ID_Father"  label="National_ID"/>
          <br>
          <span class="error" v-if="v$.National_ID_Father.$error">
          {{ this.v$.National_ID_Father.$errors[0].$message }}</span>
        </FormField>

          <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="Passport_ID_Father"   label="Passport_ID"/>
          <br>
          <span class="error" v-if="v$.Passport_ID_Father.$error">
          {{ this.v$.Passport_ID_Father.$errors[0].$message }}</span>
          </FormField>

          <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="password" type="password"  label="Password"/>
          <br>
          <span class="error" v-if="v$.password.$error">
          {{ this.v$.password.$errors[0].$message }}</span>
        </FormField>

        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="password_confirm" type="password"  label="Confirmation Password"/>
          <br>
          <span class="error" v-if="v$.password_confirm.$error">
          {{ this.v$.password_confirm.$errors[0].$message }}</span>
        </FormField>

         <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="Phone_Father"   label="Phone"/>
          <br>
          <span class="error" v-if="v$.Phone_Father.$error">
          {{ this.v$.Phone_Father.$errors[0].$message }}</span>
        </FormField>

         <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="Job_Father"   label="Job"/>
          <br>
          <span class="error" v-if="v$.Job_Father.$error">
          {{ this.v$.Job_Father.$errors[0].$message }}</span>
        </FormField>

        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="Address_Father"   label="Address"/>
          <br>
          <span class="error" v-if="v$.Address_Father.$error">
          {{ this.v$.Address_Father.$errors[0].$message }}</span>
        </FormField>

        <FormField style="width: 49%;display: inline-block;margin: 5px;">

          <FormControl placeholder="" v-model="this.Blood_Type_Father_id" :options="bloods" label="Blood Type"  />
          <br>
          <span class="error" v-if="v$.Blood_Type_Father_id.$error">
          {{ this.v$.Blood_Type_Father_id.$errors[0].$message }}</span>
        </FormField>

        <FormField style="width: 49%;display: inline-block;margin: 5px;">

          <FormControl placeholder="" v-model="this.Nationality_Father_id" :options="nationalities" label="Nationality" />
          <br>
          <span class="error" v-if="v$.Nationality_Father_id.$error">
          {{ this.v$.Nationality_Father_id.$errors[0].$message }}</span>
        </FormField>

        <FormField style="width: 49%;display: inline-block;margin: 5px;">

          <FormControl placeholder="" v-model="this.Religion_Father_id" :options="religions" label="Religion" />
          <br>
          <span class="error" v-if="v$.Religion_Father_id.$error">
          {{ this.v$.Religion_Father_id.$errors[0].$message }}</span>
        </FormField>

        <BaseButtons style="margin:5px">
        <BaseButton  :icon="mdiSkipForward"  @click="nextStep"  color="success" label="Next" />
      </BaseButtons>

      </div>



      <div v-if="step === 2">
        <h2><b style="color:crimson;margin:3px">{{ $t('Second Step') }}</b> <i style="color:rgb(192, 65, 90)">Mother Information</i></h2>
        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="Name_Mother_ar"  label="Name_ar"/>
          <br>
          <span class="error" v-if="v$.Name_Mother_ar.$error">
          {{ this.v$.Name_Mother_ar.$errors[0].$message }}</span>
        </FormField>

        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="Name_Mother_en"  label="Name_en"/>
          <br>
          <span class="error" v-if="v$.Name_Mother_en.$error">
          {{ this.v$.Name_Mother_en.$errors[0].$message }}</span>
        </FormField>


        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="National_ID_Mother"  label="National_ID"/>
          <br>
          <span class="error" v-if="v$.National_ID_Mother.$error">
          {{ this.v$.National_ID_Mother.$errors[0].$message }}</span>
        </FormField>

          <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="Passport_ID_Mother"   label="Passport_ID"/>
          <br>
          <span class="error" v-if="v$.Passport_ID_Mother.$error">
          {{ this.v$.Passport_ID_Mother.$errors[0].$message }}</span>
          </FormField>


         <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="Phone_Mother"   label="Phone"/>
          <br>
          <span class="error" v-if="v$.Phone_Mother.$error">
          {{ this.v$.Phone_Mother.$errors[0].$message }}</span>
        </FormField>

         <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="Job_Mother"   label="Job"/>
          <br>
          <span class="error" v-if="v$.Job_Mother.$error">
          {{ this.v$.Job_Mother.$errors[0].$message }}</span>
        </FormField>

        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="Address_Mother"   label="Address"/>
          <br>
          <span class="error" v-if="v$.Address_Mother.$error">
          {{ this.v$.Address_Mother.$errors[0].$message }}</span>
        </FormField>

        <FormField style="width: 49%;display: inline-block;margin: 5px;">

          <FormControl placeholder="" v-model="this.Blood_Type_Mother_id" :options="bloods" label="Blood Type"  />
          <br>
          <span class="error" v-if="v$.Blood_Type_Mother_id.$error">
          {{ this.v$.Blood_Type_Mother_id.$errors[0].$message }}</span>
        </FormField>

        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="this.Nationality_Mother_id" :options="nationalities" label="Nationality" />
          <br>
          <span class="error" v-if="v$.Nationality_Mother_id.$error">
          {{ this.v$.Nationality_Mother_id.$errors[0].$message }}</span>
        </FormField>

        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="this.Religion_Mother_id" :options="religions" label="Religion" />
          <br>
          <span class="error" v-if="v$.Religion_Mother_id.$error">
          {{ this.v$.Religion_Mother_id.$errors[0].$message }}</span>
        </FormField>


        <FormField  style="width: 49%;display: inline-block;margin: 5px;" help="Max 500kb">
          <label   class="block font-bold mb-2">{{$t('Upload Image')}}</label>
          <input type="file" @change="handleImageUpload"  >
          <br>
          <span class="error" v-if="v$.image.$error">
          {{ this.v$.image.$errors[0].$message }}</span>
        </FormField>

        <FormField style="width:49%;display:inline-block;margin:5px;"  help="Max 500kb">
          <label   class="block font-bold mb-2">{{ $t('Upload documentation')}}</label>
          <input type="file" @change="handleFileUpload" >
          <br>
          <span class="error" v-if="v$.attachment.$error">
          {{ this.v$.attachment.$errors[0].$message }}</span>
       </FormField>

      <BaseButtons style="margin:5px">
        <BaseButton :icon="mdiSkipBackward" @click="prevStep"  color="success" label="Previous" />
        <BaseButton :icon="mdiContentSave"  type="submit" color="info" label="Update Guardian" />

      </BaseButtons>
      </div>

    </CardBox>

</template>

<script>


export default {

data() {
  return {
    v$: useVuelidate(),
    step: 1,
    formData:'',
    Name_Father_ar:'',
    Name_Father_en:'',
    National_ID_Father :'',
    email_Father: '',
    password: '',
    password_confirm:'',
    Passport_ID_Father:'',
    Phone_Father: '',
    Job_Father : '',
    Nationality_Father_id : '',
    Blood_Type_Father_id: '',
    Religion_Father_id :'',
    user_info: localStorage.getItem('user_info') || '',
    error_message: '',
    success_message: false,
    Address_Father:'',
    Name_Mother_en: '',
    Name_Mother_ar: '',
    National_ID_Mother :'',
    Passport_ID_Mother :'',
    Phone_Mother :'',
    Job_Mother:'',
    Nationality_Mother_id :'',
    Blood_Type_Mother_id :'',
    Religion_Mother_id:'',
    Address_Mother:'',
    nationalities:[],
    bloods:[],
    religions:[],
    parent_id:this.$router.currentRoute.value.params.id,
    image:'',
    attachment:'',

  }
},
computed:{
userData:function(){
return JSON.parse(this.user_info)
},

},
validations() {
  return {
    Name_Father_ar:{ required,minLength: minLength(6) },
    Name_Father_en:{ required,minLength: minLength(6)  },
    National_ID_Father :{ required,minLength: minLength(6)  },
    email_Father: { required,email },
    Phone_Father: { required,minLength: minLength(10)  },
    Passport_ID_Father :{ required,minLength: minLength(6)  },
    Job_Father : { required,minLength: minLength(2)  },
    Nationality_Father_id : { required },
    Blood_Type_Father_id: { required },
    Religion_Father_id :{ required },
    Address_Father:{ required,minLength: minLength(3)  },
    Name_Mother_ar: { required,minLength: minLength(6)  },
    Name_Mother_en: { required,minLength: minLength(6)  },
    National_ID_Mother :{ required,minLength: minLength(6)  },
    Passport_ID_Mother :{ required,minLength: minLength(6)  },
    Phone_Mother :{ required,minLength: minLength(10)  },
    Job_Mother:{ required,minLength: minLength(3)  },
    Nationality_Mother_id :{ required },
    Blood_Type_Mother_id :{ required },
    Religion_Mother_id:{ required },
    image:{ required },
    attachment:{ required },
    Address_Mother:{ required,minLength: minLength(3)  },
    password: {
      minLength: minLength(6),
      },
      password_confirm: {sameaspassword: sameAs(this.password) }
  }
},
mounted() {
  if (!this.user_info) {
    // Token exists in localStorage, redirect to dashboard
    this.$router.push('/login')

  } else {
    this.get_parent(this.parent_id)
    this.get_realation_parent_data()
  }
},
methods: {
  nextStep() {
      this.step++

    },

    prevStep() {
      this.step --

    },

    async  get_parent(id) {
      try {

const response = await axios.get(`http://localhost:8000/Api/get_parent/${id}`,
  {
  headers: {
    'auth_token': this.userData.user.api_token,
    'api_password': "ase1iXcLAxanvXLZcgh6tk",
  }
});
if (response.data.status ==false && response.data.errNum==401) {
  localStorage.clear()
  this.$router.push('/login')
}else{
  if (response.data.status==true && response.data.succNum	==200) {

let data=response.data.parent
    this.Name_Father_ar=data.Name_Father_ar
    this.Name_Father_en=data.Name_Father_en
    this.National_ID_Father=data.National_ID_Father
    this.email_Father=data.email
    this.password=""
    this.Passport_ID_Father=data.Passport_ID_Father
    this.Phone_Father=data.Phone_Father
    this.Job_Father=data.Job_Father
    this.Nationality_Father_id=data.Nationality_Father_id
    this.Blood_Type_Father_id=data.Blood_Type_Father_id
    this.Religion_Father_id=data.Religion_Father_id
    this.Address_Father=data.Address_Father
    this.Name_Mother_ar=data.Name_Mother_ar
    this.Name_Mother_en=data.Name_Mother_en
    this.National_ID_Mother=data.National_ID_Mother
    this.Passport_ID_Mother=data.Passport_ID_Mother
    this.Phone_Mother=data.Phone_Mother
    this.Job_Mother=data.Job_Mother
    this.Nationality_Mother_id=data.Nationality_Mother_id
    this.Blood_Type_Mother_id=data.Blood_Type_Mother_id
    this.Religion_Mother_id=data.Religion_Mother_id
    this.Address_Mother=data.Address_Mother
}
}

// handle success
} catch (error) {
console.error(error);
// handle error
}

    },
  async get_realation_parent_data(url) {
    try {

      const response = await axios.get('http://localhost:8000/Api/get_realation_parent_data',
        {
        headers: {
          'auth_token': this.userData.user.api_token,
          'api_password': "ase1iXcLAxanvXLZcgh6tk",
        }
      });
      if (response.data.status ==false && response.data.errNum==401) {
        localStorage.clear()
        this.$router.push('/login')
      }else{
        if (response.data.status==true && response.data.succNum	==200) {
        //this.religion = response.data.grade.data
       this.nationalities = response.data.parent.nationality.map(item => ({ id: item.id, label: JSON.parse(item.Name).en }));
       this.bloods = response.data.parent.blood.map(item => ({ id: item.id, label: item.Name }));
       this.religions = response.data.parent.religion.map(item => ({ id: item.id, label: JSON.parse(item.Name).en }));

      }
      }

      // handle success
    } catch (error) {
      console.error(error);
      // handle error
    }


  },
    handleImageUpload(event) {
      this.image = event.target.files[0];
    }
    ,
    handleFileUpload(event) {
      this.attachment = event.target.files[0];
    }
    ,
  async update_parent() {
    this.v$.$validate();
    console.log(this.v$.$error)
    if (!this.v$.$error) {
      try {
        const formData = new FormData();
    formData.append("image",this.image);
    formData.append("attachment",this.attachment);
    formData.append("id",this.parent_id);
    formData.append("Name_Father_ar",this.Name_Father_ar);
    formData.append("Name_Father_en",this.Name_Father_en);
    formData.append("National_ID_Father",this.National_ID_Father);
    formData.append("email",this.email_Father);
    formData.append("password",this.password);
    formData.append("Passport_ID_Father",this.Passport_ID_Father);
    formData.append("Phone_Father",this.Phone_Father);
    formData.append("Job_Father",this.Job_Father);
    formData.append("Nationality_Father_id",this.Nationality_Father_id);
    formData.append("Blood_Type_Father_id",this.Blood_Type_Father_id);
    formData.append("Religion_Father_id",this.Religion_Father_id);
    formData.append("Address_Father",this.Address_Father);
    formData.append("Name_Mother_ar",this.Name_Mother_ar);
    formData.append("Name_Mother_en",this.Name_Mother_en);
    formData.append("National_ID_Mother",this.National_ID_Mother);
    formData.append("Passport_ID_Mother",this.Passport_ID_Mother);
    formData.append("Phone_Mother",this.Phone_Mother);
    formData.append("Job_Mother",this.Job_Mother);
    formData.append("Nationality_Mother_id",this.Nationality_Mother_id);
    formData.append("Blood_Type_Mother_id",this.Blood_Type_Mother_id);
    formData.append("Religion_Mother_id",this.Religion_Mother_id);
    formData.append("Address_Mother",this.Address_Mother);
        const response = await axios.post('http://localhost:8000/Api/update_parent',formData,
          {
            headers: {
              'auth_token': this.userData.user.api_token,
              'api_password': "ase1iXcLAxanvXLZcgh6tk",

            }
          });


        if (response.data.succNum == 200 && response.data.status == true) {
          this.error_message = '';
          this.success_message = true;
          this.$router.push({name:'guardians_edit',params:{id:this.parent_id}})

          setTimeout(() => {
            this.success_message = false;
          }, 2000)

        } else {
          this.error_message = response.data.msg
          this.success_message = false

        }
        // handle success
      } catch (error) {
        console.error(error);
        // handle error
      }
    }


  },


}

};
</script>
<style lang="css" scoped>
.error {
margin-top: -20px;
color: rgb(139, 41, 41);
font-size: 13px;
}
.selectt{
  display:inline-block;
}
</style>
