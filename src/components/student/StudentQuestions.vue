<script setup lang="ts">
    import { Question } from '@/interfaces/IQuestion'
    import { useAuthStore } from '@/stores/authStore'
    import { computed } from 'vue'

    const emit = defineEmits(['delete']);
    const props = defineProps({
        questions: {
            type: Array<Question>,
            required: true
        }
    })

    const authStore = useAuthStore()
    const userId = computed(() => authStore.getUserId)

    // On compare le userId à l'attribut studentId des questions pour seulement afficher les questions de l'élève
    const filteredQuestions = computed(() => {
        return props.questions.filter(question => question.studentId === userId.value || !question.private);
    })
    
    // Le toggle est purement pour le point de vue du professeur, rien à modifier dans la database
    function toggleQuestion(index: number) {
        filteredQuestions.value[index].open = !filteredQuestions.value[index].open 
    }

    function deleteQuestion(index: number) {
        emit('delete', index)
    }
</script>

<template>
    <div class="p-5 list-group">
        <ul>
            <li v-for="(question, index) in filteredQuestions" :key="index" class="list-group-item">
                <div class="d-flex justify-content-between align-items-center p-2 rounded" :class="{'bg-dark-subtle': !question.super, 'bg-warning': question.super}">
                    <button class="btn btn-danger btn-sm" id="deleteQuestion" @click="deleteQuestion(question.id)">
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
                    <p id="category"><strong>Catégorie:</strong> {{ question.category }}</p>
                    <p id="isPrivate"><strong v-if="question.private">Privé</strong><strong v-else>Public</strong></p>
                </div>
            </li>
        </ul>
        </div>
</template>

<style>

</style>