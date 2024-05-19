import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSuperHandStore = defineStore("superHand", () => {
    const superHand = ref(false)

    function switchState() {
        superHand.value = !superHand.value
    }

    return {
        superHand,
        switchState
    }
})