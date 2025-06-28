type HomeData = {
    full_name: string
    exam_id: string
    active_therapy_sessions: TherapySession[] | []
}

type TherapySession = {
    id: string,
    title: string,
    status: 'open' | 'locked' | 'viewed',
    description: string,
    priority: number,
    is_exam_required: boolean

}