<script setup lang="ts">
    import { ref } from 'vue';
    import { useQuestionStore } from '@/stores/questionStore'
    
    const questionStore = useQuestionStore()
    const categories = ref<String[]>(questionStore.categories)
    const priorities = [
        { value: 1, label: 'P1' },
        { value: 2, label: 'P2' },
        { value: 3, label: 'P3' },
        { value: 4, label: 'P4' },
        { value: 5, label: 'P5' }
    ]

    //Options formulaire
    const raisedHand = ref(true)
    const superHand = ref(false)
    const content = ref('')
    const locked = ref(false)
    const priority = ref('')
    const category = ref('')

    //TODO: Pour la main levée (super ou non), afficher la valeur de la dernière main levée et non l'état de l'étoile

    function askQuestion() {
        if (validateQuestion()) {
            clearErrors()
            raisedHand.value = true
            questionStore.addQuestion(content.value, superHand.value, priority.value, category.value, locked.value)
        } else {
            throwError()
        }
    }

    function validateQuestion() : boolean {
        return true
        //TODO
    }

    function throwError() {
        //TODO
    }


    function clearErrors() {
        //TODO
    }
</script>
<div class="w-25 d-flex">
</div>
<template>
    <div class="d-flex container">
        <!--HandComponent-->
        <div class="w-25 d-flex">
            <div class="w-75 d-flex align-items-center justify-content-center">
                <img v-if="raisedHand && !superHand" src="../assets/hand.png" alt="Main levée" class="img-fluid p-2">
                <img v-if="raisedHand && superHand" src="../assets/super-hand.png" alt="Super-main levée" class="img-fluid p-2">
            </div>
        </div>
        <!--Hand/-->
        <!--FormComponent-->
        <div class="w-75 d-flex bg-dark rounded p-3">
            <div class="w-25">
                <button @click="superHand = !superHand" class="btn btn-warning m-2 my-4 p-2 d-flex align-items-center justify-content-center">
                    <img v-if="!superHand" src="../assets/star-empty.png" alt="Super-main" class="img-fluid">
                    <img v-if="superHand" src="../assets/star-full.png" alt="Super-main" class="img-fluid">
                </button>
                <button v-if=raisedHand @click="raisedHand = !raisedHand" class="btn btn-primary m-2 my-4 p-2 d-flex align-items-center justify-content-center">
                    <img src="../assets/down-arrow.png" alt="Baisser la main" class="img-fluid bg-primary">
                </button>
            </div>
            <div class="w-75 m-2 d-flex">
                <div class="d-flex flex-column w-75">
                    <div class="h-75 p-1 form-floating">
                        <textarea class="form-control h-100" placeholder="Leave a comment here" id="question-field" v-model="content"></textarea>
                        <label for="question-field">Votre question:</label>
                    </div>
                    <button @click="askQuestion" class="h-25 btn btn-primary m-2">
                        Lever la main
                    </button>
                </div>
                <div class="d-flex flex-column col">
                    <div class="h-75 d-flex flex-column">
                        <div class="p-2 h-50">
                            <h4 class="text-center text-white">Priorité</h4>
                            <select class="form-select" v-model="priority">
                                <option value="" disabled>...</option>
                                <option v-for="option in priorities" :key="option.value" :value="option.value">{{ option.label }}</option>
                            </select>
                        </div>
                        <div class="p-2 h-50">
                            <h4 class="text-center text-white">Catégorie</h4>
                            <select class="form-select" v-model="category">
                                <option value="" disabled>...</option>
                                <option v-for="option in categories">{{ option }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="p-2 h-25 h-auto">
                        <button v-if="locked" class="btn btn-danger d-flex flex-column" @click="locked = !locked">
                            <img src="../assets/locked.png" alt="Privé" class="img-fluid m-4 my-3">
                        </button>
                        <button v-if="!locked" class="btn btn-success d-flex flex-column" @click="locked = !locked">
                            <img src="../assets/unlocked.png" alt="Public" class="img-fluid m-2">
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!--Form/-->
    </div>
</template>

<style scoped>

</style>