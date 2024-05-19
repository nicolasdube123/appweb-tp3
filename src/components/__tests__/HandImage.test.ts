import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import HandImage from '../student/HandImage.vue'
import { setActivePinia, createPinia } from 'pinia'
import { useSuperHandStore } from '@/stores/superHandStore'

describe("HandImage.vue", () => {
    beforeEach(() => {
        // creates a fresh pinia and makes it active
        // so it's automatically picked up by any useStore() call
        // without having to pass it to it: `useStore(pinia)`
        setActivePinia(createPinia())
    })
    
    it("Lorsque la main est levé, la bonne image est affiché", async () => {
        let store = useSuperHandStore()
        store.switchState()
        let wrapper = mount(HandImage)

        expect(wrapper.find("#super-raised-hand").exists()).toBeTruthy()
    })

    it("Lorsque la main n'est pas levé, la bonne image est affiché", async () => {
        let store = useSuperHandStore()
        let wrapper = mount(HandImage)

        expect(wrapper.find("#raised-hand").exists()).toBeTruthy()
    })
})