import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const userSuperHandStore = defineStore("superHand", () => {
    const superHand = ref(false)

    function switchState() {
        superHand.value = !superHand.value
    }
    }
)