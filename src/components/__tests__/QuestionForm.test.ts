import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import QuestionForm from '../student/QuestionForm.vue'
import { setActivePinia, createPinia } from 'pinia'

describe("QuestionForm.vue", () => {
    beforeEach(() => {
        // creates a fresh pinia and makes it active
        // so it's automatically picked up by any useStore() call
        // without having to pass it to it: `useStore(pinia)`
        setActivePinia(createPinia())
    })
    it("Les entrants existents", async () => {
        let wrapper = mount(QuestionForm)   

        let superHandButton = wrapper.find("#star-super-hand")
        let questionField = wrapper.find("#question-field")
        let askQuestionButton = wrapper.find("#ask-question")
        let priorityList = wrapper.find("#priority")
        let categoryList = wrapper.find("#category")
        
        expect(superHandButton.exists()).toBeTruthy()
        expect(questionField.exists()).toBeTruthy()
        expect(askQuestionButton.exists()).toBeTruthy()
        expect(priorityList.exists()).toBeTruthy()
        expect(categoryList.exists()).toBeTruthy()
    })
})