<script setup lang="ts">
    import { Student } from '@/interfaces/IStudent';
    import { useUserStore } from '@/stores/userStore';
    import { ref } from 'vue';
    import PopUp from '@/components/PopUp.vue'

    const props = defineProps({
        students : {
            type: Object as () => Array<Student>,
                required: true
            }
        })
    const userStore = useUserStore()

    const errorPopUpShown = ref(false)

    function toggleStudent(index: number) {
        // On modifie seulement le props. Par défaut, les fenêtres d'élèves sont toujours fermées
        props.students[index].open = !props.students[index].open;
    }

    function deleteStudent(index: number) {
        props.students.splice(index, 1)
        userStore.removeStudent(index)
    }

    let studentName = ref('')
    let studentEmail = ref('')
    let studentPassword = ref('')

    async function submitNewStudent() {
        try {
            await userStore.addStudent(studentName.value, studentEmail.value, studentPassword.value)
            studentName.value = ''
            studentEmail.value = ''
            studentPassword.value = ''
            
        } catch {
            showErrorPopUp()
        }
    }

    function showErrorPopUp() {
        errorPopUpShown.value = true
    }

    function hideErrorPopUp() {
        errorPopUpShown.value = false
    }

</script>

<template>
    <ul class="list-group mt-3">
        <li class="list-group-item">
            <PopUp v-if="errorPopUpShown" 
                @closePopUp="hideErrorPopUp"
                :title="'Erreur'"
                :text="'Vérifiez que les champs sont remplis et valides'"
            />
            <PopUp v-if="errorPopUpShown" 
                @closePopUp="hideErrorPopUp"
                :title="'Erreur'"
                :text="'Vérifiez que les champs sont remplis et valides'"
            />
            <div class="d-flex justify-content-center align-items-center bg-dark-subtle p-2 rounded">
                <h5>Ajouter un élève:</h5>
            </div>
            <div class="mt-3">
                <form>
                    <div class="form-group my-3">
                        <label for="name">Nom de l'élève:</label>
                        <input type="text" class="form-control" id="name" v-model="studentName">
                    </div>
                    <div class="form-group my-3">
                        <label for="email">Courriel:</label>
                        <input type="text" class="form-control" id="email" v-model="studentEmail">
                    </div>
                    <div class="form-group my-3">
                        <label for="password">Mot de passe:</label>
                        <input type="password" class="form-control" id="password" v-model="studentPassword">
                    </div>
                    <a class="btn btn-primary btn-block w-100 mb-3" @click="submitNewStudent()" id="add">Ajouter</a>
                </form>
            </div>
        </li>
        <li v-for="(student, index) in props.students" :key="index" class="list-group-item">
            <div class="d-flex justify-content-between align-items-center bg-dark-subtle p-2 rounded">
                <button class="btn btn-danger btn-sm" @click="deleteStudent(parseInt(student.id))" id="delete">
                    Del
                </button>
                <h5>{{ student.name }}</h5>
                <button class="btn btn-primary btn-sm" @click="toggleStudent(index)" id="toggle">
                    {{ student.open ? '-' : '+' }}
                </button>
            </div>
            <div v-if="student.open" class="mt-3">
                <p><strong>Student ID:</strong> {{ student.id }}</p>
                <div class="row justify-content-center container">
                    <div v-if="!student.timer.running" class="form-group">
                        <label for="time">Temps: </label>
                        <input type="number" class="form-control" v-model="student.timer.time" id="time" />
                        <button @click="student.timer.startTimer()" class="btn btn-primary" id="start">Start</button>
                    </div>
                    <div v-else>
                        <p class="h3">Temps restant: {{ student.timer.formatTime() }}</p>
                        <button @click="student.timer.pauseTimer()" class="btn btn-secondary" id="pause">Pause</button>
                        <button @click="student.timer.stopTimer()" class="btn btn-danger" id="stop">Stop</button>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>

<style>

</style>