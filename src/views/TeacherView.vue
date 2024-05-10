<script setup lang="ts">

    import { ref } from 'vue';
    import { Question } from './StudentView.vue';
    import QuestionColumn from '../components/teacher/QuestionColumn.vue'
    import StudentColumn from '../components/teacher/StudentColumn.vue'


    function sendAmberAlert() {

    }

</script>

<template>
    <div class="container bg-light d-flex flex-column">
        <div class="d-flex w-100">
            <QuestionColumn class="w-50" />
            <StudentColumn class="w-50" />
        </div>
        <button @click="sendAmberAlert" class="btn btn-danger m-4 mb-5">
            Alerte Amber
        </button>
    </div>
</template>

<style>

</style>