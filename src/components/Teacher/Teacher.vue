<script setup>
import { computed, ref } from 'vue'
import { useMainStore } from '@/stores/main'
import { mdiVectorSquareEdit, mdiCancel, mdiTrashCan, mdiAttachmentPlus, mdiEye, mdiAccountChildCircle ,mdiPlus,mdiUpdate } from '@mdi/js'
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
import { required } from '@vuelidate/validators';
import UserAvatar from '@/components/UserAvatar.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'

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
        <FormControl rounded-full v-model="selectedValue" @change="get_teachers(this.get_teachers_url)"  :options="selectOptionsCountStudent"  />
  </FormField>

  <FormField style="width: 25%;display: inline-block;margin: 5px;">
        <FormControl type="text" v-model="search_value" @input="get_teachers('http://localhost:8000/Api/search_teacher')" placeholder="Search items"  />
  </FormField>


  <FormField style="width: 25%; display: inline-block;margin-bottom: -16px; float:inline-end" >
            <BaseButton x-lg  roundedFull class="button_custom mt-2" label="Create Teacher" :icon="mdiPlus" style="padding:10px;float:inline-end" to="teachers_create"  />
  </FormField>



</div>


  <CardBoxModalView v-model="isModalViewTeacherActive" title="Teacher Info" has-cancel>
    <CardBox :class="cardClass">

      <h1 style="font-weight: bold; color:#2ab331">{{$t('Personal Info')}}</h1>
      <table class="personal Info">
        <tbody>
          <tr>
            <td data-label="Name En ">
              <b>   {{$t('Name_en')}}</b>
            </td>

            <td data-label="Name Ar ">
              <b>  {{$t('Name_ar')}}</b>
            </td>

            <td colspan="2">
              <b>  {{$t('Email')}}</b>
            </td>

          </tr>

          <tr>
            <td data-label=" Name En ">
              {{ this.name_en }}
            </td>
            <td data-label=" Name Ar ">
              {{ this.name_ar }}
            </td>

            <td colspan="2">
              {{ this.email_Teacher }}
            </td>

          </tr>
          <tr>
            <td data-label="National_ID ">
              <b>  {{$t('National_ID')}}</b>
            </td>

            <td data-label="Phone">
              <b>  {{$t('Phone')}}</b>
            </td>


            <td data-label="Gender">
              <b> {{$t('Gender')}}</b>
            </td>

            <td data-label="Address">
              <b> {{$t('Address')}}</b>
            </td>
          </tr>

          <tr>
            <td data-label="National_ID ">
              {{ this.National_ID }}
            </td>

            <td data-label="Phone">
              {{ this.phone }}
            </td>

            <td data-label="Gender">
              {{ this.gender }}
            </td>

            <td data-label="Address">
              {{ this.address }}
            </td>
          </tr>
        </tbody>
      </table>
      <hr style="height: 5px;margin-top: 10px;font-weight: bolder;background-color: crimson;margin-bottom: 10px;" />
      <h1 style="font-weight: bold; color:#2ab331">{{$t('Teacher Info')}}</h1>

      <table class="teacher_info">
        <tbody>
          <tr>
            <td data-label="Joining_Date ">
              <b> {{$t('Joining_Date')}}</b>
            </td>
            <td data-label="Nationality ">
              <b>  {{$t('Nationality')}}</b>
            </td>

            <td data-label="Religion">
              <b>  {{$t('Religion')}}</b>
            </td>
          </tr>

          <tr>
            <td data-label="Joining_Date">
              {{ this.Joining_Date }}
            </td>
            <td data-label="Nationality ">
              {{ this.Nationality_name }}
            </td>

            <td data-label="Religion">
              {{ this.Religion }}
            </td>

          </tr>
          <tr>
            <td data-label="Specialization">
              <b> {{$t('Specialization')}}</b>
            </td>
            <td data-label="Bank Account">
              <b> {{$t('Bank Account')}}</b>
            </td>
            <td data-label="Blood Type ">
              <b> {{$t('Blood Type')}}</b>
            </td>

          </tr>
          <tr>
            <td data-label="Specialization">
              {{ this.Specialization }}
            </td>
            <td data-label="bank_account  ">
              {{ this.bank_account  }}
            </td>
            <td data-label="Blood Type">
              {{ this.Blood_Type }}
            </td>

          </tr>
        </tbody>
      </table>

    </CardBox>

  </CardBoxModalView>



  <CardBoxModalView v-model="isModalViewStudentsActive" title="Students" has-cancel>
    <CardBox :class="cardClass">

      <table  v-if="this.students.length > 0" class="teacher_info">
        <thead class="page_title">
          <tr>
            <th>{{$t('Index')}} </th>
            <th></th>
            <th>{{$t('Name')}}</th>
            <th>{{$t('Email')}}</th>
            <th>{{$t('Date Birth')}}</th>
            <th>{{$t('Grade')}}</th>
            <th>{{$t('Classroom')}}</th>
            <th>{{$t('Section')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in this.students" :key="student.id">
            <td>{{ index + 1 }}</td>
            <td class="border-b-0 lg:w-6 before:hidden">
          <UserAvatar :avatar="'http://localhost:8000/'+student.image" :username="image" class="w-50 h-50 mx-auto lg:w-12 lg:h-12" />
        </td>
        <td data-label="Name">
          {{  this.$i18n.locale=='en' ? student.name_en : student.name_ar }}
        </td>

            <td data-label="Email">
              {{ student.email }}
            </td>
            <td data-label=" Date Birth ">
              {{ student.Date_Birth }}
            </td>

            <td  class="lg:w-1 whitespace-nowrap">
              <span class="student_info" style="background-color:rgb(85, 191, 223)">{{ this.$i18n.locale=='en' ? student.grade.name_en : student.grade.name_ar  }}</span>

            </td>
              <td  class="lg:w-1 whitespace-nowrap">
                <span class="student_info" style="background-color:rgb(85, 223, 131)">{{this.$i18n.locale=='en' ? student.classroom.name_en : student.classroom.name_ar  }}</span>

              </td>
                <td  class="lg:w-1 whitespace-nowrap">

              <span class="student_info" style="background-color:rgb(223, 85, 112)">{{this.$i18n.locale=='en' ? student.section.name_section_en : student.section.name_section_ar }}</span>

            </td>

          </tr>
        </tbody>
      </table>
      <div v-else style="margin:50px"
        class=" border-red-500 bg-red-500 text-white px-3 py-6 md:py-3 mb-6 last:mb-0 border rounded-lg transition-colors duration-150">
        {{ $t('No Data Found') }}</div>
    </CardBox>

  </CardBoxModalView>


  <CardBoxModalDelete v-model="this.isModalDangerActive" title="Please confirm" button="danger" has-cancel>
    <div v-if="error_message.length > 0"  style="background-color:#dc1717;border-radius:10px; color:white"
      class=" border-red-500  px-3 py-6 md:py-3 mb-6 last:mb-0 border rounded-lg transition-colors duration-150">
       {{$t('Some thing went wrong')}}</div>

      <p>{{$t('Do you want to delete this item ?')}}</p>
    <BaseButtons>
      <BaseButton type="submit" style="background-color:#10ee52;border-radius:10px; color:white" label="Yes, Delete Item"
        :icon="mdiTrashCan" @click="delete_item(this.teacher_id)" />

      <BaseButton v-if="hasCancel" @click="this.isModalDangerActive = false" label="Cancel" :icon="mdiCancel"
        style="background-color:#dc1717;border-radius:10px; color:white" outline />
    </BaseButtons>
  </CardBoxModalDelete>

  <CardBoxModalDeleteAll v-model="this.isModalDeleteAllActive" title="Please confirm" button="danger" has-cancel>
    <div v-if="error_message.length > 0"
      class=" border-red-500 text-white px-3 py-6 md:py-3 mb-6 last:mb-0 border rounded-lg transition-colors duration-150">
       {{$t('Some thing went wrong')}}</div>

    <p>{{$t('Do you want to delete these items ?')}}</p>
    <BaseButtons>
      <BaseButton type="submit" style="background-color:#10ee52;border-radius:10px; color:white" label="Yes, Delete Items"
        :icon="mdiTrashCan" @click="delete_all()" />

      <BaseButton v-if="hasCancel" @click="this.isModalDeleteAllActive = false" label="Cancel" :icon="mdiCancel"
        style="background-color:#dc1717;border-radius:10px; color:white" outline />
    </BaseButtons>
  </CardBoxModalDeleteAll>


  <table v-if="this.teachers.length > 0">
    <thead class="title_page">
      <tr>
        <th v-if="checkable">

          <BaseButton color="danger" label="" :icon="mdiTrashCan" small @click="check_delete()" />
        </th>
        <th>{{$t('Index')}} </th>
        <th></th>
        <th>{{$t('Name')}}</th>
        <th>{{$t('Email')}}</th>
        <th>{{$t('Phone')}}</th>
        <th>{{$t('Specialization')}}</th>
        <th>{{$t('Action')}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(teacher, index) in this.teachers" :key="teacher.id">
        <TableCheckboxCell v-if="checkable" @checked="checked($event, teacher.id)" />
        <td>{{ index + 1 }}</td>
        <td class="border-b-0 lg:w-6 before:hidden">
          <UserAvatar :avatar="'http://localhost:8000/'+teacher.image" :username="image" class="w-50 h-50 mx-auto lg:w-12 lg:h-12" />
        </td>
        <td data-label="Name">
          {{  this.$i18n.locale=='en' ? teacher.name_en : teacher.name_ar }}
        </td>
        <td data-label="Name">
          {{ teacher.email }}
        </td>

        <td data-label="Phone">
          {{ teacher.phone }}
        </td>




        <td data-label="Create" class="lg:w-1 whitespace-nowrap">
          {{  this.$i18n.locale=='en' ? teacher.specialization.name_en : teacher.specialization.name_ar }}
        </td>

        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end " style="margin:0px" no-wrap>
            <BaseButton color="success" :title="'Show Teacher Info'" :icon="mdiEye" small
              @click="show_teacher(teacher.email,
                    teacher.name_en,
                    teacher.name_ar,
                    this.$i18n.locale=='en' ? teacher.specialization.name_en : teacher.specialization.name_ar,
                    teacher.National_ID,
                    teacher.phone,
                    teacher.gender.Name,
                    teacher.address,
                    teacher.Joining_Date,
                    teacher.bank_account,
                    teacher.nationality.Name,
                    teacher.blood.Name,
                    teacher.religion.Name)" />

            <BaseButton color="warning" :icon="mdiAccountChildCircle" :title="'Show Teacher\'s Student'" small @click="show_students(teacher.student)" />
            <BaseButton color="info" :icon="mdiVectorSquareEdit" :title="'Edit Teacher '" small @click="edit_teacher(teacher.id)" />
            <BaseButton color="danger" :icon="mdiTrashCan" :title="'Delete Teacher '" small @click="delete_teacher(teacher.id)" />
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
        <BaseButton v-if="this.data_paginate.next_page_url != null" :label="'Next Page '"
          style="border: solid 2px #ede9e9;" small @click="get_teachers(this.data_paginate.next_page_url)" />


        <BaseButton v-if="this.data_paginate.prev_page_url != null" :label="'prev Page '"
          style="border: solid 2px #ede9e9;" small @click="get_teachers(this.data_paginate.prev_page_url)" />


        <BaseButton v-if="this.data_paginate.last_page_url != null" :label="'Last Page '"
          style="border: solid 2px #ede9e9;" small @click="get_teachers(this.data_paginate.last_page_url)" />


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
      teachers: [],
      api_password: 'ase1iXcLAxanvXLZcgh6tk',
      v$: useVuelidate(),
      search_value: '',
      user_info: localStorage.getItem('user_info') || '',
      error_message: '',
      success_message: false,
      teacher_id: '',
      isModalDangerActive: false,
      isModalViewTeacherActive: false,
      isModalViewStudentsActive: false,
      checkedRows: [],
      isModalDeleteAllActive: false,
      index_id: 0,
      pagesList: [],
      last_page: "",
      numberpage: 2,
      data_paginate: [],
      get_teachers_url: "http://localhost:8000/Api/get_teachers?page=1",
      name_en: '',
      name_ar: '',
      National_ID: '',
      email_Teacher: '',
      gender: '',
      address: '',
      phone: '',
      Nationality_name: '',
      Blood_Type: '',
      Religion: '',
      Joining_Date: '',
      Specialization: '',
      bank_account: '',
      students: [],


    }
  },
  computed: {
    userData: function () {
      return JSON.parse(this.user_info)
    },
    pageList: function () {

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
      this.get_teachers(this.get_teachers_url)
    }
  },
  methods: {


    async get_teachers(url) {
      try {

        const response = await axios.post(url, {
          search: this.search_value,
          Items_show_number: this.selectedValue

        },
          {
            headers: {
              'auth_token': this.userData.user.api_token,
              'api_password': "ase1iXcLAxanvXLZcgh6tk",
            }
          });
        if (response.data.status == false && response.data.errNum == 401) {
          localStorage.clear()
          this.$router.push('/login')
        } else {
          if (response.data.teacher.data.length > 0) {
            this.teachers = response.data.teacher.data
            this.data_paginate.last_page = response.data.teacher.last_page
            this.data_paginate.current_page = response.data.teacher.current_page
            this.data_paginate.total = response.data.teacher.total
            this.data_paginate.from = response.data.teacher.from
            this.data_paginate.to = response.data.teacher.to
            this.data_paginate.last_page_url = response.data.teacher.last_page_url
            this.data_paginate.next_page_url = response.data.teacher.next_page_url
            this.data_paginate.prev_page_url = response.data.teacher.prev_page_url
          }
        }

        // handle success
      } catch (error) {
        console.error(error);
        // handle error
      }


    },
    delete_teacher(value) {
      this.isModalDangerActive = true
      this.teacher_id = value
    },
    async delete_item(value) {
      try {
        const response = await axios.delete(`http://localhost:8000/Api/delete_teacher?id=${value}`, {
          headers: {
            'auth_token': this.userData.user.api_token,
            'api_password': this.api_password
          }
        });


        if (response.data.succNum == 200 && response.data.status == true && response.data.teacher) {
          this.error_message = response.data.msg;
          this.get_teachers(this.get_teachers_url)
          this.pageList.length = 0
          this.error_message = '';
          this.success_message = response.data.msg;
          setTimeout(() => {
            this.isModalDangerActive = false
            this.success_message = false;
          }, 2000)
        } else {
          this.error_message = response.data.msg;
          this.teachers = []
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

    check_delete() {
      this.isModalDeleteAllActive = true
    },
    //remove check from item
    remove(teacher_id) {
      let index = this.checkedRows.indexOf(teacher_id);
      if (index !== -1) {
        this.checkedRows.splice(index, 1);
        return this.checkedRows
      }
    },
    checked(isChecked, teacher_id) {
      if (isChecked) {
        this.checkedRows.push(teacher_id)
        console.log(this.checkedRows)

      } else {
        this.checkedRows = this.remove(teacher_id)
      }
    },
    async delete_all() {
      try {
        const response = await axios.post('http://localhost:8000/Api/teacher_delete_all', {
          teachers_id: this.checkedRows,
        },
          {
            headers: {
              'auth_token': this.userData.user.api_token,
              'api_password': "ase1iXcLAxanvXLZcgh6tk",
            }
          });
        if (response.data.succNum == 200 && response.data.status == true && response.data.teacher) {
          this.get_teachers(this.get_teachers_url)
          this.pageList.length = 0
          this.error_message = '';
          this.success_message = response.data.msg;
          setTimeout(() => {
            this.get_teachers(this.get_teachers_url)
            this.isModalDeleteAllActive = false
            this.success_message = false;

          }, 2000)

        } else {
          this.error_message = response.data.msg;
          this.teachers = []
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
    show_teacher(email,name_en,name_ar,specialization,National_ID,phone,gender,address,Joining_Date,bank_account,nationality,blood,religion)
      {
    this.isModalViewTeacherActive = true



      this.email_Teacher=email
      this.name_en = name_en
      this.name_ar = name_ar
      this.Specialization = specialization
      this.National_ID = National_ID
      this.phone = phone
      this.gender =  this.$i18n.locale=='en' ? JSON.parse(gender).en: JSON.parse(gender).ar
      this.address = address
      this.Joining_Date = Joining_Date
      this.bank_account = bank_account
      this.Religion =  this.$i18n.locale=='en' ? JSON.parse(religion).en: JSON.parse(religion).ar
      this.Blood_Type = blood
      this.Nationality_name =  this.$i18n.locale=='en' ? JSON.parse(nationality).en: JSON.parse(nationality).ar
      this.Address_Father = Address_Father



    },

    show_students(students) {

      this.isModalViewStudentsActive = true

      this.students = students


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

.teacher_info {
  border-collapse: separate;
  border-spacing: px;
}

.teacher_info>td {
  padding: 5px;
}

.student_info {
  color: white;
  border-radius: 10px;
  padding: 5px;
  margin: 3px;
  font-size: 13px;
}</style>
