<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import NavigationBar from './components/NavigationBar.vue'
  import StudentView from './views/StudentView.vue'
  import TeacherView from './views/TeacherView.vue'
  import { Timer } from './scripts/timer'
  import { ref } from 'vue';

  export interface Question {
        studentId: String;
        content: String;
        super: Boolean;
        priority: String;
        category: String;
        private: Boolean;
        open: Boolean //à retirer plus tard
    }
    
    //temporaire
    const questions = ref<Array<Question>>([
        {
            studentId: "1",
            content: "Question 1 content",
            super: false,
            priority: "P1",
            category: "Matière",
            private: false,
            open: false
        },
        {
            studentId: "2",
            content: "Question 2 content",
            super: false,
            priority: "P2",
            category: "Personnel",
            private: false,
            open: false
        },
        {
            studentId: "3",
            content: "Question 3 content",
            super: false,
            priority: "P3",
            category: "Matière",
            private: false,
            open: false
        },
        {
            studentId: "4",
            content: "Question 4 content",
            super: false,
            priority: "P4",
            category: "Personnel",
            private: false,
            open: false
        },
        {
            studentId: "5",
            content: "Question 5 content",
            super: false,
            priority: "P5",
            category: "Matière",
            private: false,
            open: false
        }
    ])

    export interface Student {
        id: String;
        name: String;
        open: Boolean;
        timer: Timer;
    }

    //Temporaire
    const students = ref<Array<Student>>([
        {
            id: "1",
            name: "John Doe",
            open: false,
            timer: new Timer()
        },
        {
            id: "2",
            name: "Alice Smith",
            open: false,
            timer: new Timer()
        },
        {
            id: "3",
            name: "David Johnson",
            open: false,
            timer: new Timer()
        },
        {
            id: "4",
            name: "Emily Brown",
            open: false,
            timer: new Timer()
        },
        {
            id: "5",
            name: "Michael Wilson",
            open: false,
            timer: new Timer()
        }
    ])
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
    <Suspense>
      <RouterView></RouterView>
    </Suspense>
  </main>
</template>

<style></style>