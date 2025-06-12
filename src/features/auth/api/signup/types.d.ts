type SignupResponse = {
    profile: {
        id: string
        phone: string
        birthdate: string
        age: number
        inserted_dt: string
        updated_dt: string
        is_active: boolean
        full_name: string
        first_name: string
        last_name: string
    }
    refresh: string
    access: string
}

type SignupRequest = {
    phone: string
    password: string
    first_name: string
    last_name: string
    birthdate: string
    email: string
}
