<script setup lang="ts">
  import { computed, onMounted, ref, watch, watchEffect } from 'vue'
  import { useAuthStore } from '../stores/authStore'
  import { useUserStore } from '../stores/userStore'
  import { useRouter } from 'vue-router'
  import PopUp from '@/components/PopUp.vue'
  import { Role, getRole } from '@/scripts/verifyRole'

  const authStore = useAuthStore()
  const router = useRouter()

  const isLoggedIn = computed(() => authStore.isLoggedIn)

  // Le bouton "Se déconnecter" déconnecte l'utilisateur et le redirige vers la page de connexion.
  function logout() {
    authStore.logout()
    router.push({
      name: 'Login'
    })
  }

  // Cette fonction détermine le rôle de l'utilisateur. Elle est utilisée plus tard.
  const currentRole = ref<Role>()
  async function checkRoleAndRedirect() {
    const role = await getRole()
    if (role) {
      if (role === Role.TEACHER) {
        currentRole.value = Role.TEACHER
        router.push({ name: 'Teacher' })
      } else if (role === Role.STUDENT) {
        currentRole.value = Role.STUDENT
        router.push({ name: 'Student' })
      }
    }
  }

  // À chaque déconnexion/reconnexion, le rôle de l'utilisateur est vérifié et la redirection appropriée est faite.
  watch(isLoggedIn, (newValue) => {
    if (newValue) {
      checkRoleAndRedirect();
    }
  })

  // Le rôle de l'utilisateur est également vérifié lorsque la barre de navigation est affichée pour la première fois.
  onMounted(() => {
    if (isLoggedIn.value) {
      checkRoleAndRedirect();
    }
  })
</script>

<template>
  <Suspense>

  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container-fluid">
      <div class="navbar-nav mr-auto">
        <RouterLink
          class="nav-link"
          :class="{ active: $route.name == 'Student' }"
          v-if="currentRole == Role.STUDENT && isLoggedIn"
          :to="{ name: 'Student' }"
        >
          Étudiant
        </RouterLink>
        <RouterLink
          class="nav-link"
          :class="{ active: $route.name == 'Teacher' }"
          v-if="currentRole == Role.TEACHER && isLoggedIn"
          :to="{ name: 'Teacher' }"
        >
          Professeur
        </RouterLink>

        <!-- La page Profile n'est accessible que si l'utilisateur est connecté (v-if). Voir la propriété calculée isLoggedIn() qui retourne la valeur de la propriété isLoggedIn du store. -->
        <RouterLink
          class="nav-link"
          :class="{ active: $route.name == 'Profile' }"
          v-if="isLoggedIn"
          :to="{ name: 'Profile' }"
        >
          Profile
        </RouterLink>
      </div>
      <div class="d-flex">
        <div class="navbar-nav ml-auto">
          <a class="nav-link" @click="logout" v-if="isLoggedIn" href="#">
            Se déconnecter
          </a>
          <RouterLink
            v-else
            class="nav-link"
            :class="{ active: $route.name == 'Login' }"
            :to="{ name: 'Login' }"
          >
            Connexion
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
  </Suspense>
</template>
