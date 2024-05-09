<script setup lang="ts">
    import { ref } from 'vue'
    import { Timer } from '../../scripts/timer'
    
    export interface Student {
        id: String;
        name: String;
        open: Boolean;
        timer: Timer;
    }

    //Temporaire
    const students = ref<Array<Student>>([
        {
            id: "1",
            name: "John Doe",
            open: false,
            timer: new Timer()
        },
        {
            id: "2",
            name: "Alice Smith",
            open: false,
            timer: new Timer()
        },
        {
            id: "3",
            name: "David Johnson",
            open: false,
            timer: new Timer()
        },
        {
            id: "4",
            name: "Emily Brown",
            open: false,
            timer: new Timer()
        },
        {
            id: "5",
            name: "Michael Wilson",
            open: false,
            timer: new Timer()
        }
    ])

    function toggleStudent(index: number) {
        students.value[index].open = !students.value[index].open;
    }

    function deleteStudent(index: number) {
        students.value.splice(index, 1)
    }

    function submitNewStudent() {

    }
</script>

<template>
    <ul class="list-group mt-3">
        <li class="list-group-item">
            <div class="d-flex justify-content-center align-items-center bg-dark-subtle p-2 rounded">
                <h5>Ajouter un élève:</h5>
            </div>
            <div class="mt-3">
                <form>
                    <div class="form-group my-3">
                        <label for="name">Nom de l'élève:</label>
                        <input type="text" class="form-control" id="name">
                    </div>
                    <a class="btn btn-primary btn-block w-100 mb-3" id="start" @click="submitNewStudent()">Ajouter</a>
                </form>
            </div>
        </li>
        <li v-for="(student, index) in students" :key="index" class="list-group-item">
            <div class="d-flex justify-content-between align-items-center bg-dark-subtle p-2 rounded">
                <button class="btn btn-danger btn-sm" @click="deleteStudent(index)">
                    Del
                </button>
                <h5>{{ student.name }}</h5>
                <button class="btn btn-primary btn-sm" @click="toggleStudent(index)">
                    {{ student.open ? '-' : '+' }}
                </button>
            </div>
            <div v-if="student.open" class="mt-3">
                <p><strong>Student ID:</strong> {{ student.id }}</p>
                <div class="row justify-content-center container">
                    <div v-if="!student.timer.running" class="form-group">
                        <label for="time">Temps: </label>
                        <input type="number" class="form-control" v-model="student.timer.time" id="time" />
                        <button @click="student.timer.startTimer()" class="btn btn-primary">Start</button>
                    </div>
                    <div v-else>
                        <p class="h3">Temps restant: {{ student.timer.formatTime() }}</p>
                        <button @click="student.timer.pauseTimer()" class="btn btn-secondary">Pause</button>
                        <button @click="student.timer.stopTimer()" class="btn btn-danger">Stop</button>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>

<style>

</style>