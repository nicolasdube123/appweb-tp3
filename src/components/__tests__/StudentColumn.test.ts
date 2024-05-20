import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StudentColumn from '../teacher/StudentColumn.vue'
import { Student } from '@/interfaces/IStudent'
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

describe("StudentColumn.vue", () => {

    it("Les entrants existents", async () => {
        let wrapper = mount(StudentColumn, {
            propsData: {
                students: studentArray
            }
        })

        let addButton = wrapper.find("#add")
        let deleteButton = wrapper.find("#delete")
        let toggleButton = wrapper.find("#toggle")

        expect(addButton.exists()).toBeTruthy()
        expect(deleteButton.exists()).toBeTruthy()
        expect(toggleButton.exists()).toBeTruthy()
    })

    it("Lorsque aucun étudiant n'est envoyé, les champs d'étudiant n'existent pas", async () => {
        let wrapper = mount(StudentColumn, {
            propsData: {
                students: []
            }
        })

        let addButton = wrapper.find("#add")
        let deleteButton = wrapper.find("#delete")
        let toggleButton = wrapper.find("#toggle")

        expect(addButton.exists()).toBeFalsy()
        expect(deleteButton.exists()).toBeFalsy()
        expect(toggleButton.exists()).toBeFalsy()
    })

    it("Les entrants existents", async () => {
        let wrapper = mount(StudentColumn, {
            propsData: {
                students: studentArray
            }
        })

        let name = wrapper.find("#student-name")

        expect(name.text()).toContain(student.name)
    })
})