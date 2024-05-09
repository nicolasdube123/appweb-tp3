import { userService } from '@/services/userService';

export enum Role {
    STUDENT = "student",
    TEACHER = "teacher"
}

export async function isGoodRole(role: Role): Promise<boolean> {
    return await userService.isUserWithGoodRole("2", role)
}