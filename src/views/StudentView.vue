<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useQuestionStore } from '@/stores/questionStore'
    import PopUp from '@/components/PopUp.vue'
    import { Role, getRole } from '@/scripts/verifyRole';
    import router from '@/router';
    import { Question } from '@/interfaces/IQuestion';
    import { useAuthStore } from '@/stores/authStore';
    import HandImage from '@/components/student/HandImage.vue';

    const role = await getRole();
    if (role != Role.STUDENT) {
        router.push({ name: 'Profile' })
    }
    
    const questionStore = useQuestionStore()
    const questions = ref<Array<Question>>([])
    onMounted(async () => {
        await questionStore.refreshQuestions()
        questions.value = questionStore.questions
    })
    //TODO:
    //Manque à tester si dynamique lorsqu'on ajoute/supprime à questionStore.questions
    //Aussi vérifier si les props sont passées dynamiquement

    const authStore = useAuthStore()
    const userId = ref(authStore.getUserId)
    // On compare le userId à l'attribut studentId des questions pour seulement afficher les questions de l'élève
    const filteredQuestions = ref<Array<Question>>(questions.value.filter(question => question.studentId === userId.value))

    const categories = ref<String[]>(questionStore.categories)
    const priorities = [
        { value: 1, label: 'P1' },
        { value: 2, label: 'P2' },
        { value: 3, label: 'P3' },
        { value: 4, label: 'P4' },
        { value: 5, label: 'P5' }
    ]

    const errorPopUpShown = ref(false)

    //Options formulaire
    const superHand = ref(false)
    const content = ref('')
    const locked = ref(false)
    const priority = ref('')
    const category = ref('')

    //TODO: Pour la main levée (super ou non), afficher la valeur de la dernière main levée et non l'état de l'étoile

    function askQuestion() {
        if (validateQuestion()) {
            questionStore.addQuestion(content.value, superHand.value, priority.value, category.value, locked.value)
        } else {
            showErrorPopUp()
        }
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

    function showErrorPopUp() {
        errorPopUpShown.value = true
    }

    function hideErrorPopUp() {
        errorPopUpShown.value = false
    }

    function toggleQuestion(index: number) {
        questions.value[index].open = !questions.value[index].open 
    }

    function deleteQuestion(index: number) {
        questions.value.splice(index, 1)
        questionStore.removeQuestion(index)
    }
</script>

<template>
    <PopUp v-if="errorPopUpShown" 
        @closePopUp="hideErrorPopUp"
        :title="'Erreur'"
        :text="'Vérifiez que les champs sont complets'"
    />
    <div class="d-flex container flex-column p-5">
        <div class="d-flex">
            <!--HandComponent-->
            <HandImage :superHand="superHand"/>
            <!--Hand/-->
            <!--FormComponent-->
            <div class="w-75 d-flex bg-dark rounded p-3">
                <div class="w-25">
                    <button @click="superHand = !superHand" class="btn btn-warning m-2 my-4 p-2 d-flex align-items-center justify-content-center">
                        <img v-if="!superHand" src="../assets/star-empty.png" alt="Super-main" class="img-fluid">
                        <img v-if="superHand" src="../assets/star-full.png" alt="Super-main" class="img-fluid">
                    </button>
                </div>
                <div class="w-75 m-2 d-flex">
                    <div class="d-flex flex-column w-75">
                        <div class="h-75 p-1 form-floating">
                            <textarea class="form-control h-100" placeholder="Votre question:" id="question-field" v-model="content"></textarea>
                            <label for="question-field">Votre question:</label>
                        </div>
                        <button @click="askQuestion" class="h-25 btn btn-primary m-2">
                            Soumettre la {{ superHand ? 'super-' : '' }}question
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
        <!--Questions-->
        <div class="p-5 list-group">
            <ul>
                <li v-for="(question, index) in filteredQuestions" :key="index" class="list-group-item">
                    <div class="d-flex justify-content-between align-items-center bg-dark-subtle p-2 rounded">
                        <button class="btn btn-danger btn-sm" id="deleteQuestion" @click="deleteQuestion(index)">
                            Del
                        </button>
                        <h5>Question {{ index + 1 }}</h5>
                        <button class="btn btn-primary btn-sm" id="toggleQuestion" @click="toggleQuestion(index)">
                            {{ question.open ? '-' : '+' }}
                        </button>
                    </div>
                    <div v-if="question.open" class="mt-3">
                        <p id="studentId"><strong>Student ID:</strong> {{ question.studentId }}</p>
                        <p id="content"><strong>Content:</strong> {{ question.content }}</p>
                        <p id="priority"><strong>Priority:</strong> {{ question.priority }}</p>
                        <p id="category"><strong>Category:</strong> {{ question.category }}</p>
                        <p id="isPrivate"><strong>Is Private:</strong> {{ question.private }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>

</style>