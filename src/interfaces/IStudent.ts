import { Timer } from "@/scripts/timer";

export interface Student {
    id: String;
    name: String;
    open: Boolean;
    timer: Timer;
}

export interface StudentDto {
    id: String;
    name: String;
}