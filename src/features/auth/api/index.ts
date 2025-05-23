import { URL_LOGIN } from '@/src/lib/constants/constants/routes';

export const login = (data: never): Promise<Response> => {
    const res = fetch(`/api/${URL_LOGIN}`, {
        body: data,
    });
    return res;
};
