import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userService } from '../services/userService'
import { useAuthStore } from './authStore'
import { Timer } from '@/scripts/timer'
import { Student } from '@/interfaces/IStudent'

export const useUserStore = defineStore('userStoreId', () => {
  const email = ref('')
  const name = ref('')
  const onError = ref(false)
  let amberAlertShown = ref(false)

  const authStore = useAuthStore()
  const students = ref<Array<Student>>([])

  function _initializeProfile(profile: { email: string; name: string }) {
    email.value = profile.email
    name.value = profile.name
    onError.value = false
  }

  async function getProfile() {
    try {
      onError.value = false
      const userId = authStore.getUserId // Assuming getUserId is a computed or a ref inside authStore
      const profile = await userService.getUserById(userId)
      _initializeProfile(profile)
    } catch (error) {
      onError.value = true
    }
  }

  async function refreshStudents() {
      const usersResponse = await userService.getStudents()
      const studentsResponse : Student[] = usersResponse.map(user => ({
          id: user.id.toString(),
          name: user.name,
          open: false,
          timer: new Timer()
      }))
      students.value = studentsResponse
  }

  async function addStudent(name: string, email: string, password: string) {
      await userService.createStudent(name, email, password)
      await refreshStudents()
  }

  async function updateUser(name: string, password: string) {
    const id = authStore.getUserId
    await userService.updateUser(id, name, password)
  }

  async function removeStudent(id: number) {
      await userService.deleteUser(id.toString())
      await refreshStudents()
  }

  async function getStudentNameById(id: string) {
      const student = await userService.getUserById(id)
      return student.name
  }

  return { 
    email, 
    name, 
    onError, 
    getProfile,
    students,
    refreshStudents,
    addStudent,
    updateUser,
    removeStudent,
    getStudentNameById,
    amberAlertShown
  }
})
