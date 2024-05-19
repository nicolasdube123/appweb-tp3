<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useUserStore } from '../stores/userStore'
import Profile from '@/components/Profile.vue'
import { Role, getRole } from '@/scripts/verifyRole'

const userStore = useUserStore()

const name = computed(() => userStore.name)
const email = computed(() => userStore.email)
let role= await computed(() => getRole()).value
if (role == undefined) {
  role = Role.STUDENT
}
const onError = computed(() => userStore.onError)

onMounted(async () => {
  try {
    await userStore.getProfile()
    if (onError.value) {
      // Utilisation d'une boîte de dialogue au lieu de 'confirm'
      confirm("Une erreur s'est produite lors de la récupération du profil de l'utilisateur.")
    }
  } catch (error) {
    confirm("Erreur critique lors de l'accès au store.")
  }
})

function updateUser(name: string, password: string) {
  userStore.updateUser(name, password)
}
</script>

<template>
  <Profile :name="name" :email="email" :role="role" @updateUser="updateUser" />
</template>

<style scoped></style>