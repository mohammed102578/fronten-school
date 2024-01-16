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
        <FormControl rounded-full v-model="selectedValue" @change="get_parents(this.get_parents_url)"  :options="selectOptionsCountStudent"  />
  </FormField>

  <FormField style="width: 25%;display: inline-block;margin: 5px;">
        <FormControl type="text" v-model="search_value" @input="get_parents('http://localhost:8000/Api/search_parent')" placeholder="Search items"  />
  </FormField>


  <FormField style="width: 25%; display: inline-block;margin-bottom: -16px; float:inline-end" >
            <BaseButton x-lg  roundedFull class="button_custom mt-2" label="Create Guardian" :icon="mdiPlus" style="padding:10px;float:inline-end" to="guardians_create"  />
  </FormField>



</div>


  <CardBoxModalView v-model="isModalViewParentActive" title="Parent Info" has-cancel>
    <CardBox :class="cardClass">

      <h1 style="font-weight: bold; color:#2ab331">{{$t('Guardian Info')}}</h1>
      <table class="paren_info">
        <tbody>
          <tr>
            <td data-label="Name En ">
              <b>   {{$t('Name_en')}}</b>
            </td>

            <td data-label="Name Ar ">
              <b>  {{$t('Name_ar')}}</b>
            </td>

            <td data-label="National_ID ">
              <b>  {{$t('National_ID')}}</b>
            </td>

            <td data-label="Passport_ID">
              <b>  {{$t('Passport_ID')}}</b>
            </td>

            <td data-label="Phone">
              <b>  {{$t('Phone')}}</b>
            </td>
          </tr>

          <tr>
            <td data-label=" Name En ">
              {{ this.Name_Father_en }}
            </td>
            <td data-label=" Name Ar ">
              {{ this.Name_Father_ar }}
            </td>
            <td data-label="National_ID ">
              {{ this.National_ID_Father }}
            </td>
            <td data-label="Passport_ID">
              {{ this.Passport_ID_Father }}
            </td>
            <td data-label="Phone">
              {{ this.Phone_Father }}
            </td>
          </tr>
          <tr>
            <td data-label="Job  ">
              <b> {{$t('Job')}}</b>
            </td>
            <td data-label="Nationality ">
              <b>  {{$t('Nationality')}}</b>
            </td>
            <td data-label="Blood Type ">
              <b>  {{$t('Blood Type')}}</b>
            </td>
            <td data-label="Religion">
              <b>  {{$t('Religion')}}</b>
            </td>
            <td data-label="Address">
              <b> {{$t('Address')}}</b>
            </td>
          </tr>
          <tr>
            <td data-label="Job  ">
              {{ this.Job_Father }}
            </td>
            <td data-label="Nationality ">
              {{ this.Nationality_Father_id }}
            </td>
            <td data-label="Blood Type ">
              {{ this.Blood_Type_Father_id }}
            </td>
            <td data-label="Religion">
              {{ this.Religion_Father_id }}
            </td>

            <td data-label="Address Father">
              {{ this.Address_Father }}
            </td>
          </tr>
        </tbody>
      </table>
      <hr style="height: 5px;margin-top: 10px;font-weight: bolder;background-color: crimson;margin-bottom: 10px;" />
      <h1 style="font-weight: bold; color:#2ab331">{{$t('Mother Info')}}</h1>

      <table class="paren_info">
        <tbody>
          <tr>
            <td data-label="Name En ">
              <b> {{$t('Name_en')}}</b>
            </td>

            <td data-label="Name Ar ">
              <b>{{$t('Name_ar')}}</b>
            </td>

            <td data-label="National_ID ">
              <b> {{$t('National_ID')}}</b>
            </td>

            <td data-label="Passport_ID">
              <b>{{$t('Passport_ID')}}</b>
            </td>

            <td data-label="Phone">
              <b>  {{$t('Phone')}}</b>
            </td>
          </tr>

          <tr>
            <td data-label="Name_en">
              {{ this.Name_Mother_en }}
            </td>
            <td data-label="Name_ar ">
              {{ this.Name_Mother_ar }}
            </td>
            <td data-label="National_ID ">
              {{ this.National_ID_Mother }}
            </td>
            <td data-label="Passport_ID">
              {{ this.Passport_ID_Mother }}
            </td>
            <td data-label="Phone">
              {{ this.Phone_Mother }}
            </td>
          </tr>
          <tr>
            <td data-label="Job  ">
              <b> {{$t('Job')}}</b>
            </td>
            <td data-label="Nationality ">
              <b> {{$t('Nationality')}}</b>
            </td>
            <td data-label="Blood Type ">
              <b> {{$t('Blood Type')}}</b>
            </td>
            <td data-label="Religion">
              <b>  {{$t('Religion')}}</b>
            </td>
            <td data-label="Address">
              <b> {{$t('Address')}}</b>
            </td>
          </tr>
          <tr>
            <td data-label="Job  ">
              {{ this.Job_Mother }}
            </td>
            <td data-label="Nationality ">
              {{ this.Nationality_Mother_id }}
            </td>
            <td data-label="Blood Type">
              {{ this.Blood_Type_Mother_id }}
            </td>
            <td data-label="Religion">
              {{ this.Religion_Mother_id }}
            </td>

            <td data-label="Address">
              {{ this.Address_Mother }}
            </td>
          </tr>
        </tbody>
      </table>

    </CardBox>

  </CardBoxModalView>



  <CardBoxModalView v-model="isModalViewStudentsActive" title="Students" has-cancel>
    <CardBox :class="cardClass">

      <table  v-if="this.students.length > 0" class="parent_info">
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
    <div v-if="error_message.length > 0" style="background-color:#dc1717;border-radius:10px; color:white"
      class=" border-red-500  px-3 py-6 md:py-3 mb-6 last:mb-0 border rounded-lg transition-colors duration-150">
      {{ this.error_message }}</div>

    <p>Do you want to delete this item ?</p>
    <BaseButtons>
      <BaseButton type="submit" style="background-color:#10ee52;border-radius:10px; color:white" label="Delete parent"
        :icon="mdiTrashCan" @click="delete_item(this.parent_id)" />

      <BaseButton v-if="hasCancel" @click="this.isModalDangerActive = false" label="Cancel" :icon="mdiCancel"
        style="background-color:#dc1717;border-radius:10px; color:white" outline />
    </BaseButtons>
  </CardBoxModalDelete>


  <CardBoxModalDeleteAll v-model="this.isModalDeleteAllActive" title="Please confirm" button="danger" has-cancel>
    <div v-if="error_message.length > 0"
      class=" border-red-500 text-white px-3 py-6 md:py-3 mb-6 last:mb-0 border rounded-lg transition-colors duration-150">
      {{ this.error_message }}</div>

    <p>Do you want to delete these items ?</p>
    <BaseButtons>
      <BaseButton type="submit" style="background-color:#10ee52;border-radius:10px; color:white" label="Delete parents"
        :icon="mdiTrashCan" @click="delete_all()" />

      <BaseButton v-if="hasCancel" @click="this.isModalDeleteAllActive = false" label="Cancel" :icon="mdiCancel"
        style="background-color:#dc1717;border-radius:10px; color:white" outline />
    </BaseButtons>
  </CardBoxModalDeleteAll>



  <table v-if="this.parents.length > 0">
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
        <th>{{$t('Created_at')}}</th>
        <th>{{$t('Action')}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(parent, index) in this.parents" :key="parent.id">
        <TableCheckboxCell v-if="checkable" @checked="checked($event, parent.id)" />
        <td>{{ index + 1 }}</td>
        <td class="border-b-0 lg:w-6 before:hidden">
          <UserAvatar :avatar="'http://localhost:8000/'+parent.image" :username="image" class="w-50 h-50 mx-auto lg:w-12 lg:h-12" />
        </td>
        <td data-label="Name">
          {{  this.$i18n.locale=='en' ? parent.Name_Father_en : parent.Name_Father_ar }}
        </td>
        <td data-label="Name">
          {{ parent.email }}
        </td>

        <td data-label="Phone">
          {{ parent.Phone_Father }}
        </td>




        <td data-label="Create" class="lg:w-1 whitespace-nowrap">
          <small class="text-gray-500 dark:text-slate-400" :title="parent.created_at">{{
            parent.created_at
          }}</small>
        </td>

        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end " style="margin:0px" no-wrap>
            <BaseButton color="success" :title="'Show Parent Info'" :icon="mdiEye" small
              @click="show_parent(parent.email, parent.Name_Father_en, parent.Name_Father_ar,
                parent.National_ID_Father, parent.Passport_ID_Father, parent.Phone_Father, parent.Job_Father,
                parent.nationality_father.Name, parent.blood_father.Name, parent.religion_father.Name, parent.Address_Father,
                parent.Name_Mother_ar, parent.Name_Mother_en, parent.National_ID_Mother, parent.Passport_ID_Mother,
                parent.Phone_Mother, parent.Job_Mother, parent.nationality_mother.Name, parent.blood_mother.Name, parent.religion_father.Name, parent.Address_Mother)" />

            <BaseButton color="warning" :icon="mdiAccountChildCircle" :title="'Show Parent\'s Student'" small @click="show_students(parent.student)" />
            <BaseButton color="info" :icon="mdiVectorSquareEdit" :title="'Edit Parent '" small @click="edit_parent(parent.id)" />
            <BaseButton color="danger" :icon="mdiTrashCan" :title="'Delete Parent '" small @click="delete_parent(parent.id)" />
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
          style="border: solid 2px #ede9e9;" small @click="get_parents(this.data_paginate.next_page_url)" />


        <BaseButton v-if="this.data_paginate.prev_page_url != null" :label="'prev Page '"
          style="border: solid 2px #ede9e9;" small @click="get_parents(this.data_paginate.prev_page_url)" />


        <BaseButton v-if="this.data_paginate.last_page_url != null" :label="'Last Page '"
          style="border: solid 2px #ede9e9;" small @click="get_parents(this.data_paginate.last_page_url)" />


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
      parents: [],
      api_password: 'ase1iXcLAxanvXLZcgh6tk',
      v$: useVuelidate(),
      search_value: '',
      user_info: localStorage.getItem('user_info') || '',
      error_message: '',
      success_message: false,
      parent_id: '',
      isModalDangerActive: false,
      isModalViewParentActive: false,
      isModalViewStudentsActive: false,
      checkedRows: [],
      isModalDeleteAllActive: false,
      index_id: 0,
      pagesList: [],
      last_page: "",
      numberpage: 2,
      data_paginate: [],
      get_parents_url: "http://localhost:8000/Api/get_parents?page=1",
      Name_Father_ar: '',
      Name_Father_en: '',
      National_ID_Father: '',
      email_Father: '',
      Passport_ID_Father: '',
      Phone_Father: '',
      Job_Father: '',
      Nationality_Father_id: '',
      Blood_Type_Father_id: '',
      Religion_Father_id: '',
      Address_Father: '',
      Name_Mother_en: '',
      Name_Mother_ar: '',
      National_ID_Mother: '',
      Passport_ID_Mother: '',
      Phone_Mother: '',
      Job_Mother: '',
      Nationality_Mother_id: '',
      Blood_Type_Mother_id: '',
      Religion_Mother_id: '',
      Address_Mother: '',
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
      this.get_parents(this.get_parents_url)
    }
  },
  methods: {


    async get_parents(url) {
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
          if (response.data.parent.data.length > 0) {
            this.parents = response.data.parent.data
            this.data_paginate.last_page = response.data.parent.last_page
            this.data_paginate.current_page = response.data.parent.current_page
            this.data_paginate.total = response.data.parent.total
            this.data_paginate.from = response.data.parent.from
            this.data_paginate.to = response.data.parent.to
            this.data_paginate.last_page_url = response.data.parent.last_page_url
            this.data_paginate.next_page_url = response.data.parent.next_page_url
            this.data_paginate.prev_page_url = response.data.parent.prev_page_url
          }
        }

        // handle success
      } catch (error) {
        console.error(error);
        // handle error
      }


    },
    delete_parent(value) {
      this.isModalDangerActive = true
      this.parent_id = value
    },
    async delete_item(value) {
      try {
        const response = await axios.delete(`http://localhost:8000/Api/delete_parent?id=${value}`, {
          headers: {
            'auth_token': this.userData.user.api_token,
            'api_password': this.api_password
          }
        });


        if (response.data.succNum == 200 && response.data.status == true && response.data.parent) {
          this.error_message = response.data.msg;
          this.get_parents(this.get_parents_url)
          this.pageList.length = 0
          this.error_message = '';
          this.success_message = response.data.msg;
          setTimeout(() => {
            this.isModalDangerActive = false
            this.success_message = false;
          }, 2000)
        } else {
          this.error_message = response.data.msg;
          this.parents = []
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
    remove(parent_id) {
      let index = this.checkedRows.indexOf(parent_id);
      if (index !== -1) {
        this.checkedRows.splice(index, 1);
        return this.checkedRows
      }
    },
    checked(isChecked, parent_id) {
      if (isChecked) {
        this.checkedRows.push(parent_id)
        console.log(this.checkedRows)

      } else {
        this.checkedRows = this.remove(parent_id)
      }
    },
    async delete_all() {
      try {
        const response = await axios.post('http://localhost:8000/Api/parent_delete_all', {
          parents_id: this.checkedRows,
        },
          {
            headers: {
              'auth_token': this.userData.user.api_token,
              'api_password': "ase1iXcLAxanvXLZcgh6tk",
            }
          });
        if (response.data.succNum == 200 && response.data.status == true && response.data.parent) {
          this.get_parents(this.get_parents_url)
          this.pageList.length = 0
          this.error_message = '';
          this.success_message = response.data.msg;
          setTimeout(() => {
            this.get_parents(this.get_parents_url)
            this.isModalDeleteAllActive = false
            this.success_message = false;

          }, 2000)

        } else {
          this.error_message = response.data.msg;
          this.parents = []
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
    show_parent(email, Name_Father_en, Name_Father_ar, National_ID_Father, Passport_ID_Father, Phone_Father, Job_Father, Nationality_Father_id,
      Blood_Type_Father_id, Religion_Father_id, Address_Father, Name_Mother_ar, Name_Mother_en, National_ID_Mother, Passport_ID_Mother,
      Phone_Mother, Job_Mother, Nationality_Mother_id, Blood_Type_Mother_id, Religion_Mother_id, Address_Mother) {

      this.isModalViewParentActive = true

      this.Name_Father_ar = Name_Father_ar
      this.Name_Father_en = Name_Father_en
      this.National_ID_Father = National_ID_Father
      this.email_Father = email
      this.Passport_ID_Father = Passport_ID_Father
      this.Phone_Father = Phone_Father
      this.Job_Father = Job_Father
      this.Nationality_Father_id = JSON.parse(Nationality_Father_id).en
      this.Blood_Type_Father_id = Blood_Type_Father_id
      this.Religion_Father_id = JSON.parse(Religion_Father_id).en
      this.Address_Father = Address_Father


      this.Name_Mother_en = Name_Mother_en
      this.Name_Mother_ar = Name_Mother_ar
      this.National_ID_Mother = National_ID_Mother
      this.Passport_ID_Mother = Passport_ID_Mother
      this.Phone_Mother = Phone_Mother
      this.Job_Mother = Job_Mother
      this.Nationality_Mother_id = JSON.parse(Nationality_Mother_id).en
      this.Blood_Type_Mother_id = Blood_Type_Mother_id
      this.Religion_Mother_id = JSON.parse(Religion_Mother_id).en
      this.Address_Mother = Address_Mother
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

.paren_info {
  border-collapse: separate;
  border-spacing: px;
}

.parent_info>td {
  padding: 5px;
}

.student_info {
  color: white;
  border-radius: 10px;
  padding: 5px;
  margin: 3px;
  font-size: 13px;
}</style>
