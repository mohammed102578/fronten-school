<script setup>
import { computed, ref } from 'vue'
import { useMainStore } from '@/stores/main'
import { mdiVectorSquareEdit, mdiCancel, mdiTrashCan, mdiVectorSquarePlus,mdiEye, mdiPlus,mdiAccountChildCircle} from '@mdi/js'
import CardBoxModalView from '@/components/CardBoxModalView.vue'
import CardBoxModalDelete from '@/components/CardBoxModalDelete.vue'
import CardBoxModalDeleteAll from '@/components/CardBoxModalDelete.vue'
import CardBox from '@/components/CardBox.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import axios from 'axios';
import useVuelidate from '@vuelidate/core';
import UserAvatar from '@/components/UserAvatar.vue'
import FormControl from '@/components/FormControl.vue'

import { required } from '@vuelidate/validators';
const isModalAddActive = ref(false)
const hasCancel = ref(true)

defineProps({
  checkable: Boolean
})

const selectOptionsCountStudent = [
  { id: 10, label: '10' },
  { id: 20, label: '20' },
  { id: 50, label: '50' },
  { id: 100, label: '100' }
]

</script>

<template>



<div :icon="mdiAccountStarOutline"   class="pr-2 pl-2">

<FormField style="width: 10%;display: inline-block;margin: 5px;">
        <FormControl rounded-full v-model="selectedValue" @change="get_students(this.get_students_url)"  :options="selectOptionsCountStudent" placeholder="" />
  </FormField>

  <FormField style="width: 25%;display: inline-block;margin: 5px;">
        <FormControl type="text" v-model="search_value" @input="get_students('http://localhost:8000/Api/search_student')" placeholder="Search items"  />
  </FormField>

  <FormField v-if="this.$i18n.locale=='ar'" style="width: 20%;display: inline-block;margin: 5px;">
    <FormControl v-model="section_id" :options="selectOptionsSections_ar" @change="get_students(this.get_students_url)" label="Select Student By Section" placeholder="" />
 </FormField>


 <FormField  v-if="this.$i18n.locale=='en'" style="width: 20%;display: inline-block;margin: 5px;">
    <FormControl v-model="section_id" :options="selectOptionsSections_en" @change="get_students(this.get_students_url)" label="Select Student By Section" placeholder="" />
 </FormField>



  <FormField style="width: 25%; display: inline-block;margin-bottom: -16px; float:inline-end" >
            <BaseButton x-lg  roundedFull class="button_custom mt-9" label="Create Student" :icon="mdiPlus" style="padding:10px;float:inline-end"
            @click="add_student()"  />
  </FormField>



</div>


  <CardBoxModalView v-model="isModalViewActive" title="Student Info" has-cancel>
    <CardBox :class="cardClass" >

<h1 style="font-weight: bold; color:#2ab331">{{ $t('Personal Info')}}</h1>
<table class="paren_info">
    <tbody>
      <tr>
        <td colspan="2" data-label="Name En ">
          <b> {{ $t('Name_en') }}</b>
        </td>

        <td data-label="Name Ar ">
         <b> {{ $t('Name_en') }}</b>
        </td>

        <td data-label="Email ">
        <b> {{ $t('Email') }}</b>
        </td>



      </tr>

      <tr>
        <td colspan="2" data-label=" Name En ">
          {{ this.name_en   }}
        </td>
        <td data-label=" Name Ar ">
          {{ this.name_ar  }}
        </td>
        <td data-label="Email ">
          {{ this.email  }}
        </td>


      </tr>
      <tr>
        <td data-label="Gender">
           <b>{{ $t('Gender') }} </b>
        </td>
        <td data-label="Date_Birth">
          <b>{{ $t('Date Birth') }}</b>
        </td>

        <td data-label="Blood Type ">
        <b>{{ $t('Blood Type') }}</b>
        </td>
        <td data-label="nationality_Name">
          <b>{{ $t('Nationality') }} </b>
        </td>

      </tr>

      <tr>
        <td data-label="Gender">
          {{ this.gender_Name  }}
        </td>
        <td data-label="Date_Birth  ">
          {{ this.Date_Birth    }}
        </td>
        <td data-label="Blood Type ">
          {{ this.blood_Name   }}
        </td>

        <td data-label="Nationality">
          {{ this.nationality_Name  }}
        </td>



      </tr>
    </tbody>
  </table>
<hr style="height: 5px;margin-top: 10px;font-weight: bolder;background-color: crimson;margin-bottom: 10px;"/>
<h1 style="font-weight: bold; color:#2ab331">{{ $t('Student Info') }}</h1>

<table class="paren_info">
    <tbody>
      <tr>
        <td data-label="Academic Year ">
          <b>{{ $t('Academic Year') }}</b>
        </td>

        <td data-label="Grade ">
        <b>{{ $t('Grade') }}</b>
        </td>

        <td data-label="Classroom ">
        <b>{{ $t('Classroom') }} </b>
        </td>

        <td data-label="Section">
           <b>{{ $t('Section') }}</b>
        </td>

        <td data-label="Parent">
         <b>{{ $t('Parent') }}</b>
        </td>
      </tr>

      <tr>
        <td data-label="Academic Year ">
          {{ this.academic_year   }}
        </td>
        <td data-label="Grade ">
          {{ this.grade_name_en  }}
        </td>
        <td data-label="Classroom ">
          {{ this.classroom_name_en  }}
        </td>
        <td data-label="Section">
          {{ this.section_name_section_en  }}
        </td>
        <td data-label="Parent">
          {{ this.parent_Name_Father_en  }}
        </td>
      </tr>
    </tbody>
  </table>

    </CardBox>

  </CardBoxModalView>




  <CardBoxModalDelete v-model="this.isModalDangerActive" title="Please confirm" button="danger" has-cancel>
    <div v-if="error_message.length > 0"  style="background-color:#dc1717;border-radius:10px; color:white"
      class=" border-red-500  px-3 py-6 md:py-3 mb-6 last:mb-0 border rounded-lg transition-colors duration-150">
      {{ this.error_message }}</div>

      <p>{{$t('Do you want to delete this item ?')}}</p>

    <BaseButtons>
      <BaseButton type="submit" style="background-color:#10ee52;border-radius:10px; color:white" label="Delete student"
        :icon="mdiTrashCan" @click="delete_item(this.student_id)" />

      <BaseButton v-if="hasCancel" @click="this.isModalDangerActive = false" label="Cancel" :icon="mdiCancel"
        style="background-color:#dc1717;border-radius:10px; color:white" outline />
    </BaseButtons>
  </CardBoxModalDelete>


  <CardBoxModalDeleteAll v-model="this.isModalDeleteAllActive" title="Please confirm" button="danger" has-cancel>
    <div v-if="error_message.length > 0"
      class=" border-red-500 text-white px-3 py-6 md:py-3 mb-6 last:mb-0 border rounded-lg transition-colors duration-150">
      {{ this.error_message }}</div>

      <p>{{$t('Do you want to delete these items ?')}}</p>
    <BaseButtons>
      <BaseButton type="submit" style="background-color:#10ee52;border-radius:10px; color:white" label="Delete students"
        :icon="mdiTrashCan" @click="delete_all()" />

      <BaseButton v-if="hasCancel" @click="this.isModalDeleteAllActive = false" label="Cancel" :icon="mdiCancel"
        style="background-color:#dc1717;border-radius:10px; color:white" outline />
    </BaseButtons>
  </CardBoxModalDeleteAll>



  <table v-if="this.students.length > 0">
    <thead class="title_page">
      <tr>
        <th v-if="checkable">

          <BaseButton color="danger" label="" :icon="mdiTrashCan" small @click="check_delete()" />
        </th>
        <th>{{$t('Index')}} </th>
        <th></th>
        <th>{{$t('Name')}}</th>
        <th>{{$t('Parent Phone')}}</th>
        <th>{{$t('Grade')}}</th>
        <th>{{$t('Classroom')}}</th>
        <th>{{$t('Section')}}</th>
        <th>{{$t('Action')}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(student, index) in this.students" :key="student.id">
        <TableCheckboxCell v-if="checkable" @checked="checked($event, student.id)" />
        <td>{{ index + 1 }}</td>
        <td class="border-b-0 lg:w-6 before:hidden">
          <UserAvatar :avatar="'http://localhost:8000/'+student.image" :username="image" class="w-50 h-50 mx-auto lg:w-12 lg:h-12" />
        </td>

        <td data-label="Create" class="lg:w-1 whitespace-nowrap">
          {{this.$i18n.locale=='en' ? student.name_en : student.name_ar}}
        </td>

        <td data-label="Parent phone">
          {{ student.parent.Phone_Father  }}
        </td>




        <td data-label="Create" class="lg:w-1 whitespace-nowrap">
            <span class="student_info" style="background-color:rgb(85, 191, 223)">{{   student.grade.name_en}}</span>
            </td>
            <td data-label="Create" class="lg:w-1 whitespace-nowrap">

            <span class="student_info" style="background-color:rgb(85, 223, 131)">{{ student.classroom.name_en }}</span>
             </td>
            <td data-label="Create" class="lg:w-1 whitespace-nowrap">

            <span class="student_info" style="background-color:rgb(223, 85, 112)">{{ student.section.name_section_en }}</span>
        </td>

        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end " style="margin:0px" no-wrap>
            <BaseButton color="success" :icon="mdiEye" small :title="'Show Student Info'"
            @click="show_student(student.email, student.name_en , student.name_ar,
             student.Date_Birth,student.academic_year,student.gender.Name,student.grade.name_en,
             student.nationality.Name,student.blood.Name,student.classroom.name_en,student.section.name_section_en,
             student.parent.Name_Father_en)" />
              <BaseButton color="info" :icon="mdiVectorSquareEdit" small :title="'Edit student'"
              @click="edit_student(student.id)" />
            <BaseButton color="danger" :icon="mdiTrashCan" :title="'Delete student'" small @click="delete_student(student.id)" />
          </BaseButtons>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-else style="margin:50px"
    class=" border-red-500 bg-red-500 text-white px-3 py-6 md:py-3 mb-6 last:mb-0 border rounded-lg transition-colors duration-150">
   {{ $t('No Data Found') }}</div>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton v-if="this.data_paginate.next_page_url != null " :label="'Next Page'" style="border: solid 2px #ede9e9;"
          small @click="get_students(this.data_paginate.next_page_url)" />


          <BaseButton v-if="this.data_paginate.prev_page_url != null " :label="'prev Page'" style="border: solid 2px #ede9e9;"
          small @click="get_students(this.data_paginate.prev_page_url)" />


          <BaseButton v-if="this.data_paginate.last_page_url != null " :label="'Last Page'" style="border: solid 2px #ede9e9;"
          small @click="get_students(this.data_paginate.last_page_url)" />


        </BaseButtons>
          <small>Page {{ this.data_paginate.current_page }} of {{ this.data_paginate.last_page }}</small>
    </BaseLevel>
  </div>
</template>

<script>


export default {

  data() {
    return {
      selectedValue: '',
      students: [],
      api_password: 'ase1iXcLAxanvXLZcgh6tk',
      v$: useVuelidate(),
      search_value:'',
      user_info: localStorage.getItem('user_info') || '',
      error_message: '',
      success_message: false,
      student_id: '',
      isModalDangerActive: false,
      isModalViewActive: false,
      checkedRows: [],
      isModalDeleteAllActive: false,
      index_id: 0,
      pagesList:[],
      last_page:"",
      numberpage:2,
      data_paginate:[],
      get_students_url:"http://localhost:8000/Api/get_students?page=1",
      email:'',
      name_en:'',
      name_ar :'',
      Date_Birth:'',
      academic_year:'',
      gender_Name :'',
      grade_name_en :'',
      blood_Name :'',
      classroom_name_en :'',
      section_name_section_en :'',
      parent_Name_Father_en :'',
      nationality_Name :'',
      section_id:null,
      selectOptionsSections_ar:" ",
      selectOptionsSections_en:" ",


    }
  },
  computed:{
 userData:function(){
  return JSON.parse(this.user_info)
 },
 pageList:function(){

for (let i = 0; i < this.data_paginate.last_page; i++) {
  this.pagesList.push(i)
}

return this.pagesList
 }
  },
  validations() {
    return {
      name_en: { required },
      name_ar: { required },
      notes: { required },
    }
  },
  mounted() {
    if (!this.user_info) {
      // Token exists in localStorage, redirect to dashboard
      this.$router.push('/login')

    } else {
      this.get_students(this.get_students_url)
      this.get_realation_student_data()
    }
  },
  methods: {

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


             this.selectOptionsSections_en = response.data.student.section.map(item => ({ id: item.id, label:
         item.my_classs.name_en+'/'+item.name_section_en  }));

             this.selectOptionsSections_ar = response.data.student.section.map(item => ({ id: item.id, label:
         item.my_classs.name_ar+'/'+item.name_section_ar   }));



      }
      }

      // handle success
    } catch (error) {
      console.error(error);
      // handle error
    }


  },
    async get_students(url) {
      try {

        const response = await axios.post(url, {
            search:this.search_value,
            Items_show_number: this.selectedValue,
            section_id:this.section_id

        },
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
          if (response.data.student.data.length > 0) {
          this.students = response.data.student.data
          this.data_paginate.last_page=response.data.student.last_page
          this.data_paginate.current_page=response.data.student.current_page
          this.data_paginate.total=response.data.student.total
          this.data_paginate.from=response.data.student.from
          this.data_paginate.to=response.data.student.to
          this.data_paginate.last_page_url=response.data.student.last_page_url
          this.data_paginate.next_page_url=response.data.student.next_page_url
          this.data_paginate.prev_page_url=response.data.student.prev_page_url
        }
        if(response.data.student.total==0){
          this.students=[]
        }
        }

        // handle success
      } catch (error) {
        console.error(error);
        // handle error
      }


    },
    delete_student(value) {
      this.isModalDangerActive = true
      this.student_id = value
    },
    async delete_item(value) {
      try {
      const response = await axios.delete(`http://localhost:8000/Api/delete_student?id=${value}`, {
          headers: {
            'auth_token': this.userData.user.api_token,
            'api_password': this.api_password
          }
        });


        if (response.data.succNum == 200 && response.data.status == true && response.data.student) {
          this.error_message = response.data.msg;
          this.get_students(this.get_students_url)
          this.pageList.length = 0
          this.error_message = '';
          this.success_message = response.data.msg;
          setTimeout(() => {
            this.isModalDangerActive = false
            this.success_message = false;
          }, 2000)
        } else {
          this.error_message = response.data.msg;
          this.students=[]
          this.pageList.length = 0
          this.error_message = '';
          this.success_message = response.data.msg;
          setTimeout(() => {
            this.isModalDangerActive = false
            this.success_message = false;
          }, 2000)
        }
        // handle success
      } catch (error) {
        console.error(error);
        // handle error
      }


    },
    async add_student() {
      this.v$.$validate();
      if (!this.v$.$error) {
        try {
          const response = await axios.post('http://localhost:8000/Api/add_student', {

            name_en: this.name_en,
            name_ar: this.name_ar,
            notes: this.notes,
          },
            {
              headers: {
                'auth_token': this.userData.user.api_token,
                'api_password': "ase1iXcLAxanvXLZcgh6tk",

              }
            });


          if (response.data.succNum == 200 && response.data.status == true) {
            this.pageList.length=0
            this.get_students(this.get_students_url)
            this.error_message = '';
            this.success_message = true;
            setTimeout(() => {
              this.success_message = false;
              this.notes = '';
              this.name_ar = '';
              this.name_en = '';
              this.v$.name_ar.$errors[0].$message = " "
              this.v$.name_en.$errors[0].$message = " "
              this.v$.notes.$errors[0].$message = " "

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
    edit_student(id) {
      this.student_id = id
      this.$router.push({name:'students_edit',params:{id:this.student_id}})
    },
    add_student() {
      this.$router.push({name:'students_create'})
    },
    async update_student() {
      //console.log(this.userData.user.api_token)
      this.v$.$validate();
      if (!this.v$.$error) {
        try {
          const response = await axios.post('http://localhost:8000/Api/update_student', {

            name_en: this.name_en,
            name_ar: this.name_ar,
            notes: this.notes,
            id: this.student_id,

          },
            {
              headers: {
                'auth_token': this.userData.user.api_token,
                'api_password': "ase1iXcLAxanvXLZcgh6tk",
              }
            });
          if (response.data.succNum == 200 && response.data.status == true) {
                        this.get_students(this.get_students_url)

            this.error_message = '';
            this.success_message = true;
            setTimeout(() => {
              this.success_message = false;
              this.v$.name_ar.$errors[0].$message = " "
              this.v$.name_en.$errors[0].$message = " "
              this.v$.notes.$errors[0].$message = " "
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
    check_delete() {
      this.isModalDeleteAllActive = true
    },
    //remove check from item
    remove(student_id) {
      let index = this.checkedRows.indexOf(student_id);
      if (index !== -1) {
        this.checkedRows.splice(index, 1);
        return this.checkedRows
      }
    },
    checked(isChecked, student_id) {
      if (isChecked) {
        this.checkedRows.push(student_id)
        console.log(this.checkedRows)

      } else {
        this.checkedRows = this.remove(student_id)
      }
    },
    async delete_all() {
      try {
        const response = await axios.post('http://localhost:8000/Api/student_delete_all', {
          students_id: this.checkedRows,
        },
          {
            headers: {
              'auth_token': this.userData.user.api_token,
              'api_password': "ase1iXcLAxanvXLZcgh6tk",
            }
          });
        if (response.data.succNum == 200 && response.data.status == true && response.data.student) {
          this.get_students(this.get_students_url)
          this.pageList.length = 0
          this.error_message = '';
          this.success_message = response.data.msg;
          setTimeout(() => {
            this.get_students(this.get_students_url)
            this.isModalDeleteAllActive = false
            this.success_message = false;

          }, 2000)

        } else {
          this.error_message = response.data.msg;
          this.students=[]
          this.pageList.length = 0
          this.error_message = '';
          this.success_message = response.data.msg;
          setTimeout(() => {
            this.isModalDeleteAllActive = false
            this.success_message = false;

          }, 2000)
        }
        // handle success
      } catch (error) {
        console.error(error);
        // handle error
      }



    },
    show_student(email,name_en , name_ar,Date_Birth,academic_year,gender_Name,grade_name_en,
             nationality_Name,blood_Name,classroom_name_en,section_name_section_en,
             parent_Name_Father_en) {

    this.isModalViewActive = true

    this.email=email
    this.name_en=name_en
    this.name_ar =name_ar
    this.Date_Birth=Date_Birth
    this.academic_year=academic_year
    this.gender_Name =JSON.parse(gender_Name).en
    this.grade_name_en =grade_name_en
    this.blood_Name =blood_Name
    this.classroom_name_en =classroom_name_en
    this.section_name_section_en =section_name_section_en
    this.parent_Name_Father_en =parent_Name_Father_en
    this.nationality_Name =JSON.parse(nationality_Name).en

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
.paren_info{
  border-collapse: separate;
  border-spacing: px;
}
.student_info > td{
  padding:5px;
}

.student_info{
  color:white;
  border-radius: 10px;
  padding:5px;
  margin:3px;
  font-size:13px;
}
</style>
