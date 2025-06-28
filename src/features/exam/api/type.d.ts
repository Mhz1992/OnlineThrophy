type ExamQuestionsResponse = ExamQuestion[]

type ExamQuestion  = {
    id: string
    context: string
    priority: number
    type: string
    answers: ExamQuestionAnswer[]
}

type ExamQuestionAnswer =  {
    id: string
    context: string
    priority: number
}

type SubmitExamDataRequest = {
    exam_id: string
    answers: submitAnswer[]
}
type submitAnswer = {
    question_id: string
    selected_answer_id: string | string[]
}


type SubmitExamDataResponse = {
    id: string
    score: number
    inserted_dt: number
    exam_type_title: string
}