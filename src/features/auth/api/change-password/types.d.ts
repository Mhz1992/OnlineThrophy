interface ChangePasswordRequest {
    old_password: string;
    new_password: string;
}

interface ChangePasswordResponseData {
    access: string;
    refresh: string;
}

interface ChangePasswordResponse {
    status: string;
    code: number;
    message: string;
    data: ChangePasswordResponseData;
}
