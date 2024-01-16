<script setup>
import { reactive ,ref} from 'vue'
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
const mainStore= useMainStore();
// Declare mainStore globally
    const  profileForm= reactive({
      name: mainStore.userName,
      email: mainStore.userEmail,
      id: mainStore.userId,
      userToken: mainStore.userToken,
      error: '',
      success: ''
    });
    console.log(profileForm)
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccount" title="profile" main>
        <BaseButton href="https://github.com/justboil/admin-one-vue-tailwind" target="_blank" :icon="mdiGithub"
          label="Star on GitHub" color="contrast" rounded-full small />
      </SectionTitleLineWithButton>

      <UserCard class="mb-6" />

      <div class="grid grid-cols-1 lg:grid-cols-1 form_avatar">

        <CardBox is-form @submit.prevent="uploadImage" enctype="multipart/form-data">
          <FormField label="Upload Image" help="Max 500kb">
            <input type="file" @change="handleFileUpload">
                      </FormField>
          <span class="error">{{ this.passwordForm.error }}</span>

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
            <FormControl v-model="profileForm.name" :icon="mdiAccount" name="name" required autocomplete="name" />
          </FormField>
          <FormField label="E-mail" help="Required. Your e-mail">
            <FormControl v-model="profileForm.email" :icon="mdiMail" type="email" name="email" required
              autocomplete="email" />
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
            <FormControl v-model="passwordForm.password_current" :icon="mdiAsterisk" name="password_current"
              type="password" required autocomplete="current-password" />
          </FormField>

          <BaseDivider />

          <FormField label="New password" help="Required. New password">
            <FormControl v-model="passwordForm.password" :icon="mdiFormTextboxPassword" name="password" type="password"
              required autocomplete="new-password" />
          </FormField>

          <FormField label="Confirm password" help="Required. New password one more time">
            <FormControl v-model="passwordForm.password_confirmation" :icon="mdiFormTextboxPassword"
              name="password_confirmation" type="password" required autocomplete="new-password" />
          </FormField>
          <span class="error">{{ this.passwordForm.error }}</span>

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
      file:null,

      passwordForm: reactive({
      password_current: '',
      password: '',
      password_confirmation: '',
      error: '',
      success: ''
    })
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

},
  methods: {
    async  update_profile() {
  try {
    const mainStore= useMainStore(); // Declare mainStore globally
    const  profileForm= reactive({
      name: mainStore.userName,
      email: mainStore.userEmail,
      id: mainStore.userId,
      userToken: mainStore.userToken,
      error: '',
      success: ''
    });
    mainStore.setUser(profileForm)
    const response = await axios.post('http://localhost:8000/Api/update_profile', {
      id: mainStore.userId,
      name:mainStore.userName,
      email: mainStore.userEmail,

    }, {
      headers: {
        'auth_token': profileForm.userToken,
        api_password: "ase1iXcLAxanvXLZcgh6tk",

      }
    });

    if (response.data.status == false) {
      profileForm.error = response.data.msg
    } else {

      // localStorage.setItem('user_info', JSON.stringify(response.data))
      profileForm.error = ""
    }

    // handle success
  } catch (error) {
    console.error(error);
    // handle error
  }
},async  update_password() {
  try {

    this.mainStore.setUser(profileForm)
    const response = await axios.post('http://localhost:8000/Api/change_password', {
      id: profileForm.id,
      password_current: this.passwordForm.password_current,
      password: this.passwordForm.password,
      password_confirmation: this.passwordForm.password_confirmation,

    }, {
      headers: {
        'auth_token': profileForm.userToken,
        api_password: "ase1iXcLAxanvXLZcgh6tk",

      }
    });

    if (response.data.status == false) {
      this.passwordForm.error = response.data.msg
    }

    // handle success
  } catch (error) {
    console.error(error);
    // handle error
  }
}
,
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
 async  uploadImage(e) {
  try {
    const mainStore = useMainStore()

  const userImage = reactive({
  id: mainStore.userId,
  userToken: mainStore.userToken,
  error: '',
  success: '',
  userAvatar: mainStore.userAvatar,

})

    const formData = new FormData();
    formData.append("image",this.file);
    formData.append("id", userImage.id);

    const response = await axios.post('http://localhost:8000/Api/change_image', formData, {
      headers: {
        'auth_token': userImage.userToken,
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

  },
};
</script>
<style lang="css" scoped>
.error {
  margin-top: -20px;
  color: red;
  font-size: 13px;
}

.form_avatar {
  margin-bottom: 10px;
}
</style>
