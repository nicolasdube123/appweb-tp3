<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useUserStore } from '../stores/userStore'
import Profile from '@/components/Profile.vue'

const userStore = useUserStore()

const name = computed(() => userStore.name)
const email = computed(() => userStore.email)
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
</script>

<template>
  <Profile :name="name" :email="email" />
</template>

<style scoped></style>