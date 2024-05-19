<script setup lang="ts">
    import QuestionColumn from '../components/teacher/QuestionColumn.vue'
    import { useRouter } from 'vue-router'
    import { getRole, Role } from '@/scripts/verifyRole'
    import StudentColumn from '../components/teacher/StudentColumn.vue'
    import { useQuestionStore } from '@/stores/questionStore'
    import { useUserStore } from '@/stores/userStore'
    import { onMounted, ref } from 'vue'
    import { Question } from '@/interfaces/IQuestion'
    import Student from '@/interfaces/IStudent'

    const questionStore = useQuestionStore()
    const userStore = useUserStore()
    const router = useRouter()

    const role = await getRole();
    if (role != Role.TEACHER) {
        router.push({ name: 'Profile' })
    }

    const questions = ref<Array<Question>>([])
    onMounted(async () => {
        await questionStore.refreshQuestions()
        questions.value = questionStore.questions
    })
    //TODO:
    //Manque à tester si dynamique lorsqu'on ajoute/supprime à questionStore.questions
    //Aussi vérifier si les props sont passées dynamiquement

    const students = ref<Array<Student>>([])
    onMounted(async () => {
        await userStore.refreshStudents()
        students.value = userStore.students
    })
    //TODO:
    //Manque à tester si dynamique lorsqu'on ajoute/supprime à userStore.students
    //Aussi vérifier si les props sont passées dynamiquement

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