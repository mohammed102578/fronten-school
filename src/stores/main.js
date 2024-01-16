import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useMainStore = defineStore('main', () => {
let user_info=localStorage.getItem('user_info')
const userData = JSON.parse(user_info);
  const userName = ref(userData.user.name)
  const userEmail = ref(userData.user.email)
  const userId = ref(userData.user.id)
  const userToken = ref(userData.user.api_token)
  const userAvatar =   ref(userData.user.image)
  const isFieldFocusRegistered = ref(false)
  const Language=ref('en')

  const clients = ref([])
  const history = ref([])

  function setUser(payload) {
    if (payload.name) {
      userName.value = payload.name
    }
    if (payload.email) {
      userEmail.value = payload.email
    }

    if (payload.userAvatar) {
      userAvatar.value = payload.userAvatar
    }
  }

  function setLanguage(payload) {

      Language.value = payload

  }

  function fetchSampleClients() {
    axios
      .get(`data-sources/clients.json?v=3`)
      .then((result) => {
        clients.value = result?.data?.data
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  function fetchSampleHistory() {
    axios
      .get(`data-sources/history.json`)
      .then((result) => {
        history.value = result?.data?.data
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  return {

    userId,
    userToken,
    userName,
    userEmail,
    userAvatar,
    Language,
    isFieldFocusRegistered,
    clients,
    history,
    setUser,
    setLanguage,
    fetchSampleClients,
    fetchSampleHistory
  }
})
