<script setup>
import { reactive } from 'vue'
import { useMainStore } from '@/stores/main'
import { mdiAccount, mdiMail, mdiAsterisk, mdiFormTextboxPassword, mdiGithub } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import UserCard from '@/components/UserCard.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import axios from 'axios';

let file=null

const mainStore = useMainStore()

const profileForm = reactive({
  name: mainStore.userName,
  email: mainStore.userEmail,
  id: mainStore.userId,
  userToken: mainStore.userToken,
  error:'',
  success:''
})

const passwordForm = reactive({
  password_current: '',
  password: '',
  password_confirmation: '',
  error:'',
  success:''
})


const userImage = reactive({
id: mainStore.userId,
userToken: mainStore.userToken,
error: '',
success: '',
userAvatar: mainStore.userAvatar,

})

async function update_profile() {
  try {
            const response = await axios.post('http://localhost:8000/Api/update_profile', {
              id:profileForm.id,
              name:profileForm.name,
              email:profileForm.email,

            }, {
                    headers: {
                      'api_password': "ase1iXcLAxanvXLZcgh6tk",
                      'auth_token':profileForm.userToken,
                    }
                  });

            if(response.data.status==false){
              profileForm.error=response.data.msg
            }else{

              mainStore.setUser(profileForm)

            }

            // handle success
          } catch (error) {
            console.error(error);
            // handle error
          }
}


async function update_password() {
  try {
            const response = await axios.post('http://localhost:8000/Api/change_password', {
              id:profileForm.id,
              password_current:passwordForm.password_current,
              password:passwordForm.password,
              password_confirmation:passwordForm.password_confirmation,

            }, {
                    headers: {
                      'api_password': "ase1iXcLAxanvXLZcgh6tk",
                      'auth_token':profileForm.userToken,
                    }
                  });

                  if(response.data.status==false){
                    passwordForm.error=response.data.msg
            }else{
              mainStore.setUser(profileForm)

            }

            // handle success
          } catch (error) {
            console.error(error);
            // handle error
          }
}





function handleFileUpload(event) {
      file = event.target.files[0];
    }


 async function uploadImage(e) {
  try {


    const formData = new FormData();
    formData.append("image",file);
    formData.append("id", userImage.id);

    const response = await axios.post('http://localhost:8000/Api/change_image', formData, {
      headers: {
        'auth_token':userImage.userToken,
        'api_password': "ase1iXcLAxanvXLZcgh6tk",
        "Content-Type": "multipart/form-data"

      }
    });

    if (response.data.status == false) {
      userImage.error = response.data.msg
    } else {

      userImage.userAvatar =  'http://localhost:8000/'+response.data.user.image
     mainStore.setUser(userImage)
      userImage.error = ""
    }

    // handle success
  } catch (error) {
    console.error(error);
    // handle error
  }
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccount" title="profile" main>
        <BaseButton
          href="https://github.com/justboil/admin-one-vue-tailwind"
          target="_blank"
          :icon="mdiGithub"
          label="Star on GitHub"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>

      <UserCard class="mb-6" />
      <div class="grid grid-cols-1 lg:grid-cols-1 form_avatar">

<CardBox is-form @submit.prevent="uploadImage" enctype="multipart/form-data">
  <FormField label="Upload Image" help="Max 500kb">
    <input type="file" @change="handleFileUpload">
              </FormField>
  <span class="error">{{ userImage.error }}</span>

  <template #footer>
    <BaseButtons>
      <BaseButton type="submit" color="info" label="Submit" />
      <BaseButton color="info" label="Options" outline />
    </BaseButtons>
  </template>

</CardBox>

</div>


      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardBox is-form @submit.prevent="update_profile">


          <FormField label="Name" help="Required. Your name">
            <FormControl
              v-model="profileForm.name"
              :icon="mdiAccount"
              name="name"
              required
              autocomplete="name"
            />
          </FormField>
          <FormField label="E-mail" help="Required. Your e-mail">
            <FormControl
              v-model="profileForm.email"
              :icon="mdiMail"
              type="email"
              name="email"
              required
              autocomplete="email"
            />
          </FormField>
          <span class="error">{{ profileForm.error }}</span>
          <template #footer>
            <BaseButtons>
              <BaseButton color="info" type="submit" label="Submit" />
              <BaseButton color="info" label="Options" outline />
            </BaseButtons>
          </template>
        </CardBox>

        <CardBox is-form @submit.prevent="update_password">
          <FormField label="Current password" help="Required. Your current password">
            <FormControl
              v-model="passwordForm.password_current"
              :icon="mdiAsterisk"
              name="password_current"
              type="password"
              required
              autocomplete="current-password"
            />
          </FormField>

          <BaseDivider />

          <FormField label="New password" help="Required. New password">
            <FormControl
              v-model="passwordForm.password"
              :icon="mdiFormTextboxPassword"
              name="password"
              type="password"
              required
              autocomplete="new-password"
            />
          </FormField>

          <FormField label="Confirm password" help="Required. New password one more time">
            <FormControl
              v-model="passwordForm.password_confirmation"
              :icon="mdiFormTextboxPassword"
              name="password_confirmation"
              type="password"
              required
              autocomplete="new-password"
            />
          </FormField>
          <span class="error">{{ passwordForm.error }}</span>

          <template #footer>
            <BaseButtons>
              <BaseButton type="submit" color="info" label="Submit" />
              <BaseButton color="info" label="Options" outline />
            </BaseButtons>
          </template>
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
<style lang="css" scoped>

.error{
  margin-top: -20px; color:red;
 font-size:13px;
}
  </style>
