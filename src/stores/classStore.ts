import { Ref, computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { userService } from '@/services/userService'
import { questionService } from '@/services/questionService'
import { Timer } from '@/scripts/timer'
import Question from '@/interfaces/IQuestion'
import Student from '@/interfaces/IStudent'

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

    async function addQuestion(questionToAdd: Question) {
        await questionService.createQuestion(questionToAdd)
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

    async function addStudent(name: string, email: string, password: string) {
        await userService.createStudent(name, email, password)
    }

    async function removeStudent(id: number) {
        await userService.deleteUser(id.toString())
    }

  return {addCategory, removeCategory, categories, getQuestions, addQuestion, removeQuestion, getStudents, addStudent, removeStudent }
})