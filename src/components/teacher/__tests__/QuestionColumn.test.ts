import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import QuestionColumn from '../QuestionColumn.vue'
import Question from '@/interfaces/IQuestion'

let arrayQuestions: Array<Question> = [
    {
        id: 1,
        studentId: "2",
        content: "Message",
        super: true,
        priority: "1",
        category: "Action",
        private: false,
        open: true
    }
]

describe('QuestionColumn.vue', () => {

    it("Les entrants existent", async () => {
        let wrapper = mount(QuestionColumn, {
            propsData: { 
                questions: arrayQuestions
            }
        })

        let buttonCategory = wrapper.find("#addCategory")
        let buttonDeleteQuestion = wrapper.find("#deleteQuestion")
        let buttonToggleQuestion = wrapper.find("#toggleQuestion")

        expect(buttonCategory.exists()).toBeTruthy()
        expect(buttonDeleteQuestion.exists()).toBeTruthy()
        expect(buttonToggleQuestion.exists()).toBeTruthy()
    })
})