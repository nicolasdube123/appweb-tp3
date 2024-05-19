<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { useQuestionStore } from '@/stores/questionStore'
    import { useSuperHandStore } from "@/stores/superHandStore"
    import { useAuthStore } from '@/stores/authStore';
    import { Question } from '@/interfaces/IQuestion';

    const emit = defineEmits<{
        (event:"send", question: Question):void,
        (event:"showError"):void
    }>()
    const questionStore = useQuestionStore()
    
    const categories = ref<String[]>(questionStore.categories)
    const priorities = [
        { value: 1, label: 'P1' },
        { value: 2, label: 'P2' },
        { value: 3, label: 'P3' },
        { value: 4, label: 'P4' },
        { value: 5, label: 'P5' }
    ]

    const authStore = useAuthStore()
    const userId = computed(() => authStore.getUserId)
    const superHandStore = useSuperHandStore()
    const content = ref('')
    const locked = ref(false)
    const priority = ref('')
    const category = ref('')

    function clearFields() {
        superHandStore.superHand = false
        content.value = ''
        locked.value = false
        priority.value = ''
        category.value = ''
    }

    function validateQuestion() : boolean {
        if (content.value.trim().length == 0 
            || priority.value.length == 0 
            || priority.value == '...' 
            || category.value.length == 0 
            || priority.value == '...') 
        {
            return false
        } return true
    }
    
    async function askQuestion() {
        if (validateQuestion()) {
            await questionStore.addQuestion(userId.value, content.value, superHandStore.superHand, priority.value, category.value, locked.value)
            const question = await questionStore.getLastQuestion()
            emit("send", question)
            clearFields()
        } else {
            emit("showError")
        }
    }

</script>
<template>
    <div class="w-75 d-flex bg-dark rounded p-3">
        <div class="w-25">
            <button @click="superHandStore.switchState" class="btn btn-warning m-2 my-4 p-2 d-flex align-items-center justify-content-center">
                <img v-if="!superHandStore.superHand" src="@/assets/star-empty.png" alt="Super-main" class="img-fluid">
                <img v-if="superHandStore.superHand" src="@/assets/star-full.png" alt="Super-main" class="img-fluid">
            </button>
        </div>
        <div class="w-75 m-2 d-flex">
            <div class="d-flex flex-column w-75">
                <div class="h-75 p-1 form-floating">
                    <textarea class="form-control h-100" placeholder="Votre question:" id="question-field" v-model="content"></textarea>
                    <label for="question-field">Votre question:</label>
                </div>
                <button @click="askQuestion" class="h-25 btn btn-primary m-2">
                    Soumettre la {{ superHandStore.superHand ? 'super-' : '' }}question
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
                        <img src="../../assets/locked.png" alt="Privé" class="img-fluid m-4 my-3">
                    </button>
                    <button v-if="!locked" class="btn btn-success d-flex flex-column" @click="locked = !locked">
                        <img src="../../assets/unlocked.png" alt="Public" class="img-fluid m-2">
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>