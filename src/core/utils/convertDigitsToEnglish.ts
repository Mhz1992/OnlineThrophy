export const convertDigitsToEnglish = (number: string): string => {
    return number.replace(/[۰-۹]/g, (digit) =>
        '۰۱۲۳۴۵۶۷۸۹'.indexOf(digit).toString()
    );
};
export const convertDigitsToPersian = (number: string): string => {
    return number.toString().replace(/\d/g, d => '0123456789'[parseInt(d)]);
};
