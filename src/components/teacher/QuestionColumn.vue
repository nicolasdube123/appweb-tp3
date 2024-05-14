<script setup lang="ts">
    import { ref } from 'vue'
    import { Question } from '../../App.vue';

    const props = defineProps({
        questions: {
            type: Object as () => Array<Question>,
            required: true
        }
    })

    function toggleQuestion(index: number) {
        props.questions[index].open = !props.questions[index].open;
    }

    function deleteQuestion(index: number) {
        props.questions.splice(index, 1)
    }

    function submitNewCategory() {

    }
</script>

<template>
    <ul class="list-group mt-3">
        <li class="list-group-item">
            <div class="d-flex justify-content-center align-items-center bg-dark-subtle p-2 rounded">
                <h5>Ajouter une catégorie:</h5>
            </div>
            <div class="mt-3">
                <form>
                    <div class="form-group my-3">
                        <label for="name">Nom de la catégorie:</label>
                        <input type="text" class="form-control" id="name">
                    </div>
                    <a class="btn btn-primary btn-block w-100 mb-3" id="addCategory" @click="submitNewCategory()">Ajouter</a>
                </form>
            </div>
        </li>
        <li v-for="(question, index) in props.questions" :key="index" class="list-group-item">
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
                <p><strong>Student ID:</strong> {{ question.studentId }}</p>
                <p><strong>Content:</strong> {{ question.content }}</p>
                <p><strong>Priority:</strong> {{ question.priority }}</p>
                <p><strong>Category:</strong> {{ question.category }}</p>
                <p><strong>Is Private:</strong> {{ question.private }}</p>
            </div>
        </li>
    </ul>
</template>

<style>

</style>