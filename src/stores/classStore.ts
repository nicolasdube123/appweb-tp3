import { Ref, computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { Question, Student } from '@/App.vue'
import { userService } from '@/services/userService'
import { questionService } from '@/services/questionService'
import { Timer } from '@/scripts/timer'

export const useClassStore = defineStore('class', () => {
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

    function addQuestion() {
        //faire appel aux services
    }

    async function removeQuestion(questionToRemove : string) {
        await questionService.deleteQuestion(questionToRemove)
    }

    async function getStudents() : Promise<Student[]> {
        const users = await userService.getStudents()
        return users.map(user => ({
            id: user.id.toString(),
            name: user.name,
            open: false,
            timer: new Timer()
        }))
    }

    function addStudent() {
        //faire appel aux services
    }

    function removeStudent() {
        //faire appel aux services
    }

  return {addCategory, removeCategory, categories, getQuestions, addQuestion, removeQuestion, getStudents, addStudent, removeStudent }
})