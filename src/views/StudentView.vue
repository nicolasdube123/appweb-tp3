<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import { useQuestionStore } from '@/stores/questionStore'
    import PopUp from '@/components/PopUp.vue'
    import { Role, getRole } from '@/scripts/verifyRole';
    import router from '@/router';
    import { Question } from '@/interfaces/IQuestion';
    import { useAuthStore } from '@/stores/authStore';
    import HandImage from '@/components/student/HandImage.vue';
    import QuestionForm from '@/components/student/QuestionForm.vue';

    const role = await getRole();
    if (role != Role.STUDENT) {
        router.push({ name: 'Profile' })
    }
    
    const questionStore = useQuestionStore()
    const questions = ref<Array<Question>>([])
    onMounted(async () => {
        await questionStore.refreshQuestions()
        questions.value = questionStore.questions
    })
    //TODO:
    //Manque à tester si dynamique lorsqu'on ajoute/supprime à questionStore.questions
    //Aussi vérifier si les props sont passées dynamiquement

    const authStore = useAuthStore()
    const userId = computed(() => authStore.getUserId)
    // On compare le userId à l'attribut studentId des questions pour seulement afficher les questions de l'élève
    const filteredQuestions = ref<Array<Question>>(questions.value.filter(question => question.studentId === userId.value))

    const categories = ref<String[]>(questionStore.categories)
    const priorities = [
        { value: 1, label: 'P1' },
        { value: 2, label: 'P2' },
        { value: 3, label: 'P3' },
        { value: 4, label: 'P4' },
        { value: 5, label: 'P5' }
    ]

    const errorPopUpShown = ref(false)


    function askQuestion(userId: string, content: string, superHand: boolean, priority: string, category: string, locked: boolean) {
        questionStore.addQuestion(userId, content, superHand, priority, category, locked)
    }

    function showErrorPopUp() {
        errorPopUpShown.value = true
    }

    function hideErrorPopUp() {
        errorPopUpShown.value = false
    }

    function toggleQuestion(index: number) {
        questions.value[index].open = !questions.value[index].open 
    }

    function deleteQuestion(index: number) {
        questions.value.splice(index, 1)
        questionStore.removeQuestion(index)
    }
</script>

<template>
    <PopUp v-if="errorPopUpShown" 
        @closePopUp="hideErrorPopUp"
        :title="'Erreur'"
        :text="'Vérifiez que les champs sont complets'"
    />
    <div class="d-flex container flex-column p-5">
        <div class="d-flex">
            <!--HandComponent-->
            <HandImage />
            <!--Hand/-->
            <!--FormComponent-->
            <QuestionForm @send="askQuestion" @showError="showErrorPopUp"/>
            <!--Form/-->
        </div>
        <!--Questions-->
        <div class="p-5 list-group">
            <ul>
                <li v-for="(question, index) in filteredQuestions" :key="index" class="list-group-item">
                    <div class="d-flex justify-content-between align-items-center bg-dark-subtle p-2 rounded">
                        <button class="btn btn-danger btn-sm" id="deleteQuestion" @click="deleteQuestion(index)">
                            Del
                        </button>
                        <h5>Question {{ index + 1 }}</h5>
                        <button class="btn btn-primary btn-sm" id="toggleQuestion" @click="toggleQuestion(index)">
                            {{ question.open ? '-' : '+' }}
                        </button>
                    </div>
                    <div v-if="question.open" class="mt-3">
                        <p id="studentId"><strong>Student ID:</strong> {{ question.studentId }}</p>
                        <p id="content"><strong>Content:</strong> {{ question.content }}</p>
                        <p id="priority"><strong>Priority:</strong> {{ question.priority }}</p>
                        <p id="category"><strong>Category:</strong> {{ question.category }}</p>
                        <p id="isPrivate"><strong>Is Private:</strong> {{ question.private }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>

</style>