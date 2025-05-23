import { useState, useEffect, useCallback } from 'react';

type useOnlineStatusType = {
    isOnline: boolean;
    checkConnectivity: () => Promise<boolean>;
};

const useOnlineStatus = (): useOnlineStatusType => {
    const [isOnline, setIsOnline] = useState(true);

    const checkConnectivity = useCallback(() => {
        return new Promise<boolean>((resolve) => {
            fetch('/ping.json', { mode: 'no-cors', cache: 'no-store' })
                .then(() => {
                    setIsOnline(true);
                    resolve(true);
                })
                .catch(() => {
                    setIsOnline(false);
                    resolve(false);
                });
        });
    }, []);

    useEffect(() => {
        const handleOnline = (): void => setIsOnline(true);
        const handleOffline = (): void => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Initial check
        checkConnectivity();

        return (): void => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [checkConnectivity]);

    return { isOnline, checkConnectivity };
};

export default useOnlineStatus;
