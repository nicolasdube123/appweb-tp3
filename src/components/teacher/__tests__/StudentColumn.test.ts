import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StudentColumn from '../StudentColumn.vue'
import Student from '@/interfaces/IStudent'
import { Timer } from '@/scripts/timer'

let student: Student = {
    id: "1",
    name: "Étudiant",
    open: false,
    timer: new Timer()
}
let studentArray: Array<Student> = [
    student
]

describe("StudentColumn", () => {

    it("Les entrants existents", async () => {
        let wrapper = mount(StudentColumn, {
            propsData: {
                students: studentArray
            }
        })

        let toggleButton = wrapper.find("#add")

        expect(toggleButton.exists()).toBeTruthy()
    })
})