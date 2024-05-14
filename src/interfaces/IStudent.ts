import { Timer } from "@/scripts/timer";

export default interface Student {
    id: String;
    name: String;
    open: Boolean;
    timer: Timer;
}