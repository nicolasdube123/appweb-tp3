<script setup lang="ts">
import { useSuperHandStore } from "@/stores/superHandStore"

const store = useSuperHandStore()

</script>
<template>
    <div class="w-25 d-flex">
        <div class="w-75 d-flex align-items-center justify-content-center">
            <img v-if="!store.superHand" src="@/assets/hand.png" alt="Main levée" class="img-fluid p-2" id="raised-hand">
            <img v-if="store.superHand" src="@/assets/super-hand.png" alt="Super-main levée" class="img-fluid p-2" id="not-raised-hand">
        </div>
    </div>
</template>