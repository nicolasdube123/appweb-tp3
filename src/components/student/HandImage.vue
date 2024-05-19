<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
    (event: "update"): void
}>()

const superHand = ref(false)
</script>
<template>
    <div class="w-25 d-flex">
        <div class="w-75 d-flex align-items-center justify-content-center">
            <img v-if="!superHand" src="../assets/hand.png" alt="Main levée" class="img-fluid p-2">
            <img v-if="superHand" src="../assets/super-hand.png" alt="Super-main levée" class="img-fluid p-2">
        </div>
    </div>
</template>