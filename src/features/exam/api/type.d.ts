type ExamQuestionsResponse = ExamQuestion[]

interface ExamQuestion {
    id: string
    context: string
    priority: number
    type: string
    answers: ExamQuestionAnswer[]
}

interface ExamQuestionAnswer {
    id: string
    context: string
    priority: number
}
