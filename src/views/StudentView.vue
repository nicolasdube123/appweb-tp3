<script setup lang="ts">
    import { ref } from 'vue';

    const raisedHand = ref<Boolean>(true)
    const superHand = ref<Boolean>(false)
    const selectedOption = ''
    const priorities = [
        { value: 1, label: 'P1' },
        { value: 2, label: 'P2' },
        { value: 3, label: 'P3' },
        { value: 4, label: 'P4' },
        { value: 5, label: 'P5' }
    ]
    const categories = [
        { value: 'M', label: 'Matière' },
        { value: 'P', label: 'Personnel' },
        { value: 'A', label: 'Autre' }
    ]

</script>
<div class="w-25 d-flex">
</div>
<template>
    <div class="d-flex container">
        <div class="w-25 d-flex">
            <div class="w-75 d-flex align-items-center justify-content-center">
                <img v-if="raisedHand && !superHand" src="../assets/hand.png" alt="Main levée" class="img-fluid p-2">
                <img v-if="raisedHand && superHand" src="../assets/super-hand.png" alt="Super-main levée" class="img-fluid p-2">
            </div>
        </div>
        <div class="w-75 d-flex bg-dark rounded p-3">
            <div class="w-25">
                <button v-if="!raisedHand" @click="superHand = !superHand" class="btn btn-warning m-2 my-4 p-2 d-flex align-items-center justify-content-center">
                    <img v-if="!superHand" src="../assets/star-empty.png" alt="Super-main" class="img-fluid">
                    <img v-if="superHand" src="../assets/star-full.png" alt="Super-main" class="img-fluid">
                </button>
                <button v-if=raisedHand @click="raisedHand = !raisedHand" class="btn btn-primary m-2 my-4 p-2 d-flex align-items-center justify-content-center">
                    <img src="../assets/down-arrow.png" alt="Baisser la main" class="img-fluid bg-primary">
                </button>
            </div>
            <div class="w-75 d-flex flex-column m-2">
                <div class="d-flex h-75">
                    <div class="w-75 p-1 form-floating">
                        <textarea class="form-control h-100" placeholder="Leave a comment here" id="question-field"></textarea>
                        <label for="question-field">Votre question:</label>
                    </div>
                    <div class="d-flex flex-column w-25">
                        <div class="p-2 h-50">
                            <h4 class="text-center text-white">Priorité</h4>
                            <select class="form-select" v-model="selectedOption">
                                <option value="" disabled>...</option>
                                <option v-for="option in priorities" :key="option.value" :value="option.value">{{ option.label }}</option>
                            </select>
                        </div>
                        <div class=" p-2 h-50">
                            <h4 class="text-center text-white">Catégorie</h4>
                            <select class="form-select" v-model="selectedOption">
                                <option value="" disabled>...</option>
                                <option v-for="option in categories" :key="option.value" :value="option.value">{{ option.label }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button @click="raisedHand = true" class="h-25 p-2 btn btn-primary m-2">
                    Lever la main
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>