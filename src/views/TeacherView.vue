<script setup lang="ts">
    import { ref } from 'vue';
    import { Question } from './StudentView.vue';

    const questions = ref<Array<Question>>([
        {
            studentId: "1",
            content: "Question 1 content",
            super: false,
            priority: "P1",
            category: "Matière",
            private: false,
            open: false
        },
        {
            studentId: "2",
            content: "Question 2 content",
            super: false,
            priority: "P2",
            category: "Personnel",
            private: false,
            open: false
        },
        {
            studentId: "3",
            content: "Question 3 content",
            super: false,
            priority: "P3",
            category: "Matière",
            private: false,
            open: false
        },
        {
            studentId: "4",
            content: "Question 4 content",
            super: false,
            priority: "P4",
            category: "Personnel",
            private: false,
            open: false
        },
        {
            studentId: "5",
            content: "Question 5 content",
            super: false,
            priority: "P5",
            category: "Matière",
            private: false,
            open: false
        }
    ])

    function toggleQuestion(index: number) {
        questions.value[index].open = !questions.value[index].open;
    }

    function deleteQuestion(index: number) {
        questions.value.splice(index, 1)
    }
</script>

<template>
    <div class="container bg-light d-flex">
        <div class="w-25">
            <ul class="list-group mt-3">
                <li v-for="(question, index) in questions" :key="index" class="list-group-item">
                    <div class="d-flex justify-content-between align-items-center">
                        <button class="btn btn-danger btn-sm" @click="deleteQuestion(index)">
                            Del
                        </button>
                        <h5>Question {{ index + 1 }}</h5>
                        <button class="btn btn-primary btn-sm" @click="toggleQuestion(index)">
                            {{ question.open ? '-' : '+' }}
                        </button>
                    </div>
                    <div v-if="question.open">
                        <p><strong>Student ID:</strong> {{ question.studentId }}</p>
                        <p><strong>Content:</strong> {{ question.content }}</p>
                        <p><strong>Priority:</strong> {{ question.priority }}</p>
                        <p><strong>Category:</strong> {{ question.category }}</p>
                        <p><strong>Is Private:</strong> {{ question.private }}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div>

        </div>
    </div>
</template>

<style>

</style>