<script setup lang="ts">
    import { ref } from 'vue';

    const raisedHand = ref<Boolean>(true)
    const superHand = ref<Boolean>(false)
</script>

<template>
    <div class="d-flex container">
        <div class="w-25 m-2 border border-5 d-flex">
            <div class="bg-success w-25 d-flex flex-column">
                <div v-if=raisedHand class="h-50 p-2 bg-warning d-flex align-items-center justify-content-center">
                    <img v-if="!superHand" src="../assets/star-empty.png" alt="Super-main" class="img-fluid bg-primary">
                    <img v-if="superHand" src="../assets/star-full.png" alt="Super-main" class="img-fluid bg-primary">
                </div>
                <div class="h-50 p-2 d-flex align-items-center justify-content-center">
                    <img v-if=raisedHand src="../assets/up-arrow.png" alt="Lever la main" class="img-fluid bg-primary">
                    <img v-if=!raisedHand src="../assets/down-arrow.png" alt="Baisser la main" class="img-fluid bg-primary">
                </div>
            </div>
            <div class="bg-primary w-75 d-flex align-items-center justify-content-center">
                <img v-if="raisedHand" src="../assets/hand.png" alt="Main levée" class="img-fluid p-2">
                <img v-if="superHand" src="../assets/super-hand.png" alt="Super-main levée" class="img-fluid p-2">
            </div>
        </div>
        <div class="w-75 d-flex flex-column m-2">
            <div class="d-flex h-75">
                <div class="w-75 bg-danger p-1 form-floating">
                    <textarea class="form-control h-100" placeholder="Leave a comment here" id="question-field"></textarea>
                    <label for="question-field">Votre question:</label>
                </div>
                <div class="w-25 d-flex">
                    <div class="w-50 bg-warning p-2">
                        priority
                    </div>
                    <div class="w-50 bg-info p-2">
                        category
                    </div>
                </div>
            </div>
            <div class="bg-dark h-25 p-2">
                a
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>