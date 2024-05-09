import { userService } from '@/services/userService';
import { useAuthStore } from '../stores/authStore'

export enum Role {
    STUDENT = "student",
    TEACHER = "teacher"
}


export async function isGoodRole(role: Role): Promise<boolean> {
    const authStore = useAuthStore()
  //sauthStore.loadPersistedToken()
    let userId: string = authStore.getUserId
    console.log(userId)
    return await userService.isUserWithGoodRole(userId, role)
}