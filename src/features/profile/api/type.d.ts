// Types for profile data
type ProfileResponse = {
    phone: string;
    birthdate: string;
    age: number;
    full_name: string;
    first_name: string;
    last_name: string;
}

type ProfileUpdateRequest = {
    birthdate: string;
    first_name: string;
    last_name: string;
}