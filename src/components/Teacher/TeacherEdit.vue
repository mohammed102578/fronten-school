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

  <CardBox :class="cardClass" is-form @submit.prevent="update_teacher">

    <div v-if="success_message == true"
        class="bg-green-500 border-green-500 text-white px-3 py-6 md:py-3 mb-6 last:mb-0 border rounded-lg transition-colors duration-150">
        {{$t('Updated Successfully')}}
      </div>

      <div v-if="error_message.length > 0"
        class=" bg-red-500  text-white px-3 py-6 md:py-3 mb-6 last:mb-0 border rounded-lg transition-colors duration-150">
         {{$t('Some thing went wrong')}}</div>
      <div v-if="step === 1">
        <h2><b style="color:crimson;margin:3px">{{ $t('First Step') }}</b> <i style="color:rgb(192, 65, 90)">{{ $t('Teacher Info') }}</i></h2>

        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="name_ar"  label="Name_ar"/>
          <br>
          <span class="error" v-if="v$.name_ar.$error">
          {{ this.v$.name_ar.$errors[0].$message }} </span>
        </FormField>

        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="name_en"  label="Name_en"/>
          <br>
          <span class="error" v-if="v$.name_en.$error">
          {{ this.v$.name_en.$errors[0].$message }}</span>
        </FormField>

        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="email_Teacher" type="email"  label="Email"/>
          <br>
          <span class="error" v-if="v$.email_Teacher.$error">
          {{ this.v$.email_Teacher.$errors[0].$message }}</span>
        </FormField>



        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="National_ID"  label="National_ID"/>
          <br>
          <span class="error" v-if="v$.National_ID.$error">
          {{ this.v$.National_ID.$errors[0].$message }}</span>
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
          <FormControl placeholder="" v-model="phone"   label="Phone"/>
          <br>
          <span class="error" v-if="v$.phone.$error">
          {{ this.v$.phone.$errors[0].$message }}</span>
        </FormField>

        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="gender_id" :options="selectOptionsGenders" label="Gender" />

          <br>
          <span class="error" v-if="v$.gender_id.$error">
          {{ this.v$.gender_id.$errors[0].$message }}</span>
        </FormField>

        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="address"   label="Address"/>
          <br>
          <span class="error" v-if="v$.address.$error">
          {{ this.v$.address.$errors[0].$message }}</span>
        </FormField>


        <BaseButtons style="margin:5px">
        <BaseButton  :icon="mdiSkipForward"  @click="nextStep"  color="success" label="Next" />
      </BaseButtons>

      </div>



      <div v-if="step === 2">
        <h2><b style="color:crimson;margin:3px">{{ $t('Second Step') }}</b> <i style="color:rgb(192, 65, 90)">Teacher Information</i></h2>
        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="Joining_Date"   type="date" label="Joining_Date"/>
          <br>
          <span class="error" v-if="v$.Joining_Date.$error">
          {{ this.v$.Joining_Date.$errors[0].$message }}</span>
          </FormField>

          <FormField style="width: 49%;display: inline-block;margin: 5px;">

              <FormControl placeholder="" v-model="this.Nationality_id" :options="nationalities" label="Nationality" />
              <br>
              <span class="error" v-if="v$.Nationality_id.$error">
              {{ this.v$.Nationality_id.$errors[0].$message }}</span>
              </FormField>

        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="specialization_id" :options="selectOptionsSpecialization" label="Specialization" />
          <br>
          <span class="error" v-if="v$.specialization_id.$error">
          {{ this.v$.specialization_id.$errors[0].$message }}</span>
        </FormField>

        <FormField style="width: 49%;display: inline-block;margin: 5px;">

          <FormControl placeholder="" v-model="this.Blood_Type_id" :options="bloods" label="Blood Type"  />
          <br>
          <span class="error" v-if="v$.Blood_Type_id.$error">
          {{ this.v$.Blood_Type_id.$errors[0].$message }}</span>
          </FormField>
          <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="this.Religion_id" :options="religions" label="Religion" />
          <br>
          <span class="error" v-if="v$.Religion_id.$error">
          {{ this.v$.Religion_id.$errors[0].$message }}</span>
          </FormField>
          <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="bank_account"   label="Bank Account"/>
          <br>
          <span class="error" v-if="v$.bank_account.$error">
          {{ this.v$.bank_account.$errors[0].$message }}</span>
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
        <BaseButton :icon="mdiContentSave"  type="submit" color="info" label="Update Teacher" />

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
    name_ar:'',
    name_en:'',
    National_ID :'',
    email_Teacher: '',
    password: '',
    password_confirm:'',
    Joining_Date:'',
    phone: '',
    Nationality_id : '',
    Blood_Type_id: '',
    Religion_id :'',
    gender_id:'',
    specialization_id:'',
    user_info: localStorage.getItem('user_info') || '',
    error_message: '',
    success_message: false,
    address:'',
    bank_account: '',
    nationalities:[],
    bloods:[],
    religions:[],
    selectOptionsGenders:[],
    selectOptionsSpecialization:[],
    image:'',
    attachment:'',
    teacher_id:this.$router.currentRoute.value.params.id,

  }
},
computed:{
userData:function(){
return JSON.parse(this.user_info)
},

},
validations() {
  return {
    name_ar:{ required,minLength: minLength(6) },
    name_en:{ required,minLength: minLength(6)  },
    National_ID :{ required,minLength: minLength(6)  },
    email_Teacher: { required,email },
    phone: { required,minLength: minLength(10)  },
    Joining_Date :{ required,minLength: minLength(6)  },
    Nationality_id : { required },
    Blood_Type_id: { required },
    Religion_id :{ required },
    specialization_id :{ required },
    gender_id :{ required },
    address:{ required,minLength: minLength(3)  },
    bank_account: { required,minLength: minLength(6)  },
    image:{ required },
    attachment:{ required },
    password_confirm:{ required },
    password: {
        minLength: minLength(6),
      },
      password_confirm: { sameaspassword: sameAs(this.password) }
  }
},
mounted() {
  if (!this.user_info) {
    // Token exists in localStorage, redirect to dashboard
    this.$router.push('/login')

  } else {
    this.get_teacher(this.teacher_id)
    this.get_realation_teacher_data()
  }
},
methods: {
  nextStep() {
      this.step++

    },

    prevStep() {
      this.step --

    },

    async  get_teacher(id) {
      try {

const response = await axios.get(`http://localhost:8000/Api/get_teacher/${id}`,
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



let data=response.data.teacher
    this.name_ar=data.name_ar
    this.name_en=data.name_en
    this.National_ID=data.National_ID
    this.email_Teacher=data.email
    this.password=""
    this.Joining_Date=data.Joining_Date
    this.phone=data.phone
    this.Nationality_id=data.Nationality_id
    this.Blood_Type_id=data.Blood_Type_id
    this.Religion_id=data.Religion_id
    this.gender_id=data.gender_id
    this.specialization_id=data.specialization_id
    this.address=data.address
    this.bank_account=data.bank_account

}
}

// handle success
} catch (error) {
console.error(error);
// handle error
}

    },
    async get_realation_teacher_data(url) {
    try {

      const response = await axios.get('http://localhost:8000/Api/get_realation_teacher_data',
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
       this.nationalities = response.data.teacher.nationality.map(item => ({ id: item.id, label: JSON.parse(item.Name).en }));
       this.selectOptionsGenders = response.data.teacher.gender.map(item => ({ id: item.id, label: JSON.parse(item.Name).en }));
       this.selectOptionsSpecialization = response.data.teacher.specialization.map(item => ({ id: item.id, label: this.$i18n.locale=='en' ? item.name_en : item.name_ar  }));
       this.bloods = response.data.teacher.blood.map(item => ({ id: item.id, label: item.Name }));
       this.religions = response.data.teacher.religion.map(item => ({ id: item.id, label: JSON.parse(item.Name).en }));

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
  async update_teacher() {
    this.v$.$validate();
    console.log(this.v$.$error)
    if (!this.v$.$error) {
      try {
        const formData = new FormData();
    formData.append("id",this.teacher_id);
    formData.append("image",this.image);
    formData.append("attachment",this.attachment);
    formData.append("name_ar",this.name_ar);
    formData.append("name_en",this.name_en);
    formData.append("National_ID",this.National_ID);
    formData.append("email",this.email_Teacher);
    formData.append("password",this.password);
    formData.append("Joining_Date",this.Joining_Date);
    formData.append("phone",this.phone);
    formData.append("Nationality_id",this.Nationality_id);
    formData.append("Blood_Type_id",this.Blood_Type_id);
    formData.append("Religion_id",this.Religion_id);
    formData.append("gender_id",this.gender_id);
    formData.append("specialization_id",this.specialization_id);
    formData.append("address",this.address);
    formData.append("bank_account",this.bank_account);
        const response = await axios.post('http://localhost:8000/Api/update_teacher',formData,
          {
            headers: {
              'auth_token': this.userData.user.api_token,
              'api_password': "ase1iXcLAxanvXLZcgh6tk",

            }
          });


        if (response.data.succNum == 200 && response.data.status == true) {
          this.error_message = '';
          this.success_message = true;
          this.$router.push({name:'teachers_edit',params:{id:this.teacher_id}})

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
