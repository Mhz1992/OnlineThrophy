import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';

type ParamsType<AsArray extends boolean> = AsArray extends true
    ? { [key: string]: string[] | undefined }
    : { [key: string]: string | undefined };

type UseSearchQueryParamsType = {
    getAllSearchParams: <AsArray extends boolean = true>(_asArray?: AsArray) => ParamsType<AsArray>;
    getQueryParam: (
        _key: string,
        _options?: {
            defaultValue?: unknown;
            parseArray?: boolean;
        },
    ) => unknown;
    setQueryParam: (
        _key: string,
        _value: unknown,
        _options?: {
            replace?: boolean;
            allowDuplicates?: boolean;
            asArray?: boolean;
        },
    ) => void;
    removeQueryParam: (_key: string, _value?: unknown) => void;
    hasQueryParam: (_key: string, _value?: unknown) => boolean;
    toggleQueryParam: (_key: string, _value: unknown) => void;
};

const useSearchQueryParams: () => UseSearchQueryParamsType = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const deserializeArray = (str: string): unknown[] => {
        try {
            return JSON.parse(str);
        } catch {
            return [];
        }
    };

    const getAllSearchParams = useCallback(<AsArray extends boolean>(asArray: AsArray = true as AsArray) => {
        if (typeof window === 'undefined') {
            return {} as ParamsType<AsArray>;
        }

        const mSearchParams = window.location.search;
        const pairs = mSearchParams.replace('?', '').split('&');
        const params = {} as ParamsType<AsArray>;

        pairs.forEach((item) => {
            if (!item) return; // Skip empty strings
            const pairArray = item.split('=');
            const [key, value] = pairArray;
            if (params[key]) {
                if (Array.isArray(params[key])) {
                    (params[key] as string[]).push(value);
                }
            } else {
                if (asArray) {
                    params[key] = [value] as ParamsType<AsArray>[keyof ParamsType<AsArray>];
                } else {
                    params[key] = value as ParamsType<AsArray>[keyof ParamsType<AsArray>];
                }
            }
        });
        return params as ParamsType<AsArray>;
    }, []);
    const getQueryParam = useCallback(
        (
            key: string,
            options: {
                defaultValue?: unknown;
                parseArray?: boolean;
            } = {},
        ): unknown => {
            if (!searchParams) return options.defaultValue || null;

            // Get all values for the key
            const values = searchParams.getAll(key);

            // If no values found, return default
            if (values.length === 0) return options.defaultValue || null;

            // If parseArray is true, try to parse as an array
            if (options.parseArray) {
                try {
                    // If only one value, parse it as an array
                    if (values.length === 1) {
                        return deserializeArray(values[0]);
                    }
                    // If multiple values, parse each
                    return values.map(deserializeArray);
                } catch {
                    return options.defaultValue || [];
                }
            }

            // Default behavior: return single value or array of values
            return values.length === 1 ? values[0] : values;
        },
        [searchParams],
    );

    const setQueryParam = useCallback(
        (
            key: string,
            value: unknown,
            options: {
                replace?: boolean;
                allowDuplicates?: boolean;
                asArray?: boolean;
            } = {},
        ) => {
            if (typeof window === 'undefined') {
                return;
            }
            const params = new URLSearchParams(window.location.search);
            const stringValue = String(value);
            if (options.replace) {
                params.delete(key);
                params.append(key, stringValue);
            } else {
                const existingValues = params.getAll(key);
                const isDuplicate = existingValues.includes(stringValue);
                if (!isDuplicate || options.allowDuplicates) {
                    params.append(key, stringValue);
                }
            }

            const priorityParams = ['zoom', 'center'];
            const newParams = new URLSearchParams();

            for (const priorityKey of priorityParams) {
                const values = params.getAll(priorityKey);
                if (values.length > 0) {
                    params.delete(priorityKey);
                    for (const val of values) {
                        newParams.append(priorityKey, val);
                    }
                }
            }

            params.forEach((val, ke) => {
                newParams.append(ke, val);
            });

            const newUrl = `${pathname}?${newParams.toString()}`;
            window.history.replaceState(window.history.state, '', newUrl);
            window.dispatchEvent(new Event('urlchange'));
        },
        [pathname, router],
    );

    const toggleQueryParam = useCallback(
        (key: string, value: unknown) => {
            if (typeof window === 'undefined') {
                return;
            }
            let params = new URLSearchParams(window.location.search);
            const existingValues = params.getAll(key);
            const stringValue = String(value);
            const valueExists = existingValues.includes(stringValue);

            if (!valueExists) {
                params.append(key, stringValue);
            } else {
                params = new URLSearchParams(
                    Array.from(params.entries()).filter(([_k, _v]) => !(_k === key && _v === stringValue)),
                );
            }

            const newUrl = `${pathname}?${params.toString()}`;

            window.history.replaceState(window.history.state, '', newUrl);
            window.dispatchEvent(new Event('urlchange'));
        },
        [pathname, router],
    );

    const removeQueryParam = useCallback(
        (key: string, value?: unknown) => {
            if (typeof window === 'undefined') {
                return {};
            }
            const params = new URLSearchParams(window.location.search);
            if (value !== undefined) {
                const stringValue =
                    typeof value === 'object' ? (Array.isArray(value) ? value : [value]) : String(value);
                const existingValues = params.getAll(key);
                params.delete(key);
                // Re-add values that don't match the one to be removed
                existingValues.forEach((existingValue) => {
                    if (existingValue !== stringValue) {
                        params.append(key, existingValue);
                    }
                });
            } else {
                params.delete(key);
            }

            const newSearch = params.toString();
            const newUrl = newSearch ? `${pathname}?${newSearch}` : pathname;
            window.history.replaceState(window.history.state, '', newUrl);
            window.dispatchEvent(new Event('urlchange'));
        },
        [pathname, router],
    );

    const hasQueryParam = useCallback(
        (key: string, value?: unknown): boolean => {
            if (!searchParams) return false;

            if (value !== undefined) {
                // Convert value to string for comparison
                const stringValue = String(value);

                return searchParams.getAll(key).includes(stringValue);
            }

            // Check if key exists
            return searchParams.has(key);
        },
        [searchParams],
    );

    return {
        getAllSearchParams,
        getQueryParam,
        setQueryParam,
        removeQueryParam,
        hasQueryParam,
        toggleQueryParam,
    };
};

export default useSearchQueryParams;
