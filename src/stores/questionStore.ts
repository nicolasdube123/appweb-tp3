import { ref } from 'vue'
import { defineStore } from 'pinia'
import { questionService } from '@/services/questionService'
import Question from '@/interfaces/IQuestion'

export const useQuestionStore = defineStore('questionStore', () => {
    const categories = ref<Array<String>>(["Matière", "Personnel"])
    
    function addCategory(categoryToAdd: string) {
        categories.value.push(categoryToAdd)
    }

    function removeCategory(categoryToRemove: string) {
        categories.value = categories.value.filter(category => category!== categoryToRemove)
    }

    async function getQuestions() : Promise<Question[]> {
        return await questionService.getQuestions()
    }

    async function addQuestion(questionToAdd : Question) {
        await questionService.createQuestion(questionToAdd)
    }

    async function removeQuestion(questionToRemove : string) {
        await questionService.deleteQuestion(questionToRemove)
    }

  return {addCategory, removeCategory, categories, getQuestions, addQuestion, removeQuestion }
})