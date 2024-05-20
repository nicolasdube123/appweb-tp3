<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useUserStore } from '../stores/userStore'
import { Role, getRole } from '@/scripts/verifyRole'

const userStore = useUserStore()

const name = computed(() => userStore.name)
const email = computed(() => userStore.email)

const formName = ref(name.value)
const formPassword = ref('')

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

async function updateUser(name: string, password: string) {
  await userStore.updateUser(name, password)
  formName.value = ''
  formPassword.value = ''
}
</script>

<template>
  <div class="container m-4 d-flex flex-column">
    <h1>Profile</h1>
    <div class="container m-4">
      <h3>Informations:</h3>
      <div>Nom: {{ name }}</div>
      <div>Courriel: {{ email }}</div>
      <div class="pt-4">
        <h3>Changer le mot de passe:</h3>
        <input v-if="role == Role.TEACHER" type="text" name="newName" id="new-name" v-model="formName" class="form-control w-25" placeholder="Nouveau nom">
        <input type="password" name="newPassword" id="new-password" v-model="formPassword" class="form-control w-25" placeholder="Nouveau mot de passe">
        <button class="btn btn-primary w-25 mt-2" @click="updateUser(formName, formPassword)">Envoyer</button>
    </div>
    </div>
  </div>
</template>

<style scoped></style>