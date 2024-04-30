<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Field, Form, ErrorMessage, defineRule, validate } from 'vee-validate'
import { required } from '@vee-validate/rules'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

// Définir les règles de validation
defineRule('isRequired', required);

const router = useRouter();
const authStore = useAuthStore();
const email = ref('');
const password = ref('');

const authServiceError = computed(() => authStore.authServiceError);

onMounted(() => {
  authStore.clearError();
});

const login = async () => {
  // Validation manuelle avant la soumission
  const result = await validate({});
  if (!result.valid) {
    return; // Arrête la fonction si la validation échoue
  }

  await authStore.login({
    email: email.value,
    password: password.value
  });
  
  if (!authStore.authServiceError) {
    router.push({ name: 'Profile' });
  }
};

// Fonction pour vérifier si un champ est vide, utilisée dans les règles de vee-validate
const isRequired = value => !value ? 'Ce champ est requis.' : true;
</script>

<template>
  <div>
    <h1>Connexion</h1>
    <div class="container my-5">
      <div class="row justify-content-center">
        <!-- avec VeeValidate on utilise Form au lieu de form et pas de .prevent comme dans l'exemple de Vue Router.... -->
        <Form @submit="login">
          <div class="mb-3">
            <label class="form-label" for="email-input">Courriel</label>
            <!-- avec VeeValidate, on remplace les input par Field et on lui donne un nom -->
            <!-- le nom est ensuite utilisé pour afficher les messages d'erreur dans ErrorMessage -->
            <!-- le message d'erreur provient de la règle isRequired déclarée en haut -->
            <Field
              class="form-control"
              id="email-input"
              name="email-input"
              type="email"
              :rules="isRequired"
              v-model="email"
            />
            <ErrorMessage class="text-danger" name="email-input" />
          </div>
          <div class="mb-3">
            <label class="form-label" for="password-input">Mot de passe</label>
            <Field
              class="form-control"
              id="password-input"
              name="password-input"
              type="password"
              :rules="isRequired"
              v-model="password"
            />
            <ErrorMessage class="text-danger" name="password-input" />
          </div>
          <div class="p-3 mb-2 bg-danger text-white" v-if="authServiceError">
            {{ authServiceError }}
          </div>
          <button class="btn btn-primary" type="submit">Se connecter</button>
        </Form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>