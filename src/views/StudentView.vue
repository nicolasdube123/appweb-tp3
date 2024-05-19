<script setup lang="ts">
    import { computed, onMounted, ref, triggerRef } from 'vue';
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
    const filteredQuestions = computed(() => {
        return questions.value.filter(question => question.studentId === userId.value);
    })

    const errorPopUpShown = ref(false)

    function askQuestion(question : Question) {
        questions.value.push(question)
    }

    function showErrorPopUp() {
        errorPopUpShown.value = true
    }

    function hideErrorPopUp() {
        errorPopUpShown.value = false
    }

    function toggleQuestion(index: number) {
        filteredQuestions.value[index].open = !filteredQuestions.value[index].open 
    }

    async function deleteQuestion(index: number, componentIndex: number) {
        await questionStore.removeQuestion(index)
        questions.value.splice(componentIndex, 1)
        //En accédant à la valeur du computed filteredQuestions, on rafraichit sa valeur
        triggerRef(filteredQuestions)
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
                        <p id="content"><strong>Question:</strong> {{ question.content }}</p>
                        <p id="priority"><strong>Priorité:</strong> {{ question.priority }}</p>
                        <p id="category"><strong>Categorie:</strong> {{ question.category }}</p>
                        <p id="isPrivate"><strong v-if="question.private">Privé</strong><strong v-else>Public</strong></p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>

</style>