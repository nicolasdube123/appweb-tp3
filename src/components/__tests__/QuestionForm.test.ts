import { describe, it, expect, beforeEach } from 'vitest'
import { DOMWrapper, flushPromises, mount } from '@vue/test-utils'
import QuestionForm from '../student/QuestionForm.vue'
import { setActivePinia, createPinia } from 'pinia'
import { useSuperHandStore } from '@/stores/superHandStore'

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

    it("Par défaut, les entrants ont leur valeur par défaut", async () => {
        let wrapper = mount(QuestionForm)
        let superHandButton = wrapper.find("#empty-star")
        let priority = wrapper.find("#priority")
        let category = wrapper.find("#category")
        let unlocked = wrapper.find("#unlocked")

        expect(superHandButton.exists()).toBeTruthy()
        expect(priority.text()).toContain("...")
        expect(category.text()).toContain("...")
        expect(unlocked.exists()).toBeTruthy()
    })

    it("Quand les valeurs changent, les entrant ont leur valeur changé", async () => {
        let store = useSuperHandStore()
        store.switchState()
        let wrapper = mount(QuestionForm)

        let superHandButton = wrapper.find("#full-star")
        
        await wrapper.find("#priority").setValue("P1")
        wrapper.vm.$nextTick()
        let priority = wrapper.find("#priority")

        await wrapper.find("#category").setValue("Personnel")
        wrapper.vm.$nextTick()
        let category = wrapper.find("#category")

        expect(superHandButton.exists()).toBeTruthy()
        expect(priority.text()).toContain("P1")
        expect(category.text()).toContain("Personnel")
    })

    it("Quand le formulaire est envoyé, avec une question vide, une erreur est emitted", async () => {
        let wrapper = mount(QuestionForm)

        wrapper.find("#ask-question").trigger("click")

        expect(wrapper.emitted("showError")).toBeTruthy()
    })
})