<script setup lang="ts">
    import { Question } from '@/interfaces/IQuestion';
    import { useQuestionStore } from '@/stores/questionStore'
    import { onMounted, ref } from 'vue';
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

    const category = ref('')
    const errorPopUpShown = ref(false)

    const students = ref<Array<StudentDto>>([])

    onMounted(async () => {
        for (const question of props.questions) {
            const id = question.studentId
            const name = await userStore.getStudentNameById(id)
            students.value.push({ id, name })
        }
    })
    
    function toggleQuestion(index: number) {
        // On modifie seulement le props. Par défaut, les fenêtres de question sont toujours fermées
        props.questions[index].open = !props.questions[index].open 
    }

    function deleteQuestion(index: number) {
        props.questions.splice(index, 1)
        questionStore.removeQuestion(index)
    }

    function submitNewCategory() {
        if(category.value.trim().length != 0 && !questionStore.categories.includes(category.value.trim())) {
            questionStore.addCategory(category.value)
            category.value = ''
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

    function findStudentFromId(id: string) {
        const student = students.value.find(student => student.id === id);
        return student ? student.name : 'Inconnu';
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
                        <input type="text" class="form-control" id="name" v-model="category">
                    </div>
                    <a class="btn btn-primary btn-block w-100 mb-3" id="addCategory" @click="submitNewCategory()">Ajouter</a>
                </form>
            </div>
        </li>
        <li v-for="(question, index) in props.questions" :key="index" class="list-group-item">
            <div class="d-flex justify-content-between align-items-center bg-dark-subtle p-2 rounded">
                <button class="btn btn-danger btn-sm" id="deleteQuestion" @click="deleteQuestion(question.id)">
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