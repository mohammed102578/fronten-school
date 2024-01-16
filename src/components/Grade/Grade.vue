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
        <FormControl rounded-full v-model="selectedValue" @change="get_grades(this.get_grades_url)"  :options="selectOptionsCountStudent"  />
  </FormField>

  <FormField style="width: 25%;display: inline-block;margin: 5px;">
    <FormControl type="text" v-model="search_value" @input="get_grades('http://localhost:8000/Api/search_grade')" placeholder="Search items"  />
  </FormField>


  <FormField style="width: 25%; display: inline-block;margin-bottom: -16px; float:inline-end" >
    <BaseButton x-lg  roundedFull class="button_custom mt-2" label="Create_Grade" :icon="mdiPlus" style="padding:10px;float:inline-end" @click="isModalAddActive = true"  />
  </FormField>



</div>




  <CardBoxModalAdd v-model="isModalAddActive" title="Create_Grade" has-cancel>
    <CardBox :class="cardClass" is-form @submit.prevent="add_grade">
      <div v-if="success_message == true"
        class="bg-green-500 border-green-500 text-white px-3 py-6 md:py-3 mb-6 last:mb-0 border rounded-lg transition-colors duration-150">
        {{$t('Added Successfully')}}
      </div>

      <div v-if="error_message.length > 0"
        class=" bg-red-500  text-white px-3 py-6 md:py-3 mb-6 last:mb-0 border rounded-lg transition-colors duration-150">
         {{$t('Some thing went wrong')}}</div>

      <FormField label="Name_en">
        <FormControl v-model="name_en" :icon="mdiEmail" name="name_en" placeholder=""
          autocomplete="name_en" />
        <br>
        <span class="error" v-if="v$.name_en.$error">
          {{ this.v$.name_en.$errors[0].$message }}</span>

      </FormField>

      <FormField label="Name_ar">
        <FormControl v-model="name_ar" :icon="mdiEmail" name="name_ar" placeholder=""
          autocomplete="name_ar" />
        <br>
        <span class="error" v-if="v$.name_ar.$error">
          {{ this.v$.name_ar.$errors[0].$message }}</span>

      </FormField>

      <FormField label="Notes" help="Your Notes. Max 255 characters">
        <FormControl type="textarea" placeholder=" " v-model="notes" />
      </FormField>
      <span class="error" v-if="v$.notes.$error">
        {{ this.v$.notes.$errors[0].$message }}</span>

      <BaseButtons>
        <BaseButton type="submit" class="button_custom" label="Create_Grade" :icon="mdiPlus" />

      </BaseButtons>


    </CardBox>

  </CardBoxModalAdd>


  <CardBoxModalEdit v-model="isModalEditActive" title="Edit Grade" has-cancel>
    <CardBox :class="cardClass" is-form @submit.prevent="update_grade">
      <div v-if="success_message == true"
        class="bg-green-500 border-green-500 text-white px-3 py-6 md:py-3 mb-6 last:mb-0 border rounded-lg transition-colors duration-150">
        {{$t('Updated Successfully')}}
      </div>

      <div v-if="error_message.length > 0"
        class=" bg-red-500  text-white px-3 py-6 md:py-3 mb-6 last:mb-0 border rounded-lg transition-colors duration-150">
         {{$t('Some thing went wrong')}}</div>
         <FormField label="Name_en">
        <FormControl v-model="name_en" :icon="mdiEmail" name="name_en" placeholder=""
          autocomplete="name_en" />
        <br>
        <span class="error" v-if="v$.name_en.$error">
          {{ this.v$.name_en.$errors[0].$message }}</span>

      </FormField>

      <FormField label="Name_ar">
        <FormControl v-model="name_ar" :icon="mdiEmail" name="name_ar" placeholder=""
          autocomplete="name_ar" />
        <br>
        <span class="error" v-if="v$.name_ar.$error">
          {{ this.v$.name_ar.$errors[0].$message }}</span>

      </FormField>

      <FormField label="Notes" help="Your Notes. Max 255 characters">
        <FormControl type="textarea" placeholder=" " v-model="notes" />
      </FormField>
      <span class="error" v-if="v$.notes.$error">
        {{ this.v$.notes.$errors[0].$message }}</span>
        <BaseButtons>

        <BaseButton type="submit" class="button_custom" :icon="mdiUpdate" label="update Grade" />

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
        :icon="mdiTrashCan" @click="delete_item(this.grade_id)" />

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



  <table v-if="this.grades.length > 0">
    <thead class="title_page">
      <tr>
        <th v-if="checkable">

          <BaseButton color="danger" label="" :icon="mdiTrashCan" small @click="check_delete()" />
        </th>
        <th>{{$t('Index')}} </th>
        <th>{{$t('Name')}}</th>
        <th>{{$t('Notes')}}</th>
        <th>{{$t('Created_at')}}</th>
        <th>{{$t('Action')}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(grade, index) in this.grades" :key="grade.id">
        <TableCheckboxCell v-if="checkable" @checked="checked($event, grade.id)" />
        <td>{{ index + 1 }}</td>
        <td v-if="this.$i18n.locale=='en'" data-label="Name">
          {{ grade.name_en }}
        </td>
        <td v-if="this.$i18n.locale=='ar'" data-label="Name">
          {{ grade.name_ar }}
        </td>

        <td data-label="Notes">
          {{ grade.notes }}
        </td>
        <td data-label="Create" class="lg:w-1 whitespace-nowrap">
          <small class="text-gray-500 dark:text-slate-400" :title="grade.created_at">{{
            grade.created_at
          }}</small>
        </td>


        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-center lg:justify-end " style="margin:0px" no-wrap>
            <BaseButton color="info" class="m-1" :icon="mdiVectorSquareEdit" small
              @click="edit_grade(grade.id, grade.name_en, grade.name_ar, grade.notes)" />

            <BaseButton color="danger" class="mt-1" :icon="mdiTrashCan" small @click="delete_grade(grade.id)" />
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
          small @click="get_grades(this.data_paginate.next_page_url)" />


          <BaseButton v-if="this.data_paginate.prev_page_url != null " :label="'prev Page'" style="border: solid 2px #ede9e9;"
          small @click="get_grades(this.data_paginate.prev_page_url)" />


          <BaseButton v-if="this.data_paginate.last_page_url != null " :label="'Last Page '" style="border: solid 2px #ede9e9;"
          small @click="get_grades(this.data_paginate.last_page_url)" />


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
      grades: [],
      api_password: 'ase1iXcLAxanvXLZcgh6tk',
      v$: useVuelidate(),
      name_en: '',
      name_ar: '',
      notes: '',
      search_value:'',
      user_info: localStorage.getItem('user_info') || '',
      error_message: '',
      success_message: false,
      grade_id: '',
      isModalDangerActive: false,
      isModalEditActive: false,
      checkedRows: [],
      isModalDeleteAllActive: false,
      index_id: 0,
      pagesList:[],
      last_page:"",
      numberpage:2,
      data_paginate:[],
      get_grades_url:"http://localhost:8000/Api/get_grades?page=1",

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
      this.get_grades(this.get_grades_url)
    }
  },
  methods: {
    toggleLanguage(){
this.$i18n.locale=(this.$i18n.locale ==='en')? 'ar':'en'
    },
    async get_grades(url) {
      try {

        const response = await axios.post(url, {
            search:this.search_value,
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
          if (response.data.grade.data.length > 0) {
          this.grades = response.data.grade.data
          this.data_paginate.last_page=response.data.grade.last_page
          this.data_paginate.current_page=response.data.grade.current_page
          this.data_paginate.total=response.data.grade.total
          this.data_paginate.from=response.data.grade.from
          this.data_paginate.to=response.data.grade.to
          this.data_paginate.last_page_url=response.data.grade.last_page_url
          this.data_paginate.next_page_url=response.data.grade.next_page_url
          this.data_paginate.prev_page_url=response.data.grade.prev_page_url
        }
        }

        // handle success
      } catch (error) {
        console.error(error);
        // handle error
      }


    },
    delete_grade(value) {
      this.isModalDangerActive = true
      this.grade_id = value
    },
    async delete_item(value) {
      try {
      const response = await axios.delete(`http://localhost:8000/Api/delete_grade?id=${value}`, {
          headers: {
            'auth_token': this.userData.user.api_token,
            'api_password': this.api_password
          }
        });


        if (response.data.succNum == 200 && response.data.status == true && response.data.grade) {
          this.error_message = response.data.msg;
          this.get_grades(this.get_grades_url)
          this.pageList.length = 0
          this.error_message = '';
          this.success_message = response.data.msg;
          setTimeout(() => {
            this.isModalDangerActive = false
            this.success_message = false;
          }, 2000)
        } else {
          this.error_message = response.data.msg;
          this.grades=[]
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
    async add_grade() {
      this.v$.$validate();
      if (!this.v$.$error) {
        try {
          const response = await axios.post('http://localhost:8000/Api/add_grade', {

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
            this.get_grades(this.get_grades_url)
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
    edit_grade(id, name_en, name_ar, notes) {
      this.isModalEditActive = true
      this.grade_id = id
      this.name_en = name_en
      this.name_ar = name_ar
      this.notes = notes
    },
    async update_grade() {
      //console.log(this.userData.user.api_token)
      this.v$.$validate();
      if (!this.v$.$error) {
        try {
          const response = await axios.post('http://localhost:8000/Api/update_grade', {

            name_en: this.name_en,
            name_ar: this.name_ar,
            notes: this.notes,
            id: this.grade_id,

          },
            {
              headers: {
                'auth_token': this.userData.user.api_token,
                'api_password': "ase1iXcLAxanvXLZcgh6tk",
              }
            });
          if (response.data.succNum == 200 && response.data.status == true) {
                        this.get_grades(this.get_grades_url)

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
    remove(grade_id) {
      let index = this.checkedRows.indexOf(grade_id);
      if (index !== -1) {
        this.checkedRows.splice(index, 1);
        return this.checkedRows
      }
    },
    checked(isChecked, grade_id) {
      if (isChecked) {
        this.checkedRows.push(grade_id)
        console.log(this.checkedRows)

      } else {
        this.checkedRows = this.remove(grade_id)
      }
    },
    async delete_all() {
      try {
        const response = await axios.post('http://localhost:8000/Api/grade_delete_all', {
          grades_id: this.checkedRows,
        },
          {
            headers: {
              'auth_token': this.userData.user.api_token,
              'api_password': "ase1iXcLAxanvXLZcgh6tk",
            }
          });
        if (response.data.succNum == 200 && response.data.status == true && response.data.grade) {
          this.get_grades(this.get_grades_url)
          this.pageList.length = 0
          this.error_message = '';
          this.success_message = response.data.msg;
          setTimeout(() => {
            this.get_grades(this.get_grades_url)
            this.isModalDeleteAllActive = false
            this.success_message = false;

          }, 2000)

        } else {
          this.error_message = response.data.msg;
          this.grades=[]
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
