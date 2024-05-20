<script setup lang="ts">
    import QuestionColumn from '../components/teacher/QuestionColumn.vue'
    import { useRouter } from 'vue-router'
    import { getRole, Role } from '@/scripts/verifyRole'
    import StudentColumn from '../components/teacher/StudentColumn.vue'
    import { useQuestionStore } from '@/stores/questionStore'
    import { useUserStore } from '@/stores/userStore'
    import { ref, watchEffect } from 'vue'
    import { Question } from '@/interfaces/IQuestion'
    import { Student } from '@/interfaces/IStudent'

    const questionStore = useQuestionStore()
    const userStore = useUserStore()
    const router = useRouter()

    const role = await getRole();
    if (role != Role.TEACHER) {
        router.push({ name: 'Profile' })
    }

    const questions = ref<Question[]>([]);
    async function refreshQuestions() {
        await questionStore.refreshQuestions();
        questions.value = questionStore.questions;
    }

    const students = ref<Student[]>([])
    async function refreshStudents() {
        await userStore.refreshStudents()
        students.value = userStore.students
    }

    async function refresh() {
        refreshQuestions()
        refreshStudents()
    }

    watchEffect(() => {
        refresh()
    })

    function sendAmberAlert() {
        userStore.amberAlertShown = true
    }

</script>

<template>
    <div class="container bg-light d-flex flex-column">
        <button @click="refresh" class="btn btn-info m-4 mb-5">
            Refresh
        </button>
        <div class="d-flex w-100">
            <QuestionColumn class="w-50" :questions="questions" @refresh="refresh"/>
            <StudentColumn class="w-50" :students="students"/>
        </div>
        <button @click="sendAmberAlert" class="btn btn-danger m-4 mb-5">
            Alerte Amber
        </button>
    </div>
</template>

<style>

</style>