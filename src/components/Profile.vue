<script setup lang="ts">
    import { ref } from 'vue';
    import { Role } from '@/scripts/verifyRole'

    const props = defineProps<{
        name: string,
        email: string,
        role: Role
    }>()
    const emit = defineEmits<{
        (event:"updateUser", email: string, password: string):void
    }>()

    let name = ref(props.name)
    let password = ref("")

</script>
<template>
    <div>
        <h1>Profile</h1>
        <div>Nom: {{ name }}</div>
        <div>Courriel: {{ email }}</div>
        <div>
            <input v-if="role == Role.TEACHER" type="text" name="newName" id="new-name" v-model="name" placeholder="Nouveau nom">
            <input type="text" name="newPassword" id="new-password" v-model="password" placeholder="Nouveau mot de passe">
            <input type="submit" value="Envoyer">
        </div>
    </div>
</template>
<style scoped></style>