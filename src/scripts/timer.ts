export class Timer {
    time = 60
    running = false
    timer: number | null = null

    formatTime() : String {
        const minutes = Math.floor(this.time / 60)
        const seconds = this.time % 60
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }

    startTimer() {
        this.running = true
        this.timer = window.setInterval(() => {
        if (this.time > 0) this.time--
        else this.stopTimer()
        }, 1000)
    }

    pauseTimer() {
        this.running = false
        if (this.timer) window.clearInterval(this.timer)
    }

    stopTimer() {
        this.running = false
        this.time = 60
        if (this.timer) window.clearInterval(this.timer)
    }
}