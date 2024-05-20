<script setup lang="ts">
    import { ref, watchEffect } from 'vue'
    import PopUp from '@/components/PopUp.vue'
    import { Role, getRole } from '@/scripts/verifyRole'
    import router from '@/router'
    import { Question } from '@/interfaces/IQuestion'
    import HandImage from '@/components/student/HandImage.vue'
    import QuestionForm from '@/components/student/QuestionForm.vue'
    import { useQuestionStore } from '@/stores/questionStore'
    import StudentQuestions from '@/components/student/StudentQuestions.vue'
    import { useUserStore } from '@/stores/userStore'

    const role = await getRole();
    if (role != Role.STUDENT) {
        router.push({ name: 'Profile' })
    }

    const questionStore = useQuestionStore()
    const questions = ref<Question[]>([]);

    async function refreshQuestions() {
        await questionStore.refreshQuestions();
        questions.value = questionStore.questions;
    }

    const userStore = useUserStore()
    const amberAlertActive = ref(false)

    function closeAmberAlert() {
        userStore.amberAlertShown = false
    }

    watchEffect(() => {
        refreshQuestions()
        amberAlertActive.value = userStore.amberAlertShown
    })

    async function askQuestion(userId: string, content: string, superHand: boolean, priority: string, category: string, locked: boolean) {
        await questionStore.addQuestion(userId, content, superHand, priority, category, locked)
        refreshQuestions()
    }

    async function deleteQuestion(index: number) {
        await questionStore.removeQuestion(index)
        refreshQuestions()
    }

    const errorPopUpShown = ref(false)

    function showErrorPopUp() {
        errorPopUpShown.value = true
    }

    function hideErrorPopUp() {
        errorPopUpShown.value = false
    }
</script>

<template>
    <PopUp v-if="userStore.amberAlertShown" 
        @closePopUp="closeAmberAlert"
        :title="'ALERTE AMBER'"
    />
    <PopUp v-if="errorPopUpShown" 
        @closePopUp="hideErrorPopUp"
        :title="'Erreur'"
        :text="'Vérifiez que les champs sont complets'"
    />
    <div class="d-flex container flex-column p-5">
        <div class="d-flex">
            <HandImage />
            <QuestionForm @send="askQuestion" @showError="showErrorPopUp"/>
        </div>
        <button @click="refreshQuestions" class="btn btn-info m-4 mb-5">
            Refresh
        </button>
        <StudentQuestions :questions="questions" @delete="deleteQuestion"/>
    </div>
</template>

<style scoped>

</style>