<script setup>
import { computed, ref } from 'vue'
import { useMainStore } from '@/stores/main'
import { mdiVectorSquareEdit, mdiContentSave, mdiTrashCan, mdiSkipBackward,mdiSkipForward } from '@mdi/js'
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

  <CardBox :class="cardClass" is-form @submit.prevent="add_student" enctype="multipart/form-data">

    <div v-if="success_message == true"
        class="bg-green-500 border-green-500 text-white px-3 py-6 md:py-3 mb-6 last:mb-0 border rounded-lg transition-colors duration-150">
        {{$t('Added Successfully')}}
      </div>

      <div v-if="error_message.length > 0"
        class=" bg-red-500  text-white px-3 py-6 md:py-3 mb-6 last:mb-0 border rounded-lg transition-colors duration-150">
         {{$t('Some thing went wrong')}}</div>

      <div v-if="step === 1">
        <h2><b style="color:crimson;margin:3px">{{ $t('First Step') }}</b> <i style="color:rgb(192, 65, 90)">Personal Information</i></h2>

        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="name_ar" :icon="mdiAccount" label="Name_ar"/>
          <br>
          <span class="error" v-if="v$.name_ar.$error">
          {{ this.v$.name_ar.$errors[0].$message }}</span>
        </FormField>

        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="name_en" :icon="mdiAccount" label="Name_en"/>
          <br>
          <span class="error" v-if="v$.name_en.$error">
          {{ this.v$.name_en.$errors[0].$message }}</span>
        </FormField>

        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="email_student" type="email" :icon="mdiMail" label="Email"/>
          <br>
          <span class="error" v-if="v$.email_student.$error">
          {{ this.v$.email_student.$errors[0].$message }}</span>
        </FormField>


          <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="password" type="password" :icon="mdiAccount" label="Password"/>
          <br>
          <span class="error" v-if="v$.password.$error">
          {{ this.v$.password.$errors[0].$message }}</span>
        </FormField>

        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="password_confirm" type="password" :icon="mdiAccount" label="Confirmation Password"/>
          <br>
          <span class="error" v-if="v$.password_confirm.$error">
          {{ this.v$.password_confirm.$errors[0].$message }}</span>
        </FormField>

         <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="Date_Birth "  type="date" :icon="mdiMail" label="Date Birth"/>
          <br>
          <span class="error" v-if="v$.Date_Birth .$error">
          {{ this.v$.Date_Birth .$errors[0].$message }}</span>
        </FormField>


        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="gender_id" :options="selectOptionsGenders" label="Gender" />

          <br>
          <span class="error" v-if="v$.gender_id.$error">
          {{ this.v$.gender_id.$errors[0].$message }}</span>
        </FormField>



        <FormField style="width: 49%;display: inline-block;margin: 5px;">

          <FormControl placeholder="" v-model="blood_id " :options="selectOptionsBloods" label="Blood Type"  />
          <br>
          <span class="error" v-if="v$.blood_id .$error">
          {{ this.v$.blood_id .$errors[0].$message }}</span>
        </FormField>

        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="nationalitie_id" :options="selectOptionsNationalities" label="Nationality" />
          <br>
          <span class="error" v-if="v$.nationalitie_id.$error">
          {{ this.v$.nationalitie_id.$errors[0].$message }}</span>
        </FormField>


        <BaseButtons style="margin:5px">
        <BaseButton  :icon="mdiSkipForward"  @click="nextStep"  color="success" label="Next" />
      </BaseButtons>

      </div>



      <div v-if="step === 2">
        <h2><b style="color:crimson;margin:3px">{{ $t('Second Step') }}</b> <i style="color:rgb(192, 65, 90)">Student Information</i></h2>
        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="academic_year" :icon="mdiAccount" label="Academic Year"/>
          <br>
          <span class="error" v-if="v$.academic_year.$error">
          {{ this.v$.academic_year.$errors[0].$message }}</span>
        </FormField>



        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="this.Grade_id" :options="selectOptionsGrades" @change="get_classroom(this.Grade_id)" label="Grade"/>
          <br>
          <span class="error" v-if="v$.Grade_id.$error">
          {{ this.v$.Grade_id.$errors[0].$message }}
          </span>
        </FormField>


        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="this.Classroom_id" :options="selectOptionsClassrooms"  @change="get_section(this.Classroom_id)" label="Classroom" />
          <br>
          <span class="error" v-if="v$.Classroom_id.$error">
         {{ this.v$.Classroom_id.$errors[0].$message }}</span>
        </FormField>





        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="section_id" :options="selectOptionsSections" label="Section" />
          <br>
          <span class="error" v-if="v$.section_id.$error">
          {{ this.v$.section_id.$errors[0].$message }}</span>
        </FormField>





        <FormField style="width: 49%;display: inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="parent_id" :options="selectOptionsParents" @change="get_mother(this.parent_id)" label="Parent" />
          <br>
          <span class="error" v-if="v$.parent_id.$error">
          {{ this.v$.parent_id.$errors[0].$message }}</span>
        </FormField>



        <FormField style="width:49%;display:inline-block;margin: 5px;">
          <FormControl placeholder="" v-model="mother_id" :options="selectOptionsMothers" label="Mother Name" />
          <br>
          <span class="error" v-if="v$.mother_id.$error">
          {{ this.v$.mother_id.$errors[0].$message }}</span>
        </FormField>


        <FormField  style="width: 49%;display: inline-block;margin: 5px;" help="Max 500kb">
          <label   class="block font-bold mb-2">{{$t("Upload Image")}}</label>
          <input type="file" @change="handleImageUpload"  >
          <br>
          <span class="error" v-if="v$.image.$error">
          {{ this.v$.image.$errors[0].$message }}</span>
        </FormField>

        <FormField style="width:49%;display:inline-block;margin:5px;"  help="Max 500kb">
          <label   class="block font-bold mb-2">{{$t("Upload documentation")}}</label>
          <input type="file" @change="handleFileUpload" >
          <br>
          <span class="error" v-if="v$.attachment.$error">
          {{ this.v$.attachment.$errors[0].$message }}</span>
       </FormField>

      <BaseButtons style="margin:5px">
        <BaseButton :icon="mdiSkipBackward" @click="prevStep"  color="success" label="Previous" />
        <BaseButton :icon="mdiContentSave"  type="submit" color="info" label="Create Student" />

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
    email_student: '',
    password: '',
    password_confirm:'',
    Date_Birth : '',
    nationalitie_id : '',
    blood_id : '',
    user_info: localStorage.getItem('user_info') || '',
    error_message: '',
    success_message: false,
    gender_id:'',
    Grade_id:'',
    Classroom_id:'',
    academic_year: '',
    section_id:'',
    parent_id:'',
    mother_id:'',
    selectOptionsNationalities:[],
    selectOptionsGenders:[],
    selectOptionsBloods:[],
    selectOptionsGrades:[],
    selectOptionsGrades:[],
    selectOptionsClassrooms:[],
    selectOptionsSections:[],
    selectOptionsParents:[],
    selectOptionsMothers:[],
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
    name_ar:{ required,minLength: minLength(6) },
    name_en:{ required,minLength: minLength(6)  },
    email_student: { required,email },
    Date_Birth : { required,minLength: minLength(10)  },
    blood_id : { required },
    gender_id:{ required },
    nationalitie_id:{ required },
    academic_year: { required  },
    Grade_id :{ required },
    Classroom_id :{ required },
    section_id:{ required },
    parent_id:{ required },
    mother_id:{ required },
    mother_id:{ required },
    image:{ required },
    attachment:{ required },
    password_confirm:{ required },
    password: {
        required,
        minLength: minLength(6),
        containspasswordrequirement: helpers.withMessage(
          () => `the password requires an uppercase, lowercase, number and special character`,
          (value) => /(?=.*[a-z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(value)
        ),
      },
      password_confirm: { required, sameaspassword: sameAs(this.password) }
  }
},
mounted() {
  if (!this.user_info) {
    // Token exists in localStorage, redirect to dashboard
    this.$router.push('/login')

  } else {
    this.get_realation_student_data()
  }
},
methods: {
  nextStep() {
      this.step++

    },

    prevStep() {
      this.step --

    },

  async get_realation_student_data() {
    try {

      const response = await axios.get('http://localhost:8000/Api/get_realation_student_data',
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
       this.selectOptionsNationalities = response.data.student.nationality.map(item => ({ id: item.id, label: JSON.parse(item.Name).en }));
       this.selectOptionsBloods = response.data.student.blood.map(item => ({ id: item.id, label: item.Name }));
       this.selectOptionsReligions = response.data.student.religion.map(item => ({ id: item.id, label: JSON.parse(item.Name).en }));
       this.selectOptionsGenders = response.data.student.gender.map(item => ({ id: item.id, label: JSON.parse(item.Name).en }));
       this.selectOptionsParents = response.data.student.parent.map(item => ({ id: item.id, label: item.Name_Father_en }));
       this.selectOptionsGrades = response.data.student.grade.map(item => ({ id: item.id, label: item.name_en }));

      }
      }

      // handle success
    } catch (error) {
      console.error(error);
      // handle error
    }


  },
  async get_classroom(id) {
      try {

        const response = await axios.post('http://localhost:8000/Api/get_student_grade_classroom', {
          Items_show_number: 100,
          id: id

        },
          {
            headers: {
              'auth_token': this.userData.user.api_token,
              'api_password': "ase1iXcLAxanvXLZcgh6tk",
            }
          });
        if (response.data.classroom.length > 0) {
          this.classrooms = response.data.classroom
          this.selectOptionsClassrooms = response.data.classroom.map(item => ({ id: item.id, label: item.name_en }));
        } else {
          this.selectOptionsClassrooms = null
        }
        this.selectOptionsSections = []

        // handle success
      } catch (error) {
        console.error(error);
        // handle error
      }


    },
    async get_section(id) {
      try {

        const response = await axios.post('http://localhost:8000/Api/get_student_classroom_section', {
          Items_show_number: 100,
          id: id

        },
          {
            headers: {
              'auth_token': this.userData.user.api_token,
              'api_password': "ase1iXcLAxanvXLZcgh6tk",
            }
          });
        if (response.data.section.length > 0) {
          this.sections = response.data.section
          this.selectOptionsSections = response.data.section.map(item => ({ id: item.id, label: item.name_section_en }));
        } else {
          this.selectOptionsSections = null
        }
        // handle success
      } catch (error) {
        console.error(error);
        // handle error
      }


    },

    async get_mother(id) {
      try {

        const response = await axios.post('http://localhost:8000/Api/get_student_mother', {
          Items_show_number: 100,
          id: id

        },
          {
            headers: {
              'auth_token': this.userData.user.api_token,
              'api_password': "ase1iXcLAxanvXLZcgh6tk",
            }
          });
        if (response.data.mother.length > 0) {
          this.mothers = response.data.mother
          this.selectOptionsMothers = response.data.mother.map(item => ({ id: item.id, label: item.Name_Mother_en  }));
        } else {
          this.selectOptionsMothers = null
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
  async add_student() {
    this.v$.$validate();
    console.log(this.v$.$error)
    if (!this.v$.$error) {
      try {

    const formData = new FormData();
    formData.append("image",this.image);
    formData.append("attachment",this.attachment);
    formData.append("name_ar",this.name_ar);
    formData.append("name_en",this.name_en);
    formData.append("email",this.email_student);
    formData.append("password",this.password);
    formData.append("Date_Birth",this.Date_Birth);
    formData.append("nationalitie_id",this.nationalitie_id);
    formData.append("blood_id",this.blood_id);
    formData.append("gender_id",this.gender_id);
    formData.append("academic_year",this.academic_year);
    formData.append("Grade_id",this.Grade_id);
    formData.append("Classroom_id",this.Classroom_id);
    formData.append("parent_id",this.parent_id);
    formData.append("section_id",this.section_id);


        const response = await axios.post('http://localhost:8000/Api/add_student',formData,
          {
            headers: {
              'auth_token': this.userData.user.api_token,
              'api_password': "ase1iXcLAxanvXLZcgh6tk",

            }
          });


        if (response.data.succNum == 200 && response.data.status == true) {
          this.error_message =false;
          this.success_message = true;
          setTimeout(() => {
          this.success_message = false;
          this.name_ar=""
          this.name_en=""
          this.email_student=""
          this.password=""
          this.Date_Birth =""
          this.nationalitie_id=""
          this.blood_id =""
          this.gender_id=""
          this.academic_year=""
          this.Grade_id=""
          this.Classroom_id=""
          this.parent_id=""
          this.mother_id=""
          this.section_id=""
          this.v$.name_ar.$errors[0].$message = " "
          this.v$.name_en.$errors[0].$message = " "
          this.v$.email_student.$errors[0].$message = " "
          this.v$.password.$errors[0].$message = " "
          this.v$.password_confirm.$errors[0].$message = " "
          this.v$.blood_id .$errors[0].$message = " "
          this.v$.Date_Birth .$errors[0].$message = " "
          this.v$.nationalitie_id.$errors[0].$message = " "
          this.v$.gender_id.$errors[0].$message = " "
          this.v$.academic_year.$errors[0].$message = " "
          this.v$.Grade_id.$errors[0].$message = " "
          this.v$.Classroom_id.$errors[0].$message = " "
          this.v$.section_id.$errors[0].$message = " "
          this.v$.parent_id.$errors[0].$message = " "
          this.v$.mother_id.$errors[0].$message = " "

          }, 2000)

        } else {

          setTimeout(() => {
          this.error_message = response.data.msg
          this.success_message = false
          },2000)
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
