export const convertDigitsToEnglish = (number: string | null): string => {
    if (!number) {
        return
    }
    return number.replace(/[۰-۹]/g, (digit) =>
        '۰۱۲۳۴۵۶۷۸۹'.indexOf(digit).toString()
    );
};
export const convertDigitsToPersian= (number: string | null): string => {
    if (!number) {
        return
    }
    return number.toString().replace(/\d/g, d => '0123456789'[d]);
};
