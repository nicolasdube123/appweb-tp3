import { userService } from '@/services/userService';
import { useAuthStore } from '../stores/authStore'

export enum Role {
    STUDENT = "student",
    TEACHER = "teacher"
}


export async function getRole(): Promise<Role | undefined> {
    const authStore = useAuthStore()
    authStore.loadPersistedToken()
    const userId: string = authStore.getUserId
    const role = await userService.getRole(userId)
    switch (role.toLowerCase()) {
        case Role.STUDENT:
            return Role.STUDENT
        case Role.TEACHER:
            return Role.TEACHER
        default:
            return undefined
    }
}