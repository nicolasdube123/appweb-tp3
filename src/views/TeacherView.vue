<script setup lang="ts">
    import QuestionColumn from '../components/teacher/QuestionColumn.vue'
    import { useRouter } from 'vue-router'
    import { getRole, Role } from '@/scripts/verifyRole'
    import StudentColumn from '../components/teacher/StudentColumn.vue'
    import { useQuestionStore } from '@/stores/questionStore'
    import { useUserStore } from '@/stores/userStore'
    import { ref } from 'vue'

    const questionStore = useQuestionStore()
    const userStore = useUserStore()
    const router = useRouter()

    const role = await getRole();
    if (role != Role.TEACHER) {
        router.push({ name: 'Profile' })
    }

    const questions = ref(await questionStore.getQuestions())
    const students = ref(await userStore.getStudents())

    function sendAmberAlert() {
        userStore.amberAlertShown = true
    }

</script>

<template>
    <div class="container bg-light d-flex flex-column">
        <div class="d-flex w-100">
            <QuestionColumn class="w-50" :questions="questions"/>
            <StudentColumn class="w-50" :students="students"/>
        </div>
        <button @click="sendAmberAlert" class="btn btn-danger m-4 mb-5">
            Alerte Amber
        </button>
    </div>
</template>

<style>

</style>