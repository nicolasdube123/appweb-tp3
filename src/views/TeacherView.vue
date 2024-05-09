<script setup lang="ts">
    import { Question, Student } from '@/App.vue';
import QuestionColumn from '../components/teacher/QuestionColumn.vue'
    import StudentColumn from '../components/teacher/StudentColumn.vue'

    const props = defineProps({
        questions: {
            type: Object as () => Array<Question>,
            required: true
        },
        students : {
            type: Object as () => Array<Student>,
            required: true
        }
    })

    function sendAmberAlert() {

    }

</script>

<template>
    <div class="container bg-light d-flex flex-column">
        <div class="d-flex w-100">
            <QuestionColumn class="w-50" :questions="props.questions"/>
            <StudentColumn class="w-50" :students="props.students"/>
        </div>
        <button @click="sendAmberAlert" class="btn btn-danger m-4 mb-5">
            Alerte Amber
        </button>
    </div>
</template>

<style>

</style>