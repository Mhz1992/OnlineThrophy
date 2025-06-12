import {useQuery} from '@tanstack/react-query';
import {fetchPerformanceApi} from './api';

export const usePerformanceQuery = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: fetchPerformanceApi,
    });
};
