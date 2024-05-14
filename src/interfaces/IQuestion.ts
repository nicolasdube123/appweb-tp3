export default interface Question {
    id: number,
    studentId: String,
    content: String,
    super: Boolean,
    priority: String,
    category: String,
    private: Boolean,
    open: Boolean //à retirer plus tard
}