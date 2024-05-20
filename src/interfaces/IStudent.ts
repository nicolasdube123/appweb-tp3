import { Timer } from "@/scripts/timer";

export interface Student {
    id: string;
    name: string;
    open: boolean;
    timer: Timer;
}

export interface StudentDto {
    id: string;
    name: string;
}