<script setup>
import { computed, ref } from 'vue'
import { useMainStore } from '@/stores/main'
import { mdiVectorSquareEdit, mdiCancel, mdiTrashCan, mdiPlus,mdiUpdate } from '@mdi/js'
import CardBoxModalEdit from '@/components/CardBoxModalEdit.vue'
import CardBoxModalAdd from '@/components/CardBoxModalAdd.vue'
import CardBoxModalDelete from '@/components/CardBoxModalDelete.vue'
import CardBoxModalDeleteAll from '@/components/CardBoxModalDelete.vue'
import CardBox from '@/components/CardBox.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import axios from 'axios';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import SectionTitleLine from '@/components/SectionTitleLine.vue'

const isModalAddActive = ref(false)
const hasCancel = ref(true)
const selectOptionsCountStudent = [
  { id: 10, label: '10' },
  { id: 20, label: '20' },
  { id: 50, label: '50' },
  { id: 100, label: '100' }
]

defineProps({
  checkable: Boolean
})


</script>

<template>





<div :icon="mdiAccountStarOutline"   class="pr-2 pl-2">

<FormField style="width: 10%;display: inline-block;margin: 5px;">
        <FormControl rounded-full v-model="selectedValue" @change="get_sections(this.get_sections_url)"  :options="selectOptionsCountStudent"  />
  </FormField>

  <FormField style="width: 25%;display: inline-block;margin: 5px;">
        <FormControl type="text" v-model="search_value" @input="get_sections('http://localhost:8000/Api/search_section')" placeholder="Search items"  />
  </FormField>


  <FormField style="width: 25%; display: inline-block;margin-bottom: -16px; float:inline-end" >
            <BaseButton x-lg  roundedFull class="button_custom mt-2" label="Create Section" :icon="mdiPlus" style="padding:10px;float:inline-end" @click="isModalAddActive = true"  />
  </FormField>



</div>

 <CardBoxModalAdd v-model="isModalAddActive" title="Add Section" has-cancel>
    <CardBox :class="cardClass" is-form @submit.prevent="add_section">
      <div v-if="success_message == true"
        class="bg-green-500 border-green-500 text-white px-3 py-6 md:py-3 mb-6 last:mb-0 border rounded-lg transition-colors duration-150">
        {{$t('Added Successfully')}}
      </div>

      <div v-if="error_message.length > 0"
        class=" bg-red-500  text-white px-3 py-6 md:py-3 mb-6 last:mb-0 border rounded-lg transition-colors duration-150">
         {{$t('Some thing went wrong')}}</div>

      <FormField label="Name_en">
        <FormControl v-model="name_section_en" :icon="mdiEmail" name="name_section_en"
          placeholder="" autocomplete="name_section_en" />
        <br>
        <span class="error" v-if="v$.name_section_en.$error">
          {{ this.v$.name_section_en.$errors[0].$message }}</span>

      </FormField>

      <FormField label="Name_ar">
        <FormControl v-model="name_section_ar" :icon="mdiEmail" name="name_section_ar"
          placeholder="" autocomplete="name_section_ar" />
        <br>
        <span class="error" v-if="v$.name_section_ar.$error">
          {{ this.v$.name_section_ar.$errors[0].$message }}</span>

      </FormField>

      <FormField label="Grade">
        <FormControl v-model="grade_id" :options="selectOptionsGrade" @change="get_classroom(this.grade_id)" placeholder="" />
      </FormField>
      <span class="error" v-if="v$.grade_id.$error">
        {{ this.v$.grade_id.$errors[0].$message }}</span>


      <FormField label="Classroom">
        <FormControl v-model="classroom_id" :options="selectOptionsClassroom"  placeholder=""/>
      </FormField>

      <span class="error" v-if="v$.classroom_id.$error">
        {{ this.v$.classroom_id.$errors[0].$message }}</span>

      <BaseButtons>
        <BaseButton type="submit" class="button_custom" label="Add Section" :icon="mdiPlus" />
      </BaseButtons>


    </CardBox>

  </CardBoxModalAdd>



  <CardBoxModalEdit v-model="isModalEditActive" title="Edit Section" has-cancel>
    <CardBox :class="cardClass" is-form @submit.prevent="update_section">
      <div v-if="success_message == true"
        class="bg-green-500 border-green-500 text-white px-3 py-6 md:py-3 mb-6 last:mb-0 border rounded-lg transition-colors duration-150">
        {{$t('Updated Successfully')}}
      </div>

      <div v-if="error_message.length > 0"
        class=" bg-red-500  text-white px-3 py-6 md:py-3 mb-6 last:mb-0 border rounded-lg transition-colors duration-150">
         {{$t('Some thing went wrong')}}</div>

      <FormField label="Name_en">
        <FormControl v-model="name_section_en" :icon="mdiEmail" name="name_section_en"
          placeholder="" autocomplete="name_section_en" />
        <br>
        <span class="error" v-if="v$.name_section_en.$error">
          {{ this.v$.name_section_en.$errors[0].$message }}</span>

      </FormField>

      <FormField label="Name_ar">
        <FormControl v-model="name_section_ar" :icon="mdiEmail" name="name_section_ar"
          placeholder="" autocomplete="name_section_ar" />
        <br>
        <span class="error" v-if="v$.name_section_ar.$error">
          {{ this.v$.name_section_ar.$errors[0].$message }}</span>

      </FormField>


      <FormField label="Grade">
        <FormControl v-model="this.grade_id" :options="selectOptionsGrade" @change="get_classroom(this.grade_id)" placeholder=""/>
      </FormField>
      <span class="error" v-if="v$.grade_id.$error">
        {{ this.v$.grade_id.$errors[0].$message }}
      </span>

      <FormField label="Classroom">
        <FormControl v-model="this.classroom_id" :options="selectOptionsClassroom" placeholder=""/>
      </FormField>

      <span class="error" v-if="v$.classroom_id.$error">
        {{ this.v$.classroom_id.$errors[0].$message }}</span>


      <BaseButtons>
        <BaseButton type="submit" class="button_custom"  label="Update Section" :icon="mdiUpdate"/>

      </BaseButtons>


    </CardBox>

  </CardBoxModalEdit>



  <CardBoxModalDelete v-model="this.isModalDangerActive" title="Please confirm" button="danger" has-cancel>
    <div v-if="error_message.length > 0"  style="background-color:#dc1717;border-radius:10px; color:white"
      class=" border-red-500  px-3 py-6 md:py-3 mb-6 last:mb-0 border rounded-lg transition-colors duration-150">
       {{$t('Some thing went wrong')}}</div>

      <p>{{$t('Do you want to delete this item ?')}}</p>
    <BaseButtons>
      <BaseButton type="submit" style="background-color:#10ee52;border-radius:10px; color:white" label="Yes, Delete Item"
        :icon="mdiTrashCan" @click="delete_item(this.section_id)" />

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


  <table v-if="this.sections.length > 0">
    <thead class="title_page">
      <tr>
        <th v-if="checkable">

          <BaseButton color="danger" label="" :icon="mdiTrashCan" small @click="check_delete()" />
        </th>
        <th>{{$t('Index')}} </th>
        <th>{{$t('Name')}}</th>
        <th>{{$t('Classroom')}}</th>
        <th>{{$t('Grade')}}</th>
        <th>{{$t('Created_at')}}</th>
        <th>{{$t('Action')}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(section, index) in this.sections" :key="section.id">
        <TableCheckboxCell v-if="checkable" @checked="checked($event, section.id)" />
        <td>{{ index + 1 }}</td>
        <td data-label="Name">
          {{this.$i18n.locale=='en' ? section.name_section_en : section.name_section_ar}}
        </td>



        <td data-label="Section">
          {{this.$i18n.locale=='en' ? section.my_classs.name_en : section.my_classs.name_ar}}

        </td>

        <td data-label="Section">
          {{this.$i18n.locale=='en' ? section.grades.name_en : section.grades.name_ar}}

        </td>


        <td data-label="Create" class="lg:w-1 whitespace-nowrap">
          <small class="text-gray-500 dark:text-slate-400" :title="section.created_at">{{
            section.created_at
          }}</small>
        </td>


        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end " style="margin:0px" no-wrap>
            <BaseButton color="info" :icon="mdiVectorSquareEdit" small
              @click="edit_section(section.id, section.name_section_en, section.name_section_ar, section.grades.id, section.my_classs.id)" />
            <BaseButton color="danger" :icon="mdiTrashCan" small @click="delete_section(section.id)" />
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
          style="border: solid 2px #ede9e9;" small @click="get_classrooms(this.data_paginate.next_page_url)" />


        <BaseButton v-if="this.data_paginate.prev_page_url != null" :label="'prev Page '"
          style="border: solid 2px #ede9e9;" small @click="get_classrooms(this.data_paginate.prev_page_url)" />


        <BaseButton v-if="this.data_paginate.last_page_url != null" :label="'Last Page '"
          style="border: solid 2px #ede9e9;" small @click="get_classrooms(this.data_paginate.last_page_url)" />


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
      sections: [],
      get_classrooms: [],
      selectOptionsClassroom: [],
      selectOptionsGrade: "",
      api_password: 'ase1iXcLAxanvXLZcgh6tk',
      v$: useVuelidate(),
      name_section_en: '',
      name_section_ar: '',
      grade_id: '',
      classroom_id: '',
      search_value: '',
      user_info: localStorage.getItem('user_info') || '',
      error_message: '',
      success_message: false,
      section_id: '',
      isModalAddActive:false,
      isModalDangerActive: false,
      isModalEditActive: false,
      checkedRows: [],
      isModalDeleteAllActive: false,
      index_id: 0,
      pagesList: [],
      last_page: "",
      numberpage: 2,
      data_paginate: [],
      get_sections_url: "http://localhost:8000/Api/get_sections?page=1",
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
      name_section_en: { required },
      name_section_ar: { required },
      grade_id: { required },
      classroom_id: { required },
    }
  },
  mounted() {
    if (!this.user_info) {
      // Token exists in localStorage, redirect to dashboard
      this.$router.push('/login')

    } else {
      this.get_sections(this.get_sections_url)
      this.get_grades()
      // this.get_classroom(this.grade_id)

    }
  },
  methods: {
    async get_grades() {
      try {

        const response = await axios.post('http://localhost:8000/Api/get_grades', {
          Items_show_number: 100

        },
          {
            headers: {
              'auth_token': this.userData.user.api_token,
              'api_password': "ase1iXcLAxanvXLZcgh6tk",
            }
          });
        if (response.data.grade.data.length > 0) {
          this.grades = response.data.grade.data
          this.selectOptionsGrade = response.data.grade.data.map(item => ({ id: item.id, label: this.$i18n.locale=='en' ? item.name_en : item.name_ar  }));
       console.log(this.selectOptionsGrade)
        }
        // handle success
      } catch (error) {
        console.error(error);
        // handle error
      }


    },
    async get_classroom(id) {
      try {

        const response = await axios.post('http://localhost:8000/Api/get_grade_classroom', {
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
          this.selectOptionsClassroom = response.data.classroom.map(item => ({ id: item.id, label: this.$i18n.locale=='en' ? item.name_en : item.name_ar  }));
        } else {
          this.selectOptionsClassroom = null
        }
        // handle success
      } catch (error) {
        console.error(error);
        // handle error
      }


    },
    async get_sections(url) {
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

          if (response.data.status ==false && response.data.errNum==401) {
          localStorage.clear()
          this.$router.push('/login')
        }else{
        if (response.data.section.data.length > 0) {
          this.sections = response.data.section.data
          this.data_paginate.last_page = response.data.section.last_page
          this.data_paginate.current_page = response.data.section.current_page
          this.data_paginate.total = response.data.section.total
          this.data_paginate.from = response.data.section.from
          this.data_paginate.to = response.data.section.to
          this.data_paginate.last_page_url = response.data.section.last_page_url
          this.data_paginate.next_page_url = response.data.section.next_page_url
          this.data_paginate.prev_page_url = response.data.section.prev_page_url

        }
      }
        // handle success
      } catch (error) {
        console.error(error);
        // handle error
      }


    },
    delete_section(value) {
      this.isModalDangerActive = true
      this.section_id = value
    },
    async delete_item(value) {
      try {
        const response = await axios.delete(`http://localhost:8000/Api/delete_section?id=${value}`, {
          headers: {
            'auth_token': this.userData.user.api_token,
            'api_password': this.api_password
          }
        });


        if (response.data.succNum == 200 && response.data.status == true && response.data.section) {
          this.error_message = response.data.msg;
          this.get_sections(this.get_sections_url)
          this.pageList.length = 0
          this.error_message = '';
          this.success_message = response.data.msg;
          setTimeout(() => {
            this.isModalDangerActive = false
            this.success_message = false;
          }, 2000)
        } else {
          this.error_message = response.data.msg;
          this.sections=[]
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
    async add_section() {
      this.v$.$validate();
      if (!this.v$.$error) {
        try {
          const response = await axios.post('http://localhost:8000/Api/add_section', {
            name_section_en: this.name_section_en,
            name_section_ar: this.name_section_ar,
            grade_id: this.grade_id,
            classroom_id: this.classroom_id,
          },
            {
              headers: {
                'auth_token': this.userData.user.api_token,
                'api_password': "ase1iXcLAxanvXLZcgh6tk",

              }
            });


          if (response.data.succNum == 200 && response.data.status == true) {
            this.pageList.length = 0
            this.get_sections(this.get_sections_url)
            this.error_message = '';
            this.success_message = true;
            setTimeout(() => {
              this.success_message = false;
              this.grade_id = '';
              this.classroom_id = '';
              this.name_section_ar = '';
              this.name_section_en = '';
              this.v$.name_section_ar.$errors[0].$message = " "
              this.v$.name_section_en.$errors[0].$message = " "
              this.v$.grade_id.$errors[0].$message = " "
              this.v$.classroom_id.$errors[0].$message = " "

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
    edit_section(id, name_section_en, name_section_ar, grade_id, classroom_id) {
      this.isModalEditActive = true
      this.section_id = id
      this.name_section_en = name_section_en
      this.name_section_ar = name_section_ar
      this.grade_id = grade_id
      this.classroom_id = classroom_id
      this.get_classroom(this.grade_id)
    },
    async update_section() {
      //console.log(this.userData.user.api_token)
      this.v$.$validate();
      if (!this.v$.$error) {
        try {
          const response = await axios.post('http://localhost:8000/Api/update_section', {

            name_section_en: this.name_section_en,
            name_section_ar: this.name_section_ar,
            grade_id: this.grade_id,
            classroom_id: this.classroom_id,
            id: this.section_id,

          },
            {
              headers: {
                'auth_token': this.userData.user.api_token,
                'api_password': "ase1iXcLAxanvXLZcgh6tk",
              }
            });
          if (response.data.succNum == 200 && response.data.status == true) {
            this.get_sections(this.get_sections_url)
            this.error_message = '';
            this.success_message = true;
            setTimeout(() => {
              this.success_message = false;
              this.v$.name_section_ar.$errors[0].$message = " "
              this.v$.name_section_en.$errors[0].$message = " "
              this.v$.grade_id.$errors[0].$message = " "
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
    remove(section_id) {
      let index = this.checkedRows.indexOf(section_id);
      if (index !== -1) {
        this.checkedRows.splice(index, 1);
        return this.checkedRows
      }
    },
    checked(isChecked, section_id) {
      if (isChecked) {
        this.checkedRows.push(section_id)

      } else {
        this.checkedRows = this.remove(section_id)
      }
    },
    async delete_all() {
      try {
        const response = await axios.post('http://localhost:8000/Api/section_delete_all', {
          sections_id: this.checkedRows,
        },
          {
            headers: {
              'auth_token': this.userData.user.api_token,
              'api_password': "ase1iXcLAxanvXLZcgh6tk",
            }
          });
        if (response.data.succNum == 200 && response.data.status == true && response.data.section) {
          this.pageList.length = 0
          this.error_message = '';
          this.success_message = response.data.msg;
          setTimeout(() => {
            this.get_sections(this.get_sections_url)
            this.isModalDeleteAllActive = false
            this.success_message = false;

          }, 2000)

        } else {
          this.error_message = response.data.msg;
          this.sections=[]
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
    submitSelectedValue() {
      // You can perform any action here with the selected value
      console.log('Selected value:', this.selectedValue);
      // For example, you can make an API call to submit the selected value
      // axios.post('/submit-selected-value', { value: this.selectedValue });
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
</style>
