import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userService } from '../services/userService'
import { useAuthStore } from './authStore'
import { Timer } from '@/scripts/timer'
import Student from '@/interfaces/IStudent'

export const useUserStore = defineStore('userStoreId', () => {
  const email = ref('')
  const name = ref('')
  const onError = ref(false)

  function _initializeProfile(profile: { email: string; name: string }) {
    email.value = profile.email
    name.value = profile.name
    onError.value = false
  }

  async function getProfile() {
    try {
      onError.value = false
      const authStore = useAuthStore()
      const userId = authStore.getUserId // Assuming getUserId is a computed or a ref inside authStore
      const profile = await userService.getUserById(userId)
      _initializeProfile(profile)
    } catch (error) {
      onError.value = true
    }
  }

  async function getStudents() : Promise<Student[]> {
      const users = await userService.getStudents()
      return users.map(user => ({
          id: user.id.toString(),
          name: user.name,
          open: false,
          timer: new Timer()
      }))
  }

  async function addStudent(name: string, email: string, password: string) {
      await userService.createStudent(name, email, password)
  }

  async function removeStudent(id: number) {
      await userService.deleteUser(id.toString())
  }

  return { 
    email, 
    name, 
    onError, 
    getProfile,
    getStudents,
    addStudent,
    removeStudent
  }
})
