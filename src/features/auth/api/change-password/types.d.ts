type ChangePasswordRequest = {
    old_password: string;
    new_password: string;
}

type ChangePasswordResponseData = {
    access: string;
    refresh: string;
}

type ChangePasswordResponse = {
    status: string;
    code: number;
    message: string;
    data: ChangePasswordResponseData;
}
