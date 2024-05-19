export interface Question {
    id: number,
    studentId: string,
    content: string,
    super: boolean,
    priority: string,
    category: string,
    private: boolean,
    open: boolean
}

export interface QuestionDto {
    studentId: string,
    content: string,
    super: boolean,
    priority: string,
    category: string,
    private: boolean
}