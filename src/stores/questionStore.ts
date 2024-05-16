import { ref } from 'vue'
import { defineStore } from 'pinia'
import { questionService } from '@/services/questionService'
import { Question } from '@/interfaces/IQuestion'
import { QuestionDto } from '@/interfaces/IQuestion'

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

    async function addQuestion(content: string, superHand: boolean, priority: string, category: string, locked: boolean) {
        const questionDto : QuestionDto = {
            studentId: '1', //TODO
            content: content,
            super: superHand,
            priority: priority,
            category: category,
            private: locked
        }
        await questionService.createQuestion(questionDto)
    }

    async function removeQuestion(questionToRemove : number) {
        await questionService.deleteQuestion(questionToRemove.toString())
    }

  return {addCategory, removeCategory, categories, getQuestions, addQuestion, removeQuestion }
})