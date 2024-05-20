<script setup lang="ts">
    import { Question } from '@/interfaces/IQuestion';
    import { useQuestionStore } from '@/stores/questionStore'
    import { computed, ref, watchEffect } from 'vue';
    import PopUp from '@/components/PopUp.vue'
    import { useUserStore } from '@/stores/userStore';
    import { StudentDto } from '@/interfaces/IStudent';

    const questionStore = useQuestionStore()
    const userStore = useUserStore()

    const props = defineProps({
        questions: {
            type: Object as () => Array<Question>,
            required: true
        }
    })

    const categoryField = ref('')
    const errorPopUpShown = ref(false)

    const students = ref<Array<StudentDto>>([])

    // On parcourt chaque question pour récupérer le nom des étudiants associés à leurs IDs, 
    // puis on met à jour une liste réactive de ces étudiants
    const fetchStudentsComputed = computed(() => {
        watchEffect(async () => {
            const fetchedStudents = await Promise.all(
                props.questions.map(async (question) => {
                    const name = await userStore.getStudentNameById(question.studentId)
                    return { id: question.studentId.toString(), name }
                })
            )
            students.value = fetchedStudents
        })
    })

    // Avant que la liste 'fetchStudentsComputed' soit remplie, le nom des élèves affichera 'Loading...'
    function findStudentFromId(id: string) {
        fetchStudentsComputed.value
        const student = students.value.find(student => student.id === id);
        return student ? student.name : 'Loading...';
    }

    // On modifie seulement le props. Par défaut, les fenêtres de question sont toujours fermées
    function toggleQuestion(index: number) {
        props.questions[index].open = !props.questions[index].open 
    }

    // L'index des questions en props et de celles dans la BD est différent:
    // Si on a les questions 1 2 3 4 et on supprime 3, la dernière question sera 3 dans le component alors qu'elle est 4 dans la BD
    function deleteQuestion(questionId: number, componentIndex: number) {
        props.questions.splice(componentIndex, 1)
        questionStore.removeQuestion(questionId)
    }

    // Inutile de faire une méthode supplémentaire pour la validation
    function submitNewCategory() {
        if(categoryField.value.trim().length != 0 && !questionStore.categories.includes(categoryField.value.trim())) {
            questionStore.addCategory(categoryField.value)
            categoryField.value = ''
        } else {
            showErrorPopUp()
        }
    }

    function showErrorPopUp() {
        errorPopUpShown.value = true
    }

    function hideErrorPopUp() {
        errorPopUpShown.value = false
    }

</script>

<template>
    <ul class="list-group mt-3">
        <li class="list-group-item">
            <PopUp v-if="errorPopUpShown" 
                @closePopUp="hideErrorPopUp"
                :title="'Erreur'"
                :text="'Vérifiez que les champs sont remplis'"
            />
            <div class="d-flex justify-content-center align-items-center bg-dark-subtle p-2 rounded">
                <h5>Ajouter une catégorie:</h5>
            </div>
            <div class="mt-3">
                <form>
                    <div class="form-group my-3">
                        <label for="name">Nom de la catégorie:</label>
                        <input type="text" class="form-control" id="name" v-model="categoryField">
                    </div>
                    <a class="btn btn-primary btn-block w-100 mb-3" id="addCategory" @click="submitNewCategory()">Ajouter</a>
                </form>
            </div>
        </li>
        <li v-for="(question, index) in props.questions" :key="index" class="list-group-item">
            <div class="d-flex justify-content-between align-items-center p-2 rounded" :class="{'bg-dark-subtle': !question.super, 'bg-warning': question.super}">
                <button class="btn btn-danger btn-sm" id="deleteQuestion" @click="deleteQuestion(question.id, index)">
                    Del
                </button>
                <h5>Question {{ index + 1 }}</h5>
                <button class="btn btn-primary btn-sm" id="toggleQuestion" @click="toggleQuestion(index)">
                    {{ question.open ? '-' : '+' }}
                </button>
            </div>
            <div v-if="question.open" class="mt-3">
                <p id="studentId"><strong>Élève:</strong> {{ findStudentFromId(question.studentId) }}</p>
                <p id="content"><strong>Question:</strong> {{ question.content }}</p>
                <p id="priority"><strong>Priorité:</strong> {{ question.priority }}</p>
                <p id="category"><strong>Categorie:</strong> {{ question.category }}</p>
                <p id="isPrivate"><strong v-if="question.private">Privé</strong><strong v-else>Public</strong></p>
            </div>
        </li>
    </ul>
</template>

<style>

</style>