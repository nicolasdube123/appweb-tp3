import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import QuestionColumn from '../QuestionColumn.vue'
import Question from '@/interfaces/IQuestion'

let question: Question = {
    id: 1,
    studentId: "2",
    content: "Message",
    super: true,
    priority: "1",
    category: "Action",
    private: false,
    open: true
}
let arrayQuestion: Array<Question> = [
    question
]

describe('QuestionColumn.vue', () => {

    it("Les entrants existent", async () => {
        let wrapper = mount(QuestionColumn, {
            propsData: { 
                questions: arrayQuestion
            }
        })

        let buttonCategory = wrapper.find("#addCategory")
        let buttonDeleteQuestion = wrapper.find("#deleteQuestion")
        let buttonToggleQuestion = wrapper.find("#toggleQuestion")

        expect(buttonCategory.exists()).toBeTruthy()
        expect(buttonDeleteQuestion.exists()).toBeTruthy()
        expect(buttonToggleQuestion.exists()).toBeTruthy()
    })

    it("Lorsque aucune question n'est envoyé, les champs de question n'existent pas", async () => {
        let wrapper = mount(QuestionColumn, {
            propsData: { 
                questions: []
            }
        })

        let buttonDeleteQuestion = wrapper.find("#deleteQuestion")
        let buttonToggleQuestion = wrapper.find("#toggleQuestion")

        expect(buttonDeleteQuestion.exists()).toBeFalsy()
        expect(buttonToggleQuestion.exists()).toBeFalsy()
    })

    it("Le composant contient la question envoyé en props", async () => {
        let wrapper = mount(QuestionColumn, {
            propsData: { 
                questions: arrayQuestion
            }
        })

        let studentId = wrapper.find("#studentId")
        let content = wrapper.find("#content")
        let priority = wrapper.find("#priority")
        let category = wrapper.find("#category")
        let isPrivate = wrapper.find("#isPrivate")

        expect(studentId.text()).toContain(question.studentId)
        expect(content.text()).toContain(question.content)
        expect(priority.text()).toContain(question.priority)
        expect(category.text()).toContain(question.category)
        expect(isPrivate.text()).toContain(question.private)
    })
    
    it ("Lors", async () => {
        let wrapper = mount(QuestionColumn, {
            propsData: { 
                questions: arrayQuestion
            }
        })

        let button = wrapper.find("#toggleQuestion")
        button.trigger("click")

        expect(button.text()).toContain("-")
    })

    it("Lorsque question supprimé, la question n'existe plus", async () => {
        let wrapper = mount(QuestionColumn, {
            propsData: { 
                questions: arrayQuestion
            }
        })

        wrapper.find("#deleteQuestion").trigger("click")

        expect(wrapper.vm.$props.questions.length).toBe(0)
    })
})