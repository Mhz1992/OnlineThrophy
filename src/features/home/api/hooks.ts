import {useQuery} from '@tanstack/react-query';
import {fetchHomeDataSessionApi} from './api';

export const useHomeQuery = () => {
    return useQuery({
        queryKey: ['home'],
        queryFn: fetchHomeDataSessionApi,
    });
};
