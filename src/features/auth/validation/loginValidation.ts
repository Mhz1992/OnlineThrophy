import { z } from 'zod';

const usernameMinimumChar = 4;
const passwordMinimumChar = 8;

export const loginValidation = z.object({
    username: z
        .string({ required_error: 'وارد کردن نام کاربری اجباری است ' })
        .min(usernameMinimumChar, 'نام کاربری نمی تواند کمتر از ۴ حرف باشد'),
    password: z
        .string({ required_error: 'وارد کردن رمز عبور اجباری است' })
        .min(passwordMinimumChar, 'رمز عبور نمی تواند کمتر از ۸ حرف باشد '),
});

export type LoginValidationType = z.infer<typeof loginValidation>;
