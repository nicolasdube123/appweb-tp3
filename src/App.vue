<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue'
</script>

<template>
  <header>
    <div>
      <!-- Le composant NavigationBar est affiché sur toutes les pages de l'application. Il contient des liens de navigation. Voir son contenu dans le fichier src/components/NavigationBar.vue -->
      <NavigationBar />
    </div>
  </header>
  <main>
    <!-- RouterView (ou router-link) est la balise fournie par Vue Router qui permet d'afficher dynamiquement la "view" correspondante à la route actuelle de l'application. Cette directive ne devrait être présente qu'une seule fois. Lorsque l'utilisateur clique sur un des liens de navigation, Vue Router charge la "view" correspondante et l'affiche automatiquement à l'emplacement de la balise RouterView. -->
    <RouterView />
  </main>
</template>

<style></style>