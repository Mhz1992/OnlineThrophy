type SessionMediaResponse = {
    title:string
    media: SessionMedia[]
}

type SessionMedia = {
    id: string
    title: string
    media_type: string
    value: string
    priority: number
}
