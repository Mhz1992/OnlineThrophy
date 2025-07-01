import { useQuery} from '@tanstack/react-query';
import {fetchSessionMediaApi} from "@/features/session/api/api";

export const useSessionMediaQuery = (session_id: string) => {
    return useQuery({
        queryKey: ['session', session_id],
        queryFn: () => fetchSessionMediaApi(session_id),
    });
};
