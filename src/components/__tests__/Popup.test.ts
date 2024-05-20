import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Popup from '@/components/PopUp.vue'

describe('Popup.vue', () => {
    it("Les entrants existent", async () => {
      let wrapper = mount(Popup, {
        propsData: {
            title: "Title",
            text: "Text"
        }
      })
      const title = wrapper.find("#title")
      const text = wrapper.find("#text")
      
      expect(title.exists()).toBeTruthy()
      expect(text.exists()).toBeTruthy()
    })

    it("Quand l'utilsateur continue, emit closePopup", () => {
      let wrapper = mount(Popup, {
        propsData: {
            title: "Title",
            text: "Text"
        }
      })

      wrapper.find("#proceed").trigger("click")

      expect(wrapper.emitted("closePopUp")).toBeTruthy()
    })
})