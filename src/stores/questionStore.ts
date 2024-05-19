import { ref } from 'vue'
import { defineStore } from 'pinia'
import { questionService } from '@/services/questionService'
import { Question } from '@/interfaces/IQuestion'
import { QuestionDto } from '@/interfaces/IQuestion'

export const useQuestionStore = defineStore('questionStore', () => {
    const categories = ref<Array<String>>(["Matière", "Personnel"])
    const questions = ref<Array<Question>>([])
    
    function addCategory(categoryToAdd: string) {
        categories.value.push(categoryToAdd)
    }

    function removeCategory(categoryToRemove: string) {
        categories.value = categories.value.filter(category => category!== categoryToRemove)
    }

    async function refreshQuestions()  {
        const questionsResponse = await questionService.getQuestions()
        questions.value = questionsResponse
    }

    async function addQuestion(userId: string, content: string, superHand: boolean, priority: string, category: string, locked: boolean) {
        const questionDto : QuestionDto = {
            studentId: userId,
            content: content,
            super: superHand,
            priority: priority,
            category: category,
            private: locked
        }
        await questionService.createQuestion(questionDto)
        await refreshQuestions()
    }

    async function removeQuestion(questionToRemove : number) {
        await questionService.deleteQuestion(questionToRemove.toString())
        await refreshQuestions()
    }

    async function getLastQuestion() {
        const question = await questionService.getLastQuestion()
        return question
    }

  return {addCategory, removeCategory, categories, questions, refreshQuestions, addQuestion, removeQuestion, getLastQuestion }
})