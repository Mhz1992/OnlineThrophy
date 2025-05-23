export const URL_BASE_HOME = '/';
export const URL_AUTH = '/auth';
export const URL_LOGIN = `${URL_AUTH}/login`;
export const URL_ECOLOGY = '/ecology';
export const URL_MAP = `${URL_ECOLOGY}/maps`;

export const routeMap: { [key: string]: { name: string; href?: string } } = {
    ecology: { name: 'محیط شناسی' },
    map: { name: 'نقشه و اطلاعات' },
    'data-matching': { name: 'تطبیق داده', href: '/ecology/data-matching' },
    new: { name: 'جدید' },
};
